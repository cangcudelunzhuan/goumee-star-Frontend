<template>
<div>
  <moveLine></moveLine>
  <el-form :model="registerForm" label-position="left" class="login-container">
    <div class="logoPng"><img src="@/assets/img/logo.png" alt=""></div>
    <div class="ipt-username validation">
      <input type="text" v-model="registerForm.username" :class="usernameTip ? 'isRed':'notRed'" placeholder="请输入用户名" @focus="usernameFoucs">
      <i></i><p v-show="usernameTip">x</p>
      <span v-show="usernameTip">请输入用户名</span>
    </div>
    <div class="ipt-password validation">
      <input type="password" v-model="registerForm.password" :class="passwordTip ? 'isRed':'notRed'" placeholder="请输入密码" @focus="passwordFoucs">
      <i></i><p v-show="passwordTip">x</p>
      <span v-show="passwordTip">请输入密码</span>
    </div>
    <div class="ipt-password validation">
      <input type="password" v-model="registerForm.secondpass" :class="secondpassTip ? 'isRed':'notRed'" placeholder="请再次输入密码" @focus="secondpassFoucs">
      <i></i><p v-show="secondpassTip">x</p>
      <span v-show="secondpassTip">请再次输入密码</span>
    </div>
    <div class="ipt-usercode validation" style="display:inline-block;">
      <input type="text" v-model="registerForm.usercode" :class="usercodeTip ? 'isRed':'notRed'" placeholder="请输入验证码" @focus="usercodeFoucs" style="width:140px">
      <i></i><p v-show="usercodeTip">x</p>
      <span v-show="usercodeTip" class="validation-tip">请输入验证码</span>
    </div>
    <el-form-item class="validation-code" style="width:140px;display:inline-block;position:relative;top:4px;cursor:pointer">
      <img id='base64image' v-bind:src="registerForm.imgdata" @click="changeCode()" class="img-code"/>
      </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native.prevent="registerSubmit" :loading="loading" style="padding-left:60px;padding-right:60px;margin-left:85px">注册</el-button>
    </el-form-item>
    <p style="text-align:center">已有账号?<span style="color:#1890ff;cursor:pointer" @click="goLogin">去登录</span></p>
  </el-form>
</div>
</template>

<script>
import {register, getCode} from '@/api/auth'
import {setCode} from '@/utils/token'
import moveLine from './component/moveLine.vue'

export default {
  components: { moveLine },
  data () {
    return {
      registerForm: { username: '', password: '', secondpass: '', imgdata: '', usercode: '' },
      loading: false,
      usernameTip: false,
      passwordTip: false,
      secondpassTip: false,
      usercodeTip: false
    }
  },
  created () {
    this.changeCode()
  },
  methods: {
    usernameFoucs () {
      this.usernameTip = false
    },
    passwordFoucs () {
      this.passwordTip = false
    },
    secondpassFoucs () {
      this.secondpassTip = false
    },
    usercodeFoucs () {
      this.usercodeTip = false
    },
    goLogin () {
      this.$router.push({path: '/login'})
    },
    changeCode: function () {
      getCode().then((response) => {
        let data = response.data
        if (data.success) {
          this.registerForm.imgdata = 'data:image/jpeg;base64,' + data.data.img
          setCode(data.data.actcode)
        } else {
          this.$message.error({message: data.message})
        }
      }).catch((error) => {
        this.loading = false
        console.log(error)
      })
    },
    registerSubmit: function () {
      this.loading = true
      var password = this.registerForm.password
      var secondpass = this.registerForm.secondpass
      if (this.registerForm.username === '') {
        this.usernameTip = true
        this.loading = false
      }
      if (this.registerForm.password === '') {
        this.passwordTip = true
        this.loading = false
      }
      if (this.registerForm.secondpass === '') {
        this.secondpassTip = true
        this.loading = false
      }
      if (this.registerForm.usercode === '') {
        this.usercodeTip = true
        this.loading = false
      }
      if (password !== secondpass) {
        this.$message.error('两次输入的密码不同')
        this.loading = false
      } else {
        if (this.usernameTip === false && this.passwordTip === false && this.secondpassTip === false && this.usercodeTip === false) {
          let userpass = {
            'username': this.registerForm.username,
            'password': this.registerForm.password,
            'usercode': this.registerForm.usercode
          }
          register(userpass).then((response) => {
            if (response.data.success) {
              this.$alert('注册成功，请联系管理员审核', '', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push({path: '/login'})
                }
              })
            } else {
              this.$message.error({message: response.data.message})
            }
          }).catch((error) => {
            console.log(error)
            this.loading = false
            this.$message.error({message: '注册失败'})
          })
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
     -webkit-border-radius: 5px;
    border-radius: 6px;
     -moz-border-radius: 5px;
    margin: 180px auto 0;
    width: 320px;
    padding: 30px 30px 15px 30px;
    background: #fff;
    border: 1px solid #eaeaea;
    background-image: url(../../assets/img/login_b.png);
    background-repeat: no-repeat;
    }
    .logoPng {
      height: 120px;
      width: 100%;
      position: relative;
      img {
        position: absolute;
        left: 50%;
        margin-left: -36px;
        top: 50%;
        margin-top: -50px;
      }
    }
    input {
      width: 290px;
      height: 36px;
      line-height: 36px;
      padding-left: 30px;
      border: none;
      outline: 0;
      color: #a1a1a1;
      border-bottom: 2px solid #e4e4e4;
      margin-bottom: 26px;
      font-size: 14px;
      background: transparent;
    }
    i {
      display: inline-block;
      width: 18px;
      height: 18px;
      position: absolute;
      top: 8px;
      left: 6px;
    }
    .validation {
      .isRed {
        border-bottom: 2px solid #ed6b8f;
      }
      p {
        display: inline;
        color: #ed6b8f;
        position: absolute;
        top: 4px;
        right: 2px;
        font-weight: bold;
      }
      span {
        display: inline-block;
        color: #ed6b8f;
        font-size: 12px;
        background: #ffe8f0;
        border-radius: 10px;
        border-top-right-radius: 0;
        height: 20px;
        line-height: 20px;
        width: 104px;
        text-align: center;
        position: absolute;
        top:44px;
        right: 2px;
      }
      .validation-tip {
        right: -146px;
        top: 42px;
      }
    }
    .ipt-username {
      position: relative;
      i {
        background: url(../../assets/img/home_sprite.png) -6px -149px;
      }
    }
    .ipt-password {
      position: relative;
      i {
        background: url(../../assets/img/home_sprite.png) -6px -176px;
      }
    }
    .ipt-usercode {
      position: relative;
      i {
        background: url(../../assets/img/home_sprite.png) -6px -201px;
      }
    }
  .el-button--primary {
    padding-top: 12px;
    padding-bottom: 12px;
  }
</style>
