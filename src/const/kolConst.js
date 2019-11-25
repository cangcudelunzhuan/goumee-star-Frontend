/*
 * @Description: file content
 * @Author: 白青
 * @Date: 2019-09-29 15:22:06
 * @LastEditTime: 2019-09-30 18:23:44
 * @LastEditors: 白青
 */
// 平台数据
/**
 *  label: '直发是否原创报价',  标签名
 key: 'is_direct_original',   标签值对应字段
 unit: '(元 / 篇)',         单位
 dictionary:'directOriginalList',   数字对应的字典
 showCondition:''       出现的条件
 showLabel   在首部展示标签名字的
 * @type {*[]}
 */
const platformData = [
  {
    platformKey: 'tb',
    platformName: '淘宝',
    platSelected: true,
    detailKey: 'kol_tb_info',
    key_avatar: 'avatar',
    // 基础信息
    baseInfo: [
      {
        label: '昵称',
        key: 'star_name',
        name: true
      },
      {
        label: '淘宝ID',
        key: 'star_id'
      },
      {
        label: '粉丝数(万)',
        key: 'fans_number'
      },
      {
        label: '所属机构',
        key: 'company_id',
        type: 'select'
      }
    ],
    // 媒介类型信息
    mediumTypeInfo: [
      {
        mediumName: '直播',
        info: [
          {
            label: '专场成本价',
            key: 'star_special_cost',
            unit: '(元 / 场)'
          },
          {
            label: '专场刊例价',
            key: 'star_special_price',
            unit: '(元 / 场)'
          },

          {
            label: '混播成本价',
            key: 'star_mix_cost',
            unit: '(元 / 链接)'
          },
          {
            label: '混播刊例价',
            key: 'star_mix_price',
            unit: '(元 / 链接)'
          }
        ],
        otherInfo: [
          {
            label: '配合度',
            key: 'responsivity',
            showCondition: 'is_cooperation'
          },
          {
            label: '单客价',
            key: 'sales_price_period',
            showCondition: 'is_cooperation'
          },
          {
            label: '淘客ID',
            key: 'wangwang_name',
            showCondition: 'is_cooperation'
          },

          {
            label: '平均观看(PV)',
            key: 'pv_average',
            showCondition: ''
          }
        ]
      },
      {
        mediumName: '视频',
        info: [
          {
            label: '视频成本价',
            key: 'video_price',
            unit: '(元 / 条)'
          },
          {
            label: '视频刊例价',
            key: 'video_publish_price',
            unit: '(元 / 条)'
          }
        ]
      },
      {
        mediumName: '图文',
        info: [
          {
            label: '图文成本价',
            key: 'photo_price',
            unit: '(元 / 篇)'
          },
          {
            label: '图文刊例价',
            key: 'photo_publish_price',
            unit: '(元 / 篇)'
          }
        ]
      }
    ]
  },
  {
    platformKey: 'douyin',
    platformName: '抖音',
    platSelected: false,
    detailKey: 'kol_douyin_info',
    key_avatar: 'avatar',
    // 基础信息
    baseInfo: [
      {
        label: '昵称',
        key: 'douyin_name',
        name: true
      },
      {
        label: '抖音号',
        key: 'douyin_id'
      },
      {
        label: '粉丝数(万)',
        key: 'fans_number'
      },
      {
        label: '所属机构',
        key: 'company_id',
        type: 'select'
      }
    ],
    // 媒介类型信息
    mediumTypeInfo: [
      {
        mediumName: '直播',
        info: [
          {
            label: '专场成本价',
            key: 'live_special_price',
            unit: '(元 / 场)'
          },
          {
            label: '专场刊例价',
            key: 'live_special_publish_price',
            unit: '(元 / 场)'
          },
          {
            label: '混播成本价',
            key: 'live_mix_price',
            unit: '(元 / 链接)'
          },
          {
            label: '混播刊例价',
            key: 'live_mix_publish_price',
            unit: '(元 / 链接)'
          }

        ]
      },
      {
        mediumName: '视频',
        info: [
          {
            label: '21-60s视频成本价',
            key: 'video_21_60_price',
            unit: '(元 / 条)'
          },
          {
            label: '21-60s视频刊例价',
            key: 'video_21_60_publish_price',
            unit: '(元 / 条)'
          },
          {
            label: '1-20s视频成本价',
            key: 'video_1_20_price',
            unit: '(元 / 条)'
          },
          {
            label: '1-20s视频刊例价',
            key: 'video_1_20_publish_price',
            unit: '(元 / 条)'
          }

        ]
      }
    ]
  },
  {
    platformKey: 'xhs',
    platformName: '小红书',
    platSelected: false,
    detailKey: 'kol_xhs_info',
    key_avatar: 'avatar',
    // 基础信息
    baseInfo: [
      {
        label: '昵称',
        key: 'xhs_name',
        name: true
      },
      {
        label: '小红书号',
        key: 'xhs_id'
      },
      {
        label: '粉丝数(万)',
        key: 'fans_number'
      },
      {
        label: '所属机构',
        key: 'company_id',
        type: 'select'
      },
      {
        showLabel: '是否品牌合作人',
        key: 'is_partner'
      }
    ],
    // 媒介类型信息
    mediumTypeInfo: [
      {
        mediumName: '视频',
        info: [
          {
            label: '视频成本价',
            key: 'video_price',
            unit: '(元 / 条)'
          },
          {
            label: '视频刊例价',
            key: 'video_publish_price',
            unit: '(元 / 条)'
          }
        ]
      },
      {
        mediumName: '图文',
        info: [
          {
            label: '图文成本价',
            key: 'photo_price',
            unit: '(元 / 篇)'
          },
          {
            label: '图文刊例价',
            key: 'photo_publish_price',
            unit: '(元 / 篇)'
          }
        ]
      }
    ]
  },
  {
    platformKey: 'kuaishou',
    platformName: '快手',
    platSelected: false,
    detailKey: 'kol_kuaishou_info',
    key_avatar: 'avatar',
    // 基础信息
    baseInfo: [
      {
        label: '昵称',
        key: 'kuaishou_name',
        name: true
      },
      {
        label: '快手号',
        key: 'kuaishou_id'
      },
      {
        label: '粉丝数(万)',
        key: 'fans_number'
      },
      {
        label: '所属机构',
        key: 'company_id',
        type: 'select'
      }
    ],
    // 媒介类型信息
    mediumTypeInfo: [
      {
        mediumName: '直播',
        info: [
          {
            label: '专场成本价',
            key: 'live_special_price',
            unit: '(元 / 场)'
          },
          {
            label: '专场刊例价',
            key: 'live_special_publish_price',
            unit: '(元 / 场)'
          },
          {
            label: '混播成本价',
            key: 'live_mix_price',
            unit: '(元 / 链接)'
          },
          {
            label: '混播刊例价',
            key: 'live_mix_publish_price',
            unit: '(元 / 链接)'
          }

        ]
      },
      {
        mediumName: '视频',
        info: [
          {
            label: '视频成本价',
            key: 'video_price',
            unit: '(元 / 条)'
          },
          {
            label: '视频刊例价',
            key: 'video_publish_price',
            unit: '(元 / 条)'
          }

        ]
      }
    ]
  },
  {
    platformKey: 'weibo',
    platformName: '微博',
    platSelected: false,
    detailKey: 'kol_weibo_info',
    key_avatar: 'avatar',
    // 基础信息
    baseInfo: [
      {
        label: '微博账号',
        key: 'weibo_name',
        name: true
      },
      {
        label: '粉丝数(万)',
        key: 'fans_number'
      },
      {
        label: '所属机构',
        key: 'company_id',
        type: 'select'
      }
    ],
    // 媒介类型信息
    mediumTypeInfo: [
      {
        mediumName: '图文',
        info: [
          {
            label: '转发成本价',
            key: 'trans_price',
            unit: '(元 / 篇)'
          },
          {
            label: '转发刊例价',
            key: 'trans_publish_price',
            unit: '(元 / 篇)'
          },
          {
            label: '直发成本价',
            key: 'direct_price',
            unit: '(元 / 篇)'
          },
          {
            label: '直发刊例价',
            key: 'direct_publish_price',
            unit: '(元 / 篇)'
          }
        ],
        otherInfo: [
          {
            label: '直发是否原创报价',
            key: 'is_direct_original',
            dictionary: 'directOriginalList',
            showCondition: ''
          }
        ]
      }

    ]
  },
  {
    platformKey: 'yizhibo',
    platformName: '一直播',
    platSelected: false,
    detailKey: 'kol_yizhibo_info',
    key_avatar: 'avatar',
    // 基础信息
    baseInfo: [
      {
        label: '昵称',
        key: 'yizhibo_name',
        name: true
      },
      {
        label: '一直播ID',
        key: 'yizhibo_id'
      },
      {
        label: '粉丝数(万)',
        key: 'fans_number'
      },
      {
        label: '所属机构',
        key: 'company_id',
        type: 'select'
      }
    ],
    // 媒介类型信息
    mediumTypeInfo: [
      {
        mediumName: '直播',
        info: [
          {
            label: '直播成本价',
            key: 'price',
            unit: '(元 / 场)'
          },
          {
            label: '直播刊例价',
            key: 'live_publish_price',
            unit: '(元 / 场)'
          }
        ]
      }
    ]
  },
  {
    platformKey: 'bili',
    platformName: '哔哩哔哩',
    platSelected: false,
    detailKey: 'kol_bili_info',
    key_avatar: 'avatar',
    // 基础信息
    baseInfo: [
      {
        label: '昵称',
        key: 'bili_name',
        name: true
      },
      {
        label: '哔哩哔哩号',
        key: 'bili_id'
      },
      {
        label: '粉丝数(万)',
        key: 'fans_number'
      },
      {
        label: '所属机构',
        key: 'company_id',
        type: 'select'
      }
    ],
    // 媒介类型信息
    mediumTypeInfo: [
      {
        mediumName: '视频',
        info: [
          {
            label: '视频成本价',
            key: 'video_price',
            unit: '(元 / 条)'
          },
          {
            label: '视频刊例价',
            key: 'video_publish_price',
            unit: '(元 / 条)'
          }
        ]
      }
    ]
  },
  {
    platformKey: 'wechat',
    platformName: '微信公众号',
    platSelected: false,
    detailKey: 'kol_wechat_info',
    key_avatar: 'avatar',
    // 基础信息
    baseInfo: [
      {
        label: '微信公众号',
        key: 'wechat_id',
        name: true
      },
      {
        label: '粉丝数(万)',
        key: 'fans_number'
      },
      {
        label: '所属机构',
        key: 'company_id',
        type: 'select'
      },
      {
        showLabel: '是否原创',
        key: 'is_original'
      },
      {
        showLabel: '是否认证',
        key: 'is_certification'
      }

    ],
    // 媒介类型信息
    mediumTypeInfo: [
      {
        mediumName: '图文',
        info: [
          {
            label: '头条成本价',
            key: 'photo_headline_price',
            unit: '(元 / 篇)'
          },
          {
            label: '头条刊例价',
            key: 'photo_headline_publish_price',
            unit: '(元 / 篇)'
          },
          {
            label: '次条成本价',
            key: 'photo_second_price',
            unit: '(元 / 篇)'
          },
          {
            label: '次条刊例价',
            key: 'photo_second_publish_price',
            unit: '(元 / 篇)'
          }
        ]
      }

    ]
  }
]

