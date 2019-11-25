<!--
 * @Description: 合同审批大模块首页
 * @Author: 白青
 * @Date: 2019-08-19 13:43:20
 * @LastEditTime: 2019-09-09 14:13:50
 * @LastEditors: 白青
 -->
 <style lang="scss" scoped>
  @import '@/styles/vars.scss';
  #contract-approval {
    .contract-approval-header {
      height: 60px;
      border-bottom: #EFEFEF solid 1px;
      background: #fff;
      text-align: center;
      .header-menu {
        display: inline-block;
        width: 120px;
        line-height: 60px;
        // padding: 0 26px;
        text-align: center;
        color: #333;
        font-size: 15px;
        position: relative;
        cursor: pointer;
        &.active {
          color: $color-primary;
          &::after {
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 100%;
            background: $color-primary;
          }
        }
      }
    }
  }
</style>

<template>
  <div id="contract-approval">
    <div class="contract-approval-header">
      <span :class="['header-menu', {active: activeMenu === 'customerContract'}]" @click="activeMenu = 'customerContract'">客户合同</span>
      <span :class="['header-menu', {active: activeMenu === 'supplierContract'}]" @click="activeMenu = 'supplierContract'">供应商合同</span>
      <span :class="['header-menu', {active: activeMenu === 'appurtenance'}]" @click="activeMenu = 'appurtenance'">附件</span>
    </div>
    <customer-contract v-show="activeMenu === 'customerContract'" />
    <medium-contract v-show="activeMenu === 'supplierContract'" />
    <contract-attachment v-show="activeMenu === 'appurtenance'"/>
  </div>
</template>

<script>
import CustomerContract from './components/customerContract'
import MediumContract from './components/mediumContract'
import ContractAttachment from './components/contractAttachment'

export default {
  name: 'ContractApproval',
  components: {
    CustomerContract,
    MediumContract,
    ContractAttachment
    // ReviewDialog,
    // ApproveProgress
  },
  data () {
    return {
      activeMenu: 'customerContract'
    }
  },
  computed: {
  },
  async mounted () {
  },
  activated () {
  },
  methods: {
  }
}
</script>
