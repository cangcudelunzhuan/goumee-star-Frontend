<template>
  <div class="executeprojectdetail-container">
    <div class="content" v-if="CooperationAE.length > 0 && CurrentAE != null">
      <div class="header">
        <span style="font-size: 13px;">AE跟单表：</span>
        <div class="medium-title">
          <div v-for="item in CooperationAE" :key="item.ae_id" :class="['title', {current: item.ae_id == CurrentAE.ae_id}]" @click="(val) => changeCurrentType(val, item)"><span>{{item.ae_name}}</span></div>
        </div>
      </div>
      <!-- AE金额 -->
      <ExecuteAccount />
      <!-- AE跟单记录 -->
      <AEDocumentaryList />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ExecuteAccount from './ExecuteAccount'
import AEDocumentaryList from './AEDocumentaryList'

export default {
  name: 'ExecuteProjectDetail',
  components: {
    ExecuteAccount,
    AEDocumentaryList
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      CooperationAE: 'cooperative/CooperationAE',
      CurrentAE: 'cooperative/CurrentAE'
    })
  },
  methods: {
    ...mapActions({
      GetCurrentAE: 'cooperative/GetCurrentAE'
    }),
    changeCurrentType(val, item) {
      this.GetCurrentAE(JSON.parse(JSON.stringify(item)))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .executeprojectdetail-container {
    width: 100%;
    background-color: #F6F6F6;
    padding-top: 15px;
    .content {
      background-color: #fff;
      padding: 10px 24px;
      .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
        border-bottom: #efefef solid 1px;
        .medium-title {
          font-size: 0;
          text-align: center;
          background: #fff;
          .title {
            display: inline-block;
            width: 75px;
            height: 30px;
            color: #333;
            box-sizing: border-box;
            line-height: 30px;
            background: #fff;
            margin: 0 10px;
            cursor: pointer;
            span {
              display: inline-block;
              vertical-align: top;
              font-size: 14px;
            }
            &.current {
              color: #5c82ff;
              border-bottom: #5c82ff solid 2px;
            }
          }
        }
      }
    }
  }
</style>
