<!--
 * @Description: 新增供应商合同
 * @Author: your name
 * @Date: 2019-08-08 14:10:31
 * @LastEditTime: 2019-09-11 09:55:10
 * @LastEditors: 白青
 -->
<style lang="scss" scoped>
  #add-contract {
    /deep/ .el-dialog__header {
      background-color: #F8F8F8;
      margin: 0;
      .title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #666;
      }
      .el-dialog__headerbtn {
        top: 12px;
        font-size: 24px;
        .el-dialog__close {
          color: #909399!important;
        }
      }
    }
    /deep/ .el-dialog__body {
      padding: 0;
      .dialog-content {
        max-height: 550px;
        overflow-y: auto;
        .content-header {
          font-size: 14px;
          font-weight: bold;
          color: #666;
          height: 44px;
          line-height: 44px;
          padding-left: 52px;
          border-bottom: #F5F5F5 solid 1px;
          position: relative;
          &::before {
            content: '';
            display: block;
            width: 3px;
            height: 10px;
            background-color: #5C82FF;
            position: absolute;
            left: 40px;
            top: 17px;
          }
        }
        .content-body {
          .content-line {
            // height: 52px;
            line-height: 52px;
            .content-label {
              display: inline-block;
              width: 205px;
              text-align: right;
              vertical-align: top;
              em {
                font-style: normal;
                color: #F26467;
                margin-right: 5px;
              }
            }
            .content-value {
              display: inline-block;
              width: 484px;
              .value-select {
                width: 100%;
              }
              .sale-chance-wrap {
                background-color: #F8F8F8;
                padding: 5px 12px;
                line-height: 26px;
                margin-top: 10px;
                .chance-checkbox {
                  margin: 0 5px 0 0;
                  min-width: 110px;
                }
              }
              .selected-sale-chance-wrap {
                line-height: 24px;
                padding: 10px 0;
                .selected-sale-chance {
                  display: inline-block;
                  line-height: 24px;
                  background-color: #F2F2F2;
                  font-size: 14px;
                  padding: 0 10px;
                  margin-bottom: 10px;
                  margin-right: 6px;
                }
              }
              .short-input {
                width: 194px;
              }
              .short-label {
                width: 85px;
                display: inline-block;
                text-align: right;
              }
              .upload-btn-wrap {
                display: inline-block;
                .upload-btn {
                  background: #5C82FF;
                  border-color: #5C82FF;
                  color: #fff;
                }
              }
              .upload-tips {
                font-size: 12px;
                color: #999;
                margin-left: 11px;
              }
              .uploaded-attachment-name {
                display: inline-block;
                max-width: 250px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                vertical-align: middle;
                color: #5C82FF;
              }
              .clear-uploaded-file {
                color: #666;
                font-size: 18px;
                font-weight: bold;
                vertical-align: middle;
                cursor: pointer;
              }
              .approver {
                width: 64px;
                height: 28px;
                display: inline-block;
                background: #F2F2F2;
                color: #555;
                line-height: 28px;
                text-align: center;
                border-radius: 2px;
              }
              .approver-icon {
                color: #DADADA;
                font-size: 20px;
                margin: 0 5px;
                vertical-align: middle;
                font-weight: bold;
              }
              .tips {
                font-size: 12px;
                color: #F8931C;
                i {
                  margin: 0 5px;
                }
              }
              .company-name.error {
                /deep/ .el-input__inner {
                  border-color: #F34B60;
                }
              }
              .company-name-slot {
                color: #F34B60;
                span {
                  color: #5C82FF;
                  margin: 0 13px;
                  cursor: pointer;
                }
              }
              .select-partner-tips {
                font-size: 12px;
                color: #FE924B;
                line-height: 20px;
                i {
                  margin-right: 5px;
                }
              }
            }
          }
          .plan-table-wrap {
            padding: 25px 50px;
            .el-input .el-input__inner{
              text-align: right;
            }
            .plan-date {
              width: 100%;
              .el-input__inner {
                // padding-right: 5px;
              }
            }
            .add-table-line {
              height: 32px;
              border: #D5E1F3 dashed 1px;
              text-align: center;
              line-height: 32px;
              margin-top: 10px;
              cursor: pointer;
              i {
                margin-right: 6px;
                font-size: 15px;
                color: #C3C3C3;
              }
              &:hover {
                color: #5C82FF;
                i {
                  color: #5C82FF;
                }
              }
            }
            .delete-btn {
              font-size: 22px;
              color: #BFC1C8;
              cursor: pointer;
              &:hover {
                // background-position: -118px -64px;
                color: #5C82FF;
              }
            }
          }
        }
      }
    }
    /deep/ .el-dialog__footer {
      .footer {
        .el-button {
          min-width: 80px;
          height: 34px;
          padding: 8px 20px;
          &.save-btn {
            background-color: #5C82FF;
            color: #fff;
            border-color: #5C82FF;
          }
        }
      }
    }
  }
