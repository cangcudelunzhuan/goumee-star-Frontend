<template>
  <common-dialog ref="AddChatRecordDialog" :title="title" :width="800" @dialogCancel="handledialogCancel" @dialogSubmit="handledialogSubmit" :isfooter="true">
    <div class="addchat-container">
      <el-form ref="add_chat_record_form" :model="add_chat_record_form" :rules="add_chat_record_rules" label-width="180px">
        <div class="form-block">
          <el-form-item label="店铺名称:">
            <span>{{CustomerDetail.shop_name || '--'}}</span>
          </el-form-item>
          <el-form-item label="洽谈时间:" prop="conversation_date">
            <el-date-picker
              size="small"
              placeholder="请选择洽谈时间"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
              v-model="add_chat_record_form.conversation_date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="洽谈内容:" prop="conversation_content">
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="200"
              placeholder="请输入洽谈内容（不超过200字）"
              style="width: 100%;"
              v-model="add_chat_record_form.conversation_content">
            </el-input>
          </el-form-item>
          <el-form-item label="备 注:" prop="note">
            <el-input
              type="textarea"
              :rows="2"
              :maxlength="100"
              placeholder="请输入备注（不超过100字）"
              style="width: 100%;"
              v-model="add_chat_record_form.note">
            </el-input>
          </el-form-item>
          <el-form-item label="跟进人:">
            <span>{{UserInfo ? UserInfo.username : '--'}}</span>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </common-dialog>
</template>

<script>
import {mapActions} from 'vuex'
import {saveConversation} from '@/api/cooperative'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'AddChatRecord',
  mixins: [CooperativeStore],
  data () {
    return {
      title: '',
      add_chat_record_form: {
        customer_id: 0, // 客户ID
        conversation_id: 0, // 洽谈ID
        conversation_date: '2019/11/12', // 洽谈时间
        conversation_content: '', // 洽谈内容
        note: '' // 备注
      },
      // 验证规则
      add_chat_record_rules: {
        conversation_date: [{required: true, message: '洽谈时间不能为空', trigger: 'blur'}]
      },
      page: null
    }
  },
  methods: {
    ...mapActions({
      GetConversation: 'cooperative/GetConversation'
    }),
    // 显示
    show (chatrecord, page) {
      if (chatrecord) { // 修改
        this.title = '修改洽谈记录'
        this.add_chat_record_form = Object.assign(this.add_chat_record_form, chatrecord)
        if (page) this.page = page
      } else { // 新增
        this.title = '新增洽谈记录'
        this.add_chat_record_form.conversation_date = new Date().toLocaleDateString().replace('/', '-').replace('/', '-')
      }
      this.$refs.AddChatRecordDialog.dialogOpen()
    },
    // 弹窗取消操作
    handledialogCancel () {
      this.$refs.add_chat_record_form.resetFields()
    },
    // 弹窗确定操作
    handledialogSubmit () {
      this.$refs.add_chat_record_form.validate(pass => {
        if (pass) {
          let add_chat_record_form = JSON.parse(JSON.stringify(this.add_chat_record_form))
          if (add_chat_record_form.conversation_id === 0) {
            delete add_chat_record_form.conversation_id
          }
          add_chat_record_form = {...add_chat_record_form, ...{customer_id: this.CustomerDetail.id}}
          saveConversation(add_chat_record_form).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message)
              if (!(add_chat_record_form.hasOwnProperty('conversation_id'))) { // 新增
                // 添加洽谈记录
                this.GetConversation({
                  customer_id: this.CustomerDetail.id,
                  num: 10,
                  page_num: 1
                })
              } else { // 修改
                // 更新洽谈记录
                this.GetConversation({
                  customer_id: this.CustomerDetail.id,
                  num: this.page.pageSize,
                  page_num: this.page.currentPage
                })
              }
              this.$refs.AddChatRecordDialog.dialogClose()
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
  .addchat-container {
    .form-block {
      padding-right: 100px;
      /deep/ .el-input__inner {
        border-radius: 2px;
      }
      .el-form-item {
        margin-bottom: 16px;
      }
    }
  }
</style>
