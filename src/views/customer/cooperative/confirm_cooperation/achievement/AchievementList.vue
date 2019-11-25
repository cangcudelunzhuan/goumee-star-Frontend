<template>
  <div class="achievementlist-container" v-if="AchievementList != null">
    <el-button size="small" type="primary" @click="addAchievementHandle" v-show="UserRoles.includes(RIGHT_CODE.add_achievement) && (judgeCurrentPower(CooperationDetail.add_by_id) || judgeCurrentPower(CooperationDetail.manager_id))">登记业绩</el-button>
    <el-table
      :data="AchievementList != null ? AchievementList.data : []"
      :stripe="true"
      style="width: 100%; margin-top: 15px; margin-bottom: 10px;"
      :header-cell-style="{background:'#F5F6F9', height:'42px', color: '#666666', fontWeight: 'bold'}">
      <template slot="empty">
        <table-no-data :isvertical="true" :title="'还没有收款记录哦~'" :img="require('@/assets/img/cooperative/xt_nodata_cost.png')" :subtitle="CooperationDetail.gather_date !== '' ? `回款时间：${showProDateFormat(CooperationDetail.gather_date)}` : ''"></table-no-data>
      </template>
      <el-table-column
        :formatter="(row, column, cellValue, index) => (pagination.currentPage - 1) * pagination.pageSize + (index + 1)"
        label="序号"
        width="60"
        fixed="left"
        align="center">
      </el-table-column>
      <el-table-column
        prop="achievement_uid"
        label="业绩Id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="gather_date"
        label="收款时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="gather_amount"
        label="收款金额"
        width="140">
        <template slot-scope="{row}">
          <span class="txt-skamount">{{row.gather_amount_str ? `¥${row.gather_amount_str}` : '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="gather_way"
        label="收款信息">
        <template slot-scope="{row}">
          <p>
            <span class="txt-gwtitle">收款: </span><span class="txt-gwinfo">{{gatherWayListFormat(row.gather_way)}}</span>
          </p>
          <p v-if="row.gather_way === 1">
            <span class="txt-gwtitle">下单旺旺账号: </span><span class="txt-gwinfo">{{row.gather_way_detail.order_wangwang_id}}</span>
          </p>
          <p v-if="row.gather_way === 1">
            <span class="txt-gwtitle">任务Id: </span><span class="txt-gwinfo">{{row.gather_way_detail.task_id}}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="gather_amount"
        label="收款凭证"
        width="120">
        <template slot-scope="{row}">
          <p class="img-flex">
            <span>凭证：</span>
            <i v-if="row.gather_certificate_pic !== ''" class="iconfont icontupian" style="font-size: 30px !important; color: #FF9536; cursor: pointer;" @click="() => {displayImg('收款凭证', row.gather_certificate_pic)}"></i>
            <span v-else>--</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="gather_amount"
        label="是否开票"
        width="120">
        <template slot-scope="{row}">
          <p>
            <span class="txt-gwtitle">开票：</span>
            <span>{{row.is_invoice === 0 ? '否' : row.is_invoice === 1 ? '是' : '--'}}</span>
          </p>
          <p class="img-flex">
            <span class="txt-gwtitle">凭证：</span>
            <i v-if="row.invoice_certificate_pic !== ''" class="iconfont icontupian" style="font-size: 30px !important; color: #FF9536; cursor: pointer;" @click="() => {displayImg('发票凭证', row.invoice_certificate_pic)}"></i>
            <span v-else>--</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="{row}">
          <div v-if="row.invoice_certificate_pic == ''">
            <div v-if="judgeCurrentPower(row.add_by_id) || judgeCurrentPower(CooperationDetail.manager_id)">
              <el-tooltip placement="left" effect="light" content="编辑">
                <span v-show="UserRoles.includes(RIGHT_CODE.update_achievement)"><i class="gm-icon gm-icon-edit" @click="editAchievement(row)"></i></span>
              </el-tooltip>
              <el-tooltip placement="right" effect="light" content="删除">
                <span v-show="UserRoles.includes(RIGHT_CODE.del_achievement)"><i class="gm-icon gm-icon-delete" @click="delAchievement(row)"></i></span>
              </el-tooltip>
            </div>
            <span v-else>--</span>
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="contract-pagination"
      background
      style="margin-bottom: 10px;"
      :current-page.sync="pagination.currentPage"
      :page-sizes.sync="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="AchievementList != null ? AchievementList.total : 0"
      @current-change="handleCurrentChange"
      @size-change="handlePageSizeChange">
    </el-pagination>
    <!-- 登记业绩 -->
    <AddAchievementDialog ref="addAchievementDialog" />
    <!-- 预览图片 -->
    <image-dialog ref="imageDialog" :imgsrc="imgsrc" :title="imgtitle"/>
  </div>
</template>

<script>
import {RIGHT_CODE} from '@/const/roleCode'
import {mapGetters, mapActions} from 'vuex'
import AddAchievementDialog from './AddAchievement'
import {deleteAchievement} from '@/api/cooperative'
import {showProDateFormat} from '@/utils/format'
import {gatherWayListFormat} from '@/const/cooperative'
import CurrentUserPower from '../../mixin/CurrentUserPower'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'AchievementList',
  components: {
    AddAchievementDialog
  },
  mixins: [CurrentUserPower, CooperativeStore],
  data () {
    return {
      RIGHT_CODE,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30]
      },
      imgsrc: '', // 预览图片src
      imgtitle: '' // 预览图片标题
    }
  },
  computed: {
    ...mapGetters({
      AchievementList: 'cooperative/AchievementList'
    })
  },
  methods: {
    showProDateFormat,
    gatherWayListFormat,
    ...mapActions({
      GetAchievementList: 'cooperative/GetAchievementList'
    }),
    // 登记业绩
    addAchievementHandle () {
      this.$refs.addAchievementDialog.show()
    },
    // 获取分页数据
    getAchievementListByPage () {
      this.GetAchievementList({
        cooperation_id: this.CooperationDetail.cooperation_id,
        num: this.pagination.pageSize,
        page_num: this.pagination.currentPage
      })
    },
    // 翻页
    handleCurrentChange () {
      this.getAchievementListByPage()
    },
    // 每页条数改变
    handlePageSizeChange (pageSize) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = pageSize
      this.getAchievementListByPage()
    },
    // 编辑业绩
    editAchievement (row) {
      let page = JSON.parse(JSON.stringify(this.pagination))
      this.$refs.addAchievementDialog.show(row, page)
    },
    // 删除业绩
    delAchievement (row) {
      this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'warning-icon'
      }).then(() => {
        deleteAchievement({achievement_id: row.achievement_id}).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.getAchievementListByPage()
            // 更新成本
            this.GetCooperationDetail({
              customer_id: this.CustomerDetail.id,
              cooperation_id: this.CooperationDetail.cooperation_id
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {})
    },
    // 预览图片
    displayImg (title, imgsrc) {
      this.imgsrc = imgsrc
      this.imgtitle = title
      this.$refs.imageDialog.show()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .achievementlist-container {
    /deep/ .el-table {
      border-right-width: 0;
    }
    .txt-skamount {
      color: #FF631E;
    }
    .txt-gwtitle {
      font-size: 12px;
      color: #888888;
    }
    .txt-gwinfo {
      font-size: 14px;
      color: #333333;
    }
    .img-flex {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
</style>
