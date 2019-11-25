/**
 * 协同模块接口请求
 */
import request from '@/utils/request'
import { getToken } from '@/utils/token'
import qs from 'query-string'

// 洽谈 start

// 保存洽谈记录
export function saveConversation(data) {
  return request({
    url: '/api/cust/save_conversation',
    method: 'post',
    data
  })
}

// 获取洽谈记录
export function getConversation(params) {
  return request({
    url: '/api/cust/query_conversation',
    method: 'get',
    params
  })
}

// 删除洽谈记录
export function deleteConversation(data) {
  return request({
    url: '/api/cust/del_conversation',
    method: 'post',
    data
  })
}

// 洽谈 end

// 合作 start

// 获取合作记录
export function getCooperation(params) {
  return request({
    url: '/api/coop/query_cooperation',
    method: 'get',
    params
  })
}

// 获取合作详情
export function getCooperationDetail(params) {
  return request({
    url: '/api/coop/query_cooperation',
    method: 'get',
    params
  })
}

// 保存合作
export function saveCooperation(data) {
  return request({
    url: '/api/coop/save_cooperation',
    method: 'post',
    data
  })
}

// 删除合作
export function deleteCooperation(data) {
  return request({
    url: '/api/coop/del_cooperation',
    method: 'post',
    data
  })
}

// 上传文件
export function uploadFile(data) {
  return request({
    url: '/api/resources/upload_file',
    method: 'post',
    data
  })
}

// 确认合作
export function confirmCooperation(data) {
  return request({
    url: '/api/coop/confirm_cooperation',
    method: 'post',
    data
  })
}

// 合作 end

// 业绩 start

// 获取业绩编号
export function getAchievementUid() {
  return request({
    url: '/api/coop/get_achievement_uid',
    method: 'get'
  })
}

// 上传凭证
// certificate/achievement_gather_certificate # 业绩收款凭证
// certificate/achievement_invoice_certificate # 业绩开票凭证
// certificate/cost_invoice_certificate # 成本开票凭证
// certificate/cost_pay_certificate # 成本打款凭证
export function uploadCertificate(data) {
  return request({
    url: '/api/resources/upload_certificate',
    method: 'post',
    data
  })
}

// 保存业绩
export function saveAchievement(data) {
  return request({
    url: '/api/coop/save_achievement',
    method: 'post',
    data
  })
}

// 获取业绩列表
export function getAchievementList(params) {
  return request({
    url: '/api/coop/query_achievement',
    method: 'get',
    params
  })
}

// 删除业绩
export function deleteAchievement(data) {
  return request({
    url: '/api/coop/del_achievement',
    method: 'post',
    data
  })
}

// 导出业绩
export function exportAchievement(params) {
  let _paramsstr = qs.stringify(params)
  let token = getToken()
  window.open(`${process.env.BASE_API}/api/coop/export_achievement?${_paramsstr}&Authorization=${token}`)
}

// 获取某个合作的所有业绩编号
export function getAchievementUIdsByCooperation(params) {
  params = {...params, ...{num: 10000, page_num: 1}}
  return request({
    url: '/api/coop/query_achievement',
    method: 'get',
    params
  })
}

// 业绩end

// 成本start

// 批量添加成本
export function addCostList(data) {
  return request({
    url: '/api/coop/add_cost_list',
    method: 'post',
    data
  })
}

// 更新成本
export function updateCostList(data) {
  return request({
    url: '/api/coop/update_cost',
    method: 'post',
    data
  })
}

// 获取成本列表
export function getCostList(params) {
  return request({
    url: '/api/coop/query_cost',
    method: 'get',
    params
  })
}

// 删除成本
export function deleteCost(data) {
  return request({
    url: '/api/coop/del_cost',
    method: 'post',
    data
  })
}

// 导出成本
export function exportCost(params) {
  let _paramsstr = qs.stringify(params)
  let token = getToken()
  window.open(`${process.env.BASE_API}/api/coop/export_cost?${_paramsstr}&Authorization=${token}`)
}

// 更新打款
export function updateIsPay(data) {
  return request({
    url: '/api/coop/update_cost_is_pay',
    method: 'post',
    data
  })
}

// 成本end

// 执行start

// 查询跟单ae
export function getCooperationAE(params) {
  return request({
    url: '/api/coop/query_cooperation_ae',
    method: 'get',
    params
  })
}

// 保存AE
export function saveAE(data) {
  return request({
    url: '/api/coop/save_cooperation_ae',
    method: 'post',
    data
  })
}

// 获取当前执行AE的账户金额
export function getCurrentAEAccount(params) {
  return request({
    url: '/api/coop/get_ae_documentary_amount',
    method: 'get',
    params
  })
}

// 批量添加跟单
export function addDocumentaryList(data) {
  return request({
    url: '/api/coop/add_documentary_list',
    method: 'post',
    data
  })
}

// 更新跟单
export function updateDocumentary(data) {
  return request({
    url: '/api/coop/update_documentary',
    method: 'post',
    data
  })
}

// 获取跟单列表
export function getDocumentaryList(params) {
  return request({
    url: '/api/coop/query_documentary',
    method: 'get',
    params
  })
}

// 删除跟单
export function deleteDocumentary(data) {
  return request({
    url: '/api/coop/del_documentary',
    method: 'post',
    data
  })
}

// 结束合作
export function StopCooperation(data) {
  return request({
    url: '/api/coop/confirm_end_cooperation',
    method: 'post',
    data
  })
}

// 执行end
