<template>
  <div>
    <common-dialog ref="CooperationDetail" :title="'合作详情'" :subtitle="addByFormat(CooperationDetail)" :width="1080" @dialogCancel="handledialogCancel" :isfooter="false">
      <div class="cooperationdetail-container" v-if="CooperationDetail != null">
        <CustomerStageProgress :isvertical="false" :stage="CooperationDetail.cooperation_status" :issimple="false" @stepOperate="stepOperateHandle"/>
        <div class="detail">
          <CardItems :items="bindCardItems(CooperationdetailStatus)"/>
        </div>
        <slot />
      </div>
    </common-dialog>
    <!-- 新增合作 -->
    <AddCooperationDialog ref="addCooperationDialog" />
    <!-- 确认合作 -->
    <ConfirmCooperationDialog ref="confirmCooperationDialog" />
    <!-- 执行项目 -->
    <ExecuteProjectDialog ref="executeProjectDialog" />
    <!-- 执行结束 -->
    <ExecuteEndDialog ref="executeEndDialog" />
    <!-- 新增场次 -->
    <AddSceneDialog ref="addSceneDialog" />
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import CustomerStageProgress from './CustomerStageProgress'
import {addDateFormat} from '@/utils/format'
import AddCooperationDialog from '../cooperation/AddCooperation'
import ConfirmCooperationDialog from '../cooperation/ConfirmCooperation'
import CardItems from './CardItems'
import {cooperationTypeList} from '@/const/cooperative'
import ExecuteProjectDialog from '../execute_project/ExecuteProject'
import ExecuteEndDialog from '../execute_end/ExecuteEnd'
import AddSceneDialog from '../data_entry/AddScene'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'StageProgressCardItems',
  components: {
    CustomerStageProgress,
    AddCooperationDialog,
    CardItems,
    ConfirmCooperationDialog,
    ExecuteProjectDialog,
    ExecuteEndDialog,
    AddSceneDialog
  },
  mixins: [CooperativeStore],
  data () {
    return {
      title: '',
      page: null
    }
  },
  methods: {
    ...mapActions({
      GetCooperation: 'cooperative/GetCooperation',
      GetAchievementList: 'cooperative/GetAchievementList',
      GetCoostList: 'cooperative/GetCoostList',
      GetCooperationAE: 'cooperative/GetCooperationAE'
    }),
    // 显示
    show (page) {
      if (page) this.page = page
      this.$refs.CooperationDetail.dialogOpen()
    },
    // 转换合作类型
    convertCooperationType (types) {
      let typeStr = ''
      if (types.length > 0) {
        let _temp = cooperationTypeList.filter(c => types.indexOf(c.value) > -1)
        if (_temp) {
          typeStr = _temp.map(c => (c.label)).join(' / ')
        }
      }
      return typeStr
    },
    // 绑定卡片项数据
    bindCardItems (type) {
      let carditems = []
      switch (type) {
        case 1: // 意向客户阶段
          carditems.push({
            src: require('@/assets/img/cooperative/xt_khjl.png'),
            title: this.CooperationDetail.manager || '--',
            subtitle: '客户经理'
          })
          carditems.push({
            src: require('@/assets/img/cooperative/xt_hzlx.png'),
            title: this.convertCooperationType(this.CooperationDetail.cooperation_type.split(',').map(t => (parseInt(t)))),
            subtitle: '合作类型'
          })
          carditems.push({
            src: require('@/assets/img/cooperative/xt_ys.png'),
            title: this.CooperationDetail.budget ? `${this.CooperationDetail.budget}` : '--',
            subtitle: '预算'
          })
          carditems.push({
            src: require('@/assets/img/cooperative/xt_rol.png'),
            title: this.CooperationDetail.roi ? `${this.CooperationDetail.roi}%` : '--',
            subtitle: 'roi要求'
          })
          break
        case 2: // 确定合作阶段
        case 3: // 执行项目阶段
        case 4: // 执行结束阶段
        case 5: // 数据入库阶段
          carditems.push({
            src: require('@/assets/img/cooperative/xt_xsje.png'),
            title: this.CooperationDetail.sale_amount ? `${this.CooperationDetail.sale_amount}` : '--',
            subtitle: '销售金额（元）'
          })
          carditems.push({
            src: require('@/assets/img/cooperative/xt_yskje.png'),
            title: this.CooperationDetail.gather_amount ? `${this.CooperationDetail.gather_amount}` : '--',
            subtitle: '已收款金额（元）'
          })
          carditems.push({
            src: require('@/assets/img/cooperative/xt_dskje.png'),
            title: this.CooperationDetail.wait_gather_amount ? `${this.CooperationDetail.wait_gather_amount}` : '--',
            subtitle: '待收款金额（元）'
          })
          carditems.push({
            src: require('@/assets/img/cooperative/xt_cbapje.png'),
            title: this.CooperationDetail.cost_amount ? `${this.CooperationDetail.cost_amount}` : '--',
            subtitle: '成本安排金额（元）'
          })
          break
        default:
          break
      }
      return carditems
    },
    // 弹窗取消操作
    handledialogCancel () {
      this.GetCooperation({
        customer_id: this.CustomerDetail.id,
        num: this.page !== null ? this.page.pageSize : 10,
        page_num: this.page !== null ? this.page.currentPage : 1
      })
    },
    // 格式化添加人信息
    addByFormat (customer) {
      if (customer != null) {
        return `创建人：${customer.add_by} ${addDateFormat(customer.gmt_create)}`
      } else {
        return ''
      }
    },
    // 操作步骤
    stepOperateHandle ({stage, type}) {
      switch (type) {
        case 'edit': // 编辑
          switch (stage) {
            case 1: // 意向客户
              this.$refs.addCooperationDialog.show(this.CooperationDetail)
              break
            case 2: // 确认合作
              this.$refs.confirmCooperationDialog.show('edit')
              break
            case 3: // 执行项目
              this.$refs.executeProjectDialog.show('edit')
              break
            case 4: // 执行结束
              this.$refs.executeEndDialog.show('edit')
              break
            case 5: // 数据入库
              this.$refs.addSceneDialog.show('edit')
              break
            default:
              break
          }
          break
        case 'add': // 添加
          switch (stage) {
            case 2: // 添加确认合作
              this.$refs.confirmCooperationDialog.show()
              break
            case 3: // 添加执行项目
              this.$refs.executeProjectDialog.show()
              break
            case 4: // 执行结束
              this.$refs.executeEndDialog.show()
              break
            case 5: // 数据入库
              this.$refs.addSceneDialog.show()
              break
            default:
              break
          }
          break
        case 'detail': // 详情
          this.SetCooperationdetailStatus(stage)
          this.handleCurrentActions(stage)
          break
        default:
          break
      }
    },
    // 触发当前Actions操作
    handleCurrentActions (status) {
      switch (status) {
        case 1: // 意向客户阶段
          this.GetCooperationDetail({ // 获取合作详情
            cooperation_id: this.CooperationDetail.cooperation_id,
            customer_id: this.CustomerDetail.id
          })
          break
        case 2: // 确认合作阶段
          // 获取业绩记录
          this.GetAchievementList({
            cooperation_id: this.CooperationDetail.cooperation_id,
            num: 10,
            page_num: 1
          })
          // 获取安排记录
          this.GetCoostList({
            cooperation_id: this.CooperationDetail.cooperation_id,
            num: 10,
            page_num: 1
          })
          break
        case 3: // 执行项目阶段
          // 获取执行AE人员
          this.GetCooperationAE({
            cooperation_id: this.CooperationDetail.cooperation_id
          })
          break
        case 4: // 执行结束阶段
          this.GetCooperationDetail({ // 获取合作详情
            cooperation_id: this.CooperationDetail.cooperation_id,
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
  .cooperationdetail-container {
    .detail {
      width: 100%;
      background-color: #F6F6F6;
      padding-top: 15px;
      overflow: hidden; // 创建BFC
    }
  }
</style>
