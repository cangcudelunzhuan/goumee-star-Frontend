<style lang="scss" scoped>
@import '@/styles/vars.scss';
#header {
  border-bottom: 1px solid;
  border-bottom-color: rgba($color: #fff, $alpha: 0.08);
  min-width: 1200px;
  &.dark { background: #0E1730; }
  &.light { background: #fff; }
  .inner-header {
    width: 1200px;
    margin: 0 auto;
    height: 70px;
    line-height: 70px;
    overflow: hidden;
    .logo {
      float: left;
      img {
        position: relative;
        top: 8px;
      }
    }
    .nav-btn {
      float: right;
      a {
        display: inline-block;
        width: 80px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        text-decoration: none;
        &.link {
          color: #BBBBBB;
          margin-right: 15px;
          &:hover {
            color: #5c82ff;
          }
        }
        &.btn-link {
          background: $color-primary;
          color: #fff;
          border-radius: 2px;
        }
      }
    }
  }
  &.fixed {
    position: fixed;
    background: #fff;
    box-shadow:0px 2px 10px 0px rgba(0, 0, 0, 0.06);
    .inner-header .nav-btn .link {
      color: #666;
    }
  }
}
@media screen and (max-width: 1200px) {
  #header {
    min-width: 1000px;
    box-shadow:0px 2px 10px 0px rgba(0, 0, 0, 0.06);
    .inner-header {
      width: 1000px;
    }
  }
}
</style>

<template>
  <div id="header" :class="theme">
    <div class="inner-header">
      <a class="logo" href="/">
        <img v-if="theme === 'dark'" src="@/assets/img/login/logo.png">
        <img v-else src="@/assets/img/login/logo2.png">
      </a>
      <ul class="nav-btn">
        <li>
          <a href="/" class="link">首页</a>
          <router-link to="/login" class="btn-link">登录</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'dark'
    }
  },
  name: 'loginHeader'
}
</script>
