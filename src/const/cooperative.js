// 客户阶段
export const customerStageList = [
  {
    type: 1,
    value: '意向客户',
    subtitle: '客户需求'
  },
  {
    type: 2,
    value: '确定合作',
    subtitle: '业绩登记/成本安排'
  },
  {
    type: 3,
    value: '执行项目',
    subtitle: '指定AE/AE跟单'
  },
  {
    type: 4,
    value: '执行结束',
    subtitle: '执行结果'
  },
  {
    type: 5,
    value: '数据入库',
    subtitle: '导入场次/商品数据'
  }
]

// 合作类型
export const cooperationTypeList = [
  {
    label: '直播',
    value: 1
  },
  {
    label: '视频',
    value: 2
  },
  {
    label: '图文',
    value: 3
  }
]

// 收款方式
export const gatherWayList = [
  {
    label: '构美网（v任务）',
    value: 1
  },
  {
    label: '支付宝',
    value: 2
  },
  {
    label: '对公账户',
    value: 3
  }
]

// 格式化收款方式
export function gatherWayListFormat (type) {
  return gatherWayList.find(g => g.value === type).label || ''
}
