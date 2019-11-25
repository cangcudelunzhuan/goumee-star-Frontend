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
        }
        &.step1 {
          padding: 100px 200px 0;
        }
        &.step2 {
          padding: 100px 40px 0 40px;
          .step2-form {
            width: 400px;
            margin: 0 auto;
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
            margin-bottom: 40px;
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
    <h1 class="step-title">修改密码</h1>
    <div class="step-box">
      <stepHeader :active="activeStep" :stepName="['账号验证','修改密码','修改成功']" />
      <div class="step-box-item step1" v-show="activeStep === 1">
        <el-form :model="stepOneForm" :rules="stepOneFormRules">
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
        <el-form class="step2-form" :model="stepTwoForm" :rules="stepTwoFormRules">
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
          <p class="info">修改密码成功！</p>
          <router-link to="/login" class="el-button el-button--primary">立即登录</router-link>
        </div>
      </div>
      <p v-show="activeStep !== 3" class="step-tips">没有账号？<router-link to="/login/register/step">立即注册</router-link></p>
    </div>
    <loginFooter />
  </div>
</template>

<script>
import loginHeader from '@/views/auth/component/LoginHeader'
import loginFooter from '@/views/auth/component/LoginFooter'
import stepHeader from '@/views/auth/component/StepHeader'
import { getCode, getPhoneCode, validCode, changePwd } from '@/api/auth'
import { setCode } from '@/utils/token'
export default {
  name: 'register-step',
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
        password: '',
        repassword: ''
      },
      stepTwoFormRules: {
        password: { visiable: false, statusText: '请输入密码' },
        repassword: { visiable: false, statusText: '请确认密码' }
      }
    }
  },
  mounted () {
    this.getVerifyCode()
  },
  methods: {
    async nextStep (stepIndex) {
      // this.activeStep = this.activeStep + 1
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
      } else if (stepIndex === 2) {
        if (!this.verifyStepTwoParams('password')) return false
        if (!this.verifyStepTwoParams('repassword')) return false
        let res = await changePwd({
          phone: this.stepOneForm.phone,
          password: this.stepTwoForm.password
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
      if (field === 'password') {
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
        type: 2
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
    }
  }
}
</script>
