<template>
  <common-dialog ref="ConfirmCooperationDialog" :title="'确定合作'" :width="800" @dialogCancel="handledialogCancel" @dialogSubmit="handledialogSubmit" :isfooter="true">
    <div class="confirmcooperation-container">
      <CustomerStageProgress :isvertical="false" :stage="2" :issimple="true"/>
      <hr class="line" />
      <el-form ref="confirmcooperation_form" :model="confirmcooperation_form" :rules="confirmcooperation_form_rules" label-width="180px" style="margin-top: 18px;">
        <div class="form-block">
          <el-form-item label="销售金额:" prop="sale_amount">
            <el-input placeholder="请输入销售金额" type="number" v-model.number="confirmcooperation_form.sale_amount" style="width: 100%;">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="是否收款:" prop="is_gather">
            <el-switch
              v-model="confirmcooperation_form.is_gather"
              active-text="是"
              inactive-text="否"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="回款时间:" prop="gather_date" v-show="confirmcooperation_form.is_gather === 0">
            <el-date-picker
              size="small"
              placeholder="请选择回款时间"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
              v-model="confirmcooperation_form.gather_date"
              @change="(val) => dateChangeHandle(val, confirmcooperation_form)">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </common-dialog>
</template>

<script>
import CustomerStageProgress from '../components/CustomerStageProgress'
import {mapActions} from 'vuex'
import {confirmCooperation} from '@/api/cooperative'
import {showProDateFormat} from '@/utils/format'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'ConfirmCooperation',
  components: {
    CustomerStageProgress
  },
  mixins: [CooperativeStore],
  data () {
    return {
      confirmcooperation_form: {
        cooperation_id: 0, // 合作ID
        sale_amount: '', // 销售金额
        is_gather: 0, // 是否收款
        gather_date: '', // 收款日期
        is_update: 0 // 是否更新
      },
      // 验证规则
      confirmcooperation_form_rules: {
        sale_amount: [{required: true, message: '请输入销售金额', trigger: 'blur'}]
      }
    }
  },
  methods: {
    ...mapActions({
      GetAchievementList: 'cooperative/GetAchievementList',
      GetCoostList: 'cooperative/GetCoostList'
    }),
    dateChangeHandle (val, confirmcooperation_form) {
      if (val === null) {
        confirmcooperation_form.gather_date = ''
      }
    },
    // 显示
    show (type) {
      if (type) { // 更新
        this.confirmcooperation_form.is_update = 1
        this.confirmcooperation_form.sale_amount = this.CooperationDetail.sale_amount
        this.confirmcooperation_form.is_gather = this.CooperationDetail.is_gather
        this.confirmcooperation_form.gather_date = this.CooperationDetail.gather_date !== '' ? showProDateFormat(this.CooperationDetail.gather_date) : ''
      } else {
        this.confirmcooperation_form.is_update = 0
        this.confirmcooperation_form.gather_date = new Date(new Date().setDate(new Date().getDate() + 45)).toLocaleDateString().replace('/', '-').replace('/', '-')
      }
      this.confirmcooperation_form.cooperation_id = this.CooperationDetail.cooperation_id
      this.$refs.ConfirmCooperationDialog.dialogOpen()
    },
    // 取消弹窗
    handledialogCancel () {
      this.$refs.confirmcooperation_form.resetFields()
    },
    // 弹窗提交操作
    handledialogSubmit () {
      this.$refs.confirmcooperation_form.validate(pass => {
        if (pass) {
          let confirmcooperation_form = JSON.parse(JSON.stringify(this.confirmcooperation_form))
          confirmCooperation(confirmcooperation_form).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message)
              // 更新合作详情
              this.GetCooperationDetail({
                customer_id: this.CustomerDetail.id,
                cooperation_id: this.CooperationDetail.cooperation_id
              })
              // 更新合作详情状态
              this.SetCooperationdetailStatus(2)
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
              this.$refs.ConfirmCooperationDialog.dialogClose()
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.error(err)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .confirmcooperation-container {
    .form-block {
      padding-right: 100px;
      /deep/ .el-input__inner {
        border-radius: 2px;
      }
      .el-form-item {
        margin-bottom: 16px;
      }
    }
    .line {
      border: 1px solid #F5F5F5;
    }
    /deep/ .el-switch__label {
      position: absolute;
      display: none;
      color: #fff;
      span {
        font-size: 12px;
      }
    }
    /*打开时文字位置设置*/
    /deep/ .el-switch__label--right {
      z-index: 1;
      right: 21px;
      bottom: 1px;
    }
    /*关闭时文字位置设置*/
    /deep/ .el-switch__label--left {
      z-index: 1;
      left: 21px;
      bottom: 1px;
    }
    /*显示文字*/
    /deep/ .el-switch__label.is-active {
      display: block;
    }
    /deep/.el-switch .el-switch__core,
    .el-switch .el-switch__label {
      width: 60px !important;
    }
  }
</style>
