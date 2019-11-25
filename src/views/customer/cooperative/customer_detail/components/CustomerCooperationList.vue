<template>
  <div class="cutomer-detail-container" style="margin-top: 12px; padding-top: 5px;" v-if="CooperationList != null">
    <div class="detail-content">
      <sub-panel :title="'合作列表'" :iserect="true">
        <div class="hz-container">
          <el-button v-show="UserRoles.includes(RIGHT_CODE.add_cooperation)" size="small" type="primary" @click="addCooperation">新增合作</el-button>
          <el-button v-show="UserRoles.includes(RIGHT_CODE.del_cooperation)" size="small" @click="delCooperation" style="margin-left: 10px;">删 除</el-button>
        </div>
        <div class="hz-table">
          <el-table
            :data="CooperationList != null ? CooperationList.data : []"
            :stripe="true"
            style="width: 100%; margin-bottom: 10px;"
            :header-cell-style="{background:'#F5F6F9', height:'42px', color: '#666666', fontWeight: 'bold'}"
            :row-style="{cursor: 'pointer', height: '75px'}"
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange">
            <template slot="empty">
              <table-no-data :isvertical="false" :title="'还没有合作记录哦'"></table-no-data>
            </template>
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column
              :formatter="(row, column, cellValue, index) => (pagination.currentPage - 1) * pagination.pageSize + (index + 1)"
              label="序号"
              width="60"
              fixed="left"
              align="left">
            </el-table-column>
            <el-table-column
              prop="follower"
              label="客户阶段"
              header-align="center"
              align="center"
              >
              <template slot-scope="{row}">
                <el-popover
                  placement="bottom-start"
                  title="当前客户阶段"
                  width="100"
                  trigger="hover">
                  <CustomerStageProgress :isvertical="true" :stage="row.cooperation_status"/>
                  <span slot="reference" class="txt-stag">{{customerStageList[row.cooperation_status - 1].value}}</span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="sale_amount_str"
              label="销售金额"
              header-align="center"
              align="center"
              >
              <template slot-scope="{row}">
                <span>{{row.sale_amount_str ? `￥${row.sale_amount_str}` : '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="gather_amount_str"
              label="已收款金额"
              header-align="center"
              align="center"
              >
              <template slot-scope="{row}">
                <span>{{row.gather_amount_str ? `￥${row.gather_amount_str}` : '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="cost_amount_str"
              label="成本安排金额"
              header-align="center"
              align="center"
              >
              <template slot-scope="{row}">
                <span>{{row.cost_amount_str ? `￥${row.cost_amount_str}` : '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="wait_gather_amount_str"
              label="待收款金额"
              header-align="center"
              align="center"
              >
              <template slot-scope="{row}">
                <span class="txt-dskamount">{{row.wait_gather_amount_str ? `￥${row.wait_gather_amount_str}` : '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="manager"
              label="客户经理"
              header-align="center"
              align="center"
              >
            </el-table-column>
            <el-table-column
              label="执行AE"
              header-align="center"
              align="center">
              <template slot-scope="{row}">
                <more-items :items="row.ae.length > 0 ? row.ae.map(a => a.ae_name) : []"/>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="contract-pagination"
            background
            :current-page.sync="pagination.currentPage"
            :page-sizes.sync="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="CooperationList != null ? CooperationList.total : 0"
            @current-change="handleCurrentChange"
            @size-change="handlePageSizeChange">
          </el-pagination>
        </div>
      </sub-panel>
    </div>
    <!-- 新增合作 -->
    <AddCooperationDialog ref="addCooperation" />
    <!-- 合作详情 -->
    <CooperationDetailMainDialog ref="cooperationDetailMainDialog" />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {RIGHT_CODE} from '@/const/roleCode'
import CustomerStageProgress from '../../components/CustomerStageProgress'
import {customerStageList} from '@/const/cooperative'
import {deleteCooperation} from '@/api/cooperative'
import AddCooperationDialog from '../../cooperation/AddCooperation'
import CooperationDetailMainDialog from '../../cooperation/CooperationDetailMain'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'CustomerCooperationList',
  components: {
    CustomerStageProgress,
    AddCooperationDialog,
    CooperationDetailMainDialog
  },
  mixins: [CooperativeStore],
  data () {
    return {
      RIGHT_CODE,
      customerStageList,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30]
      },
      multipleSelectionIds: []
    }
  },
  computed: {
    ...mapGetters({
      CooperationList: 'cooperative/CooperationList'
    })
  },
  methods: {
    ...mapActions({
      GetCooperation: 'cooperative/GetCooperation',
      GetAchievementList: 'cooperative/GetAchievementList',
      GetCoostList: 'cooperative/GetCoostList',
      GetCooperationAE: 'cooperative/GetCooperationAE'
    }),
    // 新增合作
    addCooperation () {
      this.$refs.addCooperation.show()
    },
    // 删除合作
    delCooperation () {
      const multipleSelectionIds = JSON.parse(JSON.stringify(this.multipleSelectionIds))
      if (multipleSelectionIds && multipleSelectionIds.length > 0) {
        this.$confirm(`此操作将删除 ${multipleSelectionIds.length} 个合作数据, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          iconClass: 'warning-icon'
        }).then(() => {
          deleteCooperation({
            cooperation_ids: multipleSelectionIds
          }).then(res => {
            this.$message({
              type: res.data.success ? 'success' : 'warning',
              message: res.data.message,
              duration: 2000,
              showClose: true
            })
            if (res.data.success) {
              this.getCooperationByPage()
            }
          }).catch(error => {
            this.$message({
              type: 'error',
              message: '删除失败，稍后重试',
              duration: 2000,
              showClose: true
            })
            console.log(error.message)
          })
        }).catch(() => {})
      } else {
        this.$message({
          type: 'warning',
          message: '至少选择一条要删除的数据',
          duration: 2000,
          showClose: true
        })
      }
    },
    // 获取分页数据
    getCooperationByPage () {
      this.GetCooperation({
        customer_id: this.CustomerDetail.id || 0,
        num: this.pagination.pageSize,
        page_num: this.pagination.currentPage
      })
    },
    // 翻页
    handleCurrentChange () {
      this.getCooperationByPage()
    },
    // 每页条数改变
    handlePageSizeChange (pageSize) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = pageSize
      this.getCooperationByPage()
    },
    // 多选
    handleSelectionChange (data) {
      this.multipleSelectionIds = data.map(c => c.cooperation_id)
    },
    // 点击合作行
    handleRowClick (row) {
      this.GetCooperationDetail({
        cooperation_id: row.cooperation_id,
        customer_id: this.CustomerDetail.id
      })
      this.SetCooperationdetailStatus(row.cooperation_status)
      // 触发Actions
      this.handleCurrentActions(row.cooperation_id, row.cooperation_status)
      this.$refs.cooperationDetailMainDialog.show(this.pagination)
    },
    // 触发当前Actions操作
    handleCurrentActions (cooperation_id, status) {
      switch (status) {
        case 1: // 意向客户阶段
          this.GetCooperationDetail({ // 获取合作详情
            cooperation_id,
            customer_id: this.CustomerDetail.id
          })
          break
        case 2: // 确认合作阶段
          // 获取业绩记录
          this.GetAchievementList({
            cooperation_id,
            num: 10,
            page_num: 1
          })
          // 获取安排记录
          this.GetCoostList({
            cooperation_id,
            num: 10,
            page_num: 1
          })
          break
        case 3: // 执行项目阶段
          // 获取执行AE人员
          this.GetCooperationAE({cooperation_id})
          break
        case 4: // 执行结束阶段
          this.GetCooperationDetail({ // 获取合作详情
            cooperation_id,
            customer_id: this.CustomerDetail.id
          })
          break
        case 5: // 数据录入阶段

          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .detail-content {
    padding: 0 26px 30px;
    .hz-container {
      margin-top: 10px;
    }
    .hz-table {
      margin-top: 10px;
      .txt-stag {
        color: $color-primary;
        cursor: pointer;
      }
      .txt-dskamount {
        color: $color-primary;
      }
    }
  }
</style>
<style>
  .delete-kol-alert.el-message-box .el-message-box__content{
    height: initial;
  }
  .delete-kol-alert.el-message-box .el-message-box__content .el-message-box__message {
    top: 0;
  }
</style>
