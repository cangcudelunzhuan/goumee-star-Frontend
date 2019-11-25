<template>
  <common-dialog ref="ExecuteEndDialog" :title="'执行结束'" :width="800" @dialogCancel="handledialogCancel" @dialogSubmit="handledialogSubmit" :isfooter="true">
    <div class="executeend-container">
      <CustomerStageProgress :isvertical="false" :stage="4" :issimple="true"/>
      <hr class="line" />
      <div class="end-form">
        <el-form ref="executeend_form" :model="executeend_form" :rules="executeend_form_rules" label-width="120px">
          <el-form-item label="项目执行结果:" prop="end_type">
            <el-radio v-model="executeend_form.end_type" :label="1">项目正常结束</el-radio>
            <el-radio v-model="executeend_form.end_type" :label="2">项目意外终止</el-radio>
          </el-form-item>
          <el-form-item prop="unexpected_terminate_type" label-width="15px" v-if="executeend_form.end_type == 2">
            <div style="background:rgba(248,248,248,1); border-radius:2px; padding: 18px;">
              <el-radio-group v-model="executeend_form.unexpected_terminate_type" @change="changeHandle">
                <el-radio :label="'1'">补播</el-radio>
                <el-radio :label="'2'">退款</el-radio>
                <el-radio :label="'3'">其他</el-radio>
              </el-radio-group>
              <el-form-item v-if="executeend_form.unexpected_terminate_type == '2'" label="退款金额:" prop="unexpected_terminate_detail" style="margin-left: -46px;">
                <el-input size="small" placeholder="请输入" type="number" v-model.number="executeend_form.unexpected_terminate_detail" style="width: 200px;">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item v-if="executeend_form.unexpected_terminate_type == '3'" label="其他:" prop="unexpected_terminate_detail" style="margin-left: -75px;">
                <el-input size="small" placeholder="请输入" v-model.number="executeend_form.unexpected_terminate_detail" style="width: 100%;">
                </el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </common-dialog>
</template>

<script>
import CustomerStageProgress from '../components/CustomerStageProgress'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'
import {StopCooperation} from '@/api/cooperative'

export default {
  name: 'ExecuteEnd',
  components: {
    CustomerStageProgress
  },
  mixins: [CooperativeStore],
  data() {
    return {
      isedite: false,
      executeend_form: {
        end_type: '', // 项目执行结果 1-正常结束，2-意外终止
        unexpected_terminate_type: '', // 意外终止后续类型，1-补播，2-退款，3-其他
        unexpected_terminate_detail: ''
      },
      executeend_form_rules: {
        end_type: [ // 结束类型
          { required: true, message: '请选择项目执行结果', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 显示
    show (type) {
      if (type) {
        this.isedite = true
        this.executeend_form = {
          end_type: this.CooperationDetail.end_type,
          unexpected_terminate_type: this.CooperationDetail.end_detail ? this.CooperationDetail.end_detail.unexpected_terminate_type : '',
          unexpected_terminate_detail: this.CooperationDetail.end_detail ? this.CooperationDetail.end_detail.unexpected_terminate_detail : ''
        }
      }
      this.$refs.ExecuteEndDialog.dialogOpen()
    },
    // 取消窗口
    handledialogCancel () {
      this.$refs.executeend_form.resetFields()
      this.$refs.ExecuteEndDialog.dialogClose()
    },
    // 窗口提交按钮
    handledialogSubmit () {
      this.$refs.executeend_form.validate(pass => {
        if (pass) {
          StopCooperation({
            cooperation_id: this.CooperationDetail.cooperation_id,
            ...JSON.parse(JSON.stringify(this.executeend_form)),
            is_update: this.isedite ? 1 : 0
          }).then((res) => {
            if (res.data.success) {
              this.$message.success(res.data.message)
              // 更新合作详情
              this.GetCooperationDetail({
                customer_id: this.CustomerDetail.id,
                cooperation_id: this.CooperationDetail.cooperation_id
              })
              // 更新合作详情状态
              this.SetCooperationdetailStatus(4)
              this.$refs.ExecuteEndDialog.dialogClose()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    // 选择
    changeHandle (val) {
      this.executeend_form.executeend_form = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .executeend-container {
    .line {
      border: 1px solid #F5F5F5;
    }
    .end-form {
      padding: 15px 50px 0px 50px;
    }
    .form-block {
      padding-right: 100px;
      /deep/ .el-input__inner {
        border-radius: 2px;
      }
      .el-form-item {
        margin-bottom: 16px;
      }
    }
    /deep/ .el-form-item__error {
      text-align: left;
    }
  }
</style>
