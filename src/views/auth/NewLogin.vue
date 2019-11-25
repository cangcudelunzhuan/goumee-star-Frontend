<style lang="scss" scoped>
@import '@/styles/vars.scss';
#new-login {
  .login {
    background: #0E1730;
    width: 100%;
    min-width: 1200px;
    .inner-login {
      height: 600px;
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .login-img {
        float: left;
        img {
          margin-top: 100px;
        }
      }
      .login-wrap {
        float: right;
        .login-box {
          width: 400px;
          height: 420px;
          background: #fff;
          margin-top: 80px;
          position: relative;
          .login-tab {
            overflow: hidden;
            border-bottom: #F2F2F2 solid 1px;
            .tab {
              width: 50%;
              text-align: center;
              float: left;
              span {
                display: inline-block;
                height: 60px;
                line-height: 60px;
                font-size: 16px;
                font-family: MicrosoftYaHei-Bold;
                font-weight:bold;
                color: #333;
                padding: 0 12px;
                cursor: pointer;
              }
              &.active span {
                color: $color-primary;
                border-bottom: $color-primary solid 2px;
              }
            }
          }
          .login-ruleForm {
            padding: 30px 40px 20px;
            /deep/ .el-input__inner {
              border: none;
              border-bottom: #E4E4E4 solid 1px;
              border-radius: 0;
            }
            /deep/ .is-error .el-input__inner {
              border-color: #F26467;
            }
            /deep/ .el-form-item__error {
              display: inline-block;
              right: 0;
              left: auto;
              height: 18px;
              line-height: 18px;
              background: #FFE8F0;
              text-align: center;
              margin-top: 3px;
              border-radius: 9px 0px 9px 9px;
              font-size: 12px;
              padding: 0 8px;
            }
            .login-icon {
              position: relative;
              top: 5px;
            }
            .submit-btn {
              width: 100%;
              margin-top: 18px;
              font-size: 16px;
              border-radius: 0;
            }
            .verification-code {
              background: #FAFAFA;
              width: 120px;
              height: 40px;
              position: relative;
              bottom: 4px;
              right: -4px;
              cursor: pointer;
            }
            .phone-code {
              position: relative;
              .get-verification-code {
                font-size: 14px;
                color: #5C7DA6;
                cursor: pointer;
                display: inline-block;
                &:hover {
                  color: #5c82ff;
                }
                &.time-countdown {
                  color: #AAA9A9;
                  cursor: initial;
                }
              }
              .get-code-succes-tip {
                color: #09AE6A;
                background: #DEF4F3;
                position: absolute;
                right: -4px;
                width: 206px;
                height: 18px;
                line-height: 18px;
                bottom: -22px;
                border-radius: 9px 0px 9px 9px;
                font-size: 12px;
                z-index: 1;
              }
            }
          }
          .login-footer {
            position: absolute;
            bottom: 29px;
            left: 40px;
            width: calc(100% - 80px);
            a {
              text-decoration: none;
              &.forget-pwd {
                color: #999;
              }
            }
            .to-register {
              float: right;
              color: #999;
              a {
                color: #5c82ff;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  #new-login {
    .login {
      min-width: 1000px;
      .inner-login {
        width: 1000px;
        .login-img {
          img {
            width: 600px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="new-login">
    <loginHeader theme="dark" />
    <div class="login">
      <div class="inner-login">
        <div class="login-img">
          <img src="@/assets/img/login/login-image.png" />
        </div>
        <div class="login-wrap">
          <div class="login-box">
            <div class="login-tab">
              <div :class="['tab', activeTab === 'login' ? 'active' : '']" @click="onTabChange('login')"><span>账户密码登录</span></div>
              <div :class="['tab', activeTab === 'phoneLogin' ? 'active' : '']" @click="onTabChange('phoneLogin')"><span>手机号登录</span></div>
            </div>
            <div class="login-form">
              <el-form v-show="activeTab === 'login'" :model="loginForm" :rules="loginRules" ref="loginForm" class="login-ruleForm">
                <el-form-item prop="username">
                  <el-input v-model="loginForm.username" placeholder="输入用户名或手机号">
                    <img src="@/assets/img/login/login-user-icon.png" slot="prefix" class="login-icon">
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="loginForm.password" placeholder="输入密码">
                    <img src="@/assets/img/login/login-password_icon.png" slot="prefix" class="login-icon">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm()" class="submit-btn">登 录</el-button>
                </el-form-item>
              </el-form>
              <el-form v-show="activeTab === 'phoneLogin'" :model="phoneForm" :rules="phoneLoginRules" ref="phoneLoginForm" class="login-ruleForm">
                <el-form-item prop="phone">
                  <el-input v-model="phoneForm.phone" placeholder="输入手机号">
                    <img src="@/assets/img/login/login-phone_icon.png" slot="prefix" class="login-icon">
                  </el-input>
                </el-form-item>
                <el-form-item prop="usercode">
                  <el-input v-model="phoneForm.usercode" placeholder="输入右方字符">
                    <img src="@/assets/img/login/login-code_icon1.png" slot="prefix" class="login-icon">
                    <img v-show="codeImageBase64 !== ''" class="verification-code" slot="suffix" :src="'data:image/png;base64,' + codeImageBase64" @click="changeVerifyCode" />
                  </el-input>
                </el-form-item>
                <el-form-item prop="code" class="phone-code">
                  <el-input v-model="phoneForm.code" placeholder="输入验证码">
                    <img src="@/assets/img/login/login-code_icon2.png" slot="prefix" class="login-icon">
                    <span v-if="!getPhoneCodeStatus.status" class="get-verification-code" slot="suffix" @click="handleGetPhoneCode" >获取短信验证码</span>
                    <span v-if="getPhoneCodeStatus.status" class="get-verification-code time-countdown" slot="suffix" >重新获取（{{getPhoneCodeStatus.time}}s）</span>
                    <span v-show="phoneCodeTimeTip" slot="suffix" class="get-code-succes-tip">验证码已发送，15分钟内输入有效</span>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitPhoneLoginForm()" class="submit-btn">登 录</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="login-footer">
              <router-link class="forget-pwd" to="/login/changePwd/step">忘记密码？</router-link>
              <span class="to-register">没有账号？<router-link to="/login/register/step">立即注册</router-link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loginFooter />
  </div>
</template>

<script>
import loginHeader from '@/views/auth/component/LoginHeader'
import loginFooter from '@/views/auth/component/LoginFooter'
import { getCode, login, getPhoneCode } from '@/api/auth'
import { setToken, setCode } from '@/utils/token'
export default {
  name: 'newLogin',
  components: {
    loginHeader,
    loginFooter
  },
  data () {
    return {
      activeTab: 'login', // login/phoneLogin
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{required: true, message: '请输入用户名或手机号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      phoneCodeTimeTip: false,
      phoneForm: {
        phone: '',
        usercode: '',
        code: ''
      },
      phoneLoginRules: {
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {pattern: /^1(3|4|5|7|8)\d{9}$/, message: '手机号格式有误', trigger: 'blur'}
        ],
        usercode: [{required: true, message: '请输入验证码', trigger: 'blur'}],
        code: [{required: true, message: '请输入短信验证码', trigger: 'blur'}]
      },
      getPhoneCodeStatus: {
        status: false,
        time: 0
      },
      codeImageBase64: ''
    }
  },
  mounted () {
    this.getVerifyCode()

    // 回车登录
    let _this = this
    window.addEventListener('keypress', (e) => {
      if (_this.$route.fullPath !== '/login') return false
      if (e.keyCode === 13 && _this.activeTab === 'login') {
        _this.submitForm()
      } else if (e.keyCode === 13 && _this.activeTab === 'phoneLogin') {
        _this.submitPhoneLoginForm()
      }
    })
  },
  methods: {
    // 切换登录tab
    onTabChange (activeTab) {
      this.activeTab = activeTab
    },
    // 普通登录
    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          let res = await login(this.loginForm.username, this.loginForm.password, 1)
          if (res.data.success) {
            setToken('jwt ' + res.data.data.token)
            this.$store.commit('user/login', res.data.data.user_info)
            this.$router.push({path: '/'})
          } else {
            this.$message.error({message: res.data.message})
          }
        } else {
          return false
        }
      })
    },
    // 手机号登录
    submitPhoneLoginForm () {
      this.$refs.phoneLoginForm.validate(async (valid) => {
        if (valid) {
          let res = await login(this.phoneForm.phone, this.phoneForm.code, 2)
          if (res.data.success) {
            setToken('jwt ' + res.data.data.token)
            this.$store.commit('user/login', res.data.data.user_info)
            this.$router.push({path: '/'})
          } else {
            this.$message.error({message: res.data.message})
          }
        } else {
          return false
        }
      })
    },
    // 获取验证码
    handleGetPhoneCode () {
      // 验证
      this.$refs.phoneLoginForm.validateField('phone', (error) => {
        if (!error) {
          this.$refs.phoneLoginForm.validateField('usercode', async (error) => {
            if (!error) {
              // 获取
              const res = await getPhoneCode({
                phone: this.phoneForm.phone,
                usercode: this.phoneForm.usercode,
                type: 5
              })
              if (res.data.success) {
                this.phoneCodeTimeTip = true
                // 倒计时
                this.getPhoneCodeStatus = {
                  status: true,
                  time: 60
                }
                let timer = setInterval(() => {
                  if (this.getPhoneCodeStatus.time === 1) {
                    this.getPhoneCodeStatus.status = false
                    this.phoneCodeTimeTip = false
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
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    // 请求图片验证码
    async getVerifyCode () {
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
    // 更换验证码
    changeVerifyCode () {
      this.getVerifyCode()
    }
  }
}
</script>
