<!--
 * @Description: file content
 * @Author: 白青
 * @Date: 2019-11-25 10:40:10
 * @LastEditTime: 2019-11-25 13:29:49
 * @LastEditors: 白青
 -->
<template>
  <div id="app">
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  // background: url(assets/login_background.jpg) 0 0 no-repeat;
  // background-size: 100%;
}
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  // background-color: #f5f5f5;
}
</style>
