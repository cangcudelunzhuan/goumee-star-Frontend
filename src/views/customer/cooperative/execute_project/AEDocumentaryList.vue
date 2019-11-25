<template>
  <div class="aedocumentarylist-container" v-if="CurrentAERecordList != null">
    <el-table
      :data="CurrentAERecordList != null ? CurrentAERecordList.data : []"
      :stripe="true"
      style="width: 100%; margin-top: 15px; margin-bottom: 10px;"
      :header-cell-style="{background:'#F5F6F9', height:'42px', color: '#666666', fontWeight: 'bold'}">
      <template slot="empty">
        <table-no-data :isvertical="true" :title="'还没有跟单记录哦~'" :img="require('@/assets/img/cooperative/xt_nodata_note.png')"></table-no-data>
      </template>
      <el-table-column
        :formatter="(row, column, cellValue, index) => (pagination.currentPage - 1) * pagination.pageSize + (index + 1)"
        label="序号"
        width="60"
        fixed="left"
        align="center">
      </el-table-column>
      <el-table-column
        prop="kol_name"
        label="KOL名称"
        width="130">
      </el-table-column>
      <el-table-column
        prop="cost_amount"
        label="成本金额"
        width="120">
        <template slot-scope="{row}">
          <span class="txt-skamount">{{row.cost_amount_str ? `￥${row.cost_amount_str}` : '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_cost_arrange"
        label="成本是否安排"
        width="110">
        <template slot-scope="{row}">
          <span v-if="row.is_cost_arrange === 0">否</span>
          <span v-if="row.is_cost_arrange === 1">是</span>
          <span v-if="row.is_cost_arrange === ''">--</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cost_amount"
        label="商品名称 / 链接"
        width="130">
        <template slot-scope="{row}">
          <a v-if="row.item_name != ''" :href="row.item_url" style="color: #5C82FF; text-decoration: none;" target="_blank">
            <i class="iconfont iconfujian" style="font-size: 15px;"></i>
            {{row.item_name}}
          </a>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        label="直播日期"
        width="100">
        <template slot-scope="{row}">
          <span v-if="row.live_date != ''">{{row.live_date}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_sample_arrange"
        label="样品是否安排"
        width="110">
        <template slot-scope="{row}">
          <span v-if="row.is_sample_arrange === 0">否</span>
          <span v-if="row.is_sample_arrange === 1">是</span>
          <span v-if="row.is_sample_arrange === ''">--</span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注">
        <template slot-scope="{row}">
          <el-popover
            placement="top-start"
            trigger="click"
            v-if="row.note != ''"
            :content="row.note">
            <span slot="reference" style="color: #5C82FF; cursor: pointer; font-size: 13px;">备注</span>
            <p>
              {{row.note}}
            </p>
          </el-popover>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="{row}">
          <div v-if="UserRoles.includes(RIGHT_CODE.add_documentary) && CurrentAE.ae_id == UserInfo.id">
            <el-tooltip placement="left" effect="light" content="编辑">
              <span><i class="gm-icon gm-icon-edit" @click="editDocumentary(row)"></i></span>
            </el-tooltip>
            <el-tooltip placement="right" effect="light" content="删除">
              <span><i class="gm-icon gm-icon-delete" @click="delDocumentary(row)"></i></span>
            </el-tooltip>
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="contract-pagination"
      background
      style="margin-bottom: 10px;"
      :current-page.sync="pagination.currentPage"
      :page-sizes.sync="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="CurrentAERecordList != null ? CurrentAERecordList.total : 0"
      @current-change="handleCurrentChange"
      @size-change="handlePageSizeChange">
    </el-pagination>
    <!-- 登记跟单 -->
    <AddDocumentary ref="addDocumentaryDialog" />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {RIGHT_CODE} from '@/const/roleCode'
import AddDocumentary from './AddDocumentary'
import {deleteDocumentary} from '@/api/cooperative'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'AEDocumentaryList',
  components: {
    AddDocumentary
  },
  mixins: [CooperativeStore],
  data() {
    return {
      RIGHT_CODE,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30]
      }
    }
  },
  computed: {
    ...mapGetters({
      CurrentAE: 'cooperative/CurrentAE',
      CurrentAERecordList: 'cooperative/CurrentAERecordList'
    })
  },
  methods: {
    ...mapActions({
      GetCurrentAERecordList: 'cooperative/GetCurrentAERecordList',
      GetCurrentAE: 'cooperative/GetCurrentAE'
    }),
    // 编辑
    editDocumentary (row) {
      let page = JSON.parse(JSON.stringify(this.pagination))
      this.$refs.addDocumentaryDialog.show(row, page)
    },
    // 删除
    delDocumentary (row) {
      this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'warning-icon'
      }).then(() => {
        deleteDocumentary({documentary_id: row.documentary_id}).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.getAEDocumentaryListByPage()
            // 更新当前AE金额
            this.GetCurrentAE({
              ae_id: this.CurrentAE.ae_id
            })
            // 更新成本
            this.GetCooperationDetail({
              customer_id: this.CustomerDetail.id,
              cooperation_id: this.CooperationDetail.cooperation_id
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {})
    },
    // 获取分页数据
    getAEDocumentaryListByPage () {
      this.GetCurrentAERecordList({
        cooperation_id: this.CooperationDetail.cooperation_id,
        ae_id: this.CurrentAE.ae_id,
        num: this.pagination.pageSize,
        page_num: this.pagination.currentPage
      })
    },
    // 翻页
    handleCurrentChange () {
      this.getAEDocumentaryListByPage()
    },
    // 每页条数改变
    handlePageSizeChange (pageSize) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = pageSize
      this.getAEDocumentaryListByPage()
    }
  }
}
</script>

<style lang="scss" scoped>
  .aedocumentarylist-container {
    /deep/ .el-table {
      border-right-width: 0;
    }
    .txt-skamount {
      color: #FF631E;
    }
    .txt-gwtitle {
      font-size: 12px;
      color: #888888;
    }
    .txt-gwinfo {
      font-size: 14px;
      color: #333333;
    }
  }
</style>
