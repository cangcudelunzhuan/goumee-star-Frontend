/**
 * 协同模块mutations
 */

import {GET_CustomerDetail} from './actiontypes'

// 洽谈记录
import ChatRecordMutations from './chatrecord/mutations'
// 合作记录
import CooperationMutations from './cooperation/mutations'
// 执行项目
import ExecuteMutations from './execute/mutations'

export default {
  ...ChatRecordMutations,
  ...CooperationMutations,
  ...ExecuteMutations,
  // 获取客户详情
  [GET_CustomerDetail]: (state, data) => {
    state.CustomerDetail = data
  }
}
