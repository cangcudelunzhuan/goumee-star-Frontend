<template>
  <el-dialog class="company-dialog" :visible.sync="companyVisible" @close="close" :title="id?'编辑公司':'新增公司'" width="840px">
    <el-form class="company-form" ref="companyForm" :model="companyForm" :rules="companyRules" size="small">
      <el-row class="form-title">
        公司基础信息
      </el-row>
      <el-row class="form-flex">
        <span class="label" style="line-height: 100px;">
          公司LOGO：
        </span>
        <span class="content">
          <el-upload v-loading="logoUploadLoading" action="" class="btn-upload" :http-request="uploadLogo" :show-file-list="false" :accept="logoAccepts.join(',')">
            <div class="logo-box">
              <template v-if="companyForm.logo">
                <img :src="fixFileToken(companyForm.logo)" class="logo">
                <i class="btn-close" @click.stop="resetLogo">
                  <i class="el-icon-close"></i>
                </i>
              </template>
              <template v-else>
                <p class="icon-upload"></p>
                <p class="text">上传</p>
              </template>
            </div>
          </el-upload>
          <span class="logo-tips">
            LOGO图片尺寸建议400*400像素
          </span>
        </span>
      </el-row>
      <el-row class="form-flex">
        <el-form-item prop="name">
          <span slot="label" class="label"><span class="required">*</span>公司名称：</span>
          <div class="content">
            <el-input v-model="companyForm.name" placeholder="请输入公司名称" maxlength="30"></el-input>
          </div>
        </el-form-item>
      </el-row>
      <el-row class="form-flex mt0">
        <span class="label">
          <span class="required">*</span>擅长平台：
        </span>
        <span class="content checkbox-wrapper">
          <el-checkbox class="checkbox-item" v-model="checkAllPlatform" :indeterminate="isIndeterminatePlatform" @change="selectAllPlatform">全选</el-checkbox>
          <el-checkbox-group class="checkbox-group" v-model="checkCooperationPlatformList" @change="checkedPlatformChange">
            <template v-for="(item, index) in cooperationPlatformList">
              <el-checkbox class="checkbox-item" v-if="index>0" :label="item.value" :key="item.value"></el-checkbox>
            </template>
          </el-checkbox-group>
        </span>
      </el-row>
      <el-row class="form-flex">
        <span class="label">
          <span class="required">*</span>擅长领域：
        </span>
        <span class="content checkbox-wrapper">
          <el-checkbox class="checkbox-item" v-model="checkAllCategory" :indeterminate="isIndeterminateCategory" @change="selectAllCategory">全选</el-checkbox>
          <el-checkbox-group class="checkbox-group" v-model="checkCategoryList" @change="checkedCategoryChange">
            <template v-for="(item, index) in categoryList">
              <el-checkbox class="checkbox-item" v-if="index>0" :label="item" :key="item"></el-checkbox>
            </template>
          </el-checkbox-group>
        </span>
      </el-row>
      <el-row class="form-flex">
        <span class="label">
          是否可以专票：
        </span>
        <div class="content">
          <el-radio-group class="el-radio-wrapper" v-model="companyForm.special_ticket">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
      </el-row>
      <el-row class="form-flex">
        <span class="label">
          报价单：
        </span>
        <div class="content">
          <el-upload action="" :http-request="uploadQuotation" :show-file-list="false" :accept="quotationAccepts.join(',')">
            <div class="file-box" v-if="companyForm.quotation">
              <i class="icon-link" @click.stop></i>
              <span class="file-name" @click.stop="previewQuotation(companyForm.quotation)">{{quotationName}}</span>
              <span class="close-box" @click.stop="resetQuotation">
                <i class="el-icon-close"></i>
              </span>
            </div>
            <el-button v-else v-loading="quotationUploadLoading" type="primary" size="small">上传文件</el-button>
            <span class="tips">支持扩展名： .xlsx .doc .docx .pdf .jpg...</span>
          </el-upload>
        </div>
      </el-row>
      <el-row class="form-flex">
        <span class="label">
          公司地址：
        </span>
        <div class="content">
          <el-row class="address-select">
            <el-select v-model="companyForm.province" placeholder="请选择" @change="selectProvince" size="small">
              <el-option v-for="(province, index) in cityList" :key="index" :label="province.item_name" :value="province.item_name"></el-option>
            </el-select>
            <el-select v-model="companyForm.city" placeholder="请选择" @change="selectCity" size="small">
              <el-option v-for="(city, index) in citys" :key="index" :label="city.item_name" :value="city.item_name"></el-option>
            </el-select>
            <el-select v-model="companyForm.county" placeholder="请选择" size="small">
              <el-option v-for="(county, index) in countys" :key="index" :label="county.item_name" :value="county.item_name"></el-option>
            </el-select>
          </el-row>
          <el-row class="address-textarea">
            <el-input type="textarea" v-model="companyForm.address" :rows="3" placeholder="详细地址">
            </el-input>
          </el-row>
        </div>
      </el-row>
      <el-row class="form-title">
        联系方式
      </el-row>
      <el-row class="form-flex">
        <el-form-item>
          <span slot="label" class="label">联系人：</span>
          <div class="content">
            <el-input v-model="companyForm.contact_person" placeholder="请输入联系人姓名" maxlength="20"></el-input>
          </div>
        </el-form-item>
      </el-row>
      <el-row class="form-flex mt0">
        <el-form-item prop="contact_no">
          <span slot="label" class="label">联系人电话：</span>
          <div class="content">
            <el-input v-model="companyForm.contact_no" placeholder="请输入联系人电话"></el-input>
          </div>
        </el-form-item>
      </el-row>
      <el-row class="form-flex mt0">
        <el-form-item prop="contact_weixin">
          <span slot="label" class="label">微信号：</span>
          <div class="content">
            <el-input v-model="companyForm.wechat" placeholder="请输入微信号"></el-input>
          </div>
        </el-form-item>
      </el-row>
      <el-row class="form-flex mt0">
        <el-form-item prop="contact_email">
          <span slot="label" class="label">邮箱地址：</span>
          <div class="content">
            <el-input v-model="companyForm.contact_email" placeholder="请输入邮箱地址"></el-input>
          </div>
        </el-form-item>
      </el-row>
      <el-row class="form-title">
        公司介绍
      </el-row>
      <el-row class="form-flex">
        <el-form-item>
          <span slot="label" class="label">公司介绍：</span>
          <div class="content">
            <el-input type="textarea" :rows="5" v-model="companyForm.description" placeholder="请输入公司介绍"></el-input>
            <el-row class="mt10">
              <el-upload action="" :http-request="uploadDescriptionFile" :show-file-list="false" :accept="descriptionAccepts.join(',')">
                <div class="file-box" v-if="companyForm.description_file">
                  <i class="icon-link" @click.stop></i>
                  <span class="file-name" @click.stop="preview(companyForm.description_file)">{{descriptionFileName}}</span>
                  <span class="close-box" @click.stop="resetDescriptionFile">
                    <i class="el-icon-close"></i>
                  </span>
                </div>
                <el-button v-else v-loading="descriptionFileUploadLoading" type="info" size="small" plain>上传公司介绍</el-button>
                <span class="tips">支持pdf/图片上传，不超过80m</span>
              </el-upload>
            </el-row>
          </div>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" style="width:80px" @click="close">取消</el-button>
      <el-button type="primary" style="width:80px" size="small" @click="submitForm">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { cityList } from '@/utils/city'
