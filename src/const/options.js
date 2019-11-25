/*
 * @Description: 选项配置文件
 * @Author: 白青
 * @Date: 2019-08-06 16:21:43
 * @LastEditTime: 2019-09-05 14:36:44
 * @LastEditors: 白青
 */
// 擅长领域
var categoryOptions = [{
  value: 1,
  label: '美妆'
}, {
  value: 2,
  label: '个护'
}, {
  value: 3,
  label: '服饰'
}, {
  value: 4,
  label: '美食'
}, {
  value: 5,
  label: '母婴'
}, {
  value: 6,
  label: '数码'
}, {
  value: 7,
  label: '家居'
}, {
  value: 8,
  label: '保健'
}, {
  value: 9,
  label: '萌宠'
}, {
  value: 10,
  label: '箱包'
}, {
  value: 11,
  label: '配饰'
}]
var displayTypeOptions = [
  {
    value: 0,
    label: '混播'
  },
  {
    value: 1,
    label: '专场'
  }
]

var salesPriceOptions = [{
  value: 0,
  label: '0 ~ 100'
}, {
  value: 1,
  label: '100 ~ 200'
}, {
  value: 2,
  label: '200以上'
}]

var fansNumberOptions = [{
  value: '0',
  label: '0 ~ 10W',
  min_fans_number: 0,
  max_fans_number: 10
}, {
  value: '1',
  label: '10W ～ 30W',
  min_fans_number: 10,
  max_fans_number: 30
}, {
  value: '3',
  label: '30W ~ 50W',
  min_fans_number: 30,
  max_fans_number: 50
}, {
  value: '5',
  label: '50W ~ 80W',
  min_fans_number: 50,
  max_fans_number: 80
}, {
  value: '8',
  label: '80W以上',
  min_fans_number: 80,
  max_fans_number: ''
}]

var mixSpeicalOptions = [{
  value: 'mix',
  label: '混播'
}, {
  value: 'special',
  label: '专场'
}]

var clickTypeOptions = [{
  value: 'meizhuang',
  label: '美妆'
}, {
  value: 'gehu',
  label: '个护'
}, {
  value: 'fushi',
  label: '服饰'
}, {
  value: 'meishi',
  label: '美食'
}]

var periodStatDimension = [
  {
    value: '每小时观看人数',
    color: '#7484b7'
  }, {
    value: '每小时观看数',
    color: '#4dcdb1'
  }, {
    value: '场均观看人数',
    color: '#f895e7'
  }, {
    value: '场均观看数',
    color: '#ffbf40'
  }, {
    value: '粉丝精准度',
    color: '#5273d3'
  }, {
    value: '日均开播场次',
    color: '#d87a80'
  }, {
    value: '日均开播时长',
    color: '#b6a2de'
  }, {
    value: '人均点击数',
    color: '#FFB980'
  }, {
    value: '每小时互动数',
    color: '#d075c4'
  }, {
    value: '人均互动数',
    color: '#fd936e'
  }
]

var categoryRecentDayDimension = [
  {
    value: '最近15天',
    label: 15
  }, {
    value: '最近1个月',
    label: 30
  }, {
    value: '最近3个月',
    label: 90
  }
]
var displayStatDimension = [
  {
    value: '每小时观看人数',
    color: '#4dcdb1'
  }, {
    value: '每小时观看数',
    color: '#7484b7'
  }, {
    value: '观看数',
    color: '#b4c4f5'
  }, {
    value: '观看人数',
    color: '#f895e7'
  }, {
    value: '时长',
    color: '#5ab1ef'
  }
]

var displayRecentDayDimension = [
  {
    value: '最近7场',
    num: 7
  }, {
    value: '最近15场',
    num: 15
  }, {
    value: '最近30场',
    num: 30
  }, {
    value: '最近90场',
    num: 90
  }
]
var smallCategoryDaydimension = ['最近15天', '最近1个月', '最近3个月']

var livePeriodOption = [
  {
    value: 0,
    label: '白天'
  },
  {
    value: 1,
    label: '晚上'
  }
]

var liveDurationOption = [
  {
    value: 3,
    label: '0 ~ 5分钟'
  },
  {
    value: 0,
    label: '5 ~ 10分钟'
  },
  {
    value: 1,
    label: '10 ~ 15分钟'
  },
  {
    value: 2,
    label: '15 ~ 20分钟'
  },
  {
    value: 4,
    label: '20分钟以上'
  }
]

var isPresellOptions = [
  {
    value: 1,
    label: '预售场'
  },
  {
    value: 2,
    label: '预热场'
  },
  {
    value: 0,
    label: '非预售场'
  },
  {
    value: -1,
    label: '未录入'
  }
]
var presellSelectOption = [
  {
    value: 1,
    label: '预售场'
  },
  {
    value: 2,
    label: '预热场'
  },
  {
    value: 0,
    label: '非预售场'
  }
]
var isDisplayOptions = [
  {
    value: 1,
    label: '未出单'
  },
  {
    value: 2,
    label: '已出单'
  }
]
var latestDisplayTimeOptions = [
  {
    value: 7,
    label: '最近一周'
  },
  {
    value: 15,
    label: '最近15天'
  },
  {
    value: 30,
    label: '最近一个月'
  }
]

var contractTypeOptions = [
  {
    value: 1,
    label: '销售合同'
  },
  {
    value: 2,
    label: '框架协议'
  }
]

var contractStatusOptions = [
  {
    value: 1,
    label: '待审批'
  },
  {
    value: 2,
    label: '正常'
  },
  {
    value: 4,
    label: '审批中'
  },
  {
    value: 3,
    label: '审批失败'
  },
  {
    value: 5,
    label: '已作废'
  }
]

var saleChances = [
  {
    value: 1,
    label: '小红书'
  },
  {
    value: 2,
    label: '微信公众号'
  },
  {
    value: 3,
    label: '新浪微博'
  },
  {
    value: 4,
    label: '抖音'
  },
  {
    value: 5,
    label: '快手'
  },
  {
    value: 6,
    label: '哔哩哔哩'
  },
  {
    value: 7,
    label: '淘宝直播'
  },
  {
    value: 8,
    label: '一直播'
  },
  {
    value: 9,
    label: '淘宝图文'
  },
  {
    value: 10,
    label: '淘宝短视频'
  },
  {
    value: 11,
    label: '线下场地搭建'
  },
  {
    value: 12,
    label: '线下视觉设计'
  },
  {
    value: 13,
    label: '活动策划执行'
  }
]

// 用户审核状态
const userStatus = [
  {
    value: 0,
    label: '待审核'
  },
  {
    value: 1,
    label: '已通过'
  },
  {
    value: 2,
    label: '已禁用'
  },
  {
    value: 4,
    label: '已拒绝'
  }
]

export {
  categoryOptions,
  salesPriceOptions,
  fansNumberOptions,
  mixSpeicalOptions,
  clickTypeOptions,
  periodStatDimension,
  categoryRecentDayDimension,
  displayStatDimension,
  displayRecentDayDimension,
  smallCategoryDaydimension,
  livePeriodOption,
  liveDurationOption,
  displayTypeOptions,
  isPresellOptions,
  isDisplayOptions,
  latestDisplayTimeOptions,
  presellSelectOption,
  contractTypeOptions,
  contractStatusOptions,
  saleChances,
  userStatus
}
