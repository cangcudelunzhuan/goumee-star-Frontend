/**
 * 协同模块getters
 */

export default {
  CustomerDetail: state => state.CustomerDetail, // 客户详情
  ChatRecord: state => state.ChatRecord, // 洽谈记录
  CooperationList: state => state.CooperationList, // 合作记录
  CooperationDetail: state => state.CooperationDetail, // 合作详情
  CooperationdetailStatus: state => state.CooperationdetailStatus, // 当前合作详情状态
  AchievementList: state => state.AchievementList, // 业绩记录
  CostList: state => state.CostList, // 成本记录
  CooperationAE: state => state.CooperationAE, // 执行AE
  CurrentAE: state => state.CurrentAE, // 当前AE
  CurrentAERecordList: state => state.CurrentAERecordList // 当前AE跟单记录
}
