<template>
  <div class="customer-detail-wrapper">
    <header-button :isback="true" :title="'客户详情'"
    :isedit="$store.getters['user/getUserRole'].includes(RIGHT_CODE.update_customer)" :edittip="'编辑客户详情'"
    :isdelete="$store.getters['user/getUserRole'].includes(RIGHT_CODE.del_customer)" :deltip="'删除客户'"
    @editClick="editCustomer" @deleteClick="delCustomer"></header-button>
    <div class="detail-content">
      <sub-panel :title="'客户信息'" :iserect="true">
        <el-row :gutter="10" class="text-block">
          <el-col :span="8" class="text-item">
            <span class="name">
              店铺名称：
            </span>
            <span class="text">
              {{detailForm.shopName}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              客户姓名：
            </span>
            <span class="text">
              {{detailForm.customerName || '-'}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              手 机 号：
            </span>
            <span class="text">
              {{detailForm.mobile || defaultVal}}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="text-block">
          <el-col :span="8" class="text-item">
            <span class="name">
              店铺类型：
            </span>
            <span class="text">
              {{shopTypeFormat({shop_type: detailForm.shopType})}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              客户类目：
            </span>
            <span class="text">
              {{categoryFormate({category: detailForm.category})}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              微 信 号：
            </span>
            <span class="text">
              {{detailForm.wechat || defaultVal}}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="text-block">
          <el-col :span="8" class="text-item">
            <span class="name">
              公司名称：
            </span>
            <span class="text">
              {{detailForm.companyName}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              客户分类：
            </span>
            <span class="text">
              {{detailForm.customerClass?customerClassList[detailForm.customerClass].value : defaultVal}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              客户地址：
            </span>
            <span class="text">
              {{(detailForm.province + detailForm.city + detailForm.county + detailForm.addrDetail) || defaultVal }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="text-block">
<!--          <el-col :span="8" class="text-item">-->
<!--            <span class="name">-->
<!--              客户阶段：-->
<!--            </span>-->
<!--            <span class="text">-->
<!--              {{detailForm.level?customerLevelList[detailForm.level].value:defaultVal}}-->
<!--              <el-popover v-if="detailForm.level" placement="bottom" width="170" trigger="click" popper-class="detail-step-popover-wrapper">-->
<!--                <div class="step-popover-wrapper">-->
<!--                  <div class="title">当前客户阶段</div>-->
<!--                  <step-mini :level="customerLevelList[detailForm.level].type"></step-mini>-->
<!--                </div>-->
<!--                <div slot="reference" class="click-look-step">点击查看</div>-->
<!--              </el-popover>-->
<!--            </span>-->
<!--          </el-col>-->
          <el-col :span="8" class="text-item">
            <span class="name">
              客户类型：
            </span>
            <span class="text">
              {{companyTypeFormat({company_type: detailForm.companyType})}}
            </span>
          </el-col>
        </el-row>
      </sub-panel>

      <!-- <div class="step-box">
        <detail-step :level="detailForm.level"></detail-step>
      </div> -->
      <sub-panel :title="'跟进人'" :iserect="true">
        <el-row :gutter="10" class="text-block">
          <el-col :span="8" class="text-item">
            <span class="name">
              客户经理：
            </span>
            <span class="text">
              {{detailForm.manager || defaultVal}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              所属部门：
            </span>
            <span class="text">
              {{detailForm.department?departmentList[detailForm.department].value:defaultVal}}
            </span>
          </el-col>
        </el-row>
      </sub-panel>
      <sub-panel :title="'财务信息'" :iserect="true">
        <el-row :gutter="10" class="text-block">
          <el-col :span="8" class="text-item">
            <span class="name w100">
              公司开票抬头：
            </span>
            <span class="text">
              {{detailForm.invoiceTitle || defaultVal}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              开户行：
            </span>
            <span class="text">
              {{detailForm.invoiceBank || defaultVal}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              电话：
            </span>
            <span class="text">
              {{detailForm.invoicePhone || defaultVal}}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="text-block">
          <el-col :span="8" class="text-item">
            <span class="name w100">
              纳税识别号：
            </span>
            <span class="text">
              {{detailForm.invoiceNumber || defaultVal}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              账号：
            </span>
            <span class="text">
              {{detailForm.invoiceAccount || defaultVal}}
            </span>
          </el-col>
          <el-col :span="8" class="text-item">
            <span class="name">
              地址：
            </span>
            <span class="text">
              {{(detailForm.invoiceAddr) || defaultVal }}
            </span>
          </el-col>
        </el-row>
      </sub-panel>
    </div>
    <add-customer v-if="customerVisible" @close="close" @save="saveCustomer" :customerForm="detailFormEdit" :id="id"></add-customer>
  </div>
</template>

<script>
import { queryCustomer, delCustomer } from '@/api/customer'
import { categoryFormate, customerClassList, departmentList, customerLevelList, shopTypeFormat, companyTypeFormat } from '@/utils/format'
import detailStep from './components/step.vue'
import addCustomer from './components/addCustomer.vue'
import stepMini from './components/stepMini'
import { RIGHT_CODE } from '@/const/roleCode'

export default {
  name: 'customerDetail',
  data() {
    return {
      RIGHT_CODE,
      customerClassList,
      departmentList,
      customerLevelList,
      defaultVal: '-',
      id: 0,
      detailForm: {
        // 店铺名
        shopName: '',
        // 店铺类型
        shopType: 0,
        // 客户类目
        category: 0,
        // 公司名称
        companyName: '',
        // 客户类型
        companyType: '',
        // 客户姓名
        customerName: '',
        // 客户阶段
        level: '',
        // 客户分类
        customerClass: '',
        // 手机号
        mobile: '',
        // 微信号
        wechat: '',
        // 客户意向
        intention: '',
        province: '',
        city: '',
        county: '',
        addrDetail: '',
        // ----------跟进人---------------
        // 客户经理
        manager: '',
        // 部门
        department: '',
        // ----------财务信息---------------
        // 公司开票抬头
        invoiceTitle: '',
        // 地址
        invoiceAddr: '',
        // 纳税识别号
        invoiceNumber: '',
        // 账号
        invoiceAccount: '',
        // 开户行
        invoiceBank: '',
        // 电话号码
        invoicePhone: '',
        coopAe: [],
        managerName: ''
      },
      detailFormEdit: null,
      customerVisible: false
    }
  },
  created() {
    if (this.$route.query.id) {
      this.detailFormEdit = this.detailForm
      this.id = this.$route.query.id
      this.queryCustomer()
    } else {
      this.$router.back()
    }
  },
  methods: {
    close() {
      this.detailForm = this.detailFormBak
      this.customerVisible = false
    },
    // 获取客户详情
    queryCustomer() {
      let params = {
        customer_id: this.id
      }
      queryCustomer(params).then(res => {
        if (res.data.success) {
          let form = res.data.data.data[0]
          this.formatForm(form)
        }
      })
    },
    formatForm(form) {
      this.detailForm = {
        // 店铺名
        shopName: form.shop_name,
        shopType: form.shop_type,
        // 客户类目
        category: form.category,
        // 公司名称
        companyName: form.company_name,
        companyType: form.company_type,
        // 客户姓名
        customerName: form.customer_name,
        // 客户阶段
        level: form.level,
        // 客户分类
        customerClass: form.customer_class || '',
        // 手机号
        mobile: form.mobile,
        // 微信号
        wechat: form.wechat,
        // 客户意向
        intention: form.intention,
        province: form.addr_province,
        city: form.addr_town,
        county: form.addr_county,
        addrDetail: form.addr_detail,
        // ----------跟进人---------------
        // 客户经理
        manager: form.manager,
        managerId: form.manager_id,
        // 部门
        department: form.department || '',
        // ----------财务信息---------------
        // 公司开票抬头
        invoiceTitle: form.invoice_title,
        // 地址
        invoiceAddr: form.invoice_addr,
        // 纳税识别号
        invoiceNumber: form.invoice_number,
        // 账号
        invoiceAccount: form.invoice_account,
        // 开户行
        invoiceBank: form.invoice_bank,
        // 电话号码
        invoicePhone: form.invoice_phone,
        coopAe: form.coop_ae,
        managerName: form.manager_name
      }
    },
    // 删除客户
    delCustomer() {
      this.$confirm('此操作将删除该客户数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'warning-icon'
      }).then(() => {
        let params = {
          customer_id: this.id
        }
        delCustomer(params).then(res => {
          if (res.data.success) {
            this.$gmMessage('删除成功')
            this.$router.push({
              path: '/customer'
            })
          } else {
            this.$gmMessage(res.data.message, 'tip')
          }
        })
      })
    },
    // 编辑客户
    editCustomer() {
      this.detailForm.department += '' // 将部门id转化为字符串，编辑弹窗需要字符串类型的部门id
      this.detailFormBak = JSON.parse(JSON.stringify(this.detailForm))
      this.detailFormEdit = JSON.parse(JSON.stringify(this.detailForm))
      this.customerVisible = true
    },
    // 保存客户
    saveCustomer(form) {
      this.$gmMessage('保存成功')
      this.customerVisible = false
      this.$nextTick(() => {
        this.formatForm(JSON.parse(JSON.stringify(form)))
      })
    },
    categoryFormate,
    shopTypeFormat,
    companyTypeFormat
  },
  components: {
    detailStep,
    addCustomer,
    stepMini
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/vars.scss';
.customer-detail-wrapper {
  background: #fff;
  .detail-title {
    height: 54px;
    border-bottom: 1px solid #f5f5f5;
    padding: 0 0 0 12px;
    display: flex;
    .el-icon-arrow-left {
      font-size: 18px;
      margin-top: 19px;
      color: #999;
      cursor: pointer;
    }
    .title-text {
      padding: 19px 0 0 10px;
      line-height: 1.1;
      flex: 1;
      font-size: 16px;
      color: #666;
      font-weight: bold;
      cursor: pointer;
      display: inline-block;
    }
    .icon-item {
      width: 56px;
      border-left: 1px solid #f5f5f5;
      text-align: center;
      i {
        margin-top: 10px;
      }
    }
  }
  .detail-content {
    padding: 0 30px 96px;
    .content-title {
      margin-top: 30px;
      border-bottom: 1px dashed #efefef;
      line-height: 1;
      font-size: 14px;
      color: #666666;
      font-weight: bold;
      position: relative;
      padding: 0 0 12px 12px;
      &::before {
        position: absolute;
        top: 2px;
        left: 0;
        width: 3px;
        height: 10px;
        content: '';
        background: $color-primary;
      }
    }
    .content-text {
      padding: 2px 30px 0;
      .text-block {
        margin-top: 18px;
        flex-wrap: wrap;
        font-size: 14px;
        line-height: 1;
        .text-item {
          display: flex;
          .name {
            color: #999;
            width: 70px;
            text-align: right;
            &.w100 {
              width: auto;
            }
          }
          .text {
            color: #666;
            flex: 1;
            overflow:hidden;
            word-wrap: break-word;
            &.nowrap {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .lookall {
            color: $color-primary;
            cursor: pointer;
            .el-icon-arrow-down {
              display: inline;
            }
            .el-icon-arrow-up {
              display: none;
            }
            &:hover {
              .el-icon-arrow-down {
                display: none;
              }
              .el-icon-arrow-up {
                display: inline;
              }
            }
          }
          .click-look-step {
            display: inline-block;
            color: $color-primary;
            cursor: pointer;
            outline: none;
          }
        }
      }
    }
  }
}
</style>
<style>
.detail-step-popover-wrapper {
  padding: 0 0 15px 0;
}
.detail-step-popover-wrapper .title {
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 34px;
  padding-left: 20px;
  border-bottom: 1px solid #f2f1f1;
}
</style>
