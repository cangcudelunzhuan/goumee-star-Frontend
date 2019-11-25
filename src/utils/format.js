// import moment from 'moment'
import miment from 'miment'

export function displayTypeFormate(row, column) {
  let displayType = row.display_type
  switch (displayType) {
    case 0:
      return '混播'
    case 1:
      return '专场'
  }
}
export const categoryList = [
  '综合',
  '美妆',
  '个护',
  '服饰',
  '美食',
  '母婴',
  '数码',
  '家居',
  '保健',
  '萌宠',
  '箱包',
  '配饰'
]
export function categoryFormate(row, column) {
  let category = row.category
  if (category === 0) {
    return '无'
  } else {
    return categoryList[category]
  }
}
export function stateFormat(row, column) {
  let state = row.is_checked
  switch (state) {
    case 0:
      return '未审核'
    case 1:
      return '已审核'
    case 2:
      return '禁用'
  }
}
export function roleFormat(row, column) {
  let role = row.role
  switch (role) {
    case 0:
      return '客户执行'
    case 1:
      return '管理员'
    case 2:
      return '客户经理'
    case 3:
      return '项目经理'
  }
}
export function salesFormat(row, column) {
  let sales = row.sales_price_period
  switch (sales) {
    case 0:
      return '0 ~ 100'
    case 1:
      return '100 ~ 200'
    case 2:
      return '200以上'
  }
}
export function dateFormat(row, column) {
  var date = row[column.property]
  if (date === undefined) {
    return ''
  }
  return miment(date).format('YYYY-MM-DD')
}
export function showProDateFormat(value) {
  return miment(value).format('YYYY-MM-DD')
}
export function addDateFormat(value, format = 'YYYY-MM-DD hh:mm:ss') {
  return miment(value + '+0800 (中国标准时间)').format(format)
}
// 新增处理北京时间
export function showZhCnDate(time, pattern) {
  return miment(time + '+0800 (中国标准时间)').format(pattern || 'YYYY-MM-DD')
}
export function periodFormate(row, column) {
  let value = row.display_period
  switch (value) {
    case -1:
      return '未录入'
    case 0:
      return '白天'
    case 1:
      return '晚上'
  }
}
export function getIsPresell(row) {
  let value = row.is_presell
  switch (value) {
    case -1:
      return '未录入'
    case 1:
      return '预售'
    case 0:
      return '非预售'
    case 2:
      return '预热'
  }
}
export function getIsDisplay(row) {
  let value = row.is_display
  switch (value) {
    case -1:
      return '未录入'
    case 2:
      return '已出单'
    case 1:
      return '未出单'
  }
}
export function getDuration(row) {
  let value = row.duration
  switch (value) {
    case -1:
      return '未录入'
    case 0:
      return '5 ~ 10分钟'
    case 1:
      return '10 ~ 15分钟'
    case 2:
      return '15 ~ 20分钟'
    case 3:
      return '0 ~ 5分钟'
    case 4:
      return '20分钟以上'
  }
}
export function getDisplayPeriod(row) {
  let value = row.display_period
  switch (value) {
    case -1:
      return '未录入'
    case 0:
      return '白天'
    case 1:
      return '晚上'
  }
}
export function planStatusFormat(row) {
  let status = row.status
  switch (status) {
    case 0:
      return '修改中'
    case 1:
      return '执行中'
    case 2:
      return '已出单'
  }
}
export function operateFormat(row) {
  let operate = row.operate
  switch (operate) {
    case 'star':
      return '导入主播基本信息'
    case 'star_cost':
      return '导入主播成本信息'
    case 'display':
      return '导入场次信息'
    case 'product':
      return '导入商品信息'
    case 'brand':
      return '导入品牌信息'
    case 'require_product':
      return '导入品牌需求商品信息'
  }
}
export function shopTypeFormat(row) {
  let status = row.shop_type
  switch (status) {
    case 0:
      return '无'
    case 1:
      return '淘宝店'
    case 2:
      return '天猫店'
  }
}

