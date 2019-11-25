<template>
  <div class="achievementtable-container">
    <div class="result-list">
      <div class="opreate-btns">
        <el-button type="primary" v-if="UserRoles.includes(RIGHT_CODE.export_cost) && dataSource.total !== 0" size="small" @click="handleExportClick">导出</el-button>
      </div>
      <div class="list">
        <el-table
          :data="dataSource != null ? dataSource.data : []"
          :stripe="true"
          style="width: 100%; margin-top: 15px; margin-bottom: 10px;"
          :header-cell-style="{background:'#F5F6F9', height:'42px', color: '#666666', fontWeight: 'bold'}"
          @selection-change="handleSelectionChange">
          <template slot="empty">
            <table-no-data :isvertical="true" :title="'还没有安排成本记录哦~'" :img="require('@/assets/img/cooperative/xt_nodata_cost.png')"></table-no-data>
          </template>
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            :formatter="(row, column, cellValue, index) => (page.page_num - 1) * page.num + (index + 1)"
            label="序号"
            width="60"
            fixed="left"
            align="center">
          </el-table-column>
          <el-table-column
            prop="manager"
            label="客户经理"
           >
            <template slot-scope="{row}">
              <span>{{row.manager || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="achievement_uid"
            label="关联业绩"
            width="150"
            >
            <template slot-scope="{row}">
              <span v-if="row.cost_type == 2">借款</span>
              <span v-else>{{row.achievement_uid}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="KOL / 机构名称"
            min-width="120"
            >
            <template slot-scope="{row}">
              <p>
                <span class="txt-gwinfo">{{row.kol_name|| '--'}}</span>
              </p>
              <p>
                <span class="txt-gwtitle">{{row.is_personal == 1 ? '个人' : row.company_name || '--'}}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="120"
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
            width="120"
            >
            <template slot-scope="{row}">
              <span class="txt-skamount">{{row.pay_amount_str ? `￥${row.pay_amount_str}` : '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="税点金额"
            min-width="90"
            >
            <template slot-scope="{row}">
              <span v-if="row.is_invoice == 1">{{row.tax_point_str ? `￥${row.tax_point_str}` : '--'}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="gather_amount"
            label="是否开票"
            >
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
            label="备注"
            >
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
          <el-table-column
            label="是否打款"
            align="center"
            >
            <template slot-scope="{row}">
              <el-switch
              v-if="UserRoles.includes(RIGHT_CODE.upload_finance_certificate)"
              :value="row.is_pay == 1"
              active-text="是"
              inactive-text="否"
              @change="(val) => switchChangeHandle(val, row)">
            </el-switch>
            <span v-else>{{row.is_pay == 1 ? '是' : '否'}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="打款凭证" align="center">
            <template slot-scope="{row}">
              <span v-if="!(row.pay_certificate_pic != '') && !UserRoles.includes(RIGHT_CODE.upload_finance_certificate)">
                --
              </span>
              <div v-else>
                <el-tooltip placement="left" effect="light" content="查看打款凭证" v-if="row.pay_certificate_pic != ''">
                  <span>
                    <i class="iconfont iconchakan" style="font-size: 24px !important; color: #E1E3E9; cursor: pointer;" @click="() => {displayImg('打款凭证', row.pay_certificate_pic)}"></i>
                  </span>
                </el-tooltip>
                <el-tooltip placement="left" effect="light" content="上传打款凭证">
                  <span v-if="UserRoles.includes(RIGHT_CODE.upload_finance_certificate)">
                    <i class="iconfont iconshangchuanwenjian" style="font-size: 21px !important; color: #E1E3E9; cursor: pointer; margin-left: 6px;" @click="() => {uploadHandel(row)}"></i>
                  </span>
                </el-tooltip>
              </div>
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
    <CertificateUploadDialog ref="certificateUploadDialog" :id="cost_id" :name="'打款凭证'"
     :type="'certificate/cost_pay_certificate'" @uploadClose="dialogCancelHandle"/>
  </div>
</template>

<script>
import {RIGHT_CODE} from '@/const/roleCode'
import {mapGetters} from 'vuex'
import CertificateUploadDialog from '../../components/CertificateUpload'
import { getToken } from '@/utils/token'
import {updateIsPay} from '@/api/cooperative'

export default {
  name: 'ConstTable',
  props: ['page', 'dataSource'],
  components: {
    CertificateUploadDialog
  },
  data() {
    return {
      RIGHT_CODE,
      imgsrc: '',
      imgtitle: '',
      multipleSelectionIds: [],
      cost_id: ''
    }
  },
  computed: {
    ...mapGetters({
      UserRoles: 'user/getUserRole'
    })
  },
  methods: {
    getToken,
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
      this.$emit('export', multipleSelectionIds)
    },
    // 预览图片
    displayImg (title, imgsrc) {
      this.imgsrc = imgsrc
      this.imgtitle = title
      this.$refs.imageDialog.show()
    },
    // 多选
    handleSelectionChange (data) {
      this.multipleSelectionIds = data.map(c => c.cost_id)
    },
    // 上传凭证
    uploadHandel (row) {
      this.cost_id = row.cost_id
      this.$refs.certificateUploadDialog.show()
    },
    // 关闭上传弹窗
    dialogCancelHandle (flag) {
      if (!flag) {
        this.$emit('uploadHandle')
      }
      this.cost_id = ''
    },
    // 切换变化
    switchChangeHandle (val, row) {
      updateIsPay({
        is_pay: val ? 1 : 0,
        cost_id: row.cost_id
      }).then(res => {
        if (res.data.success) {
          this.$message.success('更新成功')
          this.$emit('uploadHandle')
        } else {
          this.$message.error('更新失败')
        }
      })
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
      .link {
        color: #5C82FF;
        font-size: 12px;
        cursor: pointer;
        text-decoration: none;
      }
      /deep/ .el-switch__label {
        position: absolute;
        display: none;
        color: #fff;
        span {
          font-size: 12px;
        }
      }
      /*打开时文字位置设置*/
      /deep/ .el-switch__label--right {
        z-index: 1;
        right: 21px;
        bottom: 1px;
      }
      /*关闭时文字位置设置*/
      /deep/ .el-switch__label--left {
        z-index: 1;
        left: 21px;
        bottom: 1px;
      }
      /*显示文字*/
      /deep/ .el-switch__label.is-active {
        display: block;
      }
      /deep/.el-switch .el-switch__core,
      .el-switch .el-switch__label {
        width: 60px !important;
      }
    }
  }
</style>
