<!--
 * @Description: 合同详情
 * @Author: 白青
 * @Date: 2019-08-15 11:38:49
 * @LastEditTime: 2019-09-12 14:30:38
 * @LastEditors: 白青
 -->
<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  #contract-detail {
    min-width: 1000px;
    .contract-detail-title {
      height: 54px;
      line-height: 54px;
      background: #fff;
      border-bottom: #F5F5F5 solid 1px;
      overflow: hidden;
      .title-left {
        padding-left: 12px;
        font-size: 16px;
        color: #666;
        font-weight: bold;
        i {
          font-size: 20px;
          color: #BFC1C8;
          vertical-align: text-top;
          margin-right: 8px;
          margin-top: -1px;
          cursor: pointer;
        }
      }
      .oprate-btn {
        float: right;
        .icon-btn {
          display: inline-block;
          width: 56px;
          text-align: center;
          border-left: #F5F5F5 solid 1px;
          .gm-icon {
            display: inline-block;
            margin-top: 9px;
          }
          // .check {
          //   display: inline-block;
          //   width: 34px;
          //   height: 34px;
          //   margin-top: 9px;
          //   cursor: pointer;
          //   background: url(../../assets/img/contract_opreate_icon_edit_1.png) no-repeat center center;
          //   &:hover {
          //     background: url(../../assets/img/contract_opreate_icon_edit_2.png) no-repeat center center;
          //   }
          // }
        }
      }
    }
    .contract-detail-content {
      background: #fff;
      min-height: 400px;
      .content-block {
        padding: 0 30px;
        .block-title {
          height: 37px;
          line-height: 37px;
          padding-top: 17px;
          border-bottom: #EFEFEF dashed 1px;
          position: relative;
          padding-left: 12px;
          color: #666;
          &::before {
            content: '';
            display: block;
            width: 3px;
            height: 10px;
            background: #5C82FF;
            position: absolute;
            left: 0px;
            top: 30px;
          }
        }
        .block-content {
          &.basic-info {
            padding: 10px 0 0 30px;
            .info-line {
              min-height: 35px;
              line-height: 35px;
              .label {
                color: #999;
                &.sale-chance-label {
                  vertical-align: middle;
                }
              }
              .value {
                color: #666;
                &.contract-number {
                  color: #4C76FF;
                  font-weight: bold;
                }
                &.sale-chance-value {
                  width: calc(100% - 80px);
                  display: inline-block;
                  vertical-align: text-top;
                  line-height: 20px;
                  // .show-content {
                  //   display: inline-block;
                  //   overflow: hidden;
                  //   text-overflow: ellipsis;
                  //   white-space: nowrap;
                  //   width: calc(100% - 80px);
                  //   vertical-align: middle;
                  // }
                  // .show-more {
                  //   vertical-align: middle;
                  //   color: #4C76FF;
                  //   cursor: pointer;
                  //   i {
                  //     margin-left: 5px;
                  //   }
                  // }
                }
                .contract-status-1 { color: #FF8549; }
                .contract-status-2 { color: $color-primary; }
                .contract-status-3 { color: #F34B60; }
                .contract-status-4 { color: #F34B60; }
                .approve-btn {
                  margin-left: 12px;
                  border-bottom: #9FA3B3 solid 1px;
                  padding: 0 2px;
                  color: #9FA3B3;
                  cursor: pointer;
                  i {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background: url(../../assets/img/shenpi_icon.png) no-repeat;
                    vertical-align: middle;
                    margin-right: 4px;
                    position: relative;
                    bottom: 1px;
                  }
                  &:hover {
                    color: $color-primary;
                    border-color: $color-primary;
                    i {
                      background-position: -12px 0;
                    }
                  }
                }
                .see-reason-btn {
                  color: $color-primary;
                  cursor: pointer;
                }
              }
            }
          }
          &.contract-detail {
            padding: 20px 30px 0;
            .attachment {
              background: #F8F8F8;
              height: 42px;
              line-height: 42px;
              margin-top: 10px;
              padding: 0 20px;
              .attachment-label {
                color: #666;
              }
              .attachment-icon {
                vertical-align: middle;
                width: 30px;
              }
              .attachment-name {
                color: #5C82FF;
              }
              .attachment-link {
                margin-left: 14px;
                font-weight: bold;
                color: #5C82FF;
              }
              .no-attachment {
                color: #666;
              }
            }
          }
          &.plan-list, &.attachment-list {
            padding: 20px 30px;
          }
          &.attachment-list {
            .download-btn {
              text-decoration: underline;
              color: $color-primary;
              margin: 0 5px;
            }
            .delete-btn {
              text-decoration: underline;
              color: #F34B60;
              margin: 0 5px;
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
              &.status-dot-4 { background-color: #F34B60; }
              &.status-dot-5 { background-color: #aaa; }
            }
          }
        }
      }
      .no-detail {
        text-align: center;
        padding-top: 140px;
        p {
          color: #999;
          margin-top: 30px;
        }
      }
    }
  }
</style>
<style lang="scss">
.delete-contract-alert.el-message-box .el-message-box__content{
  height: initial;
}
.delete-contract-alert.el-message-box .el-message-box__content .el-message-box__message {
  top: 0;
}
.approve-progress-popper {
  padding: 0;
}
.delete-attachment-confirm.el-message-box {
  .el-message-box__content {
    height: initial;
    text-align: center;
  }
  .el-message-box__status {
    position: initial;
  }
  .el-message-box__message {
    position: initial;
    top: initial!important;
  }
}
</style>

<template>
  <div id="contract-detail">
    <div class="contract-detail-title">
      <span class="title-left"><i class="el-icon-arrow-left" @click="$router.back()"></i>合同详情</span>
      <div class="oprate-btn">
        <template v-if="oprateBtnVisiable() && detail">
          <span v-if="detail.contract_info.contract_status !== 5" class="icon-btn" @click="handleEditContractClick"><i class="gm-icon gm-icon-edit"></i></span>
          <span class="icon-btn" @click="handleDeleteContractClick"><i class="gm-icon gm-icon-delete"></i></span>
        </template>
        <!-- 合同未完成审核和具有审核权限的角色显示 -->
        <!-- <span v-if="hasApprovalRight && (detail && detail.contract_info.contract_status !== 2)" class="icon-btn" @click="handleReviewBtnClick"><i class="check"></i></span> -->
      </div>
    </div>
    <div v-loading="loading" class="contract-detail-content">
      <div v-if="detail" class="content-block">
        <div class="block-title">合同基础信息</div>
        <div class="block-content basic-info">
          <el-row>
            <el-col :span="12">
              <div class="info-line">
                <span class="label">合同编号：</span>
                <span class="value contract-number">{{detail.contract_info.contract_uid}}</span>
              </div>
              <div class="info-line">
                <span class="label">供应商名称：</span>
                <span class="value">{{detail.partner_info.partner_name || '--'}}</span>
              </div>
              <div class="info-line">
                <span class="label">合同类型：</span>
                <span class="value">{{detail.contract_info.contract_type_str}}</span>
              </div>
              <div class="info-line">
                <span class="label sale-chance-label">采买渠道：</span>
                <span class="value sale-chance-value">{{processSaleChanceToStr(detail.contract_info.sale_chance)}}
                  <!-- <span class="show-content">{{processSaleChanceToStr(detail.contract_info.sale_chance)}}</span>
                  <span class="show-more">查看全部<i class="el-icon-arrow-down"></i></span> -->
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="info-line">
                <span class="label">所属部门：</span>
                <span class="value">{{detail.contract_info.department_str}}</span>
              </div>
              <div class="info-line">
                <span class="label">客户经理：</span>
                <span class="value">{{detail.contract_info.manager_name}}</span>
              </div>
              <div class="info-line">
                <span class="label">创建人：</span>
                <span class="value">{{detail.contract_info.add_by_name || '--'}}</span>
              </div>
              <div class="info-line">
                <span class="label">创建时间：</span>
                <span class="value">{{detail.contract_info.create_time_str.split(' ')[0]}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="info-line">
                <span class="label">合同状态：</span>
                <span class="value">
                  <span :class="`contract-status-${detail.contract_info.contract_status}`">{{detail.contract_info.contract_status_str}}</span>
                  <!-- <span v-if="hasApprovalRight && (detail && detail.contract_info.contract_status !== 2)" class="approve-btn" @click="handleReviewBtnClick"><i></i>审批</span> -->
                </span>
              </div>
              <div v-if="detail.contract_info.contract_status !== 5" class="info-line">
                <span class="label">审批状态：</span>
                <span class="value">
                  <el-popover
                    v-if="detail.contract_work_infos.length > 0"
                    placement="bottom"
                    width="246"
                    trigger="click"
                    popper-class="approve-progress-popper">
                    <span class="see-reason-btn" slot="reference">点击看进度</span>
                    <approve-progress :work-infos="detail.contract_work_infos" :contract-info="detail"></approve-progress>
                  </el-popover>
                </span>
              </div>
              <div v-if="detail.contract_info.contract_status !== 5" class="info-line">
                <span class="label">附件状态：</span>
                <span class="value">
                  <el-popover
                    v-if="detail.contract_annex_work_infos.length > 0"
                    placement="bottom"
                    width="246"
                    trigger="click"
                    popper-class="approve-progress-popper">
                    <span class="see-reason-btn" slot="reference">点击看进度</span>
                    <approve-progress type="fj" :work-infos="detail.contract_annex_work_infos" :contract-info="detail"></approve-progress>
                  </el-popover>
                  <span v-else>--</span>
                </span>
              </div>
              <div class="info-line">
                <span class="label">合同回收状态：</span>
                <span class="value">
                  <!-- <template v-if="detail.contract_info.contract_status === 2 && getCurrentUserRoleCode() === ROLE_CODE.risk_control_specialist"> -->
                    <!-- 风控显示操作按钮，其他人显示状态文字 -->
                    <!-- <span>{{isRecycled ? '已收回' : '未收回'}}</span>
                    <el-switch v-model="isRecycled" @change="handleContractRecycleChange"></el-switch>
                  </template> -->
                  <template>
                    <span>{{detail.contract_info.is_recycled === 1 ? '已收回' : '未收回'}}</span>
                  </template>
                </span>
              </div>
              <!-- <div class="info-line">
                <span class="label">审批人：</span>
                <span class="value">{{detail.contract_info.approver_name}}</span>
              </div>
              <div class="info-line">
                <span class="label">审批时间：</span>
                <span class="value">{{detail.contract_info.approve_time_str || '--'}}</span>
              </div> -->
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="detail" class="content-block">
        <div class="block-title">合作协议明细</div>
        <div class="block-content contract-detail">
          <el-table
            :data="detailList"
            border
            :header-cell-style="{backgroundColor: '#F3F5F8', color: '#666'}"
          >
            <!-- <el-table-column
              label="序号 "
              :formatter="(row, column, cellValue, index) => index + 1"
              width="63"
              align="center">
            </el-table-column> -->
            <el-table-column
              prop="sale_chance"
              label="产品(采买渠道)"
              :formatter="row => row.sale_chance"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="num"
              label="数量"
              width="90"
              align="right">
            </el-table-column>
            <el-table-column
              prop="unit_str"
              label="单位"
              width="100"
              align="right">
            </el-table-column>
            <el-table-column
              prop="price"
              label="标准单价"
              min-width="100"
              align="right">
            </el-table-column>
            <el-table-column
              prop="discount"
              label="折扣"
              width="100"
              align="right">
            </el-table-column>
            <el-table-column
              prop="contract_amount"
              label="合同金额"
              min-width="100"
              align="right">
            </el-table-column>
          </el-table>
          <div v-if="detail" class="attachment">
            <span class="attachment-label">合同附件：</span>
            <template v-if="detail.contract_detail.attachment_url">
              <img class="attachment-icon" src="@/assets/img/contract_opreate_icon_annex_1.png">
              <span class="attachment-name">{{detail.contract_detail.attachment_url.split('/')[detail.contract_detail.attachment_url.split('/').length - 1]}}</span>
              <a class="attachment-link" :href="detail.contract_detail.attachment_url + '?Authorization=' + getToken()" target="_blank">下载</a>
            </template>
            <template v-else>
              <span class="no-attachment">未上传附件</span>
            </template>
          </div>
        </div>
      </div>
      <div v-if="detail" class="content-block">
        <div class="block-title">付款计划</div>
        <div class="block-content plan-list">
          <el-table
            :data="detail.proceeds_plan"
            border
            :header-cell-style="{backgroundColor: '#F3F5F8', color: '#666'}"
            :cell-style="{borderBottom: '1px solid #ebeef5'}"
          >
            <el-table-column
              label="序号 "
              :formatter="(row, column, cellValue, index) => index + 1"
              width="63"
              align="center">
            </el-table-column>
            <el-table-column
              prop="proceeds_amount"
              label="付款金额"
              align="right">
            </el-table-column>
            <el-table-column
              prop="proceeds_plan_date_str"
              label="计划付款日期"
              align="right">
            </el-table-column>
            <el-table-column
              prop="obtained_amount"
              label="已付金额"
              align="right">
            </el-table-column>
            <el-table-column
              prop="to_obtain_amount"
              label="待付金额"
              align="right">
            </el-table-column>
            <el-table-column
              prop="invoice_amount"
              label="已开票"
              align="right">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="detail" class="content-block">
        <div class="block-title">补充附件</div>
        <div class="block-content attachment-list">
          <!-- {{detail.contract_annex_info}} -->
          <el-table
            :data="attachment_url_list"
            border
            :header-cell-style="{backgroundColor: '#F3F5F8', color: '#666'}"
            :cell-style="{borderBottom: '1px solid #ebeef5'}"
          >
            <el-table-column
              label="序号"
              type="index"
              width="63"
              align="center">
            </el-table-column>
            <el-table-column
              label="附件名称"
              :formatter="row => row.attachment_url.split('/')[row.attachment_url.split('/').length - 1]">
            </el-table-column>
            <el-table-column
              label="申请内容"
              prop="comment">
            </el-table-column>
            <el-table-column
              label="附件状态"
              prop="contract_annex_status_str"
              width="180"
              align="center"
            >
              <template slot-scope="{row}">
                <em :class="['status-dot', 'status-dot-' + row.contract_annex_status]"></em>
                {{row.contract_annex_status_str}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="170"
              align="center"
            >
              <template slot-scope="{row}">
                <a :href="row.attachment_url" target="_blank" class="download-btn" type="text">下载</a>
                <el-button v-if="attachmentDeleteRight(row)" class="delete-btn" type="text" @click="handleAttachmentClick(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="!detail" class="no-detail">
        <img src="@/assets/img/pls_import_product.png">
        <p>没有查询到合同详情</p>
      </div>
    </div>
    <add-contract ref="editContractDialog" type="edit" @edited="getContractDetail"></add-contract>
    <review-dialog ref="reviewDialog" @approved="getContractDetail"></review-dialog>
  </div>
</template>

<script>
import { queryContract, deleteContract, setContractRecycle, deleteContractAnnex } from '@/api/customer'
import AddContract from '@/views/medium/components/addContract'
import ReviewDialog from '@/views/customer/components/reviewDialog'
import ApproveProgress from '@/views/customer/components/approveProgress'
import { getToken } from '@/utils/token'
import { CONSTRACT_APPROVER } from '@/utils/config'
import { ROLE_CODE } from '@/const/roleCode'
// import { getUserInfo } from '@/api/auth'

export default {
  name: 'ContractDetail',
  components: {
    AddContract,
    ApproveProgress,
    ReviewDialog
  },
  data () {
    return {
      ROLE_CODE,
      CONSTRACT_APPROVER,
      detailList: [
        // {
        //   sale_chance: ['小红书', '淘宝直播', '抖音', '快手'],
        //   num: 4,
        //   unit_str: '场',
        //   price: '8800.00',
        //   discount: '5.50',
        //   contract_amount: '48400.00'
        // }
      ],
      detail: null,
      getToken,
      loading: false,
      currentUserInfo: null,
      // 合同【收回】状态
      isRecycled: false,
      attachment_url_list: []
    }
  },
  computed: {
    // 计算是否有审核权限
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
    this.getContractDetail()
    // await this.getUserInfo()
    // 获取当前用户信息
    this.currentUserInfo = this.$store.getters['user/getUserInfo']
  },
  methods: {
    // 获取详情
    getContractDetail () {
      if (!this.$route.query.id) return false
      this.loading = true
      queryContract({
        id: this.$route.query.id,
        contract_type: this.$route.query.contract_type,
        partner_type: 2
      }).then(res => {
        if (res.data.success) {
          if (res.data.data.data.length > 0) {
            this.detail = res.data.data.data[0]
            // 附件列表
            // contract_annex_info 附件列表，列表里面没有个附件 对应多个文件，所以要展示的话，需要遍历整理数据
            this.attachment_url_list = []
            if (this.detail.contract_annex_info.length > 0) {
              for (let i = 0; i < this.detail.contract_annex_info.length; i++) {
                // this.attachment_url_list = this.attachment_url_list.concat(this.detail.contract_annex_info[i].attachment_url_list || [])
                if (this.detail.contract_annex_info[i].attachment_url_list.length > 0) {
                  for (let j = 0; j < this.detail.contract_annex_info[i].attachment_url_list.length; j++) {
                    this.attachment_url_list.push({
                      // 文件地址
                      attachment_url: this.detail.contract_annex_info[i].attachment_url_list[j],
                      // 附件审核状态
                      contract_annex_status: this.detail.contract_annex_info[i].contract_annex_status,
                      // 附件审核状态文字
                      contract_annex_status_str: this.detail.contract_annex_info[i].contract_annex_status_str,
                      // 创建者id
                      add_by: this.detail.contract_annex_info[i].add_by,
                      // 客户经理id
                      manager_id: this.detail.contract_annex_info[i].manager_id,
                      // 附件id
                      id: this.detail.contract_annex_info[i].id,
                      // 申请内容
                      comment: this.detail.contract_annex_info[i].comment
                    })
                  }
                }
              }
            }
            // 赋值协议明细
            this.detailList = [
              {
                sale_chance: this.processSaleChanceToStr(this.detail.contract_info.sale_chance),
                num: this.detail.contract_detail.num,
                unit_str: this.detail.contract_detail.unit_str,
                price: this.detail.contract_detail.price,
                discount: this.detail.contract_detail.discount,
                contract_amount: this.detail.contract_detail.contract_amount
              }
            ]
            // 赋值 合同状态
            this.isRecycled = this.detail.contract_info.is_recycled === 1
          }
          //  else {
          //   this.$message({
          //     type: 'warning',
          //     message: '没有查询到合同详情',
          //     duration: 2000,
          //     showClose: true
          //   })
          // }
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
          message: '合同详情获取失败，稍后重试',
          duration: 2000,
          showClose: true
        })
        this.loading = false
        console.log(error.message)
      })
    },
    // 处理销售渠道
    processSaleChanceToStr (saleChance) {
      // console.log(saleChance)
      let str = ''
      saleChance.map(item => {
        str += item.sale_chance_name + '、'
        return item
      })
      return str.substr(0, str.length - 1)
    },
    // 删除合同
    handleDeleteContractClick () {
      if (!this.detail) return false
      this.$confirm('此操作将删除该合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'delete-contract-alert',
        center: true
      }).then(() => {
        deleteContract({
          contract_id: this.detail.contract_info.id
        }).then(res => {
          this.$message({
            type: res.data.success ? 'success' : 'warning',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
          if (res.data.success) {
            this.$router.back()
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
      }).catch(() => {})
    },
    // 编辑合同
    handleEditContractClick () {
      if (!this.detail) return false

      this.$refs.editContractDialog.show(this.detail)
    },
    // 获取当前用户信息
    // async getUserInfo () {
    //   try {
    //     const res = await getUserInfo()
    //     if (res.status === 200 && res.data.success) {
    //       this.currentUserInfo = res.data.data
    //     } else {
    //       this.$message({
    //         type: 'warning',
    //         message: res.data.message,
    //         duration: 2000,
    //         showClose: true
    //       })
    //     }
    //   } catch (error) {
    //     this.$message({
    //       type: 'error',
    //       message: '用户信息获取失败，稍后重试',
    //       duration: 2000,
    //       showClose: true
    //     })
    //     console.log(error)
    //   }
    // },
    oprateBtnVisiable () {
      // 当合同状态为【正常】时不可以删除，【审批中】不可删除，合同的客户经理id等于当前用户的时候可以删除，合同的创建者为当前用户可以删除
      const visiable = (this.detail && this.detail.contract_info.contract_status !== 2 && this.detail.contract_info.contract_status !== 4) &&
        this.currentUserInfo &&
        (this.currentUserInfo.id === this.detail.contract_info.manager_id || this.currentUserInfo.id === this.detail.contract_detail.add_by)
      return visiable
    },
    // 合同附件删除权限
    attachmentDeleteRight (attachment) {
      const currentUserInfo = this.$store.getters['user/getUserInfo']
      const visiable = attachment.contract_annex_status !== 4 && // 附件状态除审批中状态可以删除
        ((currentUserInfo && currentUserInfo.id === attachment.add_by) || // 创建人自己可以删除
        (currentUserInfo && currentUserInfo.id === attachment.manager_id)) // 创建时指定的客户经理可以删除
      return visiable
    },
    // 点击审核按钮
    handleReviewBtnClick () {
      this.$refs.reviewDialog.show(this.detail.contract_info)
    },
    // 获取当前用户的角色码
    getCurrentUserRoleCode () {
      if (this.currentUserInfo && this.currentUserInfo.role_info.length > 0) {
        return this.currentUserInfo.role_info[0].role_code
      } else {
        return false
      }
    },
    // 点击设置合同收回状态
    handleContractRecycleChange () {
      setContractRecycle({
        id: this.detail.contract_info.id,
        is_recycled: this.isRecycled ? 1 : 0
      }).then(res => {
        if (res.data.success) {
          // this.queryContract()
          this.$message({
            type: 'success',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
        } else {
          // 出错，恢复之前的状态
          this.isRecycled = !this.isRecycled
          this.$message({
            type: 'warning',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
        }
      }).catch(error => {
        // 出错，恢复之前的状态
        this.isRecycled = !this.isRecycled
        this.$message({
          type: 'error',
          message: '设置合同回收状态失败，稍后重试',
          duration: 2000,
          showClose: true
        })
        console.log(error.message)
      })
    },
    // 点击删除附件
    handleAttachmentClick (row) {
      this.$confirm('此操作将永久删除该附件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'delete-attachment-confirm'
      }).then(() => {
        deleteContractAnnex({
          contract_annex_id: row.id,
          attachment_url: row.attachment_url
        }).then(res => {
          if (res.data.success) {
            this.getContractDetail()
            this.$message.success(res.data.message, {
              duration: 2000,
              showClose: true
            })
          } else {
            this.$message.warning(res.data.message, {
              duration: 2000,
              showClose: true
            })
          }
        }).catch(error => {
          this.$message.error('删除附件失败，请稍后重试', {
            duration: 2000,
            showClose: true
          })
          console.error(error)
        })
      }).catch(() => {})
    }
  }
}
</script>
