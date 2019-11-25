<template>
  <div class="confirm-cooperationDetail-container">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="业绩登记表" name="achievement">
          <CustomerSimpleDetail :isbg="true"/>
          <AchievementList />
        </el-tab-pane>
        <el-tab-pane label="成本安排表" name="cost">
          <CustomerSimpleDetail :isbg="true"/>
          <CostList />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import CustomerSimpleDetail from '../components/CustomerSimpleDetail'
import AchievementList from './achievement/AchievementList'
import CostList from './cost/CostList'

export default {
  name: 'ConfirmCooperationDetail',
  components: {
    CustomerSimpleDetail,
    AchievementList,
    CostList
  },
  data () {
    return {
      activeName: 'achievement'
    }
  },
  methods: {
    handleTabClick (val) {
      this.activeName = val.name
    }
  }
}
</script>

<style lang="scss" scoped>
  .confirm-cooperationDetail-container {
    width: 100%;
    background-color: #F6F6F6;
    padding-top: 15px;
    .content {
      background-color: #fff;
      padding: 10px 24px;
    }
  }
</style>
