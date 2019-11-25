<template>
  <section class="page-section">
    <el-form :model="searchForm" :inline="true" size="small" class="search-form">
      <el-form-item label="选择日期">
        <el-date-picker v-model="searchForm.date" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '00:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" clearable>
          <el-option v-for="(item, key) in importedStatusOptions" :key="key" :value="item.value"
            :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="导入人">
        <el-select v-model="searchForm.operator" filterable clearable>
          <el-option v-for="(item, index) in allAddBy" :key="index" :value="item" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:72px" @click="clickSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width:72px" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row class="table-row">
      <el-table :data="logsTableData" v-loading="logsTableLoading" :header-cell-style="{background:'#f1f2f3',height:'48px',color:'#666'}"
        stripe>
        <el-table-column label="操作模块" prop="operate" min-width="160"
          show-overflow-tooltip></el-table-column>
          <!--  :formatter="operateFormat" -->
        <el-table-column label="文件名称" prop="file_name" min-width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="状态" prop="status" min-width="120" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.status === '失败' ? 'is-failed': ''">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="result"
          min-width="200px"
          label="导入结果">
          <template slot-scope="{row}">
            <el-popover
              placement="bottom-start"
              trigger="hover"
              width="400"
              visible-arrow="false"
              :disabled="row.result.length < 20"
              >
              <p v-for="(item, index) in row.result.split('；')" :key="index">{{item}}</p>
              <p slot="reference">
                {{row.result.length > 20 ? row.result.substring(0, 20) + '...' : row.result}}
              </p>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="导入人" prop="operator" min-width="120"></el-table-column>
        <el-table-column label="导入时间" prop="upload_date" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{addDateFormat(scope.row.upload_date)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-tooltip placement="top" trigger="hover" effect="light" content="查看详情">
              <i v-if="scope.row.status === '成功' && $store.getters['user/getUserRole'].includes(RIGHT_CODE.view_import)" class="gm-icon gm-icon-detail" @click="clickLogDetail(scope.row)"></i>
            </el-tooltip>
            <span class="icon-span" v-if="scope.row.status !== '成功'">--</span>
            <el-tooltip placement="top" trigger="hover" effect="light" content="下载文件">
              <i v-if="scope.row.upload_file_path !== '' && $store.getters['user/getUserRole'].includes(RIGHT_CODE.view_import)" class="gm-icon gm-icon-download" @click="downloadLogsDetail(scope.row)"></i>
            </el-tooltip>
            <span class="icon-span" v-if="scope.row.upload_file_path === ''">-</span>
          </template>
        </el-table-column>
        <div slot="empty" class="empty-box" style="padding: 40px 0;">
          <img src="@/assets/img/anchor_nodata.png" />
        </div>
      </el-table>
    </el-row>
    <div class="page-box">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="pagination.currentPage" :page-sizes.sync="pagination.pageSizes"
        :page-size.sync="pagination.pageSize" layout="sizes, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div>
    <el-dialog :title="logsDialogTitle" :visible.sync="logsDialogVisible">
      <logsTable :logsDetailData="logsDetailData"></logsTable>
    </el-dialog>
  </section>
</template>
<script>
import { queryLog } from '@/api/upload'
import { addDateFormat, operateFormat } from '@/utils/format'

import logsTable from './component/logDetail'
import { queryStarSug } from '@/api/star'
import { domain } from '@/utils/variable'
import { RIGHT_CODE } from '@/const/roleCode'

export default {
  components: { logsTable },
  data() {
    return {
      RIGHT_CODE,
      domain: domain,
      pickerOptions: {
        shortcuts: [
          {
            text: '前一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '前一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      searchForm: {
        date: '',
        status: '',
        operator: ''
      },
      allAddBy: [],
      importedStatusOptions: [
        {
          label: '成功',
          value: 1
        },
        {
          label: '失败',
          value: -1
        }
      ],
      logsTableData: [],
      logsTableLoading: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 10
      },
      logsDetailData: [],
      logsDialogVisible: false,
      logsDialogTitle: '导入品牌信息'
    }
  },
  activated() {
    queryStarSug().then(response => {
      let result = response.data
      if (result.success) {
        this.allAddBy = result.data.user_data
      }
    })
    this.clickSearch()
  },
  methods: {
    clickSearch() {
      let logpass = {
        operator: this.searchForm.operator,
        status: this.searchForm.status,
        num: this.pagination.pageSize,
        page_num: this.pagination.currentPage,
        start_time: '',
        end_time: ''
      }
      if (this.searchForm.date) {
        logpass.start_time = this.searchForm.date[0] === undefined ? '' : this.searchForm.date[0]
        logpass.end_time = this.searchForm.date[1] === undefined ? '' : this.searchForm.date[1]
      }
      this.logsTableLoading = true
      queryLog(logpass).then(response => {
        let result = response.data
        if (result.success) {
          this.pagination.total = result.data.total
          this.logsTableData = result.data.data
          this.logsTableLoading = false
        } else {
          this.logsTableLoading = false
        }
      })
    },
    resetSearch() {
      this.searchForm = {
        date: '',
        status: '',
        operator: ''
      }
      this.pagination = {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 10
      }
      this.clickSearch()
    },
    downloadLogsDetail(val) {
      let url = this.domain + '/api/upload/download_upload_file?upload_log_id=' + val.id
      window.open(url)
    },
    clickLogDetail(val) {
      this.isDisplay = true
      this.logsDialogTitle = val.operate // this.operateFormat(val)
      this.logsDetailData = val.result_detail
      this.logsDialogVisible = true
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.$emit('handleSizeChange', val)
      this.clickSearch()
    },
    handleCurrentChange() {
      this.clickSearch()
    },
    addDateFormat,
    operateFormat
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.search-form {
  background: #fff;
  padding: 10px;
  line-height: 50px;
  .el-form-item {
    margin-bottom: 0px;
    .el-range-editor,
    .el-select,
    .el-input,
    .el-button {
      margin-top: 10px;
    }
  }
}
.table-row {
  padding: 12px;
  background: #fff;
  margin-top: 14px;
  .table-tips {
    color: $color-primary;
    line-height: 32px;
    font-weight: 500;
    i {
      margin-right: 8px;
    }
  }
  .el-table {
    border: 1px solid #dedede;
    .is-failed {
      color: #f56c6c;
    }
  }
  .icon-span {
    display: inline-block;
    width: 30px;
    text-align: center;
  }
}
.page-box {
  padding: 10px;
  padding-left: 0;
  background: #fff;
}
/deep/ .el-tooltip__popper {
  width: 50px;
  border-color: #666;
}
</style>
