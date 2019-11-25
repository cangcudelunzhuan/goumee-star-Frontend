/**
 * 协同模块Actions
 */
import {queryCustomer} from '@/api/customer'
import {GET_CustomerDetail} from './actiontypes'
import { Message } from 'element-ui'

// 洽谈记录
import ChatRecordActions from './chatrecord/actions'
// 合作记录
import CooperationActions from './cooperation/actions'
// 执行项目
import ExecuteActions from './execute/actions'

// 获取客户详情
const GetCustomerDetail = ({commit}, customer_id) => {
  queryCustomer({customer_id}).then((res) => {
    if (res.data.success) {
      let customer_detail = res.data.data.data[0]
      commit(GET_CustomerDetail, customer_detail)
    } else {
      Message.error(res.data.message)
      commit(GET_CustomerDetail, null)
    }
  }).catch((err) => {
    Message.error(err)
  })
}

export default {
  GetCustomerDetail,
  ...ChatRecordActions,
  ...CooperationActions,
  ...ExecuteActions
}
