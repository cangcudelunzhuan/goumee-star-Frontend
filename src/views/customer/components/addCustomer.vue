<!--
 * @Description: file content
 * @Author: 白青
 * @Date: 2019-09-29 15:22:06
 * @LastEditTime: 2019-09-29 15:36:49
 * @LastEditors: 白青
 -->
<template>
    <!-- :title="id?'编辑客户':'新增客户'" -->
  <el-dialog
    class="customer-dialog"
    :visible.sync="customerVisible"
    width="840px"
    :close-on-click-modal="false"
    @close="close"
  >
    <div class="customer-header" slot="title">
      <span v-if="id === 0" :class="[dialogType === 'onebyone' ? 'active' : '']" @click="handleImportType('onebyone')">新增客户</span>
      <span v-if="id !== 0" :class="[dialogType === 'onebyone' ? 'active' : '']">编辑客户</span>
      <span v-if="id === 0" :class="[dialogType === 'import' ? 'active' : '']" @click="handleImportType('import')">批量导入</span>
    </div>
    <div v-show="dialogType === 'onebyone'">
      <el-form class="customer-form" ref="customerForm" :model="customerForm" label-position="top" :rules="customerRules" size="small">
        <el-row class="form-title">
          客户信息
        </el-row>
        <el-row class="form-flex">
          <el-form-item :inline="true" label="店铺名称" prop="shopName">
            <el-input v-model="customerForm.shopName" placeholder="请输入店铺名称" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item :inline="true" label="公司名称">
            <el-input v-model="customerForm.companyName" placeholder="请输入公司名称" maxlength="20"></el-input>
          </el-form-item>
        </el-row>
        <el-row class="form-flex">
          <el-form-item :inline="true" label="店铺类型" prop="shopType">
            <el-radio class="type-radio" v-model="customerForm.shopType" v-for="tag in shopTypeRadio" :label="tag.value" :key="tag.value">{{tag.text}}</el-radio>
          </el-form-item>
          <el-form-item :inline="true" label="客户类型" prop="companyName">
            <el-radio class="type-radio" v-model="customerForm.companyType" v-for="tag in companyTypeRadio" :label="tag.value" :key="tag.value">{{tag.text}}</el-radio>
          </el-form-item>
        </el-row>
        <el-row class="form-flex">
          <el-form-item :inline="true" label="客户姓名" prop="customerName">
            <el-input v-model="customerForm.customerName" placeholder="请输入客户姓名" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item :inline="true" label="客户类目" prop="category">
            <el-select v-model="customerForm.category" placeholder="请选择">
              <template v-for="(item, index) in categoryList">
                <el-option :key="item" :label="item" :value="index" v-if="index > 0"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="form-flex">
          <el-form-item :inline="true" label="微信号(与手机号二选一)" prop="wechat">
            <el-input v-model="customerForm.wechat" placeholder="请输入微信号" maxlength="200"></el-input>
          </el-form-item>
          <el-form-item :inline="true" label="手机号(与微信号二选一)" prop="mobile">
            <el-input v-model="customerForm.mobile" placeholder="请输入手机号" maxlength="11"></el-input>
          </el-form-item>
        </el-row>
        <!-- <el-row class="form-flex">
          <el-form-item :inline="true" label="客户分类">
            <el-select v-model="customerForm.customerClass" placeholder="请选择">
              <template v-for="(item, index) in customerClassList">
                <el-option :key="item.value" :label="item.value" :value="item.type" v-if="index > 0"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-row> -->
        <el-row class="form-address">
          <el-form-item :inline="true" label="客户地址">
            <el-row class="address-select">
              <el-select v-model="customerForm.province" placeholder="请选择" @change="selectProvince">
                <el-option v-for="(province, index) in cityList" :key="index" :label="province.item_name" :value="province.item_name"></el-option>
              </el-select>
              <el-select v-model="customerForm.city" placeholder="请选择" @change="selectCity">
                <el-option v-for="(city, index) in citys" :key="index" :label="city.item_name" :value="city.item_name"></el-option>
              </el-select>
              <el-select v-model="customerForm.county" placeholder="请选择">
                <el-option v-for="(county, index) in countys" :key="index" :label="county.item_name" :value="county.item_name"></el-option>
              </el-select>
            </el-row>
            <el-row class="address-textarea">
              <el-input type="textarea" v-model="customerForm.addrDetail" :rows="3" placeholder="详细地址">
              </el-input>
            </el-row>
          </el-form-item>
        </el-row>
        <el-row class="form-title">
          跟进人
        </el-row>
        <el-row class="form-flex">
          <el-form-item :inline="true" label="客户经理">
            <el-select value-key="id" v-model="customerForm.manager" placeholder="请选择">
              <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :inline="true" label="所属部门">
            <el-input :value="customerForm.manager.department_str" disabled></el-input>
          </el-form-item>
        </el-row>
