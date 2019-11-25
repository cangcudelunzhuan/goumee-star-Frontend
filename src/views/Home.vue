<!--
 * @Description: 营销平台首页
 * @Author: 白青
 * @Date: 2019-08-06 09:35:27
 * @LastEditTime: 2019-11-25 14:13:24
 * @LastEditors: 白青
 -->
<template>
  <el-container style="height:100%">
    <!-- header -->
    <el-header>
      <el-col
        class="logo"
        :span="8"
        :class="menuIsMini ? 'mini' : ''"
      >
        <div class="logo-img"></div>
      </el-col>
      <el-col
        class="menu-icon"
        :span="8"
      >
        <i
          class="icon-menu"
          @click="handleCollapse"
        ></i>
      </el-col>
      <el-col
        :span="8"
        class="userinfo"
      >
        <el-dropdown trigger="click">
          <span class="userinfo-inner"><i class="avatar-icon"></i>{{sysUserName}}<i class="right-icon"></i></span> <!-- <i class="info-icon"></i> -->
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item> -->
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-header>
    <el-container>
      <!-- side -->
      <el-aside
        :class="menuIsMini ? 'mini' : ''"
        :width="menuIsMini ? '56px' : '170px'"
      >
        <el-menu
          v-if="menuPages.length !== 0"
          ref="menu"
          :default-active="activeName"
          router
          style="border:none;"
          text-color="rgba(65,70,85,1)"
          @open="onSubMenuOpen"
          @close="onSubMenuClose"
          @select="onMenuSelected"
          :default-openeds="['/customer', '/operation-center', '/medium']"
        >
          <!-- active-text-color="#fff" -->
          <!-- <template v-for="(item, index) in $router.options.routes[3].children"> -->
          <template v-for="(item, index) in menuPages">
            <el-menu-item
              :key="index"
              :index="item.path"
              v-if="!item.hidden && !item.meta.children"
            >
              <i :class="item.meta.class"></i>
              <span
                slot="title"
                style="margin-left: 7px;font-size:14px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(65,70,85,1);"
              >{{item.name}}</span>
            </el-menu-item>
            <el-submenu
              :key="index"
              v-if="!item.hidden && item.meta.children"
              :index="item.path"
              :class="{'is-active': $route.path.includes(item.path)}"
            >
              <template slot="title">
                <i :class="item.meta.class"></i>
                <span
                  slot="title"
                  style="margin-left: 7px;"
                >{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <template v-for="(children, idx) in item.meta.children">
                  <!-- {{$route.path}}
                  {{item.path + '/' + children.path}} -->
                  <el-menu-item
                    v-if="!children.hidden"
                    :index="item.path + '/' + children.path"
                    :class="$route.path === item.path + '/' + children.path ? 'is-active is-super-active' : ''"
                    :key="idx"
                    style="padding-left: 51px;"
                  >{{children.name}}</el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
        <!-- <div class="collapse" @click="handleCollapse">
          <i class="el-icon-d-arrow-right" v-show="menuIsMini"></i>
          <i class="el-icon-d-arrow-left" v-show="!menuIsMini"></i>
        </div> -->
      </el-aside>
      <!-- mainContainer  width:50%; (!IE)-->
      <el-container style="width:50%">
        <!-- main -->
        <el-main>
          <el-scrollbar
            wrap-class="list-scrollbar"
            view-class="view-scrollbar"
            :native="false"
          >
            <div style="padding-right: 12px;">
              <transition name="fade">
                <keep-alive>
                  <router-view v-if="$route.meta.isKeepLive"></router-view>
                </keep-alive>
              </transition>
              <transition name="fade">
                <router-view v-if="!$route.meta.isKeepLive"></router-view>
              </transition>
            </div>
          </el-scrollbar>
        </el-main>
        <!-- footer -->
        <!-- <el-footer height="46px" style="border-left: #f5f5f5 solid 1px;">
          <p class="gomee">构美信息技术有限公司</p>
        </el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from '@/utils/token'
// import { getUserInfo } from '@/api/auth'
// import { PAGE_PATH } from '@/utils/config' // USER_ROLE
import { RIGHT_CODE } from '@/const/roleCode' // ROLE_CODE,
export default {
  data () {
    return {
      sysUserName: '未登录',
      activeName: '/main',
      submenuClass: '',
      menuIsMini: false,
      menuPages: []
    }
  },
  created () {
    this.init()
    this.activeName = '/' + this.$route.path.substring(1).split('/')[0]
  },
  activated () {
    // this.init()
  },
  watch: {
    $route (to, from, next) {
      this.activeName = '/' + this.$route.path.substring(1).split('/')[0]
      // if (this.activeName === '/product-detail') {
      //   this.activeName = '/display-info'
      // }
      // if (this.activeName === '/requirement-info' || this.activeName === '/plan-info' || this.activeName === '/match-info') {
      //   this.activeName = '/brand-requirement'
      // }
      // this.delayAddActiveClass()
    }
  },
  mounted () {
    // this.submenuClass = this.$route.path.includes('brand') ? 'is-active' : ''
    // console.log(this.$router.options.routes[3])
    // console.log(this.$store.getters['user/getUserInfo'])
  },
  methods: {
    init () {
      const userinfo = this.$store.getters['user/getUserInfo']
      if (userinfo) {
        this.sysUserName = userinfo.username
        // let role = userinfo.role
        const menuPages = this.$router.options.routes[3].children
        // 循环检测权限码是否存在，然后根据权限码控制侧边栏隐藏显示
        menuPages.forEach(item => {
          if (item.meta.right) {
            // console.log('有权限', item.meta.right)
            // 先拿到有配置权限的一级路由节点
            // 判断是否拥有一个权限，只要其中一个权限，就显示一级菜单
            // console.log(this.$store.getters['user/getUserRole'])
            const hasOneRightInRightsArr = item.meta.right.some(right => {
              // debugger
              // console.log('getUserRole', this.$store.getters['user/getUserRole'])
              // console.log('right', right, RIGHT_CODE[right])
              return this.$store.getters['user/getUserRole'].includes(RIGHT_CODE[right])
            })
            item.hidden = !hasOneRightInRightsArr
            // console.log(item.meta.right, hasOneRightInRightsArr)
            // 判断二级菜单是否拥有权限
            if (item.meta.children) {
              item.meta.children.forEach(children => {
                const hasRight = children.right.some(right => {
                  // console.log(right)
                  return this.$store.getters['user/getUserRole'].includes(RIGHT_CODE[right])
                })
                // console.log(children.right, hasRight)
                // if (!hasRight) children.hidden = true
                children.hidden = !hasRight
              })
            }
          }
        })
        this.menuPages = menuPages
        // if (role === ROLE_CODE.ae) {
        //   menuPages.forEach(item => {
        //     if (item.path === PAGE_PATH.USER_NAMEGE) {
        //       item.hidden = true
        //     }
        //   })
        // } else if (role === ROLE_CODE.customer_manager) {
        //   menuPages.forEach(item => {
        //     if (item.path === PAGE_PATH.IMPORT_LOGS || item.path === PAGE_PATH.USER_NAMEGE) {
        //       item.hidden = true
        //     }
        //   })
        // } else if (role === ROLE_CODE.customer_manager) {
        //   menuPages.forEach(item => {
        //     if (item.path === PAGE_PATH.BRAND_REQUIREMENT || item.path === PAGE_PATH.IMPORT_LOGS || item.path === PAGE_PATH.USER_NAMEGE) {
        //       item.hidden = true
        //     }
        //   })
        // } else {
        //   menuPages.forEach(item => {
        //     if (item.path === PAGE_PATH.BRAND_REQUIREMENT || item.path === PAGE_PATH.IMPORT_LOGS || item.path === PAGE_PATH.USER_NAMEGE) {
        //       item.hidden = false
        //     }
        //   })
        // }
      } else {
        this.$router.push({ path: '/login' })
      }
      // getUserInfo()
      //   .then(response => {
      //     let data = response.data
      //     if (data.success) {
      //     } else {
      //       this.$router.push({ path: '/login' })
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    logout () {
      removeToken()
      this.$store.commit('user/logout')
      this.$router.push({ path: '/login' })
    },
    // 打开二级导航
    onSubMenuOpen (path) {
      // this.$router.push({
      //   path: path
      // })
      this.delayAddActiveClass()
    },
    // 当选择其他导航时
    onMenuSelected (path) {
      // if (!path.includes('/brand')) {
      //   this.$refs.menu.close('/brand')
      //   this.delayAddActiveClass()
      // }
    },
    // submenu 关闭时
    onSubMenuClose () {
      // this.$router.push({
      //   path: '/brand'
      // })
      // this.$refs.menu.open('/brand')
      this.delayAddActiveClass()
    },
    // 延时添加激活状态class
    delayAddActiveClass () {
      setTimeout(() => {
        // this.submenuClass = this.$route.path.includes('brand') ? 'is-active' : ''
      }, 500)
    },
    // 收缩侧边栏
    handleCollapse () {
      this.menuIsMini = !this.menuIsMini
    }
  }
}
</script>
<style lang="scss">
.el-main {
  position: relative;
  & > .el-scrollbar {
    position: absolute;
    top: 12px;
    left: 12px;
    bottom: 8px;
    right: 0;
    .list-scrollbar {
      height: 100%;
      overflow-x: hidden;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '@/styles/vars.scss';
.el-header {
  // background: $color-primary;
  // background: #fff;
  background: #5c82ff;
  // box-shadow: $color-box-shadow;
  z-index: 1000;
  *zoom: 1000;
  display: block;
  height: 56px !important;
  line-height: 56px;
  overflow: hidden;
  padding: 0;
  .logo {
    transition: width 0.3s linear;
    background: #547bfe;
    color: #fff;
    font-size: 18px;
    float: left;
    // margin-left: 10px;
    width: 180px;
    height: 56px;
    // border-right: #f5f5f5 solid 1px;
    // border-bottom: #f5f5f5 solid 1px;
    overflow: hidden;
    padding-left: 22px;
    .logo-img {
      margin-top: 17px;
      width: 131px;
      height: 21px;
      display: block;
      background: url(../assets/img/pt_logo.png) no-repeat;
    }
    &.mini {
      width: 56px;
      .logo-img {
        margin-top: 16px;
        width: 22px;
        height: 22px;
        background: url(../assets/img/logo_icon.png) no-repeat;
      }
    }
  }
  .menu-icon {
    .icon-menu {
      cursor: pointer;
      margin: 21px 0 0 12px;
      display: block;
      width: 20px;
      height: 16px;
      background: url(../assets/img/menu_icon.png);
    }
  }
  .userinfo {
    float: right;
    text-align: right;
    margin-right: 20px;
    span {
      color: #fff;
      i {
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url(../assets/img/home_sprite.png) -86px -39px;
        margin-right: 6px;
        vertical-align: middle;
      }
      .info-icon {
        background: url(../assets/img/home_sprite.png) -85px -66px;
      }
      .right-icon {
        background: url(../assets/img/home_sprite.png) -85px -65px;
      }
    }
  }
  .userinfo-inner {
    cursor: pointer;
  }
}
.el-aside {
  background: #fff;
  // border-right: 1px solid #e2e1e2;
  transition: width 0.3s linear;
  position: relative;
  overflow: hidden;
  padding-top: 12px;
  &.mini {
    .el-menu-item {
      span {
        margin-left: 16px;
        position: fixed;
        left: 39px\0;
        background: #fff;
        width: 96px;
        text-align: center;
        border: #f4f5f6 solid 1px;
        transition: all 0.26s;
        display: none;
        box-shadow: #e2e2e2 3px 0px 6px;
        &:hover {
          background: #f4f5f6;
        }
      }
      &:hover {
        span {
          display: inline-block;
          z-index: 9;
        }
      }
    }
    /deep/ .el-submenu {
      .el-submenu__title {
        .el-submenu__icon-arrow {
          display: none;
        }
        span {
          margin-left: 16px;
          display: none;
        }
      }
    }
    .el-submenu {
      .el-menu-item-group {
        position: fixed;
        margin-top: -50px;
        z-index: 10;
        left: 56px;
        background: #fff;
        width: 96px;
        text-align: center;
        border: #f4f5f6 solid 1px;
        transition: all 0.26s;
        display: none;
        box-shadow: #e2e2e2 3px 0px 6px;
        .el-menu-item {
          padding: 0 !important;
          min-width: 96px;
          display: none;
          &:hover {
            background: #f4f5f6;
          }
        }
      }
      &:hover {
        .el-menu-item-group {
          display: block;
        }
        /deep/ .el-menu {
          display: block !important;
        }
        .el-menu-item {
          display: block;
        }
      }
    }
  }
  .collapse {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 60px;
    line-height: 60px;
    width: 100%;
    text-align: center;
    border-top: #f4f5f6 solid 1px;
    cursor: pointer;
    i {
      font-size: 20px;
      font-weight: bold;
      position: relative;
      top: 3px;
      color: #abafc3;
    }
  }
  .is-active {
    // background: $color-primary;
    background: #f7f8ff;
    position: relative;
    // border-radius: 2px;
    // box-shadow: $color-box-shadow;
    &:hover {
      // background: $color-primary !important;
    }
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: ' ';
      display: block;
      width: 5px;
      height: 50px;
      background: $color-primary;
      transition: all 0.3s;
    }
    color: $color-primary;
    .cls-main {
      background-position: -35px -6px !important;
    }
    .cls-star-personal {
      background-position: -35px -30px !important;
    }
    .cls-star-info {
      background-position: -35px -56px !important;
    }
    .cls-display-info {
      background-position: -35px -81px !important;
    }
    .cls-product-info {
      background-position: -207px -5px !important;
      position: relative;
      top: 2px;
    }
    .cls-customer-info {
      background-position: -208px -29px !important;
    }
    .cls-brand {
      background-position: -69px -148px !important;
    }
    .cls-log {
      background-position: -70px -175px !important;
    }
    .cls-fans-info {
      background-position: -68px -199px !important;
    }
    .cls-user {
      background-position: -35px -108px !important;
    }
    .cls-medium {
      background-image: url('../assets/img/home_menu_select_icon12.png') !important;
    }
    .cls-approval {
      background-image: url('../assets/img/home_menu_select_icon13.png') !important;
    }
    .el-submenu__title {
      span {
        color: $color-primary;
      }
    }
  }
  .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
  // /deep/ .el-submenu.is-opened .el-submenu__title {
  //   background: #F7F8FF;
  //   position: relative;
  //   color: #5C82FF;
  //   &::before {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     content: " ";
  //     display: block;
  //     width: 5px;
  //     height: 60px;
  //     background: #5C82FF;
  //     -webkit-transition: all 0.3s;
  //     transition: all 0.3s;
  //   }
  // }
  /deep/ .el-submenu {
    .el-submenu__title {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(65, 70, 85, 1);
      height: 50px;
      line-height: 50px;
    }
    .el-menu-item-group {
      width: 180px;
      overflow: hidden;
      .el-menu-item-group__title {
        display: none;
      }
      .is-active {
        color: rgb(102, 102, 102);
        background: #fff;
        &::before {
          width: 0;
        }
      }
      .is-super-active {
        color: #5c82ff;
        background: #f7f8ff;
        &::before {
          width: 5px;
        }
      }
    }
  }
  .el-menu-item,
  .el-submenu {
    // margin: 20px 10px 16px;
    transition: all 0.26s;
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(118, 120, 127, 1);
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url(../assets/img/home_sprite.png);
      // vertical-align: text-bottom;
    }
    .cls-main {
      background-position: -5px -6px;
    }
    .cls-star-personal {
      background-position: -5px -30px;
    }
    .cls-star-info {
      background-position: -5px -56px;
    }
    .cls-display-info {
      background-position: -3px -81px;
    }
    .cls-product-info {
      background-position: -176px -6px;
      position: relative;
      top: 2px;
    }
    .cls-customer-info {
      background-position: -176px -29px;
    }
    .cls-brand {
      background-position: -35px -148px;
    }
    .cls-log {
      background-position: -37px -174px;
    }
    .cls-fans-info {
      background-position: -34px -199px;
    }
    .cls-user {
      background-position: -4px -107px;
    }
    .cls-medium {
      background: url('../assets/img/home_menu_icon12.png') center center
        no-repeat;
    }
    .cls-approval {
      background: url('../assets/img/home_menu_icon13.png') center center
        no-repeat;
    }
  }
  .el-menu-item:hover {
    // background: rgba(25, 150, 255, 0.2);
    background: #f7f8ff !important;
    // border-radius: 2px;
  }
}
.el-main {
  box-sizing: border-box;
  margin-bottom: 4px; // scroll-IE!
  padding: 12px 12px 0;
}
.el-footer {
  padding: 0;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.gomee {
  height: 46px;
  line-height: 46px;
  text-align: center;
  color: #666;
  font-size: 14px;
  background: #fff;
  margin: 0;
}
.fade-enter-active {
  transition: all 0.5s ease;
}
// .fade-leave-active
.fade-enter,
.fade-leave-active {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
