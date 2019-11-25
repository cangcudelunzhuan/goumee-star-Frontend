<template>
  <div class="achievementcondition-container">
    <el-row class="medium-operator">
      <el-row class="medium-choose">
        <div class="choose-block">
          <div class="name">收款方式:</div>
          <div class="category-list">
            <div class="category-item"
              :class="{current:searchForm.gather_way === item.value}"
              v-for="item in gatherWayListAll"
              :key="item.value"
              @click="selectGatherWayHandle(item.value)">{{item.label}}</div>
          </div>
        </div>
      </el-row>
      <el-form class="medium-search-bar" :inline="true" size="small">
        <el-form-item class="medium-cls">
          <span slot="label" class="medium-label">收款时间:</span>
          <el-date-picker v-model="searchForm.gather_date" unlink-panels type="daterange" size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions1"
            value-format="yyyy-MM-dd" :default-value="new Date().getTime()-2592000000">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-form class="medium-search-bar" :inline="true" size="small" style="border-bottom: 1px dashed #eff0f1;">
        <el-form-item class="medium-cls">
          <span slot="label" class="medium-label">客户经理:</span>
          <el-select v-model="searchForm.manager_id" placeholder="请选择" style="width: 150px;">
            <el-option
              v-for="item in managers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="medium-cls">
          <span slot="label" class="medium-label">是否开票:</span>
          <el-select v-model="searchForm.is_invoice" placeholder="请选择" style="width: 120px;">
            <el-option v-for="item in ticketList" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="medium-cls">
          <span slot="label" class="medium-label" style="margin-left:10px;">开票凭证:</span>
          <el-select v-model="searchForm.has_invoice_certificate" placeholder="请选择" style="width: 120px;">
            <el-option v-for="item in conbinList" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form class="medium-search-bar" :inline="true" size="small">
        <el-form-item class="medium-cls">
          <span slot="label" class="medium-label">业绩Id：</span>
          <el-input v-model.trim="searchForm.achievement_uid" style="width: 210px;" placeholder="请输入业绩Id" clearable @clear="handleSearch"></el-input>
        </el-form-item>
        <el-form-item class="medium-cls">
          <span slot="label" class="medium-label">店铺 / 公司名称:</span>
          <el-input v-model.trim="searchForm.shop_or_company_name" style="width: 210px;" placeholder="请输入店铺公司名称" clearable @clear="handleSearch"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import {gatherWayList} from '@/const/cooperative'
import {queryUserNamesByRoles} from '@/api/customer'

export default {
  name: 'AchievementCondition',
  data() {
    return {
      gatherWayList,
      ticketList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      conbinList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '已开',
          value: 1
        },
        {
          label: '未开',
          value: 0
        }
      ],
      managers: [],
      searchForm: {
        gather_way: '', // 支付方式
        gather_date: [], // 收款时间范围
        is_invoice: '', // 是否开票
        has_invoice_certificate: '', // 是否有开票凭证
        manager_id: '', // 客户经理
        achievement_uid: '', // 业绩ID
        shop_or_company_name: '' // 店铺/公司名称
      },
      pickerOptions1: {
        disabledDate(date) {
          let ret = date.getTime() > new Date().getTime()
          return ret
        }
      }
    }
  },
  created () {
    this.getManagers()
  },
  computed: {
    gatherWayListAll () {
      let _gatherWayList = JSON.parse(JSON.stringify(this.gatherWayList))
      _gatherWayList.unshift({
        label: '不限',
        value: ''
      })
      return _gatherWayList
    }
  },
  methods: {
    // 选择收款方式
    selectGatherWayHandle (val) {
      this.searchForm.gather_way = val
      this.handleSearch()
    },
    // 获取客户经理
    getManagers () {
      // 客户经理，大客户经理
      queryUserNamesByRoles({roles: '103,104'}).then(res => {
        if (res.data.data) {
          let managers = res.data.data.map(c => ({id: c.id, name: c.username}))
          managers.unshift({id: '', name: '全部'})
          this.managers = managers
        }
      })
    },
    // 绑定条件
    bindCondition () {
      let searchForm = JSON.parse(JSON.stringify(this.searchForm))
      if (searchForm.gather_way === '') delete searchForm.gather_way
      if (searchForm.gather_date.length === 0) {
        delete searchForm.gather_date
      } else {
        searchForm.gather_date_min = searchForm.gather_date[0]
        searchForm.gather_date_max = searchForm.gather_date[1]
        delete searchForm.gather_date
      }
      if (searchForm.is_invoice === '') delete searchForm.is_invoice
      if (searchForm.has_invoice_certificate === '') delete searchForm.has_invoice_certificate
      if (searchForm.manager_id === '') delete searchForm.manager_id
      if (searchForm.achievement_uid === '') delete searchForm.achievement_uid
      if (searchForm.shop_or_company_name === '') delete searchForm.shop_or_company_name
      return searchForm
    },
    // 查询
    handleSearch () {
      let searchForm = this.bindCondition()
      this.$emit('search', searchForm)
    },
    // 重置
    handleReset () {
      this.searchForm = {
        gather_way: '', // 支付方式
        gather_date: [], // 收款时间范围
        is_invoice: '', // 是否开票
        has_invoice_certificate: '', // 是否有开票凭证
        manager_id: '', // 客户经理
        achievement_uid: '', // 业绩ID
        shop_or_company_name: '' // 店铺/公司名称
      }
      this.handleSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .achievementcondition-container {
    .medium-operator {
      background-color: #fff;
      .medium-choose {
        .choose-block {
          min-height: 60px;
          box-sizing: border-box;
          font-size: 0;
          border-bottom: 1px dashed #eff0f1;
          padding: 15px 12px;
          display: flex;
          .name {
            font-size: 14px;
            color: #999;
            line-height: 30px;
            display: inline-block;
            width: 80px;
          }
          .category-list {
            display: inline-block;
            flex: 1;
            .category-item {
              display: inline-block;
              // padding: 0 17px;
              font-size: 14px;
              color: #666;
              line-height: 30px;
              padding: 0 10px;
              margin: 0 10px;
              border-bottom: #fff solid 2px;
              cursor: pointer;
              &:hover {
                color: $color-primary;
              }
              &.current {
                color: #fff!important;
                background: $color-primary;
                border-radius: 15px;
              }
            }
          }
        }
      }
      .medium-search-bar {
        padding: 14px 12px 0;
        border-bottom: 1px dashed #eff0f1;
        .medium-label {
          color: #999;
          font-size: 14px;
        }
        .range-input {
          width: 100px;
        }
      }
    }
  }
</style>
