/*
 * @Description: 客户模块的接口
 * @Author: 白青
 * @Date: 2019-08-14 16:08:38
 * @LastEditTime: 2019-09-10 15:02:27
 * @LastEditors: 白青
 */
import request from '@/utils/request'
import { getToken } from '@/utils/token'
import qs from 'query-string'

export function saveCustomer(data) {
  return request({
    url: '/api/cust/save_customer',
    method: 'post',
    data: data
  })
}
export function delCustomer(params) {
  return request({
    url: '/api/cust/del_customer',
    method: 'get',
    params: params
  })
}
export function queryCustomer(params) {
  return request({
    url: '/api/cust/query_customer',
    method: 'get',
    params: params
  })
}
export function queryUserNames(params) {
  return request({
    url: '/api/auth/query_user_names',
    method: 'get',
    params: params
  })
}

export function queryUserNamesByRoles(params) {
  return request({
    url: '/api/auth/get_user_by_role',
    method: 'get',
    params: params
  })
}

export function exportCustomers(params) {
  let token = getToken()
  let newparams = {...params, Authorization: token}
  let qpstr = qs.stringify(newparams, {sort: false})
  window.open(
    `${process.env.BASE_API}/api/cust/export_customers?${qpstr}`
  )
}

// 合同相关
// 上传附件
export function uploadContractAttachment (data) {
  return request({
    url: '/api/cont/upload_attachment',
    method: 'post',
    data: data
  })
}

// 获取部门
export function getDepartment () {
  return request({
    url: '/api/auth/get_department',
    method: 'get'
  })
}

// 获取角色用户（角色（管理员1，客户执行（AE）0，客户经理2，项目经理3））
export function getRoleUser (params) {
  return request({
    url: '/api/auth/query_user',
    method: 'get',
    params: params
  })
}

// 获取合同审批人
export function getApprover () {
  return request({
    url: '/api/cont/get_approver',
    method: 'get'
  })
}

// 保存合同
export function saveContract (data) {
  return request({
    url: '/api/cont/save_contract',
    method: 'post',
    data: data
  })
}

// 查询合同
export function queryContract (params) {
  return request({
    url: '/api/cont/query_contract',
    method: 'get',
    params: params
  })
}

// 新增合同时，获取合同编号
export function getContractUid () {
  return request({
    url: '/api/cont/get_contract_uid',
    method: 'get'
  })
}

// 导出合同
export function exportContracts (params) {
  return request({
    url: '/api/cont/export_contracts',
    method: 'get',
    params: params
  })
}

// 导出合同
export function deleteContracts (data) {
  return request({
    url: '/api/cont/del_contract',
    method: 'post',
    data: data
  })
}

// 审核合同
export function approveContract (data) {
  return request({
    url: '/api/cont/approve_contract',
    method: 'post',
    data: data
  })
}

// 删除合同
export function deleteContract (data) {
  return request({
    url: '/api/cont/del_contract',
    method: 'post',
    data: data
  })
}

// 作废合同
export function invalidContract (data) {
  return request({
    url: '/api/cont/invalid_contract',
    method: 'post',
    data: data
  })
}

// 【风控】设置合同回收状态
export function setContractRecycle (data) {
  return request({
    url: '/api/cont/recycle_contract',
    method: 'post',
    data: data
  })
}

// 获取所有店铺的名称列表
export function getAllStoreName () {
  return request({
    url: '/api/cust/query_shop_and_company',
    method: 'get'
  })
}

// 根据角色码获取角色列表
export function getUserByRole (params) {
  return request({
    url: '/api/auth/get_user_by_role',
    method: 'get',
    params: params
  })
}

// 获取供应商合同中需要的供应商列表
export function getPartnerList (params) {
  return request({
    url: '/api/cont/get_partner_by_name',
    method: 'get',
    params: params
  })
}

// 根据合同编号获取合同的id
export function getPartnerIdByContractNo (params) {
  return request({
    url: '/api/cont/get_partner_by_uid',
    method: 'get',
    params: params
  })
}

// 提交保存合同附件
export function saveContractAnnex (data) {
  return request({
    url: '/api/cont/save_contract_annex',
    method: 'post',
    data: data
  })
}

// 删除合同附件
export function deleteContractAnnex (data) {
  return request({
    url: '/api/cont/del_contract_annex',
    method: 'post',
    data: data
  })
}

// 获取合同附件列表
export function getContractAnnex (params) {
  return request({
    url: '/api/cont/query_contract_annex',
    method: 'get',
    params: params
  })
}

// 审批合同附件
export function approveContractAnnex (data) {
  return request({
    url: '/api/cont/approve_contract_annex',
    method: 'post',
    data: data
  })
}
