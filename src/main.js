// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import Vue from 'vue' ***
// import ElementUI from 'element-ui' ***
// import 'element-ui/lib/theme-chalk/index.css' ***

import './styles/element/index.css'
import App from './App'
import router from './router'
import store from './store'
import bgLogo from './assets/img/login_background.jpg'
import '../static/common.scss'
import GmMsg from './components/tipDialog/extend'
import VueLazyload from 'vue-lazyload'
import * as filters from './utils/filter'
import './components'
// Vue.use(ElementUI) ***

Vue.prototype.$gmMessage = GmMsg.install
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('@/assets/img/logo_icon.png'),
  attempt: 1
})

// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  data: { bgLogo },
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    // if (this.$route.fullPath === '/login' || this.$route.fullPath === '/register') {
    //   document.body.style.background = `url(${this.bgLogo})`
    //   document.body.style.backgroundSize = 'cover'
    //   document.body.style.backgroundAttachment = 'fixed'
    // } else {
    document.body.style.background = '#f4f5f6'
    // }
  },
  watch: {
    $route () {
      // if (this.$route.path === '/login' || this.$route.path === '/register') {
      //   document.body.style.background = `url(${this.bgLogo})`
      //   document.body.style.backgroundSize = 'cover'
      //   document.body.style.backgroundAttachment = 'fixed'
      // } else {
      document.body.style.background = '#f4f5f6'
      // }
    }
  }
})
