<template>
  <div class="achievementtable-container">
    <div class="result-list">
      <div class="opreate-btns">
        <el-button type="primary" v-if="UserRoles.includes(RIGHT_CODE.export_achievement) && dataSource.total !== 0" size="small" @click="handleExportClick">导出</el-button>
      </div>
      <div class="list">
        <el-table
          :data="dataSource != null ? dataSource.data : []"
          :stripe="true"
          style="width: 100%; margin-top: 15px; margin-bottom: 10px;"
          :header-cell-style="{background:'#F5F6F9', height:'42px', color: '#666666', fontWeight: 'bold'}"
          @selection-change="handleSelectionChange">
          <template slot="empty">
            <table-no-data :isvertical="true" :title="'还没有收款记录哦~'" :img="require('@/assets/img/cooperative/xt_nodata_cost.png')"></table-no-data>
          </template>
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            :formatter="(row, column, cellValue, index) => (page.page_num - 1) * page.num + (index + 1)"
            label="序号"
            width="50"
            fixed="left"
            align="center">
          </el-table-column>
          <el-table-column
            prop="achievement_uid"
            label="业绩Id"
            width="180">
          </el-table-column>
          <el-table-column
            label="客户信息"
            min-width="200">
            <template slot-scope="{row}">
              <el-popover
                placement="bottom-start"
                trigger="hover"
                visible-arrow="false"
                popper-class="personal-library-active-platform-popover personal-library-public-popover"
              >
                <div>
                  <p style="margin-bottom: 5px;">
                    <span style="ont-size: 12px; color: #888888;">店铺名称: </span><span style="ont-size: 14px; color: #333333;">{{row.customer_info.shop_name || '--'}}</span>
                  </p>
                  <p style="margin-bottom: 5px;">
                    <span style="ont-size: 12px; color: #888888;">公司名称: </span><span style="ont-size: 14px; color: #333333;">{{row.customer_info.company_name || '--'}}</span>
                  </p>
                  <p style="margin-bottom: 5px;">
                    <span style="ont-size: 12px; color: #888888;">客户类目: </span><span style="ont-size: 14px; color: #333333;">{{categoryList[row.customer_info.category] ? categoryList[row.customer_info.category] : '--'}}</span>
                  </p>
                  <p style="margin-bottom: 5px;">
                    <span style="ont-size: 12px; color: #888888;">客户类型: </span><span style="ont-size: 14px; color: #333333;">{{companyType[row.customer_info.company_type] ? companyType[row.customer_info.company_type].value !== '不限' ? companyType[row.customer_info.company_type].value : '--' : '--'}}</span>
                  </p>
                  <p style="margin-bottom: 5px;">
                    <span style="ont-size: 12px; color: #888888;">客户分类: </span><span style="ont-size: 14px; color: #333333;">{{customerClassList[row.customer_info.customer_class] ? customerClassList[row.customer_info.customer_class].value : '--'}}</span>
                  </p>
                </div>
                <div slot="reference">
                  <p>
                    <span class="txt-gwtitle">店铺名称: </span><span class="txt-gwinfo">{{row.customer_info.shop_name || '--'}}</span>
                  </p>
                  <p>
                    <span class="txt-gwtitle">公司名称: </span><span class="txt-gwinfo">{{row.customer_info.company_name || '--'}}</span>
                  </p>
                  <p>
                    <span class="txt-gwtitle">客户类目: </span><span class="txt-gwinfo">
                      {{categoryList[row.customer_info.category] ? categoryList[row.customer_info.category] : ''}}
                    </span>
                  </p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="gather_way"
            width="180"
            label="收款信息">
            <template slot-scope="{row}">
              <p>
                <span class="txt-gwtitle">时间: </span><span class="txt-gwinfo">{{row.gather_date || '--'}}</span>
              </p>
              <p>
                <span class="txt-gwtitle">方式: </span><span class="txt-gwinfo">{{gatherWayListFormat(row.gather_way)}}</span>
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
            label="收款金额">
            <template slot-scope="{row}">
              <span class="txt-skamount">{{row.gather_amount_str ? `¥${row.gather_amount_str}` : '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="manager"
            label="客户经理">
            <template slot-scope="{row}">
              <span>{{row.manager || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="gather_amount"
            label="收款凭证">
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
            label="是否开票">
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
          <el-table-column fixed="right" label="开票凭证" width="90" align="center" v-if="UserRoles.includes(RIGHT_CODE.upload_finance_certificate)">
            <template slot-scope="{row}">
              <div v-if="row.is_invoice === 1">
                <el-tooltip placement="left" effect="light" content="上传开票凭证">
                  <span>
                    <i class="iconfont iconshangchuanwenjian" style="font-size: 24px !important; color: #E1E3E9; cursor: pointer;" @click="() => {uploadHandel(row)}"></i>
                  </span>
                </el-tooltip>
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="contract-pagination"
          background
          style="margin-bottom: 10px;"
          :current-page.sync="page.page_num"
          :page-sizes.sync="page.pageSizes"
          :page-size="page.num"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataSource != null ? dataSource.total : 0"
          @current-change="handleCurrentChange"
          @size-change="handlePageSizeChange">
        </el-pagination>
      </div>
    </div>
    <!-- 预览凭证 -->
    <image-dialog ref="imageDialog" :imgsrc="imgsrc" :title="imgtitle"/>
    <!-- 上传开票凭证 -->
    <CertificateUploadDialog ref="certificateUploadDialog" :id="achievement_id" :name="'开票凭证'"
     :type="'certificate/achievement_invoice_certificate'" @uploadClose="dialogCancelHandle"/>
  </div>
</template>

<script>
import {RIGHT_CODE} from '@/const/roleCode'
import {mapGetters} from 'vuex'
import {gatherWayListFormat} from '@/const/cooperative'
import {customerClassList, categoryList, companyType} from '@/utils/format'
import CertificateUploadDialog from '../../components/CertificateUpload'

export default {
  name: 'AchievementTable',
  props: ['page', 'dataSource'],
  components: {
    CertificateUploadDialog
  },
  data() {
    return {
      RIGHT_CODE,
      customerClassList,
      categoryList,
      companyType,
      imgsrc: '',
      imgtitle: '',
      multipleSelectionIds: [],
      achievement_id: ''
    }
  },
  computed: {
    ...mapGetters({
      UserRoles: 'user/getUserRole'
    })
  },
  methods: {
    gatherWayListFormat,
    // 翻页
    handleCurrentChange (val) {
      this.$emit('changePage', {
        type: 'index',
        data: val
      })
    },
    // 页大小变化
    handlePageSizeChange (val) {
      this.$emit('changePage', {
        type: 'size',
        data: val
      })
    },
    // 导出
    handleExportClick () {
      const multipleSelectionIds = JSON.parse(JSON.stringify(this.multipleSelectionIds))
      this.$emit('exort', multipleSelectionIds)
    },
    // 预览图片
    displayImg (title, imgsrc) {
      this.imgsrc = imgsrc
      this.imgtitle = title
      this.$refs.imageDialog.show()
    },
    // 多选
    handleSelectionChange (data) {
      this.multipleSelectionIds = data.map(c => c.achievement_id)
    },
    // 上传凭证
    uploadHandel (row) {
      this.achievement_id = row.achievement_id
      this.$refs.certificateUploadDialog.show()
    },
    // 关闭上传弹窗
    dialogCancelHandle (flag) {
      if (!flag) {
        this.$emit('uploadHandle')
      }
      this.achievement_id = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .achievementtable-container {
    .result-list {
      padding: 12px;
      background: #fff;
      margin-top: 12px;
      .opreate-btns {
        margin-bottom: 12px;
        .el-button {
          min-width: 80px;
        }
      }
      .contract-pagination {
        padding: 0;
        margin-top: 12px;
        /deep/ .el-input.el-input--mini.el-input--suffix {
          margin: 0;
        }
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
  }
</style>