import { categoryList, cooperationPlatformList } from '@/utils/format'
import { uploadFile, addCompany, updateCompany } from '@/api/medium'
import { fixFileToken } from '@/utils/tools'
export default {
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    companyForm: {
      type: Object,
      default() {
        return {
          name: '',
          areas: '',
          platforms: '',
          logo: '',
          special_ticket: '',
          province: '',
          city: '',
          county: '',
          // 报价单
          quotation: '',
          address: '',
          contact_person: '',
          contact_no: '',
          contact_email: '',
          description_file: '',
          description: '',
          description_file_preview: '',
          quotation_size: 0,
          wechat: ''
        }
      }
    }
  },
  data() {
    return {
      logoUploadLoading: false,
      quotationUploadLoading: false,
      descriptionFileUploadLoading: false,
      companyVisible: true,
      logoAccepts: ['image/jpeg', 'image/png'],
      quotationAccepts: ['image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint', 'application/pdf'],
      descriptionAccepts: ['image/jpeg', 'image/png', 'application/pdf'],
      cityList,
      citys: [],
      countys: [],
      companyRules: {
        name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        contact_no: [
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
        ],
        contact_email: [
          {
            validator(rule, value, callback) {
              if (value === '') {
                callback()
                return
              }
              const myreg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
              if (!myreg.test(value)) {
                callback(new Error('请输入正确的邮箱'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      cooperationPlatformList,
      checkCooperationPlatformList: [],
      checkAllPlatform: false,
      isIndeterminatePlatform: false,
      checkCategoryList: [],
      categoryList,
      checkAllCategory: false,
      isIndeterminateCategory: false
    }
  },
  computed: {
    quotationName() {
      let arr = this.companyForm.quotation.split('/')
      return arr[arr.length - 1]
    },
    descriptionFileName() {
      let arr = this.companyForm.description_file.split('/')
      return arr[arr.length - 1]
    }
  },
  created() {
    if (this.id) {
      this.checkCooperationPlatformList = this.companyForm.platforms.split(',').map(item => {
        let ret = ''
        this.cooperationPlatformList.forEach((obj) => {
          if (obj.type === item - 0) {
            ret = obj.value
          }
        })
        return ret
      }) || []
      this.checkCategoryList = this.companyForm.areas.split(',').map(item => this.categoryList[item]) || []
    }
  },
  mounted() {},
  methods: {
    close() {
      this.$refs.companyForm.resetFields()
      this.$emit('close')
    },
    commonUpload(file) {
      let form = new FormData()
      form.append('file', file)
      return uploadFile(form).then(res => {
        let result = res.data
        if (result.success) {
          return Promise.resolve(result.data)
        } else {
          this.$message.error(result.message)
          return Promise.reject(result.message)
        }
      })
    },
    uploadLogo(params) {
      let file = params.file
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message.error('图片格式不正确！')
        return
      }
      if (file.size > 1024 * 1024) {
        this.$message.error('上传LOGO图片大小不能超过 1MB!')
        return
      }
      let _URL = window.URL || window.webkitURL
      let img = new Image()
      img.onload = () => {
        let valid = img.width === img.height && img.width >= 160
        if (valid) {
          this.logoUploadLoading = true
          this.commonUpload(file).then(data => {
            this.logoUploadLoading = false
            this.companyForm.logo = data.source
          })
        } else {
          this.$message.error('上传LOGO图片必须为正方形，并且像素大于160!')
        }
      }
      img.src = _URL.createObjectURL(file)
    },
    resetLogo() {
      this.companyForm.logo = ''
    },
    uploadQuotation(params) {
      let file = params.file
      var found = this.quotationAccepts.find(type => {
        return file.type === type
      })
      if (!found) {
        this.$message.error('上传格式不正确！')
        return
      }
      if (file.size > 80 * 1024 * 1024) {
        this.$message.error('上传文件大小不能超过 80MB!')
        return
      }
      this.quotationUploadLoading = true
      this.commonUpload(file)
        .then(data => {
          this.quotationUploadLoading = false
          this.companyForm.quotation = data.source
          this.companyForm.quotation_size = data.size
        })
        .catch(() => {
          this.quotationUploadLoading = false
        })
    },
    resetQuotation() {
      this.companyForm.quotation = ''
    },
    uploadDescriptionFile(params) {
      let file = params.file
      var found = this.descriptionAccepts.find(type => {
        return file.type === type
      })
      if (!found) {
        this.$message.error('上传格式不正确！')
        return
      }
      if (file.size > 80 * 1024 * 1024) {
        this.$message.error('上传文件大小不能超过 80MB!')
        return
      }
      this.descriptionFileUploadLoading = true
      this.commonUpload(file)
        .then(data => {
          this.descriptionFileUploadLoading = false
          this.companyForm.description_file = data.source
          this.companyForm.description_file_preview = data.preview
        })
        .catch(() => {
          this.descriptionFileUploadLoading = false
        })
    },
    resetDescriptionFile() {
      this.companyForm.description_file = ''
    },
    selectAllPlatform(val) {
      let arr = JSON.parse(JSON.stringify(cooperationPlatformList))
      // 去除第一个综合
      arr.shift()
      this.checkCooperationPlatformList = val ? arr.map(item => item.value) : []
      this.isIndeterminatePlatform = false
    },
    checkedPlatformChange(value) {
      let checkedCount = value.length
      this.checkAllPlatform = checkedCount === cooperationPlatformList.length - 1
      this.isIndeterminatePlatform = checkedCount > 0 && checkedCount < cooperationPlatformList.length - 1
    },
    selectAllCategory(val) {
      let arr = JSON.parse(JSON.stringify(categoryList))
      // 去除第一个综合
      arr.shift()
      this.checkCategoryList = val ? arr : []
      this.isIndeterminateCategory = false
    },
    checkedCategoryChange(value) {
      let checkedCount = value.length
      this.checkAllCategory = checkedCount === categoryList.length - 1
      this.isIndeterminateCategory = checkedCount > 0 && checkedCount < categoryList.length - 1
    },
    selectProvince(name) {
      this.companyForm.city = ''
      this.companyForm.county = ''
      this.citys = []
      this.countys = []
      let province = this.cityList.filter(item => {
        return item.item_name === name
      })
      this.citys = province[0].citys
    },
    selectCity(name) {
      this.companyForm.county = ''
      this.countys = []
      let city = this.citys.filter(item => {
        return item.item_name === name
      })
      this.countys = city[0].countys
    },
    // 初始化地址下拉框
    initAddr() {
      if (this.companyForm.province) {
        let name = this.companyForm.province
        let province = this.cityList.filter(item => {
          return item.item_name === name
        })
        this.citys = province[0].citys
      }
      if (this.companyForm.city) {
        let name = this.companyForm.city
        let city = this.citys.filter(item => {
          return item.item_name === name
        })
        this.countys = city[0].countys
      }
    },
    submitForm() {
      this.$refs.companyForm.validate(valid => {
        if (valid) {
          // 保存接口
          this.saveCompany()
        } else {
          // this.goTop()
          if (this.companyForm.name === '') {
            this.goTop()
          }
          return false
        }
      })
    },
    saveCompany() {
      let platforms = this.checkCooperationPlatformList
        .map(item => {
          let ret = ''
          this.cooperationPlatformList.forEach(cItem => {
            if (cItem.value === item) {
              ret = cItem.type
            }
          })
          return ret
        })
        .join(',')
      let areas = this.checkCategoryList.map(item => this.categoryList.indexOf(item)).join(',')
      if (!platforms) {
        this.$message.error('请选择擅长平台!')
        this.goTop()
        return
      }
      if (!areas) {
        this.$message.error('请选择擅长领域!')
        this.goTop()
        return
      }
      let params = {
        areas,
        platforms
      }
      const newParams = Object.assign({}, this.companyForm, params)
      if (this.id) {
        newParams.id = this.id
        updateCompany(newParams).then(res => {
          if (res.data.success) {
            this.$emit('save', newParams)
          } else {
            this.$message.error(res.data.message)
          }
        })
      } else {
        addCompany(newParams).then(res => {
          if (res.data.success) {
            this.$emit('save', newParams)
          } else {
            this.$message.error(res.data.message)
          }
        })
      }
    },
    previewQuotation(url) {
      const arr = ['.doc', '.ppt', '.xls']
      const wrUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(this.fixFileToken(url))
      if (url.includes(arr[0]) || url.includes(arr[1]) || url.includes(arr[2])) {
        if (this.companyForm.quotation_size < 5) {
          window.open(wrUrl)
        } else {
          this.$message({
            message: '该文件过大（超过5M），不能预览！',
            type: 'warning'
          })
        }
      } else {
        window.open(this.fixFileToken(url))
      }
    },
    preview(url) {
      window.open(this.fixFileToken(url))
    },
    goTop() {
      document.querySelector('.company-form').scrollTop = 0
    },
    fixFileToken
  },
  watch: {}
}
</script>
<style lang="scss">
.company-dialog {
  .el-dialog__header {
    background: #f8f8f8;
    span,
    i {
      color: #666 !important;
    }
  }
  .el-dialog__body {
    padding: 0 0 15px 0;
  }
}
.company-form {
  height: 520px;
  overflow-y: auto;
  overflow-x: hidden;
  .el-form-item__label {
    line-height: 28px;
    padding-bottom: 0;
    padding-right: 0;
    font-size: 14px;
    &::before {
      display: none;
    }
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
}
</style>
<style lang="scss" scoped>
@import '@/styles/vars.scss';
.company-form {
  // margin-top: -25px;
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
  margin-left: 18px;
  margin-top: 20px;
  width: 692px;
  &.mt0 {
    margin-top: 0;
  }
  .required {
    color: #f26467;
  }
  .btn-upload {
    display: inline-block;
    width: 100px;
    height: 100px;
    background: #fcfcfc;
    border: 1px dashed #d0d0d0;
    text-align: center;
    cursor: pointer;
    border-radius: 2px;
    vertical-align: top;
    .logo-box {
      width: 100px;
      height: 100px;
      position: relative;
      .btn-close {
        position: absolute;
        top: -9px;
        right: -9px;
        width: 20px;
        height: 20px;
        background: rgba(14, 14, 19, 0.6);
        border-radius: 10px;
        .el-icon-close {
          font-size: 12px;
          line-height: 20px;
          color: #fff;
          font-weight: bold;
        }
      }
    }
    .logo {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }
    .icon-upload {
      padding-top: 24px;
      margin: 0 auto 0;
      width: 34px;
      height: 30px;
      background: url('../../../assets/img/upload_icon.png') bottom center no-repeat;
    }
    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #999;
      text-align: center;
      line-height: 1;
    }
  }
  .logo-tips {
    margin-left: 10px;
    display: inline-block;
    vertical-align: bottom;
    color: #999;
    font-size: 12px;
  }
  .label {
    width: 200px;
    text-align: right;
    vertical-align: top;
    display: inline-block;
    line-height: 32px;
  }
  .content {
    width: 468px;
    vertical-align: top;
    display: inline-block;
    margin-left: 20px;
    box-sizing: border-box;
    .address-select {
      display: flex;
      .el-select {
        flex: 1;
        &:nth-child(n + 2) {
          margin-left: 10px;
        }
      }
    }
    .address-textarea {
      margin-top: 2px;
    }
    .file-box {
      line-height: 1;
      display: inline-block;
    }
    .icon-link {
      vertical-align: top;
      margin-top: 1px;
      display: inline-block;
      width: 16px;
      height: 14px;
      background: url('../../../assets/img/file_icon.png') no-repeat;
    }
    .file-name {
      color: $color-primary;
    }
    .close-box {
      width: 20px;
      height: 20px;
      display: inline-block;
      background: #f2f2f2;
      border-radius: 50%;
      text-align: center;
      .el-icon-close {
        margin-left: -1px;
        font-size: 12px;
        line-height: 20px;
        color: #666;
        font-weight: bold;
      }
    }
  }
  .tips {
    font-size: 12px;
    color: #999;
    line-height: 32px;
    margin-left: 10px;
  }
  .checkbox-wrapper {
    background: #f8f8f8;
    padding: 12px;
    font-size: 0;
    .checkbox-group {
      margin-top: 10px;
    }
    .checkbox-item {
      width: 111px;
      font-size: 14px;
      &:nth-child(n + 5) {
        margin-top: 10px;
      }
    }
    .el-checkbox + .el-checkbox {
      margin-left: 0;
    }
  }
  .el-radio-wrapper {
    padding: 10px 0;
  }
}
</style>
