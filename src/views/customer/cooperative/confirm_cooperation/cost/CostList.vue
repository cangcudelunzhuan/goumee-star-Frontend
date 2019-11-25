<template>
  <div class="costlist-container" v-if="CostList != null">
    <el-button size="small" type="primary" @click="addCostHandle" v-show="UserRoles.includes(RIGHT_CODE.add_cost) && (judgeCurrentPower(CooperationDetail.add_by_id) || judgeCurrentPower(CooperationDetail.manager_id) || judgeAEPower())">安排成本</el-button>
    <el-table
      :data="CostList != null ? CostList.data : []"
      :stripe="true"
      style="width: 100%; margin-top: 15px; margin-bottom: 10px;"
      :header-cell-style="{background:'#F5F6F9', height:'42px', color: '#666666', fontWeight: 'bold'}">
      <template slot="empty">
        <table-no-data :isvertical="true" :title="'还没有安排成本记录哦~'" :img="require('@/assets/img/cooperative/xt_nodata_note.png')"></table-no-data>
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
        label="关联业绩"
        width="150">
        <template slot-scope="{row}">
          <span v-if="row.cost_type == 2">借款</span>
          <span v-else>{{row.achievement_uid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="KOL / 机构名称"
        width="130">
        <template slot-scope="{row}">
          <p>
            <span class="txt-gwinfo">{{row.kol_name}}</span>
          </p>
          <p>
            <span class="txt-gwtitle">{{row.is_personal == 1 ? '个人' : row.company_name || '--'}}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        min-width="130"
        label="打款信息">
        <template slot-scope="{row}">
          <p>
            <span class="txt-gwtitle">时间: </span><span class="txt-gwinfo">{{row.pay_date}}</span>
          </p>
          <p>
            <span class="txt-gwtitle">账户: </span><span class="txt-gwinfo">{{row.pay_account == 1 ? '时光机' : '玥每映像'}}</span>
          </p>
          <p>
            <span class="txt-gwtitle">方式: </span>
            <span class="txt-gwinfo">{{row.pay_way == 1 ? '银行卡' : 'v任务'}}</span>
            <el-popover placement="top" trigger="hover" v-if="row.pay_way == 1 && (row.bank_info.bank_card_num == '' || row.bank_info == '')">
              <i slot="reference" class="iconfont iconjinggao" style="font-size: 15px !important; color: red; cursor: pointer;"></i>
              <div>
                <i class="iconfont iconjinggao" style="font-size: 15px !important; color: rgba(242,100,103,1);"></i>
                <span style="color: rgba(242,100,103,1); font-size: 12px">待媒介补充银行卡信息</span>
              </div>
            </el-popover>
            <el-popover placement="bottom" trigger="hover" popper-class="tipbankinfo" v-if="row.pay_way == 1 && row.bank_info != '' && row.bank_info.bank_card_num != ''">
              <i slot="reference" class="iconfont icongengduo" style="font-size: 15px !important; color: #5C82FF; cursor: pointer;"></i>
              <div>
                <div style="">
                  <svg class="icon " aria-hidden="true"><use xlink:href="#iconbank"></use></svg>
                  <span>银行卡信息</span>
                </div>
                <div style="width: 100%; height:1px; background:rgba(238,239,241,1); border-radius:2px; margin: 5px 0;"></div>
                <div style="display: flex; flex-direction: row; justify-content: space-around;">
                  <div style="padding-right: 60px;">
                    <p style="line-height: 24px; color: #666;"><label style="color: #999;">主播真实姓名：</label>{{row.bank_info.real_name || '--'}}</p>
                    <p style="line-height: 24px; color: #666;"><label style="color: #999;">开户行：</label>{{row.bank_info.bank_name || '--'}}</p>
                    <p style="line-height: 24px; color: #666;"><label style="color: #999;">银行卡号：</label>{{row.bank_info.bank_card_num || '--'}}</p>
                    <p style="line-height: 24px; color: #666;"><label style="color: #999;">身份证号：</label>{{row.bank_info.id_number || '--'}}</p>
                    <p style="line-height: 24px; color: #666;"><label style="color: #999;">手机号：</label>{{row.bank_info.phone || '--'}}</p>
                  </div>
                  <div>
                    <a style="border-radius:2px; position: relative; display: block;" v-if="row.bank_info.bank_card_pic" :href="row.bank_info.bank_card_pic + '?Authorization=' + getToken()" target="_blank">
                      <img style="width: 76px; height: 57px;" :src="row.bank_info.bank_card_pic + '?Authorization=' + getToken()" alt="">
                      <div style="width: 100%; background:#000; opacity:0.4; line-height: 20px; position: absolute; bottom: 0; color: #fff; text-align: center; font-size: 12px;">银行卡照片</div>
                    </a>
                    <span v-else style="border-radius:2px; position: relative; display: block;">
                      <img style="width: 76px;height: 57px;" src="@/assets/img/default_img.png" alt="">
                      <div style="width: 100%; background:#000; opacity:0.4; line-height: 20px; position: absolute; bottom: 0; color: #fff; text-align: center; font-size: 12px;">暂无照片</div>
                    </span>
                    <a style="border-radius:2px; position: relative; display: block;" v-if="row.bank_info.id_card_pic" :href="row.bank_info.id_card_pic + '?Authorization=' + getToken()" target="_blank">
                      <img style="width: 76px;height: 57px;" :src="row.bank_info.id_card_pic + '?Authorization=' + getToken()" alt="">
                      <div style="width: 100%; background:#000; opacity:0.4; line-height: 20px; position: absolute; bottom: 0; color: #fff; text-align: center; font-size: 12px;">身份证照片</div>
                    </a>
                    <span v-else style="border-radius:2px; position: relative; display: block;">
                      <img style="width: 76px;height: 57px;" src="@/assets/img/default_img.png" alt="">
                      <div style="width: 100%; background:#000; opacity:0.4; line-height: 20px; position: absolute; bottom: 0; color: #fff; text-align: center; font-size: 12px;">暂无照片</div>
                    </span>
                  </div>
                </div>
              </div>
            </el-popover>
          </p>
          <p v-if="row.pay_way == 2">
            <span class="txt-gwtitle">V任务链接: </span>
            <a class="link" :href="row.pay_way_detail.v_task_url" target="_blank">点击跳转</a>
          </p>
          <p v-if="row.pay_way == 2">
            <span class="txt-gwtitle">产品链接: </span>
            <a class="link" :href="row.pay_way_detail.item_url" target="_blank">点击跳转</a>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="打款金额"
        width="120">
        <template slot-scope="{row}">
          <span class="txt-skamount">{{row.pay_amount_str ? `￥${row.pay_amount_str}` : '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="税点金额"
        width="120">
        <template slot-scope="{row}">
          <span v-if="row.is_invoice == 1">{{row.tax_point_str ? `￥${row.tax_point_str}` : '--'}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否开票"
        width="100">
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
      <el-table-column
        label="是否已打款"
        width="110">
        <template slot-scope="{row}">
          <p>
            <span class="txt-gwtitle">打款：</span>
            <span>{{row.is_pay === 0 ? '否' : row.is_pay === 1 ? '是' : '--'}}</span>
          </p>
          <p class="img-flex">
            <span class="txt-gwtitle">凭证：</span>
            <i v-if="row.pay_certificate_pic !== ''" class="iconfont icontupian" style="font-size: 30px !important; color: #FF9536; cursor: pointer;" @click="() => {displayImg('发票凭证', row.pay_certificate_pic)}"></i>
            <span v-else>--</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        width="90">
        <template slot-scope="{row}">
          <el-popover
            placement="top-start"
            width="200"
            trigger="click"
            v-if="row.note != ''"
            :content="row.note">
            <span slot="reference" style="color: #5C82FF; cursor: pointer; font-size: 13px;">备注</span>
            <p>
              {{row.note}}
            </p>
          </el-popover>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="{row}">
          <div v-if="row.is_pay != 1">
            <div v-if="judgeCurrentPower(row.add_by_id) || judgeCurrentPower(CooperationDetail.manager_id) || judgeAEPower()">
              <el-tooltip placement="left" effect="light" content="编辑">
                <span v-show="UserRoles.includes(RIGHT_CODE.update_cost)"><i class="gm-icon gm-icon-edit" @click="editCost(row)"></i></span>
              </el-tooltip>
              <el-tooltip placement="right" effect="light" content="删除">
                <span v-show="UserRoles.includes(RIGHT_CODE.del_cost)"><i class="gm-icon gm-icon-delete" @click="delCost(row)"></i></span>
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
      :total="CostList != null ? CostList.total : 0"
      @current-change="handleCurrentChange"
      @size-change="handlePageSizeChange">
    </el-pagination>
    <!-- 成本安排 -->
    <AddCost ref="addCostDialog" />
    <!-- 预览图片 -->
    <image-dialog ref="imageDialog" :imgsrc="imgsrc" :title="imgtitle"/>
  </div>
</template>

<script>
import {RIGHT_CODE} from '@/const/roleCode'
import {mapGetters, mapActions} from 'vuex'
import AddCost from './AddCost'
import {showProDateFormat} from '@/utils/format'
import {gatherWayListFormat} from '@/const/cooperative'
import {deleteCost} from '@/api/cooperative'
import { getToken } from '@/utils/token'
import CurrentUserPower from '../../mixin/CurrentUserPower'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'CostList',
  components: {
    AddCost
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
      CostList: 'cooperative/CostList'
    })
  },
  methods: {
    getToken,
    showProDateFormat,
    gatherWayListFormat,
    ...mapActions({
      GetCoostList: 'cooperative/GetCoostList'
    }),
    // 安排成本
    addCostHandle () {
      this.$refs.addCostDialog.show()
    },
    // 获取分页数据
    getCostListByPage () {
      this.GetCoostList({
        cooperation_id: this.CooperationDetail.cooperation_id,
        num: this.pagination.pageSize,
        page_num: this.pagination.currentPage
      })
    },
    // 翻页
    handleCurrentChange () {
      this.getCostListByPage()
    },
    // 每页条数改变
    handlePageSizeChange (pageSize) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = pageSize
      this.getCostListByPage()
    },
    // 编辑成本
    editCost (row) {
      let page = JSON.parse(JSON.stringify(this.pagination))
      this.$refs.addCostDialog.show(row, page)
    },
    // 删除成本
    delCost (row) {
      this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'warning-icon'
      }).then(() => {
        deleteCost({cost_id: row.cost_id}).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.getCostListByPage()
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
  .costlist-container {
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
    .link {
      color: #5C82FF;
      font-size: 12px;
      cursor: pointer;
      text-decoration: none;
    }
  }
</style>