</style>

<template>
  <div id="add-contract">
    <el-dialog
      :visible="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="840px"
      @close="visible = false"
    >
      <div class="title" slot="title">{{type === 'add' ? '新增供应商合同' : '编辑供应商合同'}}</div>
      <div class="dialog-content" id="dialog-content">
        <div class="content-header">合同基础信息</div>
        <div class="content-body">
          <div class="content-line">
            <div class="content-label">合同编号：</div>
            <div class="content-value">{{form.contract_uid}}（系统生成）</div>
          </div>
          <!-- <div class="content-line">
            <div class="content-label"><em>*</em>客户名称：</div>
            <div class="content-value"><el-input v-model="form.customer_name" size="medium" placeholder="请输入客户名称"></el-input></div>
          </div> -->
          <div class="content-line">
            <div class="content-label"><em>*</em>供应商名称：</div>
            <div class="content-value">
              <!-- <el-select v-model="form.partner_id" class="value-select" size="medium" filterable placeholder="请搜索并选择店铺名称" @change="handleShopNameChange">
                <el-option
                  v-for="(item, index) in allStoreName"
                  :key="index"
                  :label="item.shop_name"
                  :value="item.id">
                </el-option>
              </el-select> -->
              <!-- <el-autocomplete
                class="inline-input"
                v-model="form.partner_id"
                :fetch-suggestions="getPartnerList"
                placeholder="请搜索并选择供应商"
                :trigger-on-focus="false"
                size="medium"
              ></el-autocomplete> -->
              <el-select
                v-model="form.partner_id"
                filterable
                remote
                reserve-keyword
                clearable
                placeholder="请搜索并选择供应商"
                :remote-method="getPartnerList"
                size="medium"
                style="width:100%">
                <el-option
                  v-for="item in partnerOptions"
                  :key="item.partner_id"
                  :label="item.partner_name"
                  :value="item.partner_id">
                </el-option>
              </el-select>
              <p class="select-partner-tips"><i class="el-icon-warning"></i>如果找不到相应的供应商名称，请让媒介先到【供应商管理 → 公司库】添加供应商</p>
              <!-- @select="handleSelect" -->
            </div>
          </div>
          <!-- <div class="content-line">
            <div class="content-label"><em>*</em>客户(公司)名称：</div>
            <div class="content-value">
              <el-input v-model="form.company_name" :class="['company-name', {error: form.company_name === ''}]" size="medium" placeholder="请先关联店铺" disabled>
                <p v-show="form.company_name === ''" class="company-name-slot" slot="suffix">该店铺没有录入公司名称 <span @click="handleAddCompanyNameClick">去补充></span></p>
              </el-input>
            </div>
          </div> -->
          <div class="content-line">
            <div class="content-label"><em>*</em>合同类型：</div>
            <div class="content-value">
              供应商合同
              <!-- <el-select v-model="form.contract_type" class="value-select" size="medium" placeholder="请选择">
                <el-option
                  v-for="item in contractTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </div>
          </div>
          <div class="content-line">
            <div class="content-label"><em>*</em>采买渠道：</div>
            <div class="content-value">
              <div class="sale-chance-wrap">
                <p><el-checkbox :indeterminate="saleChance.isIndeterminate" v-model="saleChance.checkAll" @change="handleCheckAllChange">全选</el-checkbox></p>
                <el-checkbox-group v-model="form.sale_chance" @change="handleCheckedSaleChanceChange">
                  <el-checkbox class="chance-checkbox" v-for="(chance, index) in saleChances" :label="chance.value" :key="index">{{chance.label}}</el-checkbox>
                </el-checkbox-group>
                <!-- <el-checkbox class="chance-checkbox" v-for="(chance, index) in saleChances" :key="index" :label="chance.value">{{chance.label}}</el-checkbox> -->
              </div>
            </div>
          </div>
        </div>
        <div class="content-header">合同明细</div>
        <div class="content-body">
          <div class="content-line">
            <div class="content-label">产品(采买渠道)：</div>
            <div class="content-value">
              <div class="selected-sale-chance-wrap">
                <span class="selected-sale-chance" v-for="(item, index) in selectedSaleChances" :key="index">{{item.label}}</span>
              </div>
            </div>
          </div>
          <div class="content-line">
            <div class="content-label">数量：</div>
            <div class="content-value">
              <el-input class="short-input" type="number" v-model="form.num" placeholder="请输入数量" size="medium" @input="computeContractAmount" @mousewheel.native.prevent></el-input>
              <span class="short-label">标准单价：</span>
              <el-input class="short-input" type="number" v-model="form.price" placeholder="请输入标准单价" size="medium" @input="computeContractAmount" @mousewheel.native.prevent></el-input>
            </div>
          </div>
          <div class="content-line">
            <div class="content-label">单位：</div>
            <div class="content-value">
              <!-- <el-input class="short-input" placeholder="场" size="medium"></el-input> -->
              <el-select v-model="form.unit" class="short-input" size="medium" placeholder="请选择单位">
                <el-option label="场" :value="1"></el-option>
                <el-option label="次" :value="2"></el-option>
              </el-select>
              <span class="short-label">折扣：</span>
              <el-input class="short-input" type="number" v-model="form.discount" placeholder="输入1.0 - 10.0的数字" size="medium" @input="computeContractAmount" @mousewheel.native.prevent></el-input>
            </div>
          </div>
          <div class="content-line">
            <div class="content-label"><em v-show="this.form.contract_type !== 2">*</em>合同金额：</div>
            <div class="content-value">
              <el-input class="short-input" type="number" v-model="form.contract_amount" placeholder="0.00" size="medium" @input="handleContractAmountChange" @mousewheel.native.prevent></el-input>
            </div>
          </div>
          <div class="content-line">
            <div class="content-label">合同附件单：</div>
            <div class="content-value">
              <template>
                <el-upload
                  v-show="!uploadAttachment.file"
                  action=""
                  class="upload-btn-wrap"
                  :disabled="uploadAttachment.uploading"
                  :show-file-list="false"
                  :http-request="uploadAttachmentFile"
                  accept="application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                >
                  <el-button :loading="uploadAttachment.uploading" class="upload-btn" size="small">上传文件</el-button>
                </el-upload>
              </template>
              <span v-if="uploadAttachment.file">
                <span class="uploaded-attachment-name">{{uploadAttachment.file.name}}</span>
                <i class="el-icon-circle-close-outline clear-uploaded-file" @click="clearUploadedFile"></i>
              </span>
              <span class="upload-tips">支持扩展名：.docx .doc .pdf</span>
            </div>
          </div>
        </div>
        <div class="content-header">付款计划</div>
        <div class="content-body">
          <div class="plan-table-wrap">
            <el-table
              :header-cell-style="{ backgroundColor: '#F8F8F8', padding: '8px 0' }"
              :data="proceeds_plan"
            >
              <el-table-column
                :formatter="(row, column, cellValue, index) => index + 1"
                label="序号"
                width="50"
                align="center">
              </el-table-column>
              <el-table-column
                prop="proceeds_amount"
                label="付款金额"
                align="right">
                <template slot-scope="{row, column, $index}">
                  <el-input v-model="proceeds_plan[$index].proceeds_amount" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="proceeds_plan_date"
                label="计划付款日期"
                align="right"
                width="150">
                <template slot-scope="{row, column, $index}">
                  <el-date-picker
                    v-model="proceeds_plan[$index].proceeds_plan_date"
                    value-format="yyyy-MM-dd"
                    class="plan-date"
                    type="date"
                    placeholder="选择日期"
                    size="small">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                prop="obtained_amount"
                label="已付金额"
                align="right">
                <template slot-scope="{row, column, $index}">
                  <el-input v-model="proceeds_plan[$index].obtained_amount" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="to_obtain_amount"
                label="待付金额"
                align="right">
                <template slot-scope="{row, column, $index}">
                  <el-input v-model="proceeds_plan[$index].to_obtain_amount" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="invoice_amount"
                label="已开票金额"
                align="right">
                <template slot-scope="{row, column, $index}">
                  <el-input v-model="proceeds_plan[$index].invoice_amount" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column width="50">
                <template slot-scope="{row, column, $index}">
                  <i v-if="proceeds_plan.length > 1" class="delete-btn el-icon-delete" @click="handleDeletePlan($index)"></i>
                </template>
              </el-table-column>
            </el-table>
            <p class="add-table-line" @click="addOnePlan"><i class="el-icon-circle-plus"></i>点击添加</p>
          </div>
        </div>
        <div class="content-header">跟进人</div>
        <div class="content-body">
          <div class="content-line">
            <div class="content-label"><em>*</em>客户经理：</div>
            <div class="content-value">
              <el-select v-model="form.manager_id" class="value-select" size="medium" placeholder="请选择客户经理" @focus="handleCustomerManagerSelectFocus" @change="handleCustomerManagerSelectChange">
                <el-option
                  v-for="item in accountManager"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="content-line">
            <div class="content-label"><em>*</em>所属部门：</div>
            <div class="content-value">
              <el-select v-model="form.department" class="value-select" size="medium" disabled placeholder="请先选择客户经理">
                <el-option
                  v-for="item in department"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="content-line">
            <div class="content-label"><em>*</em>审批人：</div>
            <div class="content-value">
              <!-- <el-select v-model="form.approver_id" class="value-select" size="medium" placeholder="请选择">
                <el-option
                  v-for="item in approver"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id">
                </el-option>
              </el-select> -->
              <span class="approver">{{getApproverUsername(CONSTRACT_APPROVER.xyx_manager) || '文竹'}}</span>
              <i class="el-icon-arrow-right approver-icon"></i>
              <span v-show="form.contract_amount >= 500000" class="approver">{{getApproverUsername(CONSTRACT_APPROVER.general_manager) || '红掌'}}</span>
              <i v-show="form.contract_amount >= 500000" class="el-icon-arrow-right approver-icon"></i>
              <span class="approver">{{getApproverUsername(CONSTRACT_APPROVER.risk_control_specialist) || '益智'}}</span>
              <span v-show="form.contract_amount >= 500000" class="tips"><i class="el-icon-warning"></i>合同金额大于50万元，需红掌审批</span>
            </div>
          </div>
          <!-- <div class="content-line">
            <div class="content-label">创建时间：</div>
            <div class="content-value">
              2019.01.01
            </div>
          </div> -->
        </div>
      </div>
      <div class="footer" slot="footer">
        <el-button size="medium" @click="visible = false">取消</el-button>
        <el-button class="save-btn" size="medium" :loading="this.uploadAttachment.uploading" @click="handleSubmitSave">{{this.uploadAttachment.uploading ? '附件上传中' : type === 'add' ? '保存' : '重新提交审批'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { saleChances } from '@/const/options' // contractTypeOptions,
import {
  uploadContractAttachment,
  getDepartment,
  // queryUserNames,
  getApprover,
  saveContract,
  getContractUid,
  getAllStoreName,
  getUserByRole,
  getPartnerList
} from '@/api/customer'
// import { USER_ROLE } from '@/utils/config'
import { ROLE_CODE } from '@/const/roleCode'
import { CONSTRACT_APPROVER } from '@/utils/config'

export default {
  name: 'AddContract',
  props: {
    type: {
      type: String,
      default: 'add'
    }
  },
  data () {
    return {
      CONSTRACT_APPROVER, // 审批人id常量
      // 新增弹窗显示标志
      visible: false,
      // 选项
      // contractTypeOptions,
      saleChances,
      planData: [],
      accountManager: [],
      department: [],
      approver: [],
      // 全选状态
      saleChance: {
        checkAll: false,
        isIndeterminate: false
      },
      uploadAttachment: {
        uploading: false,
        file: null
      },
      // 合同表单
      form: {
        contract_uid: '',
        customer_name: '',
        contract_type: 3,
        sale_chance: [],
        num: undefined,
        price: undefined,
        unit: 1,
        discount: undefined,
        contract_amount: undefined,
        attachment_url: '',
        proceeds_plan: [
          {
            proceeds_plan_date: '',
            proceeds_amount: undefined,
            obtained_amount: undefined,
            to_obtain_amount: undefined,
            invoice_amount: undefined
          }
        ],
        department: undefined,
        manager_id: undefined,
        // approver_id: undefined
        company_name: undefined,
        partner_id: undefined
      },
      // 收款计划
      proceeds_plan: [
        {
          proceeds_plan_date: '',
          proceeds_amount: undefined,
          obtained_amount: undefined,
          to_obtain_amount: undefined,
          invoice_amount: undefined
        }
      ],
      // 删除的收款计划，暂存变量
      deletedPlans: [],
      approverList: [
        {id: 6, username: ''}, // 文竹
        {id: 61, username: ''}, // 益智
        {id: 74, username: ''} // 红掌
      ],
      allStoreName: [], // 所有店铺选项
      // 客户(公司)名称 字段的提示文字显示标志
      companyNameIsShow: false,
      // 远程搜索供应商的选项
      partnerOptions: []
    }
  },
  computed: {
    // 计算选中的采买渠道在合同明细里面显示
    selectedSaleChances () {
      const selectedSaleChances = this.saleChances.filter(item => {
        if (this.form.sale_chance.find(selectedItem => selectedItem === item.value)) {
          return true
        } else {
          return false
        }
      })
      return selectedSaleChances
    }
  },
  methods: {
    // 提供给父组件使用，勿删
    show (contractDetail) {
      if (this.type === 'add') this.getContractNumber()
      this.getAccountManager()
      this.getDepartment()
      this.getApprover()
      this.resetForm()
      this.getAllStoreName()

      // 如果是编辑 获取详情 写入表单
      if (this.type === 'edit') {
        // console.log(contractDetail)
        // for (let key in this.form) {
        //   this.form[key] = contractDetail.contract_info[key]
        // }
        if (!contractDetail) return false
        this.saleChance.checkAll = contractDetail.contract_info.sale_chance.length === saleChances.length
        this.saleChance.isIndeterminate = contractDetail.contract_info.sale_chance.length !== saleChances.length && contractDetail.contract_info.sale_chance.length !== 0
        this.uploadAttachment.file = contractDetail.contract_detail.attachment_url ? {name: contractDetail.contract_detail.attachment_url.split('/')[contractDetail.contract_detail.attachment_url.split('/').length - 1]} : null
        // 第一次获取下拉选项
        this.getPartnerList(contractDetail.partner_info.partner_name)
        this.form = {
          contract_uid: contractDetail.contract_info.contract_uid,
          customer_name: contractDetail.contract_info.customer_name,
          contract_type: contractDetail.contract_info.contract_type,
          sale_chance: contractDetail.contract_info.sale_chance.map(item => item.value),
          num: contractDetail.contract_detail.num,
          price: contractDetail.contract_detail.price,
          unit: contractDetail.contract_detail.unit,
          discount: contractDetail.contract_detail.discount,
          contract_amount: contractDetail.contract_detail.contract_amount,
          attachment_url: contractDetail.contract_detail.attachment_url,
          proceeds_plan: [],
          department: contractDetail.contract_info.department + '',
          manager_id: contractDetail.contract_info.manager_id,
          // approver_id: contractDetail.contract_info.approver_id,
          id: contractDetail.contract_info.id,
          partner_id: contractDetail.partner_info.id
        }
        this.proceeds_plan = contractDetail.proceeds_plan.map(item => {
          return {
            proceeds_plan_date: item.proceeds_plan_date_str,
            proceeds_amount: item.proceeds_amount,
            obtained_amount: item.obtained_amount,
            to_obtain_amount: item.to_obtain_amount,
            invoice_amount: item.invoice_amount,
            id: item.id
          }
        })
      }
      this.visible = true

      // 自动将滚动条滑到顶部
      setTimeout(() => {
        if (document.getElementsByClassName('dialog-content')[0]) document.getElementsByClassName('dialog-content')[0].scrollTop = 0
      }, 100)
    },
    // 采买渠道全选
    handleCheckAllChange (val) {
      this.form.sale_chance = val ? saleChances.map(item => item.value) : []
      this.saleChance.isIndeterminate = false
    },
    // 处理已选中的采买渠道变动（checkbox group）
    handleCheckedSaleChanceChange (value) {
      // console.log(value, saleChances)
      let checkedCount = value.length
      this.saleChance.checkAll = checkedCount === saleChances.length
      this.saleChance.isIndeterminate = checkedCount > 0 && checkedCount < saleChances.length
    },
    // 上传附件
    uploadAttachmentFile (value) {
      // console.log(value.file)
      const formData = new FormData()
      formData.append('file', value.file, value.file.name)
      formData.append('attachment_type', 'contract')
      this.uploadAttachment.uploading = true
      this.uploadAttachment.file = value.file

      uploadContractAttachment(formData).then(res => {
        if (!res.data.success) {
          this.uploadAttachment.file = null
          this.$message({
            type: 'warning',
            message: res.data.message,
            showClose: true,
            duration: 2000
          })
        } else {
          this.form.attachment_url = res.data.data.source
        }
        this.uploadAttachment.uploading = false
      }).catch(error => {
        this.$message({
          type: 'warning',
          message: '上传失败，稍后重试',
          showClose: true,
          duration: 2000
        })
        this.uploadAttachment.uploading = false
        console.log(error.message)
      })
    },
    // 清除已上传的附件
    clearUploadedFile () {
      this.uploadAttachment.file = null
      this.form.attachment_url = ''
    },
    // 添加一条收款计划
    addOnePlan () {
      this.proceeds_plan.push({
        proceeds_plan_date: '',
        proceeds_amount: undefined,
        obtained_amount: undefined,
        to_obtain_amount: undefined,
        invoice_amount: undefined
      })
    },
    // 移除一条收款计划
    handleDeletePlan(index) {
      if (this.proceeds_plan[index].id) {
        this.proceeds_plan[index].is_delete = 1
        this.deletedPlans.push(this.proceeds_plan[index])
      }
      this.proceeds_plan.splice(index, 1)
    },
    // 计算合同金额
    computeContractAmount () {
      // console.log('num', (this.form.num))
      // console.log('price', (this.form.price))
      // console.log('discount', (this.form.discount))
      // debugger
      if (this.form.num < 0) setTimeout(() => { this.form.num = undefined }, 50)
      if (this.form.price < 0) setTimeout(() => { this.form.price = undefined }, 50)
      if (this.form.discount < 0) {
        setTimeout(() => { this.form.discount = undefined }, 50)
        this.$message({
          type: 'warning',
          message: '折扣不能小于0'
        })
      }
      if (this.form.discount > 10) {
        setTimeout(() => { this.form.discount = undefined }, 50)
        this.$message({
          type: 'warning',
          message: '折扣不能大于10'
        })
      }

      setTimeout(() => {
        let amount
        if (this.form.num && this.form.price && !this.form.discount) {
          amount = this.form.num * this.form.price
        } else if (this.form.num && this.form.price && this.form.discount) {
          // if (this.form.discount > 10 || this.form.discount < 0) {
          //   this.$message({
          //     type: 'warning',
          //     message: '合同折扣输入有误'
          //   })
          //   return false
          // }
          amount = this.form.num * this.form.price * this.form.discount / 10
        }

        this.form.contract_amount = amount ? amount.toFixed(0) : amount
      }, 50)
    },
    // 合同金额变动触发
    handleContractAmountChange () {
      if (this.form.contract_amount < 0) setTimeout(() => { this.form.contract_amount = undefined }, 50)
      this.form.discount = undefined
    },
    // 获取客户经理
    getAccountManager () {
      // queryUserNames({ role: ROLE_CODE.customer_manager + ',' + ROLE_CODE.major_customer_manager }).then(res => {
      //   if (res.data.success) {
      //     this.accountManager = res.data.data.user_data
      //   } else {
      //     this.$message({
      //       type: 'warning',
      //       message: res.data.message,
      //       duration: 2000,
      //       showClose: true
      //     })
      //   }
      // }).catch(error => {
      //   this.$message({
      //     type: 'error',
      //     message: '客户经理获取失败，稍后重试',
      //     duration: 2000,
      //     showClose: true
      //   })
      //   console.log(error.message)
      // })
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
    // 获取部门
    getDepartment () {
      getDepartment().then(res => {
        if (res.data.success) {
          this.department = []
          for (let key in res.data.data) {
            this.department.push({
              label: res.data.data[key],
              value: key
            })
          }
          // this.department = res.data.data
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
          message: '部门获取失败，稍后重试',
          duration: 2000,
          showClose: true
        })
        console.log(error.message)
      })
    },
    // 获取合同审批人
    getApprover () {
      getApprover().then(res => {
        if (res.data.success) {
          // this.approver = res.data.data
          res.data.data.forEach(info => {
            this.approverList = this.approverList.map(item => {
              if (item.id === info.id) {
                item.username = info.username
              }
              return item
            })
          })
          // console.log(this.approverList)
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
          message: '审批人获取失败，稍后重试',
          duration: 2000,
          showClose: true
        })
        console.log(error.message)
      })
    },
    // 点击保存
    handleSubmitSave () {
      // 校验五个必填项
      // if (this.form.customer_name === '') {
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入客户名称',
      //     duration: 2000,
      //     showClose: true
      //   })
      //   return false
      // }
      if (!this.form.partner_id) {
        this.$message({
          type: 'warning',
          message: '请搜索并选择供应商',
          duration: 2000,
          showClose: true
        })
        if (document.getElementsByClassName('dialog-content')[0]) document.getElementsByClassName('dialog-content')[0].scrollTop = 0
        return false
      }
      // if (!this.form.company_name) {
      //   this.$message({
      //     type: 'warning',
      //     message: '该店铺没有录入公司名称，请先补充',
      //     duration: 2000,
      //     showClose: true
      //   })
      //   if (document.getElementsByClassName('dialog-content')[0]) document.getElementsByClassName('dialog-content')[0].scrollTop = 0
      //   return false
      // }
      // if (this.form.contract_type === '') {
      //   this.$message({
      //     type: 'warning',
      //     message: '请选择合同类型',
      //     duration: 2000,
      //     showClose: true
      //   })
      //   if (document.getElementsByClassName('dialog-content')[0]) document.getElementsByClassName('dialog-content')[0].scrollTop = 0
      //   return false
      // }
      if (this.form.sale_chance.length === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一个采买渠道',
          duration: 2000,
          showClose: true
        })
        if (document.getElementsByClassName('dialog-content')[0]) document.getElementsByClassName('dialog-content')[0].scrollTop = 0
        return false
      }
      // 当合同类型为框架协议时，合同金额可以为 0
      if (!this.form.contract_amount && this.form.contract_type !== 2) {
        this.$message({
          type: 'warning',
          message: '请输入合同金额',
          duration: 2000,
          showClose: true
        })
        return false
      }
      if (!this.form.manager_id) {
        this.$message({
          type: 'warning',
          message: '请选择客户经理',
          duration: 2000,
          showClose: true
        })
        return false
      }
      if (!this.form.department) {
        this.$message({
          type: 'warning',
          message: '请选择所属部门',
          duration: 2000,
          showClose: true
        })
        return false
      }
      // if (!this.form.approver_id) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请选择审批人',
      //     duration: 2000,
      //     showClose: true
      //   })
      //   return false
      // }

      // 编辑时 合并已删除的数据
      if (this.type === 'edit') {
        this.form.proceeds_plan = this.proceeds_plan.concat(this.deletedPlans)
      } else {
        this.form.proceeds_plan = this.proceeds_plan
      }

      // 提交保存
      saveContract(this.form).then(res => {
        if (res.data.success) {
          this.visible = false
          this.proceeds_plan = [
            {
              proceeds_plan_date: '',
              proceeds_amount: undefined,
              obtained_amount: undefined,
              to_obtain_amount: undefined,
              invoice_amount: undefined
            }
          ]
          this.deletedPlans = []
          this.$message({
            type: 'success',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
          if (this.type === 'add') this.$emit('added')
          if (this.type === 'edit') this.$emit('edited')
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
          message: '合同保存失败，稍后重试',
          duration: 2000,
          showClose: true
        })
        console.log(error.message)
      })
    },
    // 获取合同编号
    async getContractNumber () {
      getContractUid().then(res => {
        if (res.data.success) {
          this.form.contract_uid = res.data.data
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
          message: '合同编号获取失败，稍后重试',
          duration: 2000,
          showClose: true
        })
        console.log(error.message)
      })
    },
    // 重置表单
    resetForm () {
      this.form = {
        contract_uid: '',
        customer_name: '',
        contract_type: 3,
        sale_chance: [],
        num: undefined,
        price: undefined,
        unit: 1,
        discount: undefined,
        contract_amount: undefined,
        attachment_url: '',
        proceeds_plan: [
          {
            proceeds_plan_date: '',
            proceeds_amount: undefined,
            obtained_amount: undefined,
            to_obtain_amount: undefined,
            invoice_amount: undefined
          }
        ],
        department: undefined,
        manager_id: undefined,
        company_name: undefined,
        partner_id: undefined
        // approver_id: undefined
      }
      this.saleChance.checkAll = false
      this.saleChance.isIndeterminate = false
    },
    // 根据id获取审批人名称
    getApproverUsername (id) {
      return this.approverList.find(item => item.id === id).username
    },
    // 当选择客户经理select处于焦点状态事件，检测选项是否为空，如果没有选项，再次请求
    handleCustomerManagerSelectFocus () {
      if (this.accountManager.length === 0) {
        this.getAccountManager()
      }
    },
    // 客户经理选项发生变化，自动选择部门
    handleCustomerManagerSelectChange (value) {
      const department = this.accountManager.find(item => item.id === value)
      // debugger
      this.form.department = department ? department.department + '' : undefined
    },
    // 获取所有店铺，关联店铺select使用
    getAllStoreName () {
      getAllStoreName().then(res => {
        if (res.data.success) {
          if (res.data.data instanceof Array) {
            this.allStoreName = res.data.data
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
        }
      })
    },
    // 补充公司信息
    handleAddCompanyNameClick () {
      this.visible = false
      this.$router.push({
        path: '/customer/list'
      })
    },
    // 检测关联店铺选择事件，赋值所选店铺的公司名称
    handleShopNameChange (value) {
      // console.log(value)
      const shop = this.allStoreName.find(item => item.id === value)
      if (shop) {
        // console.log(shop)
        // thiscompanyNameIsShow = shop.company_name === ''
        this.form.company_name = shop.company_name
      }
    },
    // 获取供应商列表
    getPartnerList (partnerName, cb) {
      if (partnerName === '' || partnerName === undefined) return
      getPartnerList({
        partner_type: 2,
        partner_name: partnerName
      }).then(res => {
        if (res.data.success) {
          this.partnerOptions = res.data.data
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
        }
      })
    }
  }
}
</script>
