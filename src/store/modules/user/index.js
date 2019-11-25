import state from './state'
import getters from './getters'
import mutations from './mutations'

const user = {
  namespaced: true,
  state,
  getters,
  mutations
}
export default user
