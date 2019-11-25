<!--
 * @Description: kol详情弹窗
 * @Author: 白青
 * @Date: 2019-09-29 15:22:06
 * @LastEditTime: 2019-11-25 13:29:28
 * @LastEditors: 白青
 -->
<style lang="scss" scoped>
@import '@/styles/vars.scss';

#personal-detail {
  min-width: 900px;
  /deep/ .el-dialog__header {
    background-color: #fcfbfb;
    margin: 0;
    border-bottom: 1px solid #eeeeee;
    .el-dialog__headerbtn {
      top: -6px;
      right: -50px;
      font-size: 40px;
    }
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      color: #333;
      text-align: left;
      .tip-color {
        margin-left: 14px;
        font-size: 12px;
        color: #888 !important;
      }
      .oprate-btn {
        float: right;
        margin: -10px;
        .icon-btn {
          display: inline-block;
          width: 56px;
          text-align: center;
          border-left: #f5f5f5 solid 1px;
          .gm-icon {
            display: inline-block;
            margin-top: 9px;
          }
        }
      }
    }
  }
  /deep/ .el-dialog__body {
    padding: 0;
  }
  .head_info {
    padding: 30px;
    background-color: #fcfbfb;
    border-bottom: 1px solid #ebebeb;
    .border-right {
      border-right: 1px dashed #ebebeb;
    }
    .avatar {
      border-radius: 100%;
      width: 90px;
      height: 90px;
      float: left;
      position: relative;
      margin-top: 10px;
      img {
        width: 100%;
      }
      .level {
        position: absolute;
        bottom: -6px;
        left: 10px;
        border-radius: 12px;
        background: #ffb423;
        width: 70px;
        height: 24px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        .iconzuanshi {
          margin-right: 5px;
          font-size: 13px;
        }
      }
    }
    .info-box {
      padding-left: 100px;
      .title {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        line-height: 30px;
      }
      .el-tag {
        line-height: 24px;
        height: 24px;
        margin-right: 5px;
      }
      .iconyonghu {
        color: #ffa04c;
      }
      .iconshouji-copy {
        color: #4ca4ff;
      }
      .iconweixin {
        color: #52bd33;
      }
      .iconzhuanpiao {
        color: #5c82ff;
      }
      .info-contact {
        .iconfont {
          margin-right: 5px;
        }
        span {
          margin-right: 10px;
        }
      }
      .special-ticket {
        border: 1px solid #d1d8db;
        padding: 2px 5px;
        .icon {
          margin-right: 5px;
        }
      }
    }
    .brand-box {
      margin-left: 30px;
      .title {
        font-size: 14px;
        font-weight: bold;
        color: #333;
      }
      label {
        display: inline-block;
        line-height: 24px;
        height: 24px;
        background: #f2f2f2;
        border-radius: 2px;
        color: #666;
        padding: 0 10px;
        margin: 10px 10px 0 0;
      }
      .no-barnd {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
        span {
          color: #c2c7cc;
          font-size: 14px;
        }
      }
      .more {
        margin-top: 10px;
        color: $color-primary;
        cursor: pointer;
      }
    }
  }
  .no_case {
    margin: 0 20px;
    height: 150px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    color: #c2c7cc;
    img {
      width: 41px;
      height: 48px;
    }
  }
  .show-label {
    p {
      line-height: 30px;
      color: #666;
      label {
        color: #999;
      }
    }
  }
  /deep/ .el-card__header {
    padding: 10px;
    background: #fcfbfb;
  }
  /deep/ .el-card__body {
    padding: 10px;
  }
  .box-card {
    .list {
      border-bottom: 1px dashed #e8e8e8;
      line-height: 40px;
      cursor: pointer;
      &:last-child {
        border-bottom: none;
      }
      .iconfont {
        color: #999;
      }
    }
  }
  .id-card {
    width: 76px;
    height: 57px;
    margin-bottom: 10px;
    border-radius: 2px;
    position: relative;
    display: block;
    .tip {
      width: 100%;
      background: #000;
      opacity: 0.4;
      line-height: 20px;
      position: absolute;
      bottom: 0;
      color: #fff;
      text-align: center;
      font-size: 12px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 详情头部样式
  /* .detail-header {
      background: #fff;
      box-shadow:0px 1px 4px 0px rgba(0, 0, 0, 0.04);
      .header-bar {
        height: 54px;
        line-height: 54px;
        padding-left: 12px;
        border-bottom: #F5F5F5 solid 1px;
        overflow: hidden;
        .back-icon {
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          vertical-align: middle;
          color: #BFC1C8;
          margin-top: -2px;
          margin-right: 5px;
        }
        .header-title {
          font-size: 16px;
          color: #555;
          font-weight: bold;
          vertical-align: middle;
        }
        .enter-person {
          font-size: 12px;
          color: #999;
          margin-left: 30px;
        }
        .oprate-btn {
          float: right;
          .icon-btn {
            display: inline-block;
            width: 56px;
            text-align: center;
            border-left: #F5F5F5 solid 1px;
            .gm-icon {
              display: inline-block;
              margin-top: 9px;
            }
          }
        }
      }
      .header-content-wrap {
        .header-content {
          overflow: hidden;
          padding: 20px 0;
          .header-content-block {
            border-right: #EBEBEB dashed 1px;
            padding: 0 20px;
            .block-title {
              font-size: 14px;
              color: #666;
              margin-bottom: 15px;
            }
            .info-line {
              margin-bottom: 10px;
              color: #666;
              font-size: 12px;
              span {
                color: #999;
              }
            }
            .good-at-area {
              span {
                color: #666;
                padding: 3px 15px;
                background: #F2F2F2;
                display: inline-block;
                margin-bottom: 10px;
                margin-right: 5px;
              }
            }
          }
          .avatar {
            float: left;
            img {
              width: 126px;
              height: 126px;
              border-radius: 50%;
            }
          }
          .kol-name-addr {
            margin-left: 20px;
            width: calc(100% - 146px);
            float: left;
            .kol-name {
              font-size: 20px;
              color: #333;
              margin: 17px 0;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .address {
              color: #666;
              font-size: 12px;
              margin-bottom: 16px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              span { color: #999; }
            }
            .invoice {
              background: #F2F2F2;
              border-radius: 2px;
              padding: 6px;
              font-size: 12px;
              color: #888;
              .invoice-icon {
                display: inline-block;
                width: 14px;
                height: 11px;
                background: url(../../assets/img/zhuanpiao_icon.png) no-repeat;
                margin-right: 5px;
                vertical-align: text-top;
              }
              &.active {
                color: $color-primary;
                .invoice-icon {
                  background: url(../../assets/img/zhuanpiao_active_icon.png) no-repeat;
                }
              }
            }
          }
        }
      }
      .case-wrap {
        background: #FBFBFB;
        border-top: #F5F5F5 solid 1px;
        padding: 20px 25px 20px 0;
        overflow: hidden;
        position: relative;
        .case-title {
          position: absolute;
          left: 0;
          top: 20px;
          width: 63px;
          text-align: right;
          color: #999;
          font-size: 13px;
          line-height: 25px;
        }
        .case-content {
          // float: left;
          // width: calc(100% - 63px);
          padding-left: 63px;
          font-size: 13px;
          color: #666;
          line-height: 25px;
          min-height: 25px;
        }
      }
    }*/
  .detail-tabs {
    line-height: 50px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    .tabs {
      background-color: #f9f9f9;
      ul {
        height: 50px;
        border: #efefef solid 1px;
        &::after {
          content: '';
          display: block;
          clear: both;
        }
        li {
          float: left;
          padding: 0 22px;
          cursor: pointer;
          &.active {
            background: #fff;
            border-right: #efefef solid 1px;
            height: 51px;
            &:hover {
              background: #fff;
            }
            span {
              display: inline-block;
            }
          }
          &:hover {
            background: #f1f1f1;
          }
          span {
            margin-left: 1px;
            // display: none;
          }
          .iconfont {
            vertical-align: middle;
            font-size: 24px;
          }
        }
      }
      .platform-icon {
        display: inline-block;
        width: 28px;
        height: 24px;
        background-image: url(../../assets/img/platform_logo.png);
        background-repeat: no-repeat;
        vertical-align: middle;
        &.tblive-icon {
          // height: 22px;
        }
        &.yizhibo-icon {
          background-position: 0 -24px;
        }
        &.tbvideo-icon {
          background-position: 0 -48px;
        }
        &.douyin-icon {
          background-position: 0 -72px;
        }
        &.bili-icon {
          background-position: 0 -96px;
        }
        &.kuaishou-icon {
          background-position: 0 -120px;
        }
        &.taobao-photo-icon {
          background-position: 0 -144px;
        }
        &.webo-icon {
          background-position: 0 -169px;
        }
        &.xhs-icon {
          background-position: 0 -193px;
        }
        &.wechat-icon {
          background-position: 0 -217px;
        }
      }
    }
    .tab-content {
      line-height: initial;
      .content-wrap {
        overflow: hidden;
        margin: 20px;
        padding: 20px;
        background: #fff;
        border: 1px solid #f0f0f0;

        .kol-info {
          width: 58px;
          overflow: hidden;
          float: left;
          text-align: center;
          .avatar-wrap {
            vertical-align: middle;
            width: 58px;
            height: 58px;
            float: left;
            img {
              width: 58px;
              height: 58px;
              border-radius: 50%;
            }
          }
        }
      }
      .medium-content {
        padding: 0 20px 20px;
        overflow: hidden;
        .medium-tab {
          width: 100%;
          height: 36px;
          li {
            width: 100px;
            height: 36px;
            line-height: 36px;
            margin-right: 2px;
            background: #f5f7fa;
            color: #888888;
            float: left;
            text-align: center;
            cursor: pointer;
            &.active {
              background: $color-primary;
              color: #fff;
            }
          }
        }
        .medium-detail {
          border: 1px solid #f0f0f0;
          padding-bottom: 10px;
          .detail-text {
            padding: 20px 40px;
            background: #f9f9f9;
            line-height: 40px;
            margin: 10px;
            position: relative;
            .cooperation-tag {
              text-align: center;
              height: 16px;
              position: absolute;
              top: 20px;
              left: 0;
              .iconyihezuo {
                color: #ffb423;
                font-size: 80px;
              }
            }
          }
        }
        .el-rate-custmer div {
          display: inline-block;
          width: calc(100% - 58px);
          line-height: 20px;
        }
      }
      .data-info-wrap {
        float: left;
        width: calc(100% - 58px);
        display: flex;
        .koltag {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .tagcon {
            margin-left: 15px;
            .tag {
              height: 20px;
              border: 1px solid rgba(180, 180, 180, 1);
              border-radius: 2px;
              text-align: center;
              font-size: 12px;
              font-weight: 400;
              padding: 2px 4px;
              margin-right: 3px;
              color: rgba(153, 153, 153, 1);
            }
            .iswarn {
              border: none;
              color: #fff;
              background: rgba(255, 180, 35, 1);
            }
          }
        }
        .kol-name2 {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          line-height: 33px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
          margin-left: 20px;
          width: 158px;
        }
        .kol-name {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          line-height: 58px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
          margin-left: 20px;
          width: 158px;
        }
        .tab-info {
          text-align: center;
          flex: 1;
          border-right: #ebebeb dashed 1px;
          &:nth-last-child(1) {
            border-right: none;
          }
          .tab-info-box {
            display: inline-block;
          }
          .info-value {
            font-size: 16px;
            color: #333;
            line-height: 30px;
          }
          .info-label {
            font-size: 14px;
            color: #999;
            line-height: 30px;
          }
        }
      }
      .detail-data {
        background: #fff;
        margin-top: 12px;
        .no-data {
          height: 220px;
          text-align: center;
          img {
            margin-top: 50px;
          }
          p {
            color: #a9a6aa;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
<style>
.delete-kol-alert.el-message-box .el-message-box__content {
  height: initial;
}
.delete-kol-alert.el-message-box
  .el-message-box__content
  .el-message-box__message {
  top: 0;
}
</style>

<template>
  <div
    id="personal-detail"
    v-if="detail"
  >
    <el-dialog
      :visible="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="990px"
      @close="closeHandle()"
    >
      <div
        class="title"
        slot="title"
      >
        <div class="fl"><b>KOL详情</b><span class="tip-color">录入人：{{detail.kol_info.add_by}}</span></div>
        <div
          v-if="detail"
          class="oprate-btn"
        >
          <span
            v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.update_kol)"
            class="icon-btn"
            @click="handleEditKolClick"
          ><i class="gm-icon gm-icon-edit"></i></span>
          <span
            v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.del_kol)"
            class="icon-btn"
            @click="handleDeleteKolClick"
          ><i class="gm-icon gm-icon-delete"></i></span>
        </div>
      </div>
      <el-row class="head_info">
        <el-col
          :span="12"
          class="border-right"
        >
          <div class="avatar">
            <img
              src="/static/img/home_userdisplay_2.3477ced.png"
              alt=""
            >
            <div class="level"><i class="iconfont iconzuanshi"></i>{{kolTag}}</div>
          </div>
          <div class="info-box show-label">
            <div class="title">{{detail.kol_info.kol_name }}</div>
            <p>
              <label>擅长领域：</label>
              <span v-if=" detail.kol_info.areas !='' ">
                <el-tag
                  v-for="tag in detail.kol_info.areas.split('、')"
                  :key="tag"
                >{{tag || '--'}}</el-tag>
              </span>
              <span v-else>--</span>
            </p>
            <p class="info-contact">
              <label>联系方式：</label>
              <span> <i class="iconfont iconyonghu"></i>{{detail.kol_info.contacts || '--'}}</span><span> <i class="iconfont iconshouji-copy"></i>{{detail.kol_info.contact_phone || '--'}}</span><span> <i class="iconfont iconweixin"></i>{{detail.kol_info.contact_wechat || '--'}}</span>
            </p>
            <p>
              <label>专票：</label>
              <span
                class="special-ticket"
                v-if="detail.kol_info.special_ticket == 1"
              ><i class="iconfont iconzhuanpiao mr5"></i>提供专票</span>
              <span
                class="special-ticket"
                v-else-if="detail.kol_info.special_ticket == 0"
              ><i
                  class="iconfont iconzhuanpiao mr5"
                  style="color: #A3A6A9;"
                ></i>不提供专票</span>
              <span v-else> -- </span>
            </p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="brand-box">
            <p class="title">已合作品牌</p>
            <div
              class="mt10"
              v-if="detail.kol_info.cooperation_brand.length > 0"
            >
              <template v-if="isShowAll">
                <label
                  v-for="brand in detail.kol_info.cooperation_brand.slice(0, 8)"
                  :key="brand"
                  v-show="brand !== ''"
                >{{brand}}</label>
                <div
                  class="more"
                  v-if="isShowAll"
                  @click="isShowAll = false"
                >查看全部 <i class="iconfont iconxiangxia"></i></div>
              </template>
              <template v-else>
                <label
                  v-for="brand in detail.kol_info.cooperation_brand"
                  :key="brand"
                  v-show="brand !== ''"
                >{{brand}}</label>
                <div
                  class="more"
                  v-if="!isShowAll && detail.kol_info.cooperation_brand.length > 8"
                  @click="isShowAll = true"
                >收起 <img
                    src="@/assets/img/kol/up.png"
                    style="width: 16px; height: 16px;"
                    alt=""
                    srcset=""
                  ></div>
              </template>
            </div>
            <div
              v-else
              class="no-barnd"
            >
              <img
                src="@/assets/img/kol/warn_icon.png"
                alt=""
                srcset=""
              ><span>未添加合作品牌！</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="pd10">
        <el-col
          :span="12"
          class="pd10"
        >
          <el-card
            class="box-card"
            shadow="never"
          >
            <div
              slot="header"
              class="clearfix kol-card-header"
            >
              <svg
                class="icon "
                aria-hidden="true"
              >
                <use xlink:href="#iconanlie"></use>
              </svg>
              <span>KOL案列</span>
            </div>
            <div
              v-if="caseFileList().length > 0"
              style="margin: 0 20px; height: 150px;"
            >
              <div
                class="list"
                v-for="(file, index) in caseFileList()"
                :key="index"
              >
                <a
                  :href="file.link + '?Authorization=' + getToken()"
                  target="_blank"
                  style="text-decoration: none;"
                >
                  <i class="iconfont iconfujian mr5"></i>
                  <span class="brand-color">{{file.fileName}}</span>
                  <i class="iconfont iconxiazai fr"></i>
                </a>
              </div>
            </div>
            <div
              v-else
              class="no_case"
            >
              <img
                src="@/assets/img/kol/upload_icon.png"
                alt=""
                srcset=""
              >
              <p>您还没有上传案列！</p>
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="12"
          class="pd10"
        >
          <el-card
            class="box-card"
            shadow="never"
          >
            <div
              slot="header"
              class="clearfix kol-card-header"
            >
              <svg
                class="icon "
                aria-hidden="true"
              >
                <use xlink:href="#iconbank"></use>
              </svg>
              <span>收款银行卡信息</span>
            </div>
            <div class="fr">
              <a
                class="id-card"
                v-if="detail.kol_info.bank_info.bank_card_pic"
                :href="detail.kol_info.bank_info.bank_card_pic + '?Authorization=' + getToken()"
                target="_blank"
              >
                <img
                  :src="detail.kol_info.bank_info.bank_card_pic + '?Authorization=' + getToken()"
                  alt=""
                >
                <div class="tip">银行卡照片</div>
              </a>
              <span
                v-else
                class="id-card"
              >
                <img
                  src="@/assets/img/default_img.png"
                  alt=""
                >
                <div class="tip">暂无照片</div>
              </span>
              <a
                class="id-card"
                v-if="detail.kol_info.bank_info.id_card_pic"
                :href="detail.kol_info.bank_info.id_card_pic + '?Authorization=' + getToken()"
                target="_blank"
              >
                <img
                  :src="detail.kol_info.bank_info.id_card_pic + '?Authorization=' + getToken()"
                  alt=""
                >
                <div class="tip">身份证照片</div>
              </a>
              <span
                v-else
                class="id-card"
              >
                <img
                  src="@/assets/img/default_img.png"
                  alt=""
                >
                <div class="tip">暂无照片</div>
              </span>
            </div>
            <div
              class="show-label"
              style="padding-right: 80px;"
            >
              <p><label>银行卡号：</label>{{detail.kol_info.bank_info.bank_card_num || '--'}}</p>
              <p><label>开户行：</label>{{detail.kol_info.bank_info.bank_name || '--'}}</p>
              <p><label>手机号：</label>{{detail.kol_info.bank_info.phone || '--'}}</p>
              <p><label>真实姓名：</label>{{detail.kol_info.bank_info.real_name || '--'}}</p>
              <p><label>身份证号：</label>{{detail.kol_info.bank_info.id_number || '--'}}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div
        v-if="detail && detail.kol_info.platforms !== ''"
        v-loading="loading"
        class="detail-tabs"
      >
        <div class="tabs">
          <ul>
            <li
              v-if="detail['kol_tb_info']"
              :class="{active: activePlatformKey === 'kol_tb_info'}"
              @click="handlePlatformTabChange('kol_tb_info')"
            >
              <i
                class="iconfont icontaobao"
                style=" color: #FF6600; "
              ></i>
              <span>淘宝</span>
            </li>
            <li
              v-if="detail['kol_douyin_info']"
              :class="{active: activePlatformKey === 'kol_douyin_info'}"
              @click="handlePlatformTabChange('kol_douyin_info')"
            >
              <i class="platform-icon douyin-icon"></i>
              <span>抖音</span>
            </li>
            <li
              v-if="detail['kol_xhs_info']"
              :class="{active: activePlatformKey === 'kol_xhs_info'}"
              @click="handlePlatformTabChange('kol_xhs_info')"
            >
              <i class="platform-icon xhs-icon"></i>
              <span>小红书</span>
            </li>
            <li
              v-if="detail['kol_kuaishou_info']"
              :class="{active: activePlatformKey === 'kol_kuaishou_info'}"
              @click="handlePlatformTabChange('kol_kuaishou_info')"
            >
              <i class="platform-icon kuaishou-icon"></i>
              <span>快手</span>
            </li>
            <li
              v-if="detail['kol_weibo_info']"
              :class="{active: activePlatformKey === 'kol_weibo_info'}"
              @click="handlePlatformTabChange('kol_weibo_info')"
            >
              <i class="platform-icon webo-icon"></i>
              <span>微博</span>
            </li>
            <li
              v-if="detail['kol_yizhibo_info']"
              :class="{active: activePlatformKey === 'kol_yizhibo_info'}"
              @click="handlePlatformTabChange('kol_yizhibo_info')"
            >
              <i class="platform-icon yizhibo-icon"></i>
              <span>一直播</span>
            </li>
            <li
              v-if="detail['kol_bili_info']"
              :class="{active: activePlatformKey === 'kol_bili_info'}"
              @click="handlePlatformTabChange('kol_bili_info')"
            >
              <i class="platform-icon bili-icon"></i>
              <span>哔哩哔哩</span>
            </li>
            <li
              v-if="detail['kol_wechat_info']"
              :class="{active: activePlatformKey === 'kol_wechat_info'}"
              @click="handlePlatformTabChange('kol_wechat_info')"
            >
              <i class="platform-icon wechat-icon"></i>
              <span>微信公众号</span>
            </li>
          </ul>
        </div>
        <div
          class="tab-content"
          v-if="detail && activePlatformData &&  detail[activePlatformData.detailKey]"
        >
          <div class="content-wrap clearfix">
            <div class="kol-info">
              <div class="avatar-wrap">
                <img
                  v-if="detail[activePlatformData.detailKey].avatar"
                  :src="detail[activePlatformData.detailKey].avatar"
                >
                <img
                  v-else
                  src="@/assets/img/home_userdisplay_2.png"
                >
              </div>
            </div>
            <div class="data-info-wrap">
              <!-- 基础信息-->
              <div
                class="tab-info"
                v-for="info in activePlatformData.baseInfo"
                :key="info.detailKey"
                :style="{flex:info.hasOwnProperty('name') ? '0.7':'1'}"
              >
                <template v-if="info.hasOwnProperty('label')">
                  <template v-if="info.hasOwnProperty('name')">
                    <div :class="{koltag: (detail[activePlatformData.detailKey].is_partner === 1 || detail[activePlatformData.detailKey].is_certification === 1 || detail[activePlatformData.detailKey].is_original === 1)}">
                      <div :class="[(detail[activePlatformData.detailKey].is_partner === 1 || detail[activePlatformData.detailKey].is_certification === 1 || detail[activePlatformData.detailKey].is_original === 1) ? 'kol-name2' : 'kol-name']">{{detail[activePlatformData.detailKey][info.key] || '--'}}</div>
                      <div
                        class="tagcon"
                        v-if="{koltag: detail[activePlatformData.detailKey].is_partner === 1 || detail[activePlatformData.detailKey].is_certification === 1 || detail[activePlatformData.detailKey].is_original === 1}"
                      >
                        <span
                          class="tag iswarn"
                          v-if="detail[activePlatformData.detailKey].is_partner === 1"
                        >品牌合作人</span>
                        <span
                          class="tag iswarn"
                          v-if="detail[activePlatformData.detailKey].is_certification === 1"
                        >已认证</span>
                        <span
                          class="tag"
                          v-if="detail[activePlatformData.detailKey].is_original === 1"
                        >原创</span>
                      </div>
                    </div>
                  </template>
                  <div
                    class="tab-info-box"
                    v-else-if="info.hasOwnProperty('label')"
                  >
                    <p
                      class="info-value"
                      v-if="info.key !== 'company_id'"
                    >{{detail[activePlatformData.detailKey][info.key] === '' ? '--' : detail[activePlatformData.detailKey][info.key]}}</p>
                    <p
                      class="info-value"
                      v-if="info.key === 'company_id'"
                    >
                      <el-popover
                        placement="top-start"
                        trigger="hover"
                        width="150"
                        visible-arrow="false"
                        popper-class="personal-library-active-platform-popover personal-library-public-popover"
                        :disabled="detail[activePlatformData.detailKey]['company_name'].length <= 10"
                      >
                        <div style="text-align: center; width: 100%;">
                          <span style="text-align: center;">{{detail[activePlatformData.detailKey]['company_name'] || '--'}}</span>
                        </div>
                        <span slot="reference">
                          <template v-if="detail[activePlatformData.detailKey]['company_name'].length > 10">
                            {{detail[activePlatformData.detailKey]['company_name'].substring(0, 10) + '...'}}
                          </template>
                          <template v-else>
                            {{detail[activePlatformData.detailKey]['company_name'] || '--'}}
                          </template>
                        </span>
                      </el-popover>
                    </p>
                    <p class="info-label">
                      {{info.label}}
                      <span
                        v-if="info.key === 'company_id' && !detail[activePlatformData.detailKey]['is_company_exist'] && detail[activePlatformData.detailKey]['company_name'] != ''"
                        style="font-size: 12px; color: red; font-weight: 400;"
                      >(该机构未录入到公司库)</span>
                    </p>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="medium-content">
            <ul class="medium-tab">
              <li
                :class="{'active': activeMediumType == info.mediumName}"
                v-for="info in activePlatformData.mediumTypeInfo"
                @click="mediumHandle(info.mediumName)"
                :key="info.mediumName"
              >{{info.mediumName}}</li>
            </ul>
            <div class="medium-detail">
              <el-row
                class="detail-text clearfix"
                v-if="activeMediumData"
              >
                <!--已经合作-->
                <p
                  class="cooperation-tag"
                  v-if="activePlatformKey == 'kol_tb_info' && detail['kol_tb_info'].is_cooperation === 1"
                >
                  <i class="iconfont iconyihezuo"></i>
                </p>
                <!--分成左右模块-->
                <el-col :span="12">
                  <el-col
                    :span="12"
                    v-for="medium in activeMediumData.info"
                    :key="medium.key"
                  >
                    <span style="color: #888888; font-size: 12px;">{{medium.label}}{{medium.unit}}:</span>
                    <!--有字典-->
                    <span
                      v-if="medium.dictionary"
                      style="color: #333333; font-weight: 400; font-size: 16px;"
                    >{{detail[activePlatformData.detailKey][medium.key] | valueToText(dictionary[medium.dictionary])}}</span>
                    <!--其他-->
                    <span
                      v-else
                      style="color: #333333; font-weight: 400; font-size: 16px;"
                    >{{detail[activePlatformData.detailKey][medium.key] === '' ? '--' : detail[activePlatformData.detailKey][medium.key]}}</span>
                  </el-col>
                </el-col>
                <el-col
                  :span="12"
                  v-if="activeMediumData.otherInfo"
                >
                  <el-col
                    :span="12"
                    v-for="medium in activeMediumData.otherInfo"
                    :key="medium.key"
                  >
                    <div v-if="medium.showCondition && detail[activePlatformData.detailKey][medium.showCondition] || !medium.showCondition">
                      <span style="color: #888888; font-size: 12px;">{{medium.label}}{{medium.unit}}:</span>
                      <!--有字典-->
                      <!-- <span v-if="medium.dictionary" style="color: #333333; font-weight: 400; font-size: 16px;">{{detail[activePlatformData.detailKey][medium.key] | valueToText(dictionary[medium.dictionary])}}</span> -->
                      <!--评分-->
                      <span
                        v-if="medium.key == 'responsivity'"
                        class="el-rate-custmer"
                      >
                        <el-rate
                          v-model="detail[activePlatformData.detailKey][medium.key]"
                          disabled
                        ></el-rate>
                      </span>
                      <!-- 客单价 -->
                      <span
                        v-else-if="medium.key == 'sales_price_period'"
                        style="color: #333333; font-weight: 400; font-size: 16px;"
                      >{{salesPriceOptions[detail[activePlatformData.detailKey][medium.key]].label}}</span>
                      <!-- 【微博】直发是否原创报价 -->
                      <span
                        v-else-if="medium.key == 'is_direct_original'"
                        style="color: #333333; font-weight: 400; font-size: 16px;"
                      >{{renderIsDirectOriginal(detail[activePlatformData.detailKey][medium.key])}}</span>
                      <!--其他-->
                      <span
                        v-else
                        style="color: #333333; font-weight: 400; font-size: 16px;"
                      >{{detail[activePlatformData.detailKey][medium.key] === '' ? '--' : detail[activePlatformData.detailKey][medium.key]}}</span>
                    </div>
                  </el-col>
                </el-col>
              </el-row>
              <el-row style="margin-top: -10px;">
                <!--淘宝直播界面-->
                <tb-live-detail
                  v-if="activePlatformKey == 'kol_tb_info' && activeMediumType == '直播'"
                  :starName="detail['kol_tb_info'].star_name"
                  :starId="detail['kol_tb_info'].star_id"
                ></tb-live-detail>
                <!--其他视频 图文界面-->
                <div
                  v-else
                  class="detail-data"
                >
                  <div class="no-data">
                    <img src="@/assets/img/mjk_nodata_2.png">
                    <p>更多数据敬请期待</p>
                  </div>
                </div>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <add-personal
      ref="editKolDetailDialog"
      @edited="hanleKolEdited"
    ></add-personal>
  </div>
</template>

<script>
import { queryKolList, deleteKol, getCompanyNameAndId } from '@/api/medium'
import addPersonal from './components/addPersonal'
import tbLiveDetail from './components/tbLiveDetail'
import { RIGHT_CODE } from '@/const/roleCode'
// import  { platformData }  from '@/const/kolConst'
import { salesPriceOptions } from '@/const/options'
import * as dictionary from '@/const/kolConst'
import { getToken } from '@/utils/token'

export default {
  name: 'PersonalDetail',
  components: {
    addPersonal,
    tbLiveDetail
  },
  props: ['detailId'],
  data () {
    return {
      isShowAll: false,
      salesPriceOptions,
      dictionary: dictionary,
      RIGHT_CODE,
      loading: true,
      detail: null,
      visible: false,
      activePlatformKey: '',
      activePlatformData: null,
      activeMediumType: '',
      activeMediumData: null,
      platformOrder: ['kol_tb_info', 'kol_yizhibo_info', 'kol_douyin_info', 'kol_bili_info', 'kol_kuaishou_info', 'kol_weibo_info', 'kol_xhs_info', 'kol_wechat_info'],
      // 机构列表
      companyNameAndIdList: []
    }
  },
  mounted () {
    if (this.detailId) {
      this.getPersonalKolDetail()
      this.getCompanyNameAndIdList()
    }
  },
  computed: {
    // 根据 kol_tag 字段，主播，红人，明显
    kolTag () {
      if (this.detail) {
        const kolTag = this.dictionary.kolTagList.find(item => item.value === this.detail.kol_info.kol_tag)
        return kolTag ? kolTag.text : '--'
      } else {
        return '--'
      }
    }
  },
  methods: {
    getToken,
    // 获取kol详情
    getPersonalKolDetail () {
      let vm = this
      this.loading = true
      queryKolList({
        kol_id: this.detailId
      }).then(res => {
        if (res.data.success) {
          if (res.data.data.total !== 0) {
            // 赋值详情
            vm.detail = res.data.data.data[0]
            if (vm.detail.star_info) vm.detail['kol_tb_info'] = vm.detail.star_info //  && this.detail.kol_info.platforms.includes('tb_live')
            // 赋值第一个激活的tab
            for (let key in vm.platformOrder) {
              if (vm.detail[vm.platformOrder[key]] && vm.activePlatformKey === '') {
                // 初始化平台
                vm.handlePlatformTabChange(vm.platformOrder[key])
                break
              }
            }
          } else {
            this.$message({
              type: 'warning',
              message: '没有查询到该KOL的详情',
              duration: 2000,
              showClose: true
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
        }
        this.loading = false
      }).catch(err => {
        console.error(err)
        this.$message({
          type: 'warning',
          message: 'KOL详情获取失败，请稍后重试',
          duration: 2000,
          showClose: true
        })
        this.loading = false
      })
    },
    // 处理地址信息
    renderAddress (detail) {
      if (!detail.kol_info.province && !detail.kol_info.city && !detail.kol_info.county && !detail.kol_info.address) {
        return '--'
      } else {
        return `${detail.kol_info.province}${detail.kol_info.city}${detail.kol_info.county}${detail.kol_info.address}`
      }
    },
    // 平台tab切换
    handlePlatformTabChange (key) {
      let vm = this
      this.activePlatformKey = key
      vm.activePlatformData = dictionary.platformData && dictionary.platformData.filter(val => {
        return val.detailKey === vm.activePlatformKey
      })[0]
      vm.activePlatformData = this.rebindData(vm.activePlatformData)
      // 初始化媒介
      vm.mediumHandle(vm.activePlatformData.mediumTypeInfo[0].mediumName)
    },
    rebindData (activePlatformData) {
      let newData = JSON.parse(JSON.stringify(activePlatformData))
      if (newData.platformKey === 'weibo') {
        let _cindex = newData.baseInfo.findIndex(c => c.key === 'is_partner')
        if (_cindex > -1) {
          newData.baseInfo.splice(_cindex, 1)
          return newData
        }
      }
      if (newData.platformKey === 'xhs') {
        let _cindex = newData.baseInfo.findIndex(c => c.key === 'is_partner')
        if (_cindex > -1) {
          newData.baseInfo.splice(_cindex, 1)
          return newData
        }
      }
      if (newData.platformKey === 'wechat') {
        let _cindex1 = newData.baseInfo.findIndex(c => c.key === 'is_original')
        if (_cindex1 > -1) newData.baseInfo.splice(_cindex1, 1)
        let _cindex2 = newData.baseInfo.findIndex(c => c.key === 'is_certification')
        if (_cindex2 > -1) newData.baseInfo.splice(_cindex2, 1)
        return newData
      }
      return newData
    },
    // 点击修改按钮
    handleEditKolClick () {
      this.$refs.editKolDetailDialog.show(this.detail)
    },
    // 点击删除按钮
    handleDeleteKolClick () {
      if (!this.detail) return false
      this.$confirm('此操作将删除该KOL, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'delete-kol-alert',
        center: true
      }).then(() => {
        deleteKol({
          kol_ids: [this.detail.kol_info.kol_id]
        }).then(res => {
          this.$message({
            type: res.data.success ? 'success' : 'warning',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
          if (res.data.success) {
            this.$router.back()
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: 'KOL删除失败，稍后重试',
            duration: 2000,
            showClose: true
          })
          console.log(error)
        })
      }).catch(() => { })
    },
    // 编辑修改成功之后的事件
    hanleKolEdited () {
      this.getPersonalKolDetail()
    },
    // 标记合作
    handleMarkCooperationClick () {

    },
    /**
     * 媒介切换处理
     * @param type
     */
    mediumHandle (type) {
      let vm = this
      this.activeMediumType = type
      this.activeMediumData = this.activePlatformData.mediumTypeInfo && this.activePlatformData.mediumTypeInfo.filter(val => {
        return val.mediumName === vm.activeMediumType
      })[0]
    },
    /**
     *关闭时要把数据清空
     */
    closeHandle () {
      this.detail = null
      // 触发父组件事件
      this.$emit('closed')
    },
    // kol 案例列表
    caseFileList () {
      if (this.detail && this.detail.kol_info.case) {
        const caseArr = this.detail.kol_info.case.split(',')
        const list = caseArr.map(item => {
          const nameArr = item.split('/')
          return {
            fileName: nameArr[nameArr.length - 1],
            link: item
          }
        })
        return list
      } else {
        return []
      }
    },
    // 获取机构列表
    getCompanyNameAndIdList () {
      getCompanyNameAndId().then(res => {
        if (res.data.success) {
          this.companyNameAndIdList = res.data.data
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message,
            duration: 1500,
            showClose: true
          })
        }
      }).catch(err => {
        console.error(err)
      })
    },
    // 显示【微博】是否直发是否原创报价
    renderIsDirectOriginal (value) {
      if (value === 1) {
        return '是'
      } else if (value === 0) {
        return '否'
      } else {
        return '--'
      }
    }
  },
  watch: {
    'detail.kol_info.cooperation_brand': function (nval, oval) {
      if (nval && nval.length > 8) this.isShowAll = true
      else this.isShowAll = false
    }
  }
}
</script>
