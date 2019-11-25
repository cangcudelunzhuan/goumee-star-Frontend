<template>
  <div class="detail-content">
    <sub-panel :title="'客户基础信息'" :iserect="true">
      <el-row :gutter="10" class="text-block">
        <el-col :span="8" class="text-item">
          <span class="name">
            店铺名称：
          </span>
          <span class="text">
            {{CustomerDetail.shop_name}}
          </span>
        </el-col>
        <el-col :span="8" class="text-item">
          <span class="name">
            客户类目：
          </span>
          <span class="text">
            {{categoryFormate({category: CustomerDetail.category})}}
          </span>
        </el-col>
        <el-col :span="8" class="text-item">
          <span class="name">
            客户姓名：
          </span>
          <span class="text">
            {{CustomerDetail.customer_name || '--'}}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="text-block">
        <el-col :span="8" class="text-item">
          <span class="name">
            店铺类型：
          </span>
          <span class="text">
            {{shopTypeFormat({shop_type: CustomerDetail.shop_type})}}
          </span>
        </el-col>
        <el-col :span="8" class="text-item">
          <span class="name">
            客户分类：
          </span>
          <span class="text">
            {{CustomerDetail.customer_class ? customerClassList[CustomerDetail.customer_class].value : '--'}}
          </span>
        </el-col>
        <el-col :span="8" class="text-item">
          <span class="name">
            客户地址：
          </span>
          <span class="text">
            {{(CustomerDetail.addr_province + CustomerDetail.addr_town + CustomerDetail.addr_county + CustomerDetail.addr_detail) || '--' }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="text-block">
        <el-col :span="8" class="text-item">
          <span class="name">
            公司名称：
          </span>
          <span class="text">
            {{CustomerDetail.company_name}}
          </span>
        </el-col>
        <el-col :span="8" class="text-item">
          <span class="name">
            财务信息：
          </span>
          <span class="text">
            <el-popover placement="bottom-start" width="330" trigger="click" popper-class="detail-step-popover-wrapper">
              <div class="step-popover-wrapper">
                <div style="font-size:14px; font-weight:400; color: #333333;">财务信息</div>
                <div style="width: 100%; border: 1px solid #EFEFEF; margin: 7px 0px 10px 0px;"></div>
                <p style="margin-bottom: 5px;"><span style="font-size:14px; color: #999999">公司开票抬头：</span><span style="font-size:14px; color: #666666"> {{CustomerDetail.invoice_title || '--'}}</span></p>
                <p style="margin-bottom: 5px;"><span style="font-size:14px; color: #999999">纳税识别号：</span><span style="font-size:14px; color: #666666">{{CustomerDetail.invoice_number || '--'}}</span></p>
                <p style="margin-bottom: 5px;"><span style="font-size:14px; color: #999999">开户行：</span><span style="font-size:14px; color: #666666">{{CustomerDetail.invoice_bank || '--'}}</span></p>
                <p style="margin-bottom: 5px;"><span style="font-size:14px; color: #999999">账号：</span><span style="font-size:14px; color: #666666">{{CustomerDetail.invoice_account || '--'}}</span></p>
                <p style="margin-bottom: 5px;"><span style="font-size:14px; color: #999999">电话：</span><span style="font-size:14px; color: #666666">{{CustomerDetail.invoice_phone || '--'}}</span></p>
                <p style="margin-bottom: 5px;"><span style="font-size:14px; color: #999999">地址：</span><span style="font-size:14px; color: #666666">{{CustomerDetail.invoice_addr || '--'}}</span></p>
              </div>
              <div slot="reference" class="click-look-step">点击查看</div>
            </el-popover>
          </span>
        </el-col>
        <el-col :span="8" class="text-item">
          <span class="name">
            手 机 号：
          </span>
          <span class="text">
            {{CustomerDetail.mobile || '--'}}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="text-block">
        <el-col :span="8" class="text-item">
          <span class="name">
            客户类型：
          </span>
          <span class="text">
            {{companyTypeFormat({company_type: CustomerDetail.company_type})}}
          </span>
        </el-col>
        <el-col :span="8" class="text-item">
          <span class="name">
            客户经理：
          </span>
          <span class="text">
            {{CustomerDetail.manager || '--'}}
          </span>
        </el-col>
        <el-col :span="8" class="text-item">
          <span class="name">
            微 信 号：
          </span>
          <span class="text">
            {{CustomerDetail.wechat || '--'}}
          </span>
        </el-col>
      </el-row>
    </sub-panel>
  </div>
</template>

<script>
import {shopTypeFormat, categoryFormate, companyTypeFormat, customerClassList} from '@/utils/format'

export default {
  name: 'CustomerDetailInfo',
  props: ['CustomerDetail'],
  data () {
    return {
      customerClassList
    }
  },
  methods: {
    shopTypeFormat,
    categoryFormate,
    companyTypeFormat
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .detail-content {
    padding: 0 26px 30px;
    .content-text {
      padding: 0px 20px 0;
      .text-block {
        margin-top: 18px;
        flex-wrap: wrap;
        font-size: 14px;
        line-height: 1;
        .text-item {
          display: flex;
          .name {
            color: #999999;
            width: 70px;
            text-align: right;
            &.w100 {
              width: auto;
            }
          }
          .text {
            color: #666666;
            flex: 1;
            overflow:hidden;
            word-wrap: break-word;
            line-height: 16px;
            &.nowrap {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .lookall {
            color: $color-primary;
            cursor: pointer;
            .el-icon-arrow-down {
              display: inline;
            }
            .el-icon-arrow-up {
              display: none;
            }
            &:hover {
              .el-icon-arrow-down {
                display: none;
              }
              .el-icon-arrow-up {
                display: inline;
              }
            }
          }
          .click-look-step {
            display: inline-block;
            color: $color-primary;
            cursor: pointer;
            outline: none;
        }
      }
    }
  }
}
</style>
