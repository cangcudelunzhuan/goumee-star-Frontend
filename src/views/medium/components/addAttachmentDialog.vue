<!--
 * @Description: 新增附件弹窗
 * @Author: 白青
 * @Date: 2019-09-04 14:34:12
 * @LastEditTime: 2019-09-12 17:08:37
 * @LastEditors: 白青
 -->
<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  #addAttachmentDialog {
    .dialog-content {
      .content-block-header {
        border-bottom: #F5F5F5 solid 1px;
        padding: 0 40px;
        height: 37px;
        line-height: 37px;
        span {
          position: relative;
          color: #666;
          font-weight: bold;
          padding-left: 12px;
          &::before {
            content: '';
            display: block;
            width: 3px;
            height: 10px;
            background: $color-primary;
            position: absolute;
            left: 0;
            top: 3px;
          }
        }
      }
      .form-block {
        padding-right: 137px;
        margin-top: 15px;
        /deep/ .el-input__inner {
          border-radius: 2px;
        }
        .el-form-item {
          margin-bottom: 10px;
        }
        .upload-attachment {
          display: inline-block;
          .upload-btn {
            width: 100px;
          }
        }
        .upload-tips {
          margin-left: 11px;
          font-size: 12px;
          color: #999999;
        }
        .uploaded-list {
          span {
            position: relative;
            display: inline-block;
            img {
              vertical-align: middle;
              // margin-right: 5px;
            }
            // a {
            //   text-decoration: none;
            // }
            em {
              font-style: normal;
              vertical-align: middle;
              color: #5C82FF;
              margin: 0 50px 0 5px;
            }
            i {
              vertical-align: middle;
              font-size: 20px;
              color: #aaa;
              cursor: pointer;
              position: absolute;
              top: 12px;
              right: 25px;
            }
          }
        }
      }
      .approval {
        .approval-username {
          display: inline-block;
          width: 64px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          border-radius: 2px;
          background: #F2F2F2;
        }
        .el-icon-arrow-right {
          color: #DADADA;
          font-size: 18px;
          font-weight: bold;
          margin: 0 8px;
        }
        .approval-tips {
          font-size: 12px;
          color: #F8931C;
          margin-left: 8px;
          .el-icon-warning {
            color: #F8931C;
            margin-right: 2px;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .add-attachment-dialog {
    .el-dialog__header {
      background-color: #F8F8F8;
      padding: 0;
      height: 50px;
      line-height: 50px;
      border-bottom: #EFEFEF solid 1px;
      .title {
        color: #666;
        font-size: 16px;
      }
      .el-dialog__headerbtn {
        top: 14px;
        font-size: 22px;
        right: 15px;
        .el-dialog__close {
          color: #999!important;
        }
      }
    }
    .el-dialog__body {
      padding: 0;
      .el-form-item__error {
        padding: 0;
      }
    }
    .el-dialog__footer {
      padding-top: 25px;
      padding-bottom: 40px;
      .dialog-footer {
        .el-button {
          height: 34px;
          padding: 0;
          line-height: 33px;
          width: 80px;
        }
      }
    }
  }
</style>

<template>
  <div id="addAttachmentDialog">
    <el-dialog
      :visible="dialogVisible"
      width="840px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      custom-class="add-attachment-dialog"
      @close="handleDialogClose"
    >
      <div class="title" slot="title">新增供应商合同附件</div>
      <el-form class="dialog-content" ref="contract_attachment_form" :model="contract_attachment_form" :rules="contract_attachment_rules" label-width="219px">
        <div class="content-block-header">
          <span>附件基础信息</span>
        </div>
        <div class="form-block">
          <el-form-item label="关联合同编号：" prop="contract_no">
            <!-- <el-input size="small" placeholder="请输入合同编号"></el-input> -->
            <!-- <el-autocomplete
              class="inline-input"
              v-model="contract_attachment_form.contract_no"
              :fetch-suggestions="getCustmerByContractNo"
              placeholder="请输入合同编号"
              :trigger-on-focus="false"
              size="small"
              style="width:100%"
              @select="handleSelect"
            ></el-autocomplete> -->
            <el-select
              v-model="contract_attachment_form.contract_no"
              filterable
              remote
              reserve-keyword
              clearable
              placeholder="请输入或者搜索合同编号"
              :remote-method="getCustmerByContractNo"
              style="width:100%;"
              size="small"
              @change="handleSelect">
              <el-option
                v-for="item in custmerOption"
                :key="item.contract_uid"
                :label="item.contract_uid"
                :value="item.contract_uid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商名称：" prop="partner_name">
            <el-input size="small" v-model="contract_attachment_form.partner_name" placeholder="请先输入合同编号" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批金额：" prop="approval_amount">
            <el-input size="small" v-model="contract_attachment_form.approval_amount" placeholder="请输入审批金额"></el-input>
          </el-form-item>
          <el-form-item label="申请内容：" prop="comment">
            <el-input size="small" v-model="contract_attachment_form.comment" placeholder="请输入申请内容"></el-input>
          </el-form-item>
          <el-form-item label="附件单：" prop="attachment_url">
            <el-upload
              action="/"
              class="upload-attachment"
              :multiple="false"
              :show-file-list="false"
              :http-request="uploadAttachmentFile"
            >
              <el-button class="upload-btn" type="primary" size="small">上传文件</el-button>
            </el-upload>
            <span class="upload-tips">支持扩展名：.docx .pdf .jpg .xlsx...</span>
            <div class="uploaded-list">
              <span v-for="(item, index) in uploadedAttachmentList" :key="index">
                <img src="@/assets/img/file_icon.png">
                <!-- <a :href="item.path" target="_blank"></a> -->
                <em>{{item.file}}</em>
                <i class="el-icon-circle-close-outline" @click="handleAttachmentClick(index)"></i>
              </span>
            </div>
          </el-form-item>
        </div>
        <div class="content-block-header">
          <span>跟进人</span>
        </div>
        <div class="form-block">
          <el-form-item label="客户经理：" prop="manager_id">
            <!-- <el-input size="small" placeholder="请选择客户经理"></el-input> -->
            <el-select size="small" v-model="contract_attachment_form.manager_id" placeholder="请选择客户经理" style="width:100%" @change="handleCustmerManagerChange">
              <el-option
                v-for="item in accountManager"
                :key="item.id"
                :label="item.username"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门：" prop="department">
            <el-input size="small" v-model="departmentName" placeholder="请先选择客户经理" disabled></el-input>
          </el-form-item>
          <el-form-item class="approval" label="审批人：">
            <span class="approval-username">文竹</span>
            <i class="el-icon-arrow-right"></i>
            <span v-show="contract_attachment_form.approval_amount >= 500000">
              <span class="approval-username">红掌</span>
              <i class="el-icon-arrow-right"></i>
            </span>
            <span class="approval-username">益智</span>
            <span v-show="contract_attachment_form.approval_amount >= 500000" class="approval-tips">
              <i class="el-icon-warning"></i>合同金额大于50万元，需红掌审批
            </span>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleAttachmentSubmitClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  uploadContractAttachment,
  // getDepartment,
  // // queryUserNames,
  // getApprover,
  // saveContract,
  // getContractUid,
  // getAllStoreName,
  saveContractAnnex,
  getUserByRole,
  getPartnerIdByContractNo
} from '@/api/customer'
// import { getToken } from '@/utils/token'
import { ROLE_CODE } from '@/const/roleCode'
// import { CONSTRACT_APPROVER } from '@/utils/config'

// 上传附件的自定义校验规则
// function validateAttachment (rule, value, callback) {
//   if (value && value.length === 0) {
//     callback(new Error('至少上传一个附件'))
//   } else {
//     callback()
//   }
// }

export default {
  name: 'addAttachmentDialog',
  data () {
    return {
      dialogVisible: false,
      contract_attachment_form: {
        // 合同编号
        contract_no: undefined,
        // 客户名称
        partner_name: undefined,
        // 合同id
        contract_id: undefined,
        // 审批金额
        approval_amount: undefined,
        // 申请内容
        comment: '',
        // 附件文件url，以英文","分隔
        attachment_url: '',
        // 客户经理id
        manager_id: undefined,
        // 部门id
        department: undefined,
        // 合作对象id(包括客户和供应商)
        partner_id: undefined,
        // 合同附件类型(即合作对象类型)，1：客户；2：供应商
        contract_annex_type: 2
      },
      // 验证规则
      contract_attachment_rules: {
        contract_no: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
        partner_name: [{required: true, message: '请先输入合同编号', trigger: 'blur'}],
        approval_amount: [{required: true, message: '请输入审批金额', trigger: 'blur'}],
        attachment_url: [{required: true, message: '请上传附件', trigger: 'blur'}],
        manager_id: [{required: true, message: '请选择客户经理', trigger: 'blur'}],
        department: [{required: true, message: '请先选择客户经理', trigger: 'blur'}]
      },
      // 客户经理
      accountManager: [],
      // 部门名称
      departmentName: '',
      // 客户名称选项
      custmerOption: [],
      uploadAttachmentUploading: false,
      // 已上传的附件列表
      uploadedAttachmentList: [
        // {
        //   file: '蚊子公会主播报asdasdas价清单.docx',
        //   path: 'http://www.baidu.com'
        // },
        // {
        //   file: '蚊子公会主播123报价清单.docx',
        //   path: 'http://www.baidu.com'
        // },
        // {
        //   file: '蚊子公.docx',
        //   path: 'http://www.baidu.com'
        // }
      ]
    }
  },
  methods: {
    show () {
      // 重置表单
      this.dialogVisible = true
      // 获取管理员
      this.getCustmerManager()
      // 根据合同编号获取客户名称
      // this.getCustmerByContractNo()
    },
    // 提交合同附件
    handleAttachmentSubmitClick () {
      this.$refs.contract_attachment_form.validate(pass => {
        if (pass) {
          // debugger
          saveContractAnnex(this.contract_attachment_form).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message, {
                showClose: true,
                duration: 2000
              })
              // 触发added事件，提供给父组件监听
              this.$emit('added')
              // 初始化表单
              this.dialogVisible = false
              this.formResetFun()
            } else {
              this.$message.error(res.data.message, {
                showClose: true,
                duration: 2000
              })
            }
          }).catch((err) => {
            this.$message.error('新增合同附件失败，请稍后重试', {
              showClose: true,
              duration: 2000
            })
            console.error(err.message)
          })
        } else {
          return false
        }
      })
    },
    // 获取客户经理
    getCustmerManager () {
      getUserByRole({
        roles: ROLE_CODE.customer_manager + ',' + ROLE_CODE.major_customer_manager
      }).then(res => {
        if (res.data.success) {
          this.accountManager = res.data.data
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '客户经理获取失败，稍后重试',
          duration: 2000,
          showClose: true
        })
        console.log(error.message)
      })
    },
    // 根据合同编号获取合同客户名称
    getCustmerByContractNo (contractNo) {
      if (contractNo === '' || contractNo === undefined) return
      getPartnerIdByContractNo({
        partner_type: 2,
        contract_uid: contractNo.trim()
      }).then(res => {
        if (res.data.success) {
          this.custmerOption = res.data.data
        }
      }).catch(() => {
        this.$message.error('根据合同编号获取合同客户名称失败，请稍后重试', {
          showClose: true,
          duration: 2000
        })
      })
    },
    // 合同编号选中事件
    handleSelect (value) {
      // console.log(this.custmerOption)
      const customer = this.custmerOption.find(item => item.contract_uid === value)

      // 判断该合同的状态以及合同附件的状态(合同未正常状态才可以提交附件，提交过的附件在审批中/已作废状态下无法提交)
      if (customer && customer.contract_status !== 2) {
        this.$message.warning('合同在正常状态下才可以添加合同附件')
        return false
      } else if (customer && (customer.last_annex_status === 4 || customer.last_annex_status === 5)) {
        this.$message.warning(`合同附件在审批中、已作废状态下无法继续添加合同附件`)
        return false
      }

      this.contract_attachment_form.partner_name = customer ? customer.partner_name : undefined
      this.contract_attachment_form.contract_id = customer ? customer.contract_id : undefined
      this.contract_attachment_form.partner_id = customer ? customer.partner_id : undefined
    },
    // 上传方法
    uploadAttachmentFile (value) {
      const formData = new FormData()
      formData.append('file', value.file, value.file.name)
      formData.append('attachment_type', 'contract_annex')
      this.uploadAttachmentUploading = true

      uploadContractAttachment(formData).then(res => {
        if (!res.data.success) {
          this.$message({
            type: 'warning',
            message: res.data.message,
            showClose: true,
            duration: 2000
          })
        } else {
          // this.contract_attachment_form.attachment_url.push(res.data.data.source)
          this.uploadedAttachmentList.push({
            file: value.file.name,
            path: res.data.data.source
          })
          // 整理并赋值附件地址字段
          const urlList = this.uploadedAttachmentList.map(item => item.path)
          this.contract_attachment_form.attachment_url = urlList.join(',')
          // 由于按钮没有blur事件，所有要手动校验该字段，使提示文字消失
          this.$refs.contract_attachment_form.validateField('attachment_url')
        }
        this.uploadAttachmentUploading = false
      }).catch(error => {
        this.$message({
          type: 'warning',
          message: '上传失败，稍后重试',
          showClose: true,
          duration: 2000
        })
        this.uploadAttachmentUploading = false
        console.log(error.message)
      })
    },
    // 删除已上传的附件
    handleAttachmentClick(index) {
      // debugger
      this.uploadedAttachmentList.splice(index, 1)
    },
    // 选中客户经理下拉选项
    handleCustmerManagerChange (value) {
      const manager = this.accountManager.find(item => item.id === value)
      this.contract_attachment_form.department = manager ? manager.department : undefined
      this.departmentName = manager ? manager.department_str : ''
    },
    // 弹窗关闭事件回调
    handleDialogClose () {
      this.dialogVisible = false
      this.formResetFun()
      this.custmerOption = []
    },
    // 表单初始化方法
    formResetFun () {
      // 初始化表单
      this.$refs.contract_attachment_form.resetFields()
      // 初始化附件列表及附件url字段
      this.uploadedAttachmentList = []
      this.contract_attachment_form.attachment_url = ''
      this.departmentName = ''
    }
  }
}
</script>
