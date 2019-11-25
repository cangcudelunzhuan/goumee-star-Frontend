/**
 * 协同模块-合作记录Actions
 */
import {getCooperation, getCooperationDetail, getAchievementList, getCostList} from '@/api/cooperative'
import {GET_CooperationList, GET_CooperationDetail, SET_CooperationDetailStatus, GET_AchievementList, GET_CostList} from './actiontypes'
import { Message } from 'element-ui'

// 获取合作记录
const GetCooperation = ({commit}, data) => {
  getCooperation(data).then((res) => {
    if (res.data.success) {
      let cooperationlist = res.data.data
      commit(GET_CooperationList, cooperationlist)
    } else {
      if (res.data.error_code !== 200) {
        Message.error(res.data.message)
      }
      commit(GET_CooperationList, null)
    }
  }).catch((err) => {
    Message.error(err)
  })
}

// 获取合作详情
const GetCooperationDetail = ({commit, state, dispatch}, data) => {
  let _time = 0
  if (state.CooperationDetail !== null) {
    _time = 1000
  }
  setTimeout(() => {
    getCooperationDetail(data).then((res) => {
      if (res.data.success) {
        let cooperationdetail = res.data.data.data[0]
        commit(GET_CooperationDetail, cooperationdetail)
        dispatch('cooperative/GetCustomerDetail', cooperationdetail.customer_id, {root: true})
      } else {
        if (res.data.error_code !== 200) {
          Message.error(res.data.message)
        }
        commit(GET_CooperationDetail, null)
      }
    }).catch((err) => {
      Message.error(err)
    })
  }, _time)
}

// 设置当前合作详情状态
const SetCooperationdetailStatus = ({commit}, data) => {
  commit(SET_CooperationDetailStatus, data)
}

// 获取业绩记录
const GetAchievementList = ({commit}, data) => {
  getAchievementList(data).then((res) => {
    if (res.data.success) {
      let achievementList = res.data.data
      commit(GET_AchievementList, achievementList)
    } else {
      if (res.data.error_code !== 200) {
        Message.error(res.data.message)
      }
      commit(GET_AchievementList, null)
    }
  }).catch((err) => {
    Message.error(err)
  })
}

// 获取成本安排记录
const GetCoostList = ({commit}, data) => {
  getCostList(data).then((res) => {
    if (res.data.success) {
      let costList = res.data.data
      commit(GET_CostList, costList)
    } else {
      if (res.data.error_code !== 200) {
        Message.error(res.data.message)
      }
      commit(GET_CostList, null)
    }
  }).catch((err) => {
    Message.error(err)
  })
}

export default {
  GetCooperation,
  GetCooperationDetail,
  SetCooperationdetailStatus,
  GetAchievementList,
  GetCoostList
}
