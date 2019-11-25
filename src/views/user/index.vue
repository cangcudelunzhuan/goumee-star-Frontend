<!--
 * @Description: file content
 * @Author: 白青
 * @Date: 2019-11-25 10:40:10
 * @LastEditTime: 2019-11-25 13:10:48
 * @LastEditors: 白青
 -->
<template>
  <section class="user-manage-wrapper">
    <div class="common-block-wrapper">
      <div class="medium-title">
        <div
          :class="['title', { current: $route.query.type != '2' }]"
          @click="changeCurrentType(1)"
        >
          <span>人员管理</span>
        </div>
        <div
          :class="['title', { current: $route.query.type === '2' }]"
          @click="changeCurrentType(2)"
        >
          <span>权限管理</span>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {
  name: "PowerManage",
  data () {
    return {}
  },
  methods: {
    changeCurrentType (type) {
      if (type === 1) {
        this.$router.push("/operation-center/user-management/user?type=1")
      }
      if (type === 2) {
        this.$router.push("/operation-center/user-management/role?type=2")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';
.user-manage-wrapper {
  min-width: 1160px;
  .medium-title {
    font-size: 0;
    text-align: center;
    border-bottom: #efefef solid 1px;
    background: #fff;
    .title {
      display: inline-block;
      width: 140px;
      height: 60px;
      color: #333;
      box-sizing: border-box;
      line-height: 60px;
      background: #fff;
      margin: 0 30px;
      cursor: pointer;
      span {
        display: inline-block;
        vertical-align: top;
        margin-left: 3px;
        font-size: 16px;
      }
      &.current {
        color: #5c82ff;
        border-bottom: #5c82ff solid 2px;
      }
    }
  }
}
</style>
