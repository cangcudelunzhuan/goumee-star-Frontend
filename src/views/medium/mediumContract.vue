<!--
 * @Description: 供应商合同
 * @Author: 白青
 * @Date: 2019-09-05 11:42:39
 * @LastEditTime: 2019-09-28 18:16:58
 * @LastEditors: 白青
 -->
<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  #medium-contarct {
    .condition {
      background: #fff;
      box-shadow:0px 1px 4px 0px rgba(0, 0, 0, 0.04);
      .condition-line {
        min-height: 60px;
        border-bottom: #EFF0F1 dashed 1px;
        position: relative;
        &:last-child {
          border-bottom: none;
        }
        .condition-label {
          position: absolute;
          left: 0;
          top: 0;
          display: inline-block;
          height: 60px;
          line-height: 60px;
          margin-left: 12px;
          color: #999;
        }
        .condition-value {
          display: inline-block;
          padding-left: 80px;
          /* 采买渠道 */
          .sell-chance {
            padding-top: 16px;
            overflow: hidden;
            li {
              float: left;
              margin: 0 10px;
              cursor: pointer;
              height: 28px;
              line-height: 28px;
              color: #666;
              padding: 0 10px;
              &:hover {
                color: $color-primary;
              }
              &.active {
                color: #fff!important;
                background: $color-primary;
                border-radius: 15px;
              }
            }
          }
          /* 合同类型 */
          .contract-type {
            padding-bottom: 12px;
            .select {
              width: 160px;
              height: 32px;
              margin-top: 14px;
              /deep/ .el-input__inner {
                height: 32px;
                line-height: 32px;
                border-radius: 2px;
              }
              /deep/ .el-input__icon {
                line-height: 32px;
              }
            }
            .contract-type-label {
              color: #999;
              margin-left: 20px;
            }
          }
          /* 搜索合同 */
          .search-contract {
            .input {
              width: 260px;
              margin-top: 14px;
              display: inline-block;
              vertical-align: middle;
              margin-right: 10px;
              /deep/ .el-input__inner {
                height: 32px;
                border-radius: 2px;
              }
            }
            .el-button {
              vertical-align: middle;
              margin-top: 14px;
              font-size: 14px;
              padding: 7px 15px;
            }
          }
        }
      }
    }
    .result-list {
      margin-top: 12px;
      padding: 12px;
      background: #fff;
      .opreate-btns {
        margin-bottom: 12px;
        .el-button {
          font-size: 14px;
          padding: 7px 0;
          width: 80px;
          text-align: center;
        }
      }
      .contract-sale-chance-reference {
        cursor: pointer;
        position: relative;
        padding-right: 20px;
        // display: block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        .icon-arrow {
          position: absolute;
          top: 3px;
          right: 0;
          margin-left: 6px;
        }
      }
      .one-sale-chance {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .status-dot {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        vertical-align: middle;
        &.status-dot-1 { background-color: #FF8549; }
        &.status-dot-2 { background-color: $color-primary; }
        &.status-dot-3 { background-color: #F34B60; }
        &.status-dot-4 { background-color: #FF8549; }
        &.status-dot-5 { background-color: #aaa; }
      }
      .create-time {
        color: #999;
      }
      .status-text {
        vertical-align: middle;
      }
      .customer-name {
        width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .oprate-btn {
        display: inline-block;
        width: 34px;
        height: 34px;
        margin: 0 2px;
        cursor: pointer;
        &.annex {
          background: url(../../assets/img/contract_opreate_icon_annex_1.png) no-repeat center center;
          &:hover {
            background: #ECF0FF url(../../assets/img/contract_opreate_icon_annex_2.png) no-repeat center center;
          }
        }
        &.check {
          background: url(../../assets/img/contract_opreate_icon_edit_1.png) no-repeat center center;
          &:hover {
            background: #ECF0FF url(../../assets/img/contract_opreate_icon_edit_2.png) no-repeat center center;
          }
        }
        &.has-no-attachment {
          cursor: no-drop;
          &:hover {
            background: #ECF0FF url(../../assets/img/contract_opreate_icon_annex_1.png) no-repeat center center;
          }
        }
        &.invalid {
          background: url(../../assets/img/tabe_icon10_default.png) no-repeat center center;
          &:hover {
            background: #ECF0FF url(../../assets/img/tabe_icon10_hover.png) no-repeat center center;
          }
        }
      }
      .contract-uid {
        color: $color-primary;
      }
      .contract-type {
        color: #888;
        font-size: 12px;
      }
      .contract-pagination {
        padding: 0;
        margin-top: 12px;
        /deep/ .el-input.el-input--mini.el-input--suffix {
          margin: 0;
        }
      }
      .empty-placeholder {
        padding: 150px 0;
      }
      .see-reason-btn {
        color: $color-primary;
      }
      .approve-btn-wrap {
        width: 34px;
        display: inline-block;
      }
    }
  }
</style>
<style>
  .contract-sale-chance-popover.el-popover {
    min-width: 300px;
    /* padding: 0 12px; */
  }
  .contract-sale-chance-popover .contract-sale-chance li {
    /* height: 50px;
    line-height: 50px;
    min-width: 106px;
    border-bottom: #EBEBEB dashed 1px; */
    display: inline-block;
    background: #F2F2F2;
    margin: 3px;
    padding: 4px 6px;
  }
  .contract-sale-chance-popover .contract-sale-chance li:last-child {
    border-bottom: none;
  }
  .contract-oprete-popper {
    min-width: auto;
    padding: 7px 12px;
  }
  .delete-contract-alert.el-message-box .el-message-box__content{
    height: initial;
  }
  .delete-contract-alert.el-message-box .el-message-box__content .el-message-box__message {
    top: 0;
  }
  .approve-progress-popper {
    padding: 0;
  }
  /* 作废弹窗样式 */
  .invalid-confirm.el-message-box .el-message-box__content {
    height: initial;
    text-align: center;
  }
  .invalid-confirm.el-message-box .el-message-box__content .el-message-box__message {
    top: initial;
  }
  .invalid-confirm.el-message-box .el-message-box__content .el-message-box__status {
    position: initial;
  }
  /* 合同附件弹窗样式 */
  .contract-attachment-popper {
    border-radius: 2px;
    padding: 0 20px;
  }
</style>

<template>
  <div id="medium-contarct">
    <div class="condition">
      <div class="condition-line">
        <span class="condition-label">采买渠道：</span>
        <div class="condition-value">
          <ul class="sell-chance">
            <li :class="condition.sale_chance ? '' : 'active'" @click="handleSelectSaleChance('')">全部</li>
            <li v-for="(chance, index) in saleChances" :class="condition.sale_chance === chance.value ? 'active' : ''" :key="index" @click="handleSelectSaleChance(chance.value)">{{chance.label}}</li>
          </ul>
        </div>
      </div>
      <div class="condition-line">
        <span class="condition-label">合同状态：</span>
        <div class="condition-value">
          <div class="contract-type">
            <!-- <el-select class="select" v-model="condition.contract_type" clearable placeholder="请选择" @clear="queryContract">
              <el-option
                v-for="item in contractTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="contract-type-label">合同状态：</span> -->
            <el-select class="select" v-model="condition.contract_status" clearable placeholder="请选择" @clear="queryContract">
              <el-option
                v-for="item in contractStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="contract-type-label">客户经理：</span>
            <el-select class="select" v-model="condition.manager_id" clearable placeholder="请选择" @clear="queryContract">
              <el-option
                v-for="(item, index) in accountManager"
                :key="index"
                :label="item.username"
                :value="item.id">
              </el-option>
            </el-select>
            <span class="contract-type-label">合同是否收回：</span>
            <el-select class="select" v-model="condition.is_recycled" clearable placeholder="请选择" @clear="queryContract">
              <el-option label="已收回" :value="1"></el-option>
              <el-option label="未收回" :value="0"></el-option>
            </el-select>
            <span class="contract-type-label">附件状态：</span>
            <el-select class="select" v-model="condition.last_annex_status" clearable placeholder="请选择" @clear="queryContract">
              <el-option
                v-for="item in contractStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="condition-line">
        <span class="condition-label">供应商名称：</span>
        <div class="condition-value" style="padding-left: 95px;">
          <div class="search-contract contract-type">
            <el-input class="input" v-model="condition.partner_name" placeholder="请输入供应商名称" clearable @clear="queryContract"></el-input>
            <span class="contract-type-label" style="position:relative;top:7px;">合同编号：</span>
            <el-input class="input" v-model="condition.contract_uid" placeholder="请输入合同编号" clearable @clear="queryContract"></el-input>
            <el-button type="primary" size="small" @click="handleSearchClick">查询</el-button>
            <el-button size="small" @click="handleResetCondition">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="result-list">
      <div v-if="currentUserInfo" class="opreate-btns">
        <el-button v-if="currentUserInfo.user_rights.includes(RIGHT_CODE.add_contract)" type="primary" size="small" @click="showAddContractDialog">新增合同</el-button>
        <el-button v-if="currentUserInfo.user_rights.includes(RIGHT_CODE.add_contract)" type="primary" size="small" @click="showAddContractAnnexDialog">新增附件</el-button>
        <el-button v-if="currentUserInfo.user_rights.includes(RIGHT_CODE.del_contract)" size="small" @click="handleDeleteContracts">删除</el-button>
      </div>
      <el-table
        :data="list"
        stripe
        style="width: 100%"
        v-loading="loading"
        :header-cell-style="{backgroundColor: '#F3F5F8', color: '#666'}"
        :cell-style="{cursor: 'pointer'}"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick">
        <el-table-column
          type="selection"
          width="30"
          fixed="left">
        </el-table-column>
        <el-table-column
          :formatter="(row, column, cellValue, index) => (pagination.currentPage - 1) * 10 + (index + 1)"
          label="序号"
          width="50"
          fixed="left"
          align="center">
        </el-table-column>
        <el-table-column
          prop="contract_uid"
          label="合同编号/合同类型"
          width="200">
          <template slot-scope="{row}">
            <div class="contract-uid">{{row.contract_info.contract_uid}}</div>
            <p class="contract-type">{{row.contract_info.contract_type_str}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="partner_name"
          label="供应商名称"
          min-width="150">
          <template slot-scope="{row}">
            <el-popover
              placement="top"
              trigger="hover"
              :content="row.partner_info.partner_name"
            >
              <div class="customer-name" slot="reference">{{row.partner_info.partner_name || '--'}}</div>
            </el-popover>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="contract_type"
          :formatter="row => {
            const type = contractTypeOptions.find(item => item.value === row.contract_info.contract_type)
            return type ? type.label : ''
          }"
          label="合同类型"
          min-width="80">
        </el-table-column> -->
        <el-table-column
          prop="contract_amount"
          label="合同金额"
          align="left"
          :formatter="row => {return '￥'+formatAmount(row.contract_detail.contract_amount, 2)}"
          width="200">
        </el-table-column>
        <!-- <el-table-column
          prop="discount"
          label="合同折扣/折"
          :formatter="row => row.contract_detail.discount ? formatDiscount(row.contract_detail.discount) : '--'"
          min-width="100"
          align="center">
        </el-table-column> -->
        <el-table-column
          prop="sale_chance"
          label="采买渠道"
          align="left"
          width="130">
          <template slot-scope="{row}">
            <template v-if="row.contract_info.sale_chance.length === 1">
              <el-popover
                placement="top"
                trigger="hover"
                :content="row.contract_info.sale_chance[0].sale_chance_name"
              >
                <span class="one-sale-chance" slot="reference">{{row.contract_info.sale_chance[0] ? row.contract_info.sale_chance[0].sale_chance_name : ''}}</span>
              </el-popover>
            </template>
            <el-popover
              v-if="row.contract_info.sale_chance.length > 1"
              popper-class="contract-sale-chance-popover"
              placement="top"
              width="130"
              trigger="hover">
              <span class="contract-sale-chance-reference" slot="reference">
                {{row.contract_info.sale_chance[0].sale_chance_name}}
                <i class="icon-arrow el-icon-arrow-down"></i>
              </span>
              <ul class="contract-sale-chance">
                <li v-for="(chance, index) in row.contract_info.sale_chance" :key="index">{{chance.sale_chance_name}}</li>
              </ul>
            </el-popover>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="manager_id"
          label="客户经理"
          :formatter="row => row.contract_info.manager_name || '--'"
          min-width="100">
        </el-table-column> -->
        <el-table-column
          prop="gmt_create"
          label="创建人/时间"
          width="150">
          <template slot-scope="{row}">
            <p>{{row.contract_info.add_by_name}}</p>
            <p class="create-time">{{row.contract_info.create_time_str.split(' ')[0]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="contract_status"
          label="合同状态"
          width="120">
          <template slot-scope="{row}">
            <em :class="`status-dot status-dot-${row.contract_info.contract_status}`"></em>
            <el-popover
              v-if="row.contract_work_infos.length > 0 && row.contract_info.contract_status !== 2 && row.contract_info.contract_status !== 5"
              placement="bottom-end"
              width="246"
              trigger="hover"
              popper-class="approve-progress-popper">
              <span class="see-reason-btn" slot="reference">{{row.contract_info.contract_status_str}}</span>
              <approve-progress :work-infos="row.contract_work_infos" :contract-info="row"></approve-progress>
            </el-popover>
            <span v-else>{{row.contract_info.contract_status_str || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="附件状态"
          width="120">
          <template slot-scope="{row}">
            <em v-if="row.contract_annex_info.length > 0" :class="`status-dot status-dot-${row.contract_annex_info[0].contract_annex_status}`"></em>
            <template v-if="row.contract_annex_work_infos.length > 0">
              <el-popover
                v-if="row.contract_annex_info[0].contract_annex_status !== 2 && row.contract_annex_info[0].contract_annex_status !== 5"
                placement="bottom-end"
                width="246"
                trigger="hover"
                popper-class="approve-progress-popper">
                <span class="see-reason-btn" slot="reference">{{row.contract_annex_info[0].contract_annex_status_str}}</span>
                <approve-progress type="fj" :work-infos="row.contract_annex_work_infos" :contract-info="row"></approve-progress>
              </el-popover>
              <span v-else>{{row.contract_annex_info[0].contract_annex_status_str || '--'}}</span>
            </template>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="审批进度"
          width="80">
          <template slot-scope="{row}">
            <el-popover
              v-if="row.contract_work_infos.length > 0"
              placement="bottom-end"
              width="246"
              trigger="hover"
              popper-class="approve-progress-popper">
              <span class="see-reason-btn" slot="reference">查看</span>
              <approve-progress :work-infos="row.contract_work_infos" :contract-info="row.contract_info"></approve-progress>
            </el-popover>
            <span v-else>--</span>
          </template>
        </el-table-column> -->
        <el-table-column
          label="合同是否收回"
          width="120"
          align="center">
          <template slot-scope="{row}">
            <!-- 风控显示操作按钮，其他人显示状态文字 -->
            <!-- <span v-if="row.contract_info.contract_status === 2 && getCurrentUserRoleCode() === ROLE_CODE.risk_control_specialist" @click.stop="() => false">
              <el-switch
                v-model="recycledStatusList[$index].status"
                @change="handleContractRecycleChange(row, $index)">
              </el-switch>
              <span style="font-size:12px;color:#666;">{{recycledStatusList[$index].status ? '已收回' : '未收回'}}</span>
            </span> -->
            <span v-if="row.contract_info.contract_status === 2" style="color:#666;font-size:14px;">
              {{row.contract_info.is_recycled === 1 ? '已收回' : '未收回'}}
            </span>
            <span v-if="row.contract_info.contract_status !== 2">--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center"
          fixed="right">
          <template slot-scope="{row}">
            <!-- 无补充附件弹窗 -->
            <el-popover
              v-if="row.contract_annex_info.length === 0"
              popper-class="contract-oprete-popper"
              placement="top"
              trigger="hover"
              :content="row.contract_detail.attachment_url ? '查看附件' : '暂无附件'"
            >
              <span v-if="row.contract_detail.attachment_url" class="oprate-btn annex" slot="reference" @click.stop="handleAttachmentLinkClick(row.contract_detail.attachment_url)"></span>
              <span v-else class="has-no-attachment oprate-btn annex" slot="reference" @click.stop="handleAttachmentLinkClick()"></span>
            </el-popover>
            <!-- 有补充附件弹窗 -->
            <el-popover
              v-if="row.contract_annex_info.length > 0"
              popper-class="contract-attachment-popper"
              placement="bottom-end"
              trigger="hover"
            >
              <span class="oprate-btn annex" slot="reference" @click.stop="handleAttachmentLinkClick()"></span>
              <attachment-list-popover :detail="row"></attachment-list-popover>
            </el-popover>
            <!-- 作废弹窗 -->
            <el-popover
              v-if="row.contract_info.contract_status === 2 && hasInvalidRight(row)"
              popper-class="contract-oprete-popper"
              placement="top"
              trigger="hover"
              content="作废合同"
            >
              <span class="oprate-btn invalid" slot="reference" @click.stop="handleInvalidClick(row.contract_info.id)"></span>
            </el-popover>
            <!-- <span v-if="hasApprovalRight" class="approve-btn-wrap">
              <el-popover
                v-if="hasApprovalRight && row.contract_info.contract_status !== 2"
                popper-class="contract-oprete-popper"
                placement="top"
                trigger="hover"
                content="审核"
              >
                <span class="oprate-btn check" slot="reference" @click.stop="handleReviewContractClick(row.contract_info)"></span>
              </el-popover>
            </span> -->
          </template>
        </el-table-column>
        <div class="empty-placeholder" slot="empty" v-show="!loading">
          <img src="@/assets/img/pls_import_product.png">
          <p>空空如也</p>
        </div>
      </el-table>
      <el-pagination
        class="contract-pagination"
        background
        :current-page.sync="pagination.currentPage"
        :page-sizes.sync="pagination.pageSizes"
        :page-size="pagination.pageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @current-change="handleCurrentChange"
        @size-change="handlePageSizeChange">
      </el-pagination>
    </div>
    <add-contract ref="addContractDialog" @added="queryContract"></add-contract>
    <!-- <review-dialog ref="reviewDialog" @approved="queryContract"></review-dialog> -->
    <add-attachment-dialog ref="addAttachmentDialog" @added="queryContract"></add-attachment-dialog>
  </div>
</template>

<script>
import { contractTypeOptions, contractStatusOptions, saleChances } from '@/const/options'
import AddContract from '@/views/medium/components/addContract'
// import ReviewDialog from '@/views/customer/components/reviewDialog'
import AddAttachmentDialog from '@/views/medium/components/addAttachmentDialog'
import ApproveProgress from '@/views/customer/components/approveProgress'
import AttachmentListPopover from '@/views/customer/components/attachmentListPopover'
import { queryContract, queryUserNames, deleteContracts, invalidContract } from '@/api/customer'
import { getToken } from '@/utils/token'
// import { getUserInfo } from '@/api/auth'
import { CONSTRACT_APPROVER } from '@/utils/config'
import { ROLE_CODE, RIGHT_CODE } from '@/const/roleCode'

export default {
  name: 'MediumContarct',
  components: {
    AddContract,
    // ReviewDialog,
    ApproveProgress,
    AddAttachmentDialog,
    AttachmentListPopover
  },
  data () {
    return {
      CONSTRACT_APPROVER, // 审批人id常量
      ROLE_CODE,
      RIGHT_CODE,
      contractTypeOptions,
      contractStatusOptions,
      saleChances,
      accountManager: [],
      condition: {
        sale_chance: undefined,
        contract_type: 3,
        contract_status: undefined,
        manager_id: undefined,
        is_recycled: undefined,
        partner_type: 2,
        last_annex_status: undefined,
        partner_name: undefined,
        contract_uid: undefined
      },
      list: [],
      recycledStatusList: [],
      loading: true,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 0
      },
      selection: [], // 被选中的数据
      currentUserInfo: null,
      recycled: false
    }
  },
  computed: {
    hasApprovalRight () {
      if (this.currentUserInfo) {
        // if (this.currentUserInfo.id === CONSTRACT_APPROVER.xyx_manager || this.currentUserInfo.id === CONSTRACT_APPROVER.general_manager || this.currentUserInfo.id === CONSTRACT_APPROVER.risk_control_specialist) {
        if (Object.values(CONSTRACT_APPROVER).includes(this.currentUserInfo.id)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  async mounted () {
    // debugger
    await this.getAccountManager()
    // debugger
    // await this.getUserInfo()
    // 获取当前用户信息
    this.currentUserInfo = this.$store.getters['user/getUserInfo']
    // debugger
    this.queryContract()
  },
  activated () {
    // debugger
    this.queryContract()
  },
  methods: {
    formatDiscount (discount) {
      discount = parseFloat(discount)
      return discount.toFixed(2)
    },
    // 数字千位格式化
    formatAmount(s, n) {
      n = n > 0 && n <= 20 ? n : 2
      s = parseFloat((s + '').replace(/[^\d\\.-]/g, '')).toFixed(n) + ''
      const l = s.split('.')[0].split('').reverse()
      const r = s.split('.')[1]
      let t = ''
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
      }
      return t.split('').reverse().join('') + '.' + r
    },
    // 新增合同弹窗显示
    showAddContractDialog () {
      this.$refs.addContractDialog.show()
    },
    // 选择采买渠道
    handleSelectSaleChance (chanceValue) {
      this.condition.sale_chance = chanceValue
      this.pagination.currentPage = 1
      this.queryContract()
    },
    // 获取客户经理
    getAccountManager () {
      return new Promise((resolve, reject) => {
        queryUserNames({ role: ROLE_CODE.customer_manager + ',' + ROLE_CODE.major_customer_manager })
          .then(res => {
            if (res.data.success) {
              this.accountManager = res.data.data.user_data
              resolve()
            } else {
              this.$message({
                type: 'warning',
                message: res.data.message,
                duration: 2000,
                showClose: true
              })
              reject(res.data.message)
            }
          }).catch(error => {
            this.$message({
              type: 'error',
              message: '客户经理获取失败，稍后重试',
              duration: 2000,
              showClose: true
            })
            console.log(error.message)
            reject(error)
          })
      })
    },
    // 查询合同
    queryContract () {
      this.list = []
      this.condition.page_num = this.pagination.currentPage
      this.condition.num = this.pagination.pageSize
      this.loading = true
      queryContract(this.condition).then(res => {
        if (res.data.success) {
          this.list = res.data.data.data
          // 处理回收标志
          // this.list = this.list.map(item => {
          //   item.contract_info.recycled = item.contract_info.is_recycled === 1
          //   return item
          // })
          this.pagination.total = res.data.data.total
          // 处理合同回收状态
          this.recycledStatusList = this.list.map(item => {
            // item.contract_info.recycled = item.contract_info.is_recycled === 1
            return {
              status: item.contract_info.is_recycled === 1,
              loading: false
            }
          })

          // console.log(res.data.data)
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
        }
        this.loading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '查询合同失败，稍后重试',
          duration: 2000,
          showClose: true
        })
        console.log(error.message)
        this.loading = false
      })
    },
    // 表格多选发生改变
    handleSelectionChange (selection) {
      this.selection = selection
    },
    // 批量删除合同
    handleDeleteContracts () {
      if (this.selection.length === 0) {
        this.$message({
          type: 'warning',
          message: '至少选择一条数据',
          showClose: true
        })
        return false
      }
      // console.log(this.currentUserInfo)
      const canDeleteCount = this.selection.reduce((sum, item) => {
        // sum += item.contract_info.contract_status === 2 ? 1 : 0
        // sum += item.contract_info.contract_status === this.currentUserInfo.id ? 1 : 0
        // 审核中和正常的合同不能删除，当前用户是该合同的客户经理可以删除，当前用户是该合同的创建者可以删除
        if (item.contract_info.contract_status !== 2 && item.contract_info.contract_status !== 4 && (this.currentUserInfo.id === item.contract_info.manager_id || this.currentUserInfo.id === item.contract_detail.add_by)) {
          sum += 1
        }
        return sum
      }, 0)

      this.$confirm(`可删列表 <span style="font-weight: bold;color:red;">${canDeleteCount}</span> 条<br>正常状态/非本人创建/客户经理非本人的情况下，<br>不允许删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'delete-contract-alert',
        center: true,
        dangerouslyUseHTMLString: true
      }).then(() => {
        if (canDeleteCount === 0) {
          this.$message({
            type: 'warning',
            message: '没有您可以删除的合同',
            duration: 2000,
            showClose: true
          })
        } else {
          deleteContracts({
            contract_id: this.selection.map(item => item.contract_info.id)
          }).then(res => {
            if (res.data.success) {
              this.queryContract()
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
              message: '合同删除失败，稍后重试',
              duration: 2000,
              showClose: true
            })
            console.log(error.message)
          })
        }
      }).catch(() => {})
    },
    // 重置搜索条件
    handleResetCondition () {
      this.condition = {
        sale_chance: undefined,
        contract_type: 3,
        contract_status: undefined,
        manager_id: undefined,
        is_recycled: undefined,
        partner_type: 2,
        last_annex_status: undefined,
        partner_name: undefined,
        contract_uid: undefined
      }
      this.queryContract()
    },
    // 点击审核合同
    handleReviewContractClick (contractInfo) {
      this.$refs.reviewDialog.show(contractInfo)
    },
    // 点击进入合同详情
    handleRowClick (row) {
      // console.log(row)
      this.$router.push({
        path: '/medium/contract-detail',
        query: {
          id: row.contract_info.id,
          contract_type: row.contract_info.contract_type
        }
      })
    },
    // 查看附件
    handleAttachmentLinkClick (attachmentUrl) {
      if (!attachmentUrl) return false
      const token = getToken()
      const link = document.createElement('a')
      // console.log(token)
      link.href = attachmentUrl + '?Authorization=' + token
      link.target = '_blank'
      link.click()
    },
    // 翻页
    handleCurrentChange () {
      // console.log(this.pagination.currentPage)
      this.queryContract()
    },
    handlePageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.queryContract()
    },
    // 点击作废
    handleInvalidClick (id) {
      this.$confirm('<i class="el-icon-warning" style="color:#E6A23C;font-size:24px;"></i><p>此操作将作废合同, 是否继续?</p>', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: 'warning',
        customClass: 'invalid-confirm',
        dangerouslyUseHTMLString: true
      }).then(() => {
        invalidContract({
          contract_id: id,
          invalid_code: 5
        }).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: res.data.message,
              duration: 2000,
              showClose: true
            })
            this.queryContract()
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message,
              duration: 2000,
              showClose: true
            })
          }
        })
      }).catch(() => {})
    },
    // 获取作废权限
    hasInvalidRight (row) {
      // debugger
      if (this.currentUserInfo) {
        return this.currentUserInfo.id === row.contract_info.manager_id || this.currentUserInfo.id === row.contract_info.add_by
      } else {
        return false
      }
    },
    // 点击新增合同附件按钮
    showAddContractAnnexDialog () {
      this.$refs.addAttachmentDialog.show()
    },
    // 点击按条件搜索按钮
    handleSearchClick () {
      this.pagination.currentPage = 1
      this.queryContract()
    }
  }
}
</script>
