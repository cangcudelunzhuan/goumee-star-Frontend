const mutations = {
  updateCurrentId(state, id) {
    state.currentId = id
  },
  updateCustomerInfo(state, customerInfo) {
    state.customerInfo = customerInfo
  },
  updatePage(state, value) {
    state.currentPage = value
  }
}
export default mutations
