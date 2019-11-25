<template>
  <div class="executeaccount-container" v-if="CurrentAE != null">
    <el-button style="margin-right: 18px;" v-show="UserRoles.includes(RIGHT_CODE.add_documentary) && CurrentAE.ae_id == UserInfo.id" size="small" type="primary" @click="addDocumentary">登记跟单</el-button>
    <span>实际跟单金额：</span>
    <span class="account" style="margin-right: 18px;">{{CurrentAE.act_documentary_amount ? `${CurrentAE.act_documentary_amount}元` : '--'}}</span>
    <span>预计跟单金额：</span>
    <span class="account">{{CurrentAE.exp_documentary_amount ? `${CurrentAE.exp_documentary_amount}元` : '--'}}</span>
    <!-- 登记跟单 -->
    <AddDocumentary ref="addDocumentaryDialog" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {RIGHT_CODE} from '@/const/roleCode'
import AddDocumentary from './AddDocumentary'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'ExecuteAccount',
  components: {
    AddDocumentary
  },
  mixins: [CooperativeStore],
  data() {
    return {
      RIGHT_CODE
    }
  },
  computed: {
    ...mapGetters({
      CurrentAE: 'cooperative/CurrentAE'
    })
  },
  methods: {
    // 创建跟单
    addDocumentary () {
      this.$refs.addDocumentaryDialog.show()
    }
  }
}
</script>

<style lang="scss" scoped>
  .executeaccount-container {
    margin: 18px 0;
    .account {
      font-size: 16px;
      color: #FF631E;
      font-weight: bold;
    }
  }
</style>
