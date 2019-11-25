<template>
  <div>
    <moveLine></moveLine>
    <el-form :model="loginForm" label-position="left" class="login-container">
      <div class="logoPng"><img src="@/assets/img/logo.png" alt=""></div>
      <div class="ipt-username">
        <input type="text" v-model="loginForm.username" :class="loginTip ? 'isRed':'notRed'" placeholder="请输入用户名" @focus="usernameFoucs">
        <i></i><p v-show="loginTip" style="cursor:pointer" @click="usernameFoucs">x</p>
        <span v-show="loginTip">请输入用户名</span>
      </div>
      <div class="ipt-password">
        <input type="password" v-model="loginForm.password" @keyup.enter="loginSubmit" :class="loginTipPw ? 'isRed':'notRed'" placeholder="请输入密码" @focus="passwordFoucs">
        <i></i><p v-show="loginTipPw" style="cursor:pointer" @click="passwordFoucs">x</p>
        <span v-show="loginTipPw">请输入密码</span>
      </div>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="loginSubmit" :loading="logining" style="padding-left:60px;padding-right:60px;margin-left:84px;margin-top:10px">登录</el-button>
        <p style="text-align:center;margin-bottom:0">没有账号? &nbsp; <span style="color:#78a8ff;cursor:pointer" @click="register">立即注册</span></p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {login} from '@/api/auth'
import {setToken} from '@/utils/token'
import moveLine from './component/moveLine.vue'

export default {
  components: { moveLine },
  data () {
    return {
      logining: false,
      loginTip: false,
      loginTipPw: false,
      loginForm: { username: '', password: '' }
    }
  },
  methods: {
    passwordFoucs () {
      this.loginTipPw = false
    },
    usernameFoucs () {
      this.loginTip = false
    },
    loginSubmit: function () {
      this.loading = true
      if (this.loginForm.username === '') this.loginTip = true
      if (this.loginForm.password === '') this.loginTipPw = true
      if (this.loginForm.username !== '' && this.loginForm.password !== '') {
        login(this.loginForm.username, this.loginForm.password).then((response) => {
          let data = response.data
          if (data.success) {
            setToken('jwt ' + data.data)
            this.$router.push({path: '/'})
          } else {
            this.$message.error({message: data.message})
          }
        }).catch((error) => {
          console.log(error)
          this.loading = false
        })
      }
    },
    register: function () {
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    border-radius: 6px;
     -webkit-border-radius: 5px;
     -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto 0;
    width: 320px;
    padding: 30px 30px 15px 30px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    background-image: url(../../assets/img/login_b.png);
    background-repeat: no-repeat;
    z-index: 20;
    .logoPng {
      height: 140px;
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
    .ipt-username {
      position: relative;
      i {
        background: url(../../assets/img/home_sprite.png) -6px -149px;
      }
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
        border-radius: 14px;
        border-top-right-radius: 0;
        height: 20px;
        line-height: 20px;
        width: 104px;
        text-align: center;
        position: absolute;
        top:44px;
        right: 2px;
      }
    }
    .ipt-password {
      position: relative;
      i {
        background: url(../../assets/img/home_sprite.png) -6px -176px;
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
        border-radius: 14px;
        border-top-right-radius: 0;
        height: 20px;
        line-height: 20px;
        width: 104px;
        text-align: center;
        position: absolute;
        top:44px;
        right: 2px;
      }
      .isRed {
        border-bottom: 2px solid #ed6b8f;
      }
    }
  }
  .el-button--primary {
    padding-top: 12px;
    padding-bottom: 12px;
  }
</style>
