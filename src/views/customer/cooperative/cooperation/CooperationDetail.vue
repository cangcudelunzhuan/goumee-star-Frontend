<template>
  <div>
    <div class="yxkh-container">
       <div class="note-dis">
         <sub-panel :title="'其他需求'" :iserect="true">
            <p class="note" v-if="CooperationDetail.note">{{CooperationDetail.note}}</p>
            <table-no-data v-else :isvertical="false" :title="'没有要求描述哦~'"></table-no-data>
          </sub-panel>
       </div>
    </div>
    <div class="yxkh-container">
       <div class="note-dis" style="padding-bottom: 30px;">
         <sub-panel :title="'方案'" :iserect="true">
            <p class="note" v-if="CooperationDetail.note">
              <el-table
                :data="bindPlans(CooperationDetail.plan)"
                border
                stripe
                style="width: 100%; margin-top: 12px;"
                :header-cell-style="{background:'#F5F6F9', height:'42px', color: '#666666', fontWeight: 'bold'}">
                <template slot="empty">
                  <table-no-data :isvertical="false" :title="'没有上传方案哦~'"></table-no-data>
                </template>
                <el-table-column
                  prop="name"
                  label="附件名称">
                  <template slot-scope="{row}">
                    <a class="download" :href="row.src" download>{{row.name}}</a>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="150"
                  align="center">
                  <template slot-scope="{row}">
                    <a class="download" :href="row.src" download>下载</a>
                  </template>
                </el-table-column>
              </el-table>
            </p>
            <table-no-data v-else :isvertical="false" :title="'没有上传方案哦~'"></table-no-data>
          </sub-panel>
       </div>
    </div>
  </div>
</template>

<script>
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'CooperationDetail',
  mixins: [CooperativeStore],
  data () {
    return {
    }
  },
  methods: {
    bindPlans (plans) {
      let _newplans = []
      if (plans.length > 0) {
        plans.map(p => {
          let _obj = {
            src: p
          }
          let _temp = p.split('/')
          _obj.name = _temp[_temp.length - 1]
          _newplans.push(_obj)
        })
      }
      return _newplans
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .yxkh-container {
    width: 100%;
    background-color: #F6F6F6;
    padding-top: 15px;
    .note-dis {
      background-color: #fff;
      padding: 10px 3px 10px 24px;
      .note {
        margin-top: 5px;
        margin-left: -12px;
        font-size: 14px;
        line-height: 25px;
      }
      .download {
        color: $color-primary;
      }
    }
    /deep/ .el-table {
      border-right-width: 0;
    }
  }
</style>