<!--        <el-row class="form-address">-->
<!--          <el-form-item :inline="true" label="合作AE">-->
<!--            <div class="add-ae">-->
<!--              <el-select v-model="customerForm.coopAe" multiple placeholder="点击添加">-->
<!--                <el-option v-for="(item, index) in aeAllList" :key="index" :label="item.username" :value="item.username">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </div>-->
<!--          </el-form-item>-->
<!--        </el-row>-->
        <el-row class="form-title">
          财务信息
        </el-row>
        <el-row class="form-flex">
          <el-form-item :inline="true" label="公司开票抬头">
            <el-input v-model="customerForm.invoiceTitle" placeholder="请输入公司开票抬头"></el-input>
          </el-form-item>
          <el-form-item :inline="true" label="地址">
            <el-input v-model="customerForm.invoiceAddr" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-row>
        <el-row class="form-flex">
          <el-form-item :inline="true" label="纳税识别号" prop="invoiceNumber">
            <el-input v-model="customerForm.invoiceNumber" placeholder="请输入纳税识别号"></el-input>
          </el-form-item>
          <el-form-item :inline="true" label="账号" prop="invoiceAccount">
            <el-input v-model="customerForm.invoiceAccount" placeholder="请输入账号"></el-input>
          </el-form-item>
        </el-row>
        <el-row class="form-flex">
          <el-form-item :inline="true" label="开户行">
            <el-input v-model="customerForm.invoiceBank" placeholder="请输入开户行"></el-input>
          </el-form-item>
          <el-form-item :inline="true" label="电话" prop="invoicePhone">
            <el-input v-model="customerForm.invoicePhone" placeholder="请输入电话"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <star-import-file v-show="dialogType === 'import'" uploadText="客户" uploadKey="customer" downloadSrc="/template/customer_upload_template.xlsx"/>
    <span v-show="dialogType === 'onebyone'" slot="footer" class="dialog-footer">
      <el-button size="small" style="width:80px" @click="close">取消</el-button>
      <el-button type="primary" style="width:80px" size="small" @click="submitForm">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { cityList } from '@/utils/city'
