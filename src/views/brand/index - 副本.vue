<template>
  <section class="page-section-brand">
    <el-row class="search-requirement-row">
      <el-form :inline="true" :model="searchRequirementForm" size="small" class="btn-bar">
        <el-form-item>
          <el-button type="primary" @click="clickAddRequirement">新建需求</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload ref="upload" :action='""' :http-request="clickImportProduct" :show-file-list="false"
            :file-list="fileList">
            <el-button type="primary" :loading="uploadLoading">导入品牌</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="downTemplate">下载模板</el-button>
        </el-form-item>
      </el-form>
      <el-form class="search-bar" :inline="true" size="small">
        <el-form-item>
          <el-button style="width:80px" type="primary" @click="clickQueryRequirement">查询</el-button>
        </el-form-item>
        <el-form-item class="media-cls">
          <el-input placeholder="请输入预算" clearable v-model="searchRequirementForm.budget"></el-input>
        </el-form-item>
        <el-form-item class="media-cls">
          <el-input placeholder="请输入品牌名" clearable v-model="searchRequirementForm.brand_name"></el-input>
        </el-form-item>
        <el-form-item class="media-cls">
          <el-input placeholder="请输入需求名" clearable v-model="searchRequirementForm.requirement_name"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="box-sizing:border-box">
      <el-table :data="brandRequirementTable" stripe :header-row-style="{fontSize:'14px'}"
        :header-cell-style="{background:'#f0f1f2',height:'50px',color:'#666'}" class="brand-requirement-table"
        v-loading="brandRequirementTableLoading" :height="tableHeight + ''">
        <el-table-column prop="brand_name" label="品牌名" show-overflow-tooltip fixed min-width="110"></el-table-column>
        <el-table-column prop="requirement_name" label="需求名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="report_date" label="提报日期" :formatter="dateFormat" show-overflow-tooltip align="center" min-width="95"></el-table-column>
        <el-table-column prop="display_type" label="直播类型" :formatter="displayTypeFormate" align="center"></el-table-column>
        <el-table-column prop="budget" label="预算/元" align="center"></el-table-column>
        <el-table-column prop="rebate" label="返点/元" align="center"></el-table-column>
        <el-table-column label="利润率" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.profit}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="KPI指标(销售额)" show-overflow-tooltip align="center" width="126">
          <template slot-scope="scope">
            <span class="text-overflow-cls" v-show="scope.row.kpi_sales_amount !== -1">{{scope.row.kpi_sales_amount}}元</span>
            <!-- <span class="text-overflow-cls" v-show="scope.row.kpi_uv !== -1">UV：{{scope.row.kpi_uv}}次</span> -->
          </template>
        </el-table-column>
        <el-table-column label="方案状态" :formatter="planStatusFormat" show-overflow-tooltip align="center" min-width="80" fixed="right">
          <template slot-scope="scope">
            <span :style="checkColor(scope.row.status)">{{planStatusFormat(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-tooltip content="查看详情" placement="top" effect="light">
              <i class="gm-icon gm-icon-detail" @click="goRequirementDetail(scope.row)"></i>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" effect="light">
              <i class="gm-icon gm-icon-delete" @click="handleDeleteRequirement(scope.row)"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div style="margin-top:14px">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="pagination.currentPage" :page-size.sync="pagination.pageSize"
        :page-sizes.sync="pagination.pageSizes" layout="sizes, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import { queryRequirement, deleteRequirement } from '@/api/brand'
import { displayTypeFormate, dateFormat, planStatusFormat } from '@/utils/format'
import { uploadFile } from '@/api/upload'
import {fileMaxSize, fileMaxSizeTips} from '@/utils/config'
import { domain } from '@/utils/variable'

export default {
  data() {
    return {
      uploadLoading: false,
      searchRequirementForm: {
        requirement_name: '',
        brand_name: '',
        budget: '',
        num: 10,
        page_num: 1
      },
      fileList: [],
      brandRequirementTable: [],
      brandRequirementTableLoading: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 10
      },
      tableHeight: 500
    }
  },
  created () {
    this.clickQueryRequirement()
  },
  mounted () {
    window.onresize = () => {
      this.tableHeight = window.innerHeight - 48 - 46 - document.querySelector('.search-requirement-row').clientHeight - 14 - 46 - 54
    }
  },
  methods: {
    async clickQueryRequirement() {
      // debugger
      this.brandRequirementTableLoading = true
      let requirementpass = this.searchRequirementForm
      this.searchRequirementForm.num = this.pagination.pageSize
      this.searchRequirementForm.page_num = this.pagination.currentPage

      let response = await queryRequirement(requirementpass)
      this.brandRequirementTableLoading = false
      if (response.data.success) {
        let {data, total} = response.data.data
        this.pagination.total = total
        this.brandRequirementTable = data
      } else {
        this.$gmMessage(response.data.message, 'tip')
      }
      if (document.querySelector('.el-table__body-wrapper.is-scrolling-left')) document.querySelector('.el-table__body-wrapper.is-scrolling-left').scrollTop = 0
      this.tableHeight = window.innerHeight - 48 - 46 - document.querySelector('.search-requirement-row').clientHeight - 14 - 46 - 54
    },
    clickAddRequirement() {
      this.$router.push({ path: '/requirement-info' })
    },
    goRequirementDetail(row) {
      this.$router.push({ path: '/requirement-info', query: { requirementId: row.id } })
    },
    handleDeleteRequirement(row) {
      this.$confirm('此操作将永久删除数据，是否继续', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'warning-icon'
      })
        .then(() => {
          let deleterequirementpass = {
            requirement_id: row.id
          }
          deleteRequirement(deleterequirementpass).then(response => {
            let result = response.data
            if (result.success) {
              this.$gmMessage(result.message)
              this.clickQueryRequirement()
            } else {
              this.$gmMessage(result.message, 'tip')
            }
          })
        })
        .catch(() => {
          return false
        })
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.$emit('handleSizeChange', val)
      this.clickQueryRequirement()
    },
    handleCurrentChange() {
      this.clickQueryRequirement()
    },
    downTemplate() {
      window.open(domain + '/template/brand_template.xlsx')
    },
    clickImportProduct(param) {
      this.uploadLoading = true
      let file = param.file
      if (file.size > fileMaxSize) {
        this.$message.error(fileMaxSizeTips)
        this.uploadLoading = false
        return
      }
      let form = new FormData()
      form.append('file', file)
      // ('operate', 'brand/product')
      form.append('operate', 'brand')
      uploadFile(form).then(response => {
        let result = response.data
        if (result.success) {
          this.$gmMessage({
            content: result.message,
            type: 'tip',
            duration: 0,
            showBtn: true
          })
        } else {
          this.$gmMessage(result.message, 'tip')
        }
        this.uploadLoading = false
      })
    },
    // 给方案结果加颜色
    checkColor(status) {
      let ret = ''
      if (status === 1) {
        ret = 'color: #1890FF;'
      } else if (status === 2) {
        ret = 'color: #4DCDB1;'
      }
      return ret
    },
    displayTypeFormate,
    dateFormat,
    planStatusFormat
  }
}
</script>
<style lang="scss">
  .search-requirement-row{
    .el-button--primary{
      font-size: 14px;
      padding: 8px 15px;
    }
  }
  .btn-bar {
    display: inline-block;
  }
  .search-bar {
    float: right;
    display: block;
    .el-form-item {
      float: right;
    }
  }
</style>

<style lang="scss" scoped>
  /deep/ .el-table td {
    padding: 12px 0;
  }
  .el-table .cell {
    line-height: initial!important;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 12px;
  }
  /deep/ .el-table__fixed-right-patch {
    background: rgb(240, 241, 242)!important;
  }
  @import '@/styles/vars.scss';

.page-section-brand {
  padding: 12px;
  background: #fff;
  // margin-top: 10px;
}

@media screen and (max-width: 1310px) {
  .search-bar {
    .media-cls {
      width: 130px !important;
      .el-input {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 1060px) {
  .btn-bar {
    display: block;
  }
  .search-bar {
    float: none;
    display: inline-block;
    .media-cls {
      width: initial;
      .el-input {
        width: 100%;
      }
    }
  }
}

// .search-requirement-row {
//   .el-form-item {
//     float: right;
//     &:first-child,
//     &:nth-child(2),
//     &:nth-child(3) {
//       float: left;
//     }
//   }
// }
// @media screen and (max-width: 1300px) {
//   .search-requirement-row {
//     .media-cls {
//       width: 130px !important;
//       .el-input {
//         width: 100%;
//       }
//     }
//   }
// }
// @media screen and (max-width: 1062px) {
//   .search-requirement-row {
//     .media-cls {
//       width: 80px !important;
//       .el-input {
//         width: 100%;
//       }
//     }
//   }
// }
</style>
