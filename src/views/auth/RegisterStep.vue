<style lang="scss" scoped>
  #register-step {
    .step-title {
      text-align: center;
      font-size: 24px;
      color: #666;
      line-height: 120px;
      font-weight: normal;
      margin: 0;
    }
    .step-box {
      width: 800px;
      height: 600px;
      background: #fff;
      margin: 0 auto;
      .step-box-item {
        .usercode {
          position: relative;
          .usercode-tip {
            position: absolute;
            left: 103%;
            top: 0;
            font-size: 12px;
            i {
              margin-right: 8px;
            }
          }
          .usercode-err {
            color: #F26467;
            width: 120px;
          }
          .usercode-success {
            color: #09AE6A;
            width: 137px;
            line-height: 20px;
            i {
              line-height: 40px;
              float: left;
            }
          }
          .usercode-warning {
            color: #FF9141;
            width: 137px;
            i {
              line-height: 40px;
              float: left;
            }
          }
          .usercode-input {
            width: 270px;
          }
          .usercode-img {
            width: 118px;
            height: 38px;
            border: #dcdfe6 solid 1px;
            float: right;
            border-radius: 2px;
            cursor: pointer;
          }
          .get-code-btn {
            width: 120px;
            float: right;
          }
          .time-countdown {
            width: 120px;
            float: right;
            text-align: center;
            color: #AAA9A9;
          }
          // 权限选择
          .role-selection {
            width: 100%;
          }
        }
        &.step1 {
          padding: 100px 200px 0;
        }
        &.step2 {
          padding: 40px 40px 0 40px;
          // .role-select {
          //   background: #F8F8F8;
          //   padding: 18px 0;
          //   margin-bottom: 26px;
          //   p {
          //     line-height: 40px;
          //     color: #666;
          //   }
          //   span {
          //     width: 100px;
          //     display: inline-block;
          //     text-align: right;
          //     color: #999;
          //   }
          // }
          .step2-form {
            width: 400px;
            margin: 0 auto;
            .phone-number {
              height: 40px;
              line-height: 40px;
              padding: 0 14px;
              border-radius: 4px;
              background: #F8F8F8;
              margin-bottom: 25px;
              font-size: 14px;
              color: #999;
              span {
                color: #666;
              }
            }
          }
        }
        .step3-wrap {
          text-align: center;
          padding-top: 90px;
          .success-img {
            margin-bottom: 20px;
          }
          .info {
            color: #333;
            font-size: 18px;
          }
          .tip {
            color: #999;
            margin: 20px 0 40px;
          }
          a {
            text-decoration: none;
            width: 140px;
            height: 46px;
            line-height: 22px;
          }
        }
      }
    }
    .block-btn {
      width: 100%;
      height: 46px;
    }
    .step-tips {
      text-align: center;
      color: #999;
      a {
        color: #5C82FF;
        text-decoration: none;
      }
    }
  }
  .register-tooltip {
    &.el-tooltip__popper.is-light {
      border-color: #666;
    }
    .password-tooltip {
      width: 160px;
      p {
        color: #666;
      }
    }
  }
</style>