import { queryUserNamesByRoles, saveCustomer, getDepartment } from '@/api/customer'
import { categoryList, categoryFormate, customerClassList, shopTypeRadio, companyTypeRadio } from '@/utils/format' // , departmentList
// import { USER_ROLE } from '@/utils/config'
import { ROLE_CODE } from '@/const/roleCode'
export default {
  props: {
    // 客户信息
    customerForm: {
      type: Object,
      default() {
        return {
          // 店铺名
          shopName: '',
          // 店铺类型
          shopType: '',
          // 客户类目
          category: '',
          // 公司名称
          companyName: '',
          // 客户类型
          companyType: '',
          // 客户姓名
          customerName: '',
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
          manager: {},
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
          // 选择的AE
          coopAe: [],
          // 客户经理真名
          managerName: ''
        }
      }
    },
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    // 手机号自定义验证规则
    const validatePhone = (rule, value, callback) => {
      if (value === '' && this.customerForm.wechat === '') {
        this.goTop()
        return callback(new Error('手机号码和微信号至少填写一个'))
      }
      const myreg = /^[1][0-9]{10}$/
      if (!myreg.test(value) && value !== '') {
        callback(new Error('请输入正确的手机号码'))
        this.goTop()
      } else {
        callback()
      }
    }
    // 微信号自定义验证规则
    const validateWechat = (rule, value, callback) => {
      if (value === '' && this.customerForm.mobile === '') {
        this.goTop()
        return callback(new Error('手机号码和微信号至少填写一个'))
      } else {
        callback()
      }
    }
    return {
      customerVisible: true,
      // ----------客户信息---------------
      shopTypeRadio,
      companyTypeRadio,
      // 客户类目列表
      categoryList,
      // 客户类目格式化
      categoryFormate,
      // 客户分类
      customerClassList,
      // 部门
      departmentList: [],
      // 客户经理列表
      managerList: [],
      cityList,
      citys: [],
      countys: [],
      customerRules: {
        shopType: [{ required: true, message: '请选择店铺类型', trigger: 'blur' }],
        shopName: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        category: [{ required: true, message: '请选择客户类目', trigger: 'change' }],
        customerName: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
        mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        wechat: [{ required: true, validator: validateWechat, trigger: 'blur' }],
        invoiceNumber: [
          {
            validator(rule, value, callback) {
              if (value === '') {
                callback()
                return
              }
              var myreg = /.*[\u4e00-\u9fa5]+.*$/
              if (myreg.test(value)) {
                callback(new Error('请输入正确的纳税识别号'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        invoiceAccount: [
          {
            validator(rule, value, callback) {
              if (value === '') {
                callback()
                return
              }
              var myreg = /^[0-9]+$/
              if (!myreg.test(value)) {
                callback(new Error('账号必须为纯数字'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        invoicePhone: [
          {
            validator(rule, value, callback) {
              if (value === '') {
                callback()
                return
              }
              var myreg1 = /^[1][0-9]{10}$/
              var myreg2 = /^(0[0-9]{2,3}[-\s])?([1-9][0-9]{6,7})+(-[0-9]{1,4})?$/
              if (!myreg1.test(value) && !myreg2.test(value)) {
                callback(new Error('请输入正确的电话号码'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      aeAllList: [],
      // 弹窗的类型 onebyone 一个一个的上传，import 批量上传
      dialogType: 'onebyone'
    }
  },
  created() {
    // 获取客户经理列表
    this.queryUserNames(ROLE_CODE.customer_manager + ',' + ROLE_CODE.major_customer_manager)
    // 获取部门下拉选项
    this.getDepartmentOptions()
  },
  mounted() {},
  methods: {
    // 关闭弹窗
    close() {
      this.$refs.customerForm.resetFields()
      this.$emit('close')
    },
    // 获取用户
    queryUserNames(roles) {
      // 角色（管理员1，客户执行0，客户经理2，项目经理3）
      queryUserNamesByRoles({roles}).then(res => {
        if (res.data.success) {
          this.managerList = res.data.data
          if (this.id && this.customerForm.managerId && this.managerList) {
            let currManager = this.managerList.find(m => m.id === this.customerForm.managerId)
            this.customerForm.manager = currManager
          }
        }
      })
    },
    // 获取部门列表
    getDepartmentOptions () {
      getDepartment().then(res => {
        // debugger
        if (res.data.success) {
          this.departmentList = res.data.data
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
    // 选中省份事件
    selectProvince(name) {
      this.customerForm.city = ''
      this.customerForm.county = ''
      this.citys = []
      this.countys = []
      let province = this.cityList.filter(item => {
        return item.item_name === name
      })
      this.citys = province[0].citys
    },
    // 选中城市
    selectCity(name) {
      this.customerForm.county = ''
      this.countys = []
      let city = this.citys.filter(item => {
        return item.item_name === name
      })
      this.countys = city[0].countys
    },
    // 初始化地址下拉框
    initAddr() {
      if (this.customerForm.province) {
        let name = this.customerForm.province
        let province = this.cityList.filter(item => {
          return item.item_name === name
        })
        this.citys = province[0].citys
      }
      if (this.customerForm.city) {
        let name = this.customerForm.city
        let city = this.citys.filter(item => {
          return item.item_name === name
        })
        this.countys = city[0].countys
      }
    },
    // 提交保存表单
    submitForm() {
      this.$refs.customerForm.validate(valid => {
        if (valid) {
          // 保存接口
          this.saveCustomer()
        } else {
          // 跳到顶部
          if (this.customerForm.shopName === '' || this.customerForm.category === '' || this.customerForm.customerName === '') {
            this.goTop()
          }
          return false
        }
      })
    },
    // 回顶部
    goTop() {
      document.querySelector('.customer-form').scrollTop = 0
    },
    // 保存客户
    saveCustomer() {
      let form = this.customerForm
      let params = {
        // 店铺名
        shop_name: form.shopName,
        // 店铺类型
        shop_type: form.shopType,
        // 客户类目
        category: form.category,
        // 公司名称
        company_name: form.companyName,
        // 客户类型
        company_type: form.companyType,
        // 客户姓名
        customer_name: form.customerName,
        // 客户分类
        customer_class: form.customerClass,
        // 手机号
        mobile: form.mobile,
        // 微信号
        wechat: form.wechat,
        // 客户意向
        intention: form.intention,
        addr_province: form.province,
        addr_town: form.city,
        addr_county: form.county,
        addr_detail: form.addrDetail,
        // ----------跟进人---------------
        // 客户经理
        manager: form.manager.username,
        // 部门
        department: form.manager.department,
        // ----------财务信息---------------
        // 公司开票抬头
        invoice_title: form.invoiceTitle,
        // 地址
        invoice_addr: form.invoiceAddr,
        // 纳税识别号
        invoice_number: form.invoiceNumber,
        // 账号
        invoice_account: form.invoiceAccount,
        // 开户行
        invoice_bank: form.invoiceBank,
        // 电话号码
        invoice_phone: form.invoicePhone
      }
      if (this.id) {
        params.id = this.id
        params.manager_name = form.managerName
      }
      saveCustomer(params).then(res => {
        if (res.data.success) {
          this.$emit('save', res.data.data)
        } else {
          this.$gmMessage(res.data.message, 'tip')
        }
      })
    },
    // 重置表单
    resetCustomer() {
      this.customerForm = {
        // 店铺名
        shopName: '',
        shopType: '',
        // 客户类目
        category: '',
        // 公司名称
        companyName: '',
        companyType: '',
        // 客户姓名
        customerName: '',
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
        manager: {},
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
        managerName: ''
      }
    },
    // 切换弹窗
    handleImportType (type) {
      this.dialogType = type
    }
  },
  watch: {
    customerVisible(val) {
      if (val) {
        if (this.id) {
          this.initAddr()
        } else {
          this.resetCustomer()
          this.$nextTick(() => {
            this.goTop()
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
.customer-dialog {
  .el-dialog__header {
    // display: none;
    padding: 0;
    height: 50px;
    line-height: 50px;
    background: #f8f8f8;
    text-align: left!important;
    .customer-header {
      // position: absolute;
      // top: 0;
      // left: 0;
      // width: 100%;
      // z-index: 2;
      height: 50px;
      line-height: 50px;
      background-color: #FBFBFB;
      border: #EFEFEF solid 1px;
      span {
        display: inline-block;
        width: 120px;
        text-align: center;
        border-bottom: transparent solid 1px;
        cursor: pointer;
        &.active {
          background: #fff;
          border-left: #efefef solid 1px;
          border-right: #efefef solid 1px;
          color: #5C82FF!important;;
        }
      }
    }
    span,
    i {
      color: #666 !important;
    }
  }
  .el-dialog__body {
    padding: 30px 0;
  }
}
.customer-form {
  height: 520px;
  overflow-y: auto;
  overflow-x: hidden;
  .el-form-item__label {
    line-height: 28px;
    padding-bottom: 0;
    font-size: 14px;
  }
  .el-select {
    display: block;
  }
  &::-webkit-scrollbar {
    width: 5px;
    margin-right: 5px;
  }
  &::-webkit-scrollbar-track{
    background-color: #fff;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 3px;
    background-color: rgba(112,112,112,0.3);
  }
  .type-radio.el-radio+.type-radio.el-radio {
    margin-left: 10px;
    .el-radio__label {
      padding-left: 5px;
    }
  }
}
</style>
<style lang="scss" scoped>
@import '@/styles/vars.scss';
.customer-form {
  margin-top: -25px;
}
.form-title {
  margin-top: 15px;
  color: #666;
  padding: 0 0 12px 62px;
  font-size: 12px;
  line-height: 1;
  border-bottom: 1px solid #f5f5f5;
  &::before {
    width: 3px;
    height: 10px;
    background: $color-primary;
    content: '';
    position: absolute;
    display: block;
    left: 50px;
    top: 1px;
  }
}
.form-flex {
  display: flex;
  margin-left: 18px;
  .el-form-item {
    width: 300px;
    margin-left: 66px;
    margin-bottom: 16px;
  }
}
.form-address {
  margin-left: 18px;
  .el-form-item {
    width: 668px;
    margin-left: 66px;
    margin-bottom: 16px;
    .address-select {
      display: flex;
      .el-select {
        flex: 1;
        &:nth-child(n + 2) {
          margin-left: 10px;
        }
      }
    }
  }
  .add-ae {
    // border: 1px dashed #dadada;
    border-radius: 2px;
    height: 32px;
    text-align: center;
    color: #c2c2c2;
    cursor: pointer;
    .el-input__inner {
      border: 1px dashed #dadada;
    }
    .tag-box {
      text-align: left;
      .el-tag {
        margin-left: 10px;
      }
    }
    .btn-add {
      .el-icon-circle-plus {
        color: #c2c2c2;
      }
      span {
        margin-left: 6px;
      }
    }
    .select-wrapper {
      border: 1px solid #dcdfe6;
      position: relative;
      z-index: 1;
      background: #fff;
      border-radius: 5px;
      padding: 5px 0;
      margin-top: 1px;
      max-height: 300px;
      overflow-y: auto;
      overflow-x: hidden;
      .item {
        padding: 0 10px;
        text-align: left;
        color: #666;
        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }
  .address-textarea {
    margin-top: 2px;
  }
}
</style>
