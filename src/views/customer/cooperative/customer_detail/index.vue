<template>
  <div v-if="CustomerDetail !== null">
    <div class="cutomer-detail-container">
      <header-button :isback="true" :title="'客户详情'" :subtitle="addByFormat(CustomerDetail)"
      :isedit="UserRoles.includes(RIGHT_CODE.update_customer)" :edittip="'编辑客户详情'"
      :isdelete="UserRoles.includes(RIGHT_CODE.del_customer)" :deltip="'删除客户'"
      @editClick="editCustomer" @deleteClick="delCustomer"></header-button>
      <CustomerDetailInfo :CustomerDetail="CustomerDetail"></CustomerDetailInfo>
    </div>
    <CustomerChatRecord />
    <CustomerCooperationList />
    <add-customer v-if="customerVisible" @close="close" @save="saveCustomer" :customerForm="detailFormEdit" :id="id"></add-customer>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {delCustomer} from '@/api/customer'
import {RIGHT_CODE} from '@/const/roleCode'
import {addDateFormat} from '@/utils/format'
import CustomerDetailInfo from './components/CustomerDetailInfo'
import CustomerChatRecord from './components/CustomerChatRecord'
import CustomerCooperationList from './components/CustomerCooperationList'
import addCustomer from '../../components/addCustomer'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'CustomerDetail',
  components: {
    CustomerDetailInfo,
    CustomerChatRecord,
    CustomerCooperationList,
    addCustomer
  },
  mixins: [CooperativeStore],
  data () {
    return {
      RIGHT_CODE,
      id: 0,
      detailFormEdit: null,
      customerVisible: false
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.initCustomerInfo(this.$route.query.id)
    } else {
      this.$router.back()
    }
  },
  methods: {
    ...mapActions({
      GetConversation: 'cooperative/GetConversation',
      GetCooperation: 'cooperative/GetCooperation'
    }),
    // 初始化客户相关信息
    initCustomerInfo (id) {
      // 初始化客户信息
      this.GetCustomerDetail(this.id)
      // 初始化客户洽谈记录
      this.GetConversation({
        customer_id: id,
        num: 10,
        page_num: 1
      })
      // 初始化客户合作记录
      this.GetCooperation({
        customer_id: id,
        num: 10,
        page_num: 1
      })
    },
    // 编辑客户
    editCustomer () {
      let detailForm = this.formatForm(JSON.parse(JSON.stringify(this.CustomerDetail)))
      detailForm.department += '' // 将部门id转化为字符串，编辑弹窗需要字符串类型的部门id
      this.detailFormEdit = JSON.parse(JSON.stringify(detailForm))
      this.customerVisible = true
    },
    // 删除客户
    delCustomer () {
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
    // 格式化添加人信息
    addByFormat (customer) {
      return `创建人：${customer.add_by} ${addDateFormat(customer.gmt_create)}`
    },
    // 格式化表单字段
    formatForm(form) {
      return {
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
    // 关闭弹窗
    close() {
      this.detailForm = this.detailFormBak
      this.customerVisible = false
    },
    // 保存客户
    saveCustomer(form) {
      this.$gmMessage('保存成功')
      this.customerVisible = false
      this.GetCustomerDetail(this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .cutomer-detail-container {
    background: #fff;
  }
</style>