<template>
  <div id="register-step">
    <loginHeader theme="light" />
    <h1 class="step-title">用户注册</h1>
    <div class="step-box">
      <stepHeader :active="activeStep" />
      <div class="step-box-item step1" v-show="activeStep === 1">
        <el-form :model="stepOneForm">
          <el-form-item prop="phone" class="usercode">
            <el-input placeholder="11位手机号（必填）" v-model="stepOneForm.phone" @blur="verifyParams('phone')">
              <template slot="prepend">+86</template>
            </el-input>
            <span class="usercode-tip usercode-err" v-show="stepOneFormRules.phone.visiable"><i class="el-icon-error"></i>{{stepOneFormRules.phone.statusText}}</span>
          </el-form-item>
          <el-form-item prop="usercode" class="usercode">
            <el-input placeholder="输入右方字符（必填）" v-model="stepOneForm.usercode" class="usercode-input" @blur="verifyParams('usercode')"></el-input>
            <img v-show="codeImageBase64 !== ''" :src="'data:image/png;base64,' + codeImageBase64" class="usercode-img" @click="getVerifyCode">
            <span class="usercode-tip usercode-err" v-show="stepOneFormRules.usercode.visiable"><i class="el-icon-error"></i>{{stepOneFormRules.usercode.statusText}}</span>
          </el-form-item>
          <el-form-item prop="usercode" class="usercode">
            <el-input placeholder="输入短信验证码（必填）" v-model="stepOneForm.code" class="usercode-input" @blur="verifyParams('code')"></el-input>
            <el-button v-show="!getPhoneCodeStatus.status" class="get-code-btn" @click="getPhoneCode">获取验证码</el-button>
            <span v-show="getPhoneCodeStatus.status" class="time-countdown">重新获取（{{getPhoneCodeStatus.time}}s）</span>
            <span class="usercode-tip usercode-success" v-show="stepOneFormRules.code.visiable && stepOneFormRules.code.status === 'success'"><i class="el-icon-success"></i>验证码已发送，15分钟内 输入有效</span>
            <span class="usercode-tip usercode-err" v-show="stepOneFormRules.code.visiable && stepOneFormRules.code.status === 'error'"><i class="el-icon-error"></i>{{stepOneFormRules.code.statusText}}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="block-btn" @click="nextStep(1)">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="step-box-item step2" v-show="activeStep === 2">
        <!-- <div class="role-select">
          <p><span>手机号：</span>{{stepOneForm.phone}}</p>
          <p>
            <span>选择角色：</span>
            <el-radio-group v-model="stepTwoForm.role">
              <el-radio :label="0">客户执行</el-radio>
              <el-radio :label="2">客户经理</el-radio>
              <el-radio :label="3">项目经理</el-radio>
            </el-radio-group>
          </p>
        </div> -->

        <el-form class="step2-form" :model="stepTwoForm">
          <p class="phone-number">手机号：<span>{{stepOneForm.phone}}</span></p>
          <el-form-item prop="role" class="usercode">
            <!-- <el-input placeholder="确认密码（必填）" v-model="stepTwoForm.repassword" type="password" @blur="verifyStepTwoParams('repassword')"></el-input> -->
            <el-cascader
              class="role-selection"
              separator=">"
              :options="options"
              placeholder="请选择角色（必填）"
              @blur="verifyStepTwoParams('role')"
              @change="roleChange">
            </el-cascader>
            <span class="usercode-tip usercode-err" v-show="stepTwoFormRules.role.visiable"><i class="el-icon-error"></i>{{stepTwoFormRules.role.statusText}}</span>
          </el-form-item>
          <el-form-item prop="username" class="usercode">
            <el-tooltip class="item" effect="light" placement="right" popper-class="register-tooltip" :popper-options="{boundariesElement: 'scrollParent'}">
              <div class="password-tooltip" slot="content">
                <p>不超过10个字符，只能包含中文、标点符号“-”</p>
              </div>
              <div>
                <el-input placeholder="设置用户名（必填）" v-model="stepTwoForm.username" @blur="verifyStepTwoParams('username')" @input="verifyStepTwoParams('username')"></el-input>
                <span class="usercode-tip usercode-err" v-show="stepTwoFormRules.username.visiable"><i class="el-icon-error"></i>{{stepTwoFormRules.username.statusText}}</span>
              </div>
            </el-tooltip>
          </el-form-item>
          <el-form-item prop="password" class="usercode">
            <el-tooltip class="item" effect="light" placement="right" popper-class="register-tooltip" :popper-options="{boundariesElement: 'scrollParent'}">
              <div class="password-tooltip" slot="content">
                <p style="margin-bottom: 10px;">一、6-16个字符，区分大小写，密码不能和会员名相同。</p>
                <p>二、只能包含数字、字母、标点符号（空格除外）</p>
              </div>
              <div>
                <el-input placeholder="输入密码（必填）" v-model="stepTwoForm.password" type="password" @blur="verifyStepTwoParams('password')"></el-input>
                <span class="usercode-tip usercode-err" v-show="stepTwoFormRules.password.visiable"><i class="el-icon-error"></i>{{stepTwoFormRules.password.statusText}}</span>
              </div>
            </el-tooltip>
          </el-form-item>
          <el-form-item prop="repassword" class="usercode">
            <el-input placeholder="确认密码（必填）" v-model="stepTwoForm.repassword" type="password" @blur="verifyStepTwoParams('repassword')"></el-input>
            <span class="usercode-tip usercode-err" v-show="stepTwoFormRules.repassword.visiable"><i class="el-icon-error"></i>{{stepTwoFormRules.repassword.statusText}}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="block-btn" @click="nextStep(2)">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="step-box-item step3" v-show="activeStep === 3">
        <div class="step3-wrap">
          <img class="success-img" src="@/assets/img/login/web_content_icon5.png" />
          <p class="info">你的帐户：<b>{{stepOneForm.phone}}</b> 注册成功，审核成功后可使用</p>
          <p class="tip">可联系你的管理员加快审核进程</p>
          <router-link to="/login" class="el-button el-button--primary">返回首页</router-link>
        </div>
      </div>
      <p v-show="activeStep !== 3" class="step-tips">已有账号？<router-link to="/login">立即登录</router-link></p>
    </div>
    <loginFooter />
  </div>
</template>

