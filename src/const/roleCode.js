/*
 * @Description: 角色码及权限码
 * @Author: 白青
 * @Date: 2019-08-06 09:35:27
 * @LastEditTime: 2019-09-07 15:26:14
 * @LastEditors: 白青
 */
// 角色码
const ROLE_CODE = {
  common_user: 0, // 基础用户

  general_manager: 801, // 总经理
  deputy_general_manager: 802, // 副总经理
  risk_control_specialist: 803, // 风控专员

  xyx_manager: 101, // 新营销部门经理
  xyx_director: 102, // 新营销主管
  major_customer_manager: 103, // 大客户经理
  customer_manager: 104, // 客户经理
  medium: 105, // 媒介
  ae_leader: 106, // 客户执行组长
  ae: 107, // 客户执行
  planning_executive: 108, // 策划专员
  event_planning: 109, // 活动策划

  financial_manager: 601, // 财务经理
  financial_assistant: 602, // 财务助理
  senior_finance_officer: 603, // 资深财务专员

  it_manager: 401, // 研发部经理
  it_pm: 402, // 研发部产品经理
  frontend_developer: 403, // 前端开发
  backend_developer: 404, // 后端开发
  ui_designer: 405 // UI设计
}

// 权限码
const RIGHT_CODE = {
  view_sale_rank_list: 100001, // 查看合作主播销售榜
  view_star_rank_list: 100002, // 查看主播达人榜
  view_req_list: 110001, // 查看需求列表
  add_req: 110002, // 新增需求
  update_req: 110003, // 更新需求
  del_req: 110004, // 删除需求
  add_brand: 111001, // 新增品牌
  del_brand: 111002, // 删除品牌
  update_brand: 111003, // 修改品牌
  view_brand: 111004, // 查看品牌
  view_customer: 112001, // 查看客户列表
  add_customer: 112002, // 新增客户
  del_customer: 112003, // 删除客户
  update_customer: 112004, // 修改客户
  export_customer: 112005, // 导出客户
  view_contract: 113001, // 查看客户合同
  add_contract: 113002, // 新增客户合同
  update_contract: 113003, // 修改客户合同
  del_contract: 113004, // 删除客户合同
  approve_contract: 113005, // 审批合同
  recycle_contract: 113006, // 回收合同
  view_conversation: 114001, // 查看客户洽谈记录
  add_conversation: 114002, // 新增客户洽谈记录
  update_conversation: 114003, // 修改客户洽谈记录
  del_conversation: 114004, // 删除客户洽谈记录
  view_company: 120001, // 查看公司库
  add_company: 120002, // 新增公司库
  update_company: 120003, // 修改公司库
  del_company: 120004, // 删除公司库
  export_company: 120005, // 导出公司库
  view_kol: 121001, // 查看个人库
  add_kol: 121002, // 新增个人库
  update_kol: 121003, // 修改个人库
  del_kol: 121004, // 删除个人库
  export_kol: 121005, // 导出个人库
  view_taobao_star_key_info: 121006, // 查看淘宝主播敏感信息， 手机号，微信号
  view_display: 130001, // 查看场次列表
  add_display: 130002, // 新增场次
  update_display: 130003, // 修改场次
  del_display: 130004, // 删除场次
  export_display: 130005, // 导出场次
  view_product: 131001, // 查看商品列表
  add_product: 131002, // 新增商品
  update_product: 131003, // 修改商品
  del_product: 131004, // 删除商品
  view_import: 140001, // 查看导入日志
  view_users: 150001, // 查看用户列表
  update_user: 150002, // 编辑用户信息
  get_user_name_list: 150003, // 获取用户名列表
  view_cooperation: 160001, // 查看客户合作
  add_cooperation: 160002, // 新增客户合作
  update_cooperation: 160003, // 修改客户合作
  del_cooperation: 160004, // 删除客户合作
  view_achievement: 161001, // 查看业绩
  add_achievement: 161002, // 新增业绩
  update_achievement: 161003, // 修改业绩
  del_achievement: 161004, // 删除业绩
  export_achievement: 161005, // 导出业绩
  view_cost: 162001, // 查看成本安排
  add_cost: 162002, // 新增成本安排
  update_cost: 162003, // 修改成本安排
  del_cost: 162004, // 删除成本安排
  export_cost: 162005, // 导出成本
  view_documentary: 163001, // 查看跟单
  add_documentary: 163002, // 新增跟单
  update_documentary: 163003, // 修改跟单
  del_documentary: 163004, // 删除跟单
  view_certificate: 164001, // 查看凭证
  add_certificate: 164002, // 上传凭证
  update_certificate: 164003, // 修改凭证
  del_certificate: 164004, // 删除凭证
  upload_finance_certificate: 164005 // 上传财务凭证
}

export {
  ROLE_CODE,
  RIGHT_CODE
}