export function companyTypeFormat(row) {
  let status = row.company_type
  switch (status) {
    case 0:
      return '无'
    case 1:
      return '同行机构'
    case 2:
      return '广告公司'
    case 3:
      return '品牌TP'
    case 4:
      return '直客'
  }
}

// 客户分类列表
export const customerClassList = [
  {
    type: 0,
    value: '-'
  },
  {
    type: 1,
    value: '普通客户'
  },
  {
    type: 2,
    value: '重点客户'
  },
  {
    type: 3,
    value: '战略客户'
  },
  {
    type: 4,
    value: 'KA客户'
  }
  // {
  //   type: 5,
  //   value: '同行机构'
  // },
  // {
  //   type: 6,
  //   value: '广告公司'
  // },
  // {
  //   type: 7,
  //   value: '品牌TP'
  // }
]
// 客户阶段
export const customerLevelList = [
  {
    type: 0,
    value: '-'
  },
  {
    type: 1,
    value: '新增录入'
  },
  {
    type: 2,
    value: '意向客户'
  },
  {
    type: 3,
    value: '执行项目'
  },
  {
    type: 4,
    value: '执行结束'
  },
  {
    type: 5,
    value: '数据入库'
  },
  {
    type: 6,
    value: '项目完成'
  }
]
// 所属部门
export const departmentList = [
  {
    type: 0,
    value: '-'
  },
  {
    type: 1,
    value: '新营销事业部'
  },
  {
    type: 2,
    value: '内容电商事业部'
  },
  {
    type: 3,
    value: '新媒体事业部'
  },
  {
    type: 4,
    value: '研发部'
  },
  {
    type: 5,
    value: '市场公关部'
  },
  {
    type: 6,
    value: '财务部'
  },
  {
    type: 7,
    value: '人力资源部'
  },
  {
    type: 8,
    value: '总经办'
  }
]

// 合作平台
export const cooperationPlatformList = [
  {
    value: '全部',
    type: 0
  },
  {
    value: '淘宝图文',
    type: 9
  },
  {
    value: '小红书',
    type: 1
  },
  {
    value: '微信公众号',
    type: 2
  },
  {
    value: '新浪微博',
    type: 3
  },
  {
    value: '淘宝短视频',
    type: 10
  },
  {
    value: '抖音',
    type: 4
  },
  {
    value: '快手',
    type: 5
  },
  {
    value: '哔哩哔哩',
    type: 6
  },
  {
    value: '淘宝直播',
    type: 7
  },
  {
    value: '一直播',
    type: 8
  },
  {
    value: '线下场地搭建',
    type: 11
  },
  {
    value: '线下视觉设计',
    type: 12
  },
  {
    value: '活动策划执行',
    type: 13
  }
]

// 店铺类型
export const shopType = [
  {
    value: '不限',
    type: 0
  },
  {
    value: '淘宝店',
    type: 1
  },
  {
    value: '天猫店',
    type: 2
  }
]

// 公司类型
export const companyType = [
  {
    value: '不限',
    type: 0
  },
  {
    type: 1,
    value: '同行机构'
  },
  {
    type: 2,
    value: '广告公司'
  },
  {
    type: 3,
    value: '品牌TP'
  },
  {
    type: 4,
    value: '直客'
  }
]

export const shopTypeRadio = [
  {
    value: 1,
    text: '淘宝店'
  },
  {
    value: 2,
    text: '天猫店'
  }
]

export const companyTypeRadio = [
  {
    value: 1,
    text: '同行机构'
  },
  {
    value: 2,
    text: '广告公司'
  },
  {
    value: 3,
    text: '品牌TP'
  },
  {
    value: 4,
    text: '直客'
  }
]

export const shopTypeList = [
  {
    type: 0,
    value: '-'
  },
  {
    type: 1,
    value: '淘宝店'
  },
  {
    type: 2,
    value: '天猫店'
  }
]

export const companyTypeList = [
  {
    type: 0,
    value: '-'
  },
  {
    type: 1,
    value: '同行机构'
  },
  {
    type: 2,
    value: '广告公司'
  },
  {
    type: 3,
    value: '品牌TP'
  },
  {
    type: 4,
    value: '直客'
  }
]