const directOriginalList = [
  {
    value: 1,
    text: '是'
  },
  {
    value: 0,
    text: '否'
  }
]
const kolTagList = [
  {
    value: 1,
    text: '主播'
  },
  {
    value: 2,
    text: '红人'
  },
  {
    value: 3,
    text: '明星'
  }
]

// 格式化KOL标签
function kolTagFormat (key) {
  return kolTagList.find(k => k.value === key).text
}

// 擅长平台
const platformList = [
  {
    value: '全部',
    type: 0,
    key: ''
  },
  {
    value: '淘宝',
    type: 7,
    key: 'tb'
  },
  {
    value: '小红书',
    type: 1,
    key: 'xhs'
  },
  {
    value: '微信公众号',
    type: 2,
    key: 'wechat'
  },
  {
    value: '新浪微博',
    type: 3,
    key: 'weibo'
  },
  {
    value: '抖音',
    type: 4,
    key: 'douyin'
  },
  {
    value: '快手',
    type: 5,
    key: 'kuaishou'
  },
  {
    value: '哔哩哔哩',
    type: 6,
    key: 'bili'
  },
  {
    value: '一直播',
    type: 8,
    key: 'yizhibo'
  }
]

// 媒介类型
const mediaType = [
  {
    value: '全部',
    type: 0,
    key: ''
  },
  {
    value: '直播',
    type: 1,
    key: 'live'
  },
  {
    value: '视频',
    type: 2,
    key: 'video'
  },
  {
    value: '图文',
    type: 3,
    key: 'photo'
  }
]

// 擅长领域
const areaType = [
  {
    value: '全部',
    key: ''
  },
  {
    value: '美妆',
    key: 1
  },
  {
    value: '个护',
    key: 2
  },
  {
    value: '服饰',
    key: 3
  },
  {
    value: '美食',
    key: 4
  },
  {
    value: '母婴',
    key: 5
  },
  {
    value: '数码',
    key: 6
  },
  {
    value: '家具',
    key: 7
  },
  {
    value: '保健',
    key: 8
  },
  {
    value: '萌宠',
    key: 9
  },
  {
    value: '包箱',
    key: 10
  },
  {
    value: '配饰',
    key: 11
  }
]

// kol标签
const kolTag = [
  {
    value: '全部',
    key: ''
  },
  {
    value: '主播',
    key: 1
  },
  {
    value: '红人',
    key: 2
  },
  {
    value: '明星',
    key: 3
  }
]

export {platformData, directOriginalList, kolTagList, platformList, mediaType, areaType, kolTag, kolTagFormat}
