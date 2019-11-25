<template>
  <div class="costindex-container">
    <CostCondition @search="handleSearchCost"/>
    <ConstTable v-loading="loading" :page="pagination" :dataSource="dataSource"
      @changePage="changePageHandle" @uploadHandle="handleSearchCost" @export="toExport"/>
  </div>
</template>

<script>
import CostCondition from './components/CostCondition'
import ConstTable from './components/ConstTable'
import {getCostList, exportCost} from '@/api/cooperative'

export default {
  name: 'CostIndex',
  components: {
    CostCondition,
    ConstTable
  },
  data() {
    return {
      pagination: {
        page_num: 1,
        num: 10,
        pageSizes: [10, 20, 30]
      },
      dataSource: {
        total: 0,
        data: []
      },
      loading: false,
      search: null
    }
  },
  created () {
    this.handleSearchCost()
  },
  methods: {
    // 改变页
    changePageHandle (data) {
      if (data.type === 'index') {
        this.pagination.page_num = data.data
      }
      if (data.type === 'size') {
        this.pagination.num = data.data
      }
      this.handleSearchCost(JSON.parse(JSON.stringify(this.search)), 'page')
    },
    resetPage () {
      this.pagination = {
        page_num: 1,
        num: 10,
        pageSizes: [10, 20, 30]
      }
    },
    // 查询成本
    handleSearchCost (form, type) {
      this.loading = true
      if (type !== 'page') this.resetPage()
      let page = JSON.parse(JSON.stringify(this.pagination))
      let params = {...page}
      if (form) {
        params = Object.assign(params, form)
        this.search = form
      } else {
        if (this.search !== null) {
          params = Object.assign(params, JSON.parse(JSON.stringify(this.search)))
        }
      }
      getCostList(params).then(res => {
        if (res && res.data && res.data.success) {
          this.dataSource = res.data.data
          this.loading = false
        } else {
          this.dataSource = {
            total: 0,
            data: []
          }
          this.$message.error('数据获取失败')
          this.loading = false
        }
      }).catch(err => {
        console.error(err)
        this.dataSource = {
          total: 0,
          data: []
        }
        this.$message.error('数据获取失败')
        this.loading = false
      })
    },
    // 导出业绩
    toExport (cost_ids) {
      if (cost_ids.length > 0) {
        cost_ids = JSON.stringify(cost_ids)
        exportCost({cost_ids})
      } else {
        let form = JSON.parse(JSON.stringify(this.search))
        exportCost(form)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .costindex-container {
    background-color: #F5F5F5;
  }
</style>