<script>
import loginHeader from '@/views/auth/component/LoginHeader'
import loginFooter from '@/views/auth/component/LoginFooter'
import stepHeader from '@/views/auth/component/StepHeader'
import { getCode, getPhoneCode, validCode, register, getAllRoles } from '@/api/auth'
import { setCode } from '@/utils/token'

export default {
  name: 'changepwd-step',
  components: {
    loginHeader,
    loginFooter,
    stepHeader
  },
  data () {
    return {
      codeImageBase64: '',
      getPhoneCodeStatus: {
        status: false,
        time: 0
      },
      activeStep: 1,
      stepOneForm: {
        phone: '',
        usercode: '',
        code: ''
      },
      stepOneFormRules: {
        phone: { visiable: false, statusText: '请输入手机号' },
        usercode: { visiable: false, statusText: '请输入验证码' },
        code: {visiable: false, status: 'error', statusText: '请输入短信验证码'} // status：success/error/warning
      },
      stepTwoForm: {
        username: '',
        password: '',
        repassword: '',
        phone: '',
        role: undefined
      },
      stepTwoFormRules: {
        role: { visiable: false, statusText: '请选择角色' },
        username: { visiable: false, statusText: '请输入用户名' },
        password: { visiable: false, statusText: '请输入密码' },
        repassword: { visiable: false, statusText: '请确认密码' }
      },
      options: []
    }
  },
  mounted () {
    this.getVerifyCode()
    // 获取所有角色权限
    getAllRoles().then(res => {
      if (res.data.success) {
        this.options = res.data.data
      } else {
        this.$message({
          type: 'warning',
          message: res.message,
          duration: 2000,
          showClose: true
        })
      }
    }).catch(error => {
      console.error(error)
      this.$message({
        type: 'warning',
        message: '角色获取失败，请稍后刷新重试'
      })
    })
  },
  methods: {
    // 点击下一步
    async nextStep (stepIndex) {
      // this.activeStep = this.activeStep + 1
      // 第一步验证验证码
      if (stepIndex === 1) {
        if (!this.verifyParams('phone')) return false
        if (!this.verifyParams('usercode')) return false
        if (!this.verifyParams('code')) return false
        let res = await validCode({
          phone: this.stepOneForm.phone,
          code: this.stepOneForm.code
        })
        if (res.data.success) {
          setCode(res.data.data)
          this.activeStep = this.activeStep + 1
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            showClose: true
          })
        }
      } else {
        if (!this.verifyStepTwoParams('role')) return false
        if (!this.verifyStepTwoParams('username')) return false
        if (!this.verifyStepTwoParams('password')) return false
        if (!this.verifyStepTwoParams('repassword')) return false
        let res = await register({
          username: this.stepTwoForm.username,
          password: this.stepTwoForm.password,
          role: this.stepTwoForm.role,
          phone: this.stepOneForm.phone
        })
        if (res.data.success) {
          setCode(res.data.data)
          this.activeStep = this.activeStep + 1
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            showClose: true
          })
        }
      }
    },
    // 请求图片验证码
    async getVerifyCode () {
      if (this.activeStep !== 1) return false
      let res = await getCode()
      if (res.data.success) {
        this.codeImageBase64 = res.data.data.img
        setCode(res.data.data.actcode)
      } else {
        this.$message({
          type: 'error',
          message: res.data.message,
          showClose: true
        })
      }
    },
    // 验证参数 第一步
    verifyParams (field) {
      if (field === 'phone') {
        if (!this.stepOneForm.phone) {
          this.stepOneFormRules.phone.visiable = !this.stepOneForm.phone
          return false
        } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.stepOneForm.phone))) {
          this.stepOneFormRules.phone = {
            visiable: true,
            statusText: '手机号格式有误'
          }
          return false
        } else {
          // 还原，隐藏
          this.stepOneFormRules.phone = {
            visiable: false,
            statusText: '请输入手机号'
          }
          return true
        }
      } else if (field === 'usercode') {
        if (!this.stepOneForm.usercode) {
          this.stepOneFormRules.usercode.visiable = !this.stepOneForm.usercode
          return false
        } else {
          // 还原，隐藏
          this.stepOneFormRules.usercode = {
            visiable: false,
            statusText: '请输入验证码'
          }
          return true
        }
      } else if (field === 'code') {
        if (!this.stepOneForm.code) {
          this.stepOneFormRules.code = {
            visiable: true,
            status: 'error',
            statusText: '请输入短信验证码'
          }
          return false
        } else {
          // 还原，隐藏
          this.stepOneFormRules.code = {
            visiable: false,
            statusText: '请输入短信验证码'
          }
          return true
        }
      }
    },
    // 第二步验证
    verifyStepTwoParams (field) {
      if (field === 'role') {
        // debugger
        if (!this.stepTwoForm.role && this.stepTwoForm.role !== 0) {
          this.stepTwoFormRules.role.visiable = true
          return false
        } else {
          // 还原，隐藏
          this.stepTwoFormRules.role = {
            visiable: false,
            statusText: '请选择角色'
          }
          return true
        }
      } else if (field === 'username') {
        // 判断是否出现除中文和‘-’以外的其他字符，的正则
        const reg = new RegExp('[^\\u4E00-\\u9FA5\\-]', 'g')
        if (!this.stepTwoForm.username) {
          this.stepTwoFormRules.username.visiable = !this.stepTwoForm.username
          return false
        // } else if (this.stepTwoForm.username.includes(' ')) {
        //   this.stepTwoFormRules.username = {
        //     visiable: true,
        //     statusText: '不能包含空格'
        //   }
        //   return false
        // } else if (this.stepTwoForm.username.length > 10) {
        //   let _this = this
        //   setTimeout(() => {
        //     _this.stepTwoForm.username = _this.stepTwoForm.username.substr(0, 10)
        //   }, 100)
        //   this.stepTwoFormRules.username = {
        //     visiable: true,
        //     statusText: '不得超过10个字符'
        //   }
        //   return false
        // } else if (/^[0-9]+$/.test(this.stepTwoForm.username)) {
        //   this.stepTwoFormRules.username = {
        //     visiable: true,
        //     statusText: '不能为纯数字'
        //   }
        //   return false
        // } else {
        } else if (reg.test(this.stepTwoForm.username)) {
          this.stepTwoFormRules.username = {
            visiable: true,
            statusText: '用户名格式有误'
          }
          return false
        } else {
          // 还原，隐藏
          this.stepTwoFormRules.username = {
            visiable: false,
            statusText: '请输入用户名'
          }
          return true
        }
      } else if (field === 'password') {
        if (!this.stepTwoForm.password) {
          this.stepTwoFormRules.password.visiable = !this.stepTwoForm.password
          return false
        } else if (this.stepTwoForm.password === this.stepTwoForm.username) {
          this.stepTwoFormRules.password = {
            visiable: true,
            statusText: '不得与用户名相同'
          }
          return false
        } else if (this.stepTwoForm.password.length < 6 || this.stepTwoForm.password.length > 16) {
          this.stepTwoFormRules.password = {
            visiable: true,
            statusText: '密码长度6-16'
          }
          return false
        } else if ((/[\u4e00-\u9fa5]+/.test(this.stepTwoForm.password))) {
          this.stepTwoFormRules.password = {
            visiable: true,
            statusText: '密码不能包含中文'
          }
          return false
        } else if (this.stepTwoForm.password.includes(' ')) {
          this.stepTwoFormRules.password = {
            visiable: true,
            statusText: '密码不能空格'
          }
          return false
        } else {
          // 还原，隐藏
          this.stepTwoFormRules.password = {
            visiable: false,
            statusText: '请输入密码'
          }
          return true
        }
      } else if (field === 'repassword') {
        if (!this.stepTwoForm.repassword) {
          this.stepTwoFormRules.repassword.visiable = !this.stepTwoForm.repassword
          return false
        } if (this.stepTwoForm.repassword !== this.stepTwoForm.password) {
          // 还原，隐藏
          this.stepTwoFormRules.repassword = {
            visiable: true,
            statusText: '两次密码不一致'
          }
          return false
        } else {
          // 还原，隐藏
          this.stepTwoFormRules.repassword = {
            visiable: false,
            statusText: '请输入密码'
          }
          return true
        }
      }
    },
    // 获取手机验证码
    async getPhoneCode () {
      if (!this.verifyParams('phone')) return false
      if (!this.verifyParams('usercode')) return false
      const res = await getPhoneCode({
        phone: this.stepOneForm.phone,
        usercode: this.stepOneForm.usercode,
        type: 3
      })
      if (res.data.success) {
        this.stepOneFormRules.code.visiable = true
        this.stepOneFormRules.code.status = 'success'
        setCode(res.data.data)
        // 倒计时
        this.getPhoneCodeStatus = {
          status: true,
          time: 60
        }
        let timer = setInterval(() => {
          if (this.getPhoneCodeStatus.time === 1) {
            this.getPhoneCodeStatus.status = false
            this.stepOneFormRules.code.visiable = false
            this.stepOneFormRules.code.status = 'error'
            clearInterval(timer)
          } else {
            this.getPhoneCodeStatus.time = this.getPhoneCodeStatus.time - 1
          }
        }, 1000)
      } else {
        this.$message.error({message: res.data.message})
        if (res.data.error_code === 1) {
          this.getVerifyCode()
        }
      }
    },
    // 角色发生变化
    roleChange (arr) {
      // console.log(arr)
      this.stepTwoForm.role = arr[arr.length - 1]
      // console.log(arr[arr.length - 1])
      // console.log(this.stepTwoForm.role)
    }
  }
}
</script>
