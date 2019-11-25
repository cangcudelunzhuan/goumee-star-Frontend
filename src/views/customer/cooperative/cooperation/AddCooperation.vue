<template>
  <common-dialog ref="AddCooperationDialog" :isDestroyOnClose="true" :title="title" :width="800" @dialogCancel="handledialogCancel" @dialogSubmit="handledialogSubmit" :isfooter="true">
    <div class="addcooperation-container">
      <CustomerStageProgress :isvertical="false" :stage="1" :issimple="true"/>
      <hr class="line" />
      <el-form ref="add_cooperation_form" :model="add_cooperation_form" :rules="add_cooperation_form_rules" label-width="180px" style="margin-top: 18px;">
        <div class="form-block">
          <el-form-item label="客户经理:" prop="manager_id">
            <el-select v-model="add_cooperation_form.manager_id" placeholder="请选择客户经理" style="width: 100%; margin-bottom: 5px;">
              <el-option
                v-for="item in managers"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作类型:" prop="cooperation_type">
            <check-all
            ref="cooperationTypeCheckall"
            :dataitems="cooperationTypeList" :value="'value'" :label="'label'"
            :selectitems="add_cooperation_form.cooperation_type"
            @checkAllClick="cooperationTypeCheckAll"
            @checkClick="cooperationTypeCheck"></check-all>
          </el-form-item>
          <el-form-item label="预 算:" prop="budget">
            <el-input placeholder="请输入预算" type="number" v-model.number="add_cooperation_form.budget" style="width: 100%;">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="roi要求:" prop="roi">
            <el-input placeholder="请输入roi要求" type="number" v-model.number="add_cooperation_form.roi" style="width: 100%;">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="其他要求:" prop="note">
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="200"
              placeholder="请输入洽谈内容（不超过200字）"
              style="width: 100%;"
              v-model="add_cooperation_form.note">
            </el-input>
          </el-form-item>
          <el-form-item label="方 案:" prop="plan">
            <div>
              <el-upload class="kol-upload" action="" :http-request="uploadPlans" :show-file-list="false" :accept="descriptionAccepts.join(',')">
                <el-button class="mr10" slot="trigger" size="small" type="primary" v-loading="loading">上传文件</el-button>
                <span slot="tip" class="el-upload__tip">
                  支持扩展名：.docx .pdf .jpg .xlsx（最多上传2个文件）
                </span>
              </el-upload>
            </div>
            <div class="fujian-list clearfix" v-for="item in add_cooperation_form.plan" :key="item">
              <i class="iconfont iconfujian mr5"></i>
              <span class="brand-color mr5">{{item.split('/')[item.split('/').length -1] || '--'}}</span>
              <i class="el-icon-error" @click="removePlan()"></i>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </common-dialog>
</template>

