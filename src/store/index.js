import Vuex from 'vuex'
import requirement from './modules/requirement'
import customer from './modules/customer'
import user from './modules/user'
import cooperative from './modules/cooperative'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    requirement,
    customer,
    user,
    cooperative
  },
  plugins: [vuexLocal.plugin]
})

export default store