<script>
import {mapActions} from 'vuex'
import {cooperationTypeList} from '@/const/cooperative'
import CustomerStageProgress from '../components/CustomerStageProgress'
import {queryUserNamesByRoles} from '@/api/customer'
import {uploadFile, saveCooperation} from '@/api/cooperative'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'AddCooperation',
  components: {
    CustomerStageProgress
  },
  mixins: [CooperativeStore],
  data () {
    return {
      title: '',
      cooperationTypeList,
      add_cooperation_form: {
        customer_id: 0, // 客户ID
        cooperation_id: 0, // 合作ID
        manager_id: '', // 客户经理
        cooperation_type: [], // 合作类型，1-直播，2-视频，3-图文
        budget: '', // 预算
        roi: '', // roi要求
        note: '', // 其他要求
        plan: [] // 方案
      },
      // 验证规则
      add_cooperation_form_rules: {
        manager_id: [{required: true, message: '请选择客户经理', trigger: 'change'}],
        cooperation_type: [{type: 'array', required: true, message: '请至少选择一个合作类型', trigger: 'blur'}]
      },
      managers: [],
      descriptionAccepts: ['docx', 'pdf', 'jpg', 'xlsx'],
      loading: false
    }
  },
  methods: {
    ...mapActions({
      GetCooperation: 'cooperative/GetCooperation'
    }),
    // 合作类型全选/反选
    cooperationTypeCheckAll (val) {
      if (val) {
        this.add_cooperation_form.cooperation_type = JSON.parse(JSON.stringify(this.cooperationTypeList)).map(c => c.value)
      } else {
        this.add_cooperation_form.cooperation_type = []
      }
    },
    // 选择合作类型
    cooperationTypeCheck (val) {
      this.add_cooperation_form.cooperation_type = val
    },
    // 获取客户经理
    getManagers () {
      // 客户经理，大客户经理
      queryUserNamesByRoles({roles: '103,104'}).then(res => {
        if (res.data.data) {
          this.managers = res.data.data.map(c => ({id: c.id, name: c.username}))
        }
      })
    },
    // 显示
    show (cooperation) {
      if (cooperation) { // 修改
        this.title = '修改合作'
        this.add_cooperation_form = Object.assign(this.add_cooperation_form, cooperation)
        this.add_cooperation_form.cooperation_type = cooperation.cooperation_type.split(',').map(c => (parseInt(c)))
      } else { // 新增
        this.title = '新增合作'
        let _this = this
        setTimeout(() => {
          _this.$refs.cooperationTypeCheckall.init()
        }, 0)
      }
      this.getManagers()
      this.$refs.AddCooperationDialog.dialogOpen()
    },
    // 弹窗取消操作
    handledialogCancel () {
      this.add_cooperation_form.cooperation_type = []
      this.$refs.add_cooperation_form.resetFields()
    },
    // 弹窗确定操作
    handledialogSubmit () {
      this.$refs.add_cooperation_form.validate(pass => {
        if (pass) {
          let add_cooperation_form = JSON.parse(JSON.stringify(this.add_cooperation_form))
          if (add_cooperation_form.cooperation_id === 0) {
            delete add_cooperation_form.cooperation_id
          }
          add_cooperation_form = {...add_cooperation_form, ...{customer_id: this.CustomerDetail.id}}
          saveCooperation(add_cooperation_form).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message)
              if (!add_cooperation_form.hasOwnProperty('cooperation_id')) { // 新增
                // 添加合作
                this.GetCooperation({
                  customer_id: this.CustomerDetail.id,
                  num: 10,
                  page_num: 1
                })
              } else { // 修改
                // 更新客户信息
                this.GetCustomerDetail(this.CustomerDetail.id)
                // 更新合作
                this.GetCooperationDetail({
                  customer_id: this.CustomerDetail.id,
                  cooperation_id: add_cooperation_form.cooperation_id
                })
              }
              this.$refs.AddCooperationDialog.dialogClose()
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.error(err)
          })
        }
      })
    },
    /**
     * 上传文件成功时回调
     */
    uploadPlans(params) {
      let vm = this
      let file = params.file
      let fileType = file.name.split('.')[file.name.split('.').length - 1]
      var found = this.descriptionAccepts.find(type => {
        return type.toLowerCase() === fileType.toLowerCase()
      })
      if (!found) {
        this.$message.error('上传格式不正确！')
        return
      }
      if (vm.add_cooperation_form.plan.length === 2) {
        this.$message.error('最多上传2个文件！')
        return
      }
      this.loading = true
      let form = new FormData()
      form.append('file', file)
      form.append('type', 'plan')
      uploadFile(form).then(data => {
        vm.loading = false
        if (data.data) {
          vm.add_cooperation_form.plan.push(data.data.data.source)
        }
      }).catch(() => {
        vm.loading = false
      })
    },
    /**
     * 删除方案
     * @param index
     */
    removePlan(index) {
      this.add_cooperation_form.plan.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .addcooperation-container {
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
    //附件
    .fujian-list{
      display: inline-block;
      float: left;
      margin-right: 20px;
      line-height: 35px;
      i{
        color:#999;
      }
    }
  }
</style>
