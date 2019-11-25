<!--
 * @Description: file content
 * @Author: 尽夏
 * @Date: 2019-09-29 15:22:06
 * @LastEditTime: 2019-09-30 15:48:52
 * @LastEditors: 白青
 -->
<style lang="scss" scoped>
  #add-personal {
    /deep/ .el-dialog__header {
      background-color: #F8F8F8;
      margin: 0;
      padding: 0;
      height: 50px;
      line-height: 50px;
      background: #f8f8f8;
      text-align: left!important;
      .el-dialog__headerbtn i {
        color: #fff !important;
        top: -25px;
        right: -70px;
        font-size: 40px;
      }
      .kol-header {
        // top: 0;
        // left: 0;
        // width: 100%;
        // z-index: 2;
        height: 50px;
        line-height: 50px;
        background-color: #FBFBFB;
        border: #EFEFEF solid 1px;
        span {
          display: inline-block;
          width: 120px;
          text-align: center;
          border-bottom: transparent solid 1px;
          cursor: pointer;
          &.active {
            background: #fff;
            border-left: #efefef solid 1px;
            border-right: #efefef solid 1px;
            color: #5C82FF!important;;
          }
        }
      }
      span,
      i {
        color: #666 !important;
      }
    }
    /deep/ .el-dialog__body {
      padding: 0;
      .dialog-content {
        max-height: 550px;
        overflow-y: auto;
        .content-header {
          font-size: 14px;
          font-weight: bold;
          color: #666;
          height: 40px;
          // line-height: 44px;
          padding-left: 52px;
          padding-top: 11px;
          border-bottom: #F5F5F5 solid 1px;
          position: relative;
          span {
            font-weight: 500;
            font-size: 12px;
            span {
              color: red;
              font-weight: bold;
            }
          }
          &::before {
            content: '';
            display: block;
            width: 3px;
            height: 10px;
            background-color: #5C82FF;
            position: absolute;
            left: 40px;
            top: 17px;
          }
        }
        .content-body {
          width: 620px;
          margin: 0 auto;
          padding: 20px;
          .content-line {
            // height: 52px;
            line-height: 52px;
            .content-label {
              display: inline-block;
              width: 205px;
              text-align: right;
              vertical-align: top;
              em {
                font-style: normal;
                color: #F26467;
                margin-right: 5px;
              }
            }
            .content-value {
              display: inline-block;
              width: 484px;
              .el-input__inner {
                border-radius: 2px;
              }
              .el-textarea__inner {
                border-radius: 2px;
              }

              // 活跃平台
              .category-name {
                color: #B8BABE;
              }
              .platform-price {
                border: #E1E4EB solid 1px;
                .platform-price-title {
                  line-height: 40px;
                  background: #F6F7F9;
                  padding: 0 11px;
                  .platform-price-title-icon {
                    float: right;
                    line-height: 40px;
                    color: #C3C6D2;
                  }
                }
                .platform-price-content {
                  padding: 11px;
                  padding-bottom: 0;
                  line-height: initial;
                  .slot-suffix {
                    line-height: 32px;
                    color: #C9CDD4;
                  }
                  .el-input__inner {
                    padding: 0;
                    padding-left: 10px;
                  }
                  .el-input {
                    margin-bottom: 10px;
                    // &:nth-last-child(1) {
                    //   margin: 0;
                    // }
                  }
                  // .cooperation-input {
                  //   margin-bottom: 0;
                  // }
                }
              }
              .last-row {
                margin-top: 10px;
              }
            }

          }
          //擅长平台box、
          .el-tabs--border-card{
            box-shadow: none;
            .el-tabs__item{
              padding: 0 10px;
              &.is-active{
                color: #666;
              }
            }
            .info-header{
              font-weight: bold;
              color: #333;
              height: 44px;
              line-height: 44px;
              border-bottom: #F5F5F5 solid 1px;
              margin: 0 -20px 20px;
              padding-left: 30px;
            }
          }
        }
      }
      .el-select {
        width: 195px;
      }
    }
    /deep/ .el-dialog__footer {
      .footer {
        .el-button {
          min-width: 80px;
          height: 34px;
          padding: 8px 20px;
          &.save-btn {
            background-color: #5C82FF;
            color: #fff;
            border-color: #5C82FF;
          }
        }
      }
    }
    .border-dashed{
      border: 1px dashed #E1E4EB;
      text-align: center;
      cursor: pointer;
      line-height: 40px;
      i{
        color: #C3C3C3;
        margin-right: 10px;
      }
    }
    /deep/ .el-form-item{
      margin-bottom: 8px;
      .el-input-group__append{
        padding: 0 6px;
        width: 50px;
        text-align: center;
        color: #666666;
      }
    }
    //已合作品牌
    .content-value-box{
      &:first-child{
        border-top: 1px solid #EBEBEB;
      }

      height: 32px;
      padding: 10px;
      border: 1px solid #EBEBEB;
      border-top: none;
      .content-value{
        width: 100%;
        display: block;
        .icon-right{
          float: right;
          width: 70px;
          border-left: 1px solid #EBEBEB;
          margin: -10px;
          text-align: center;
          line-height: 50px;
          height: 52px;
          i{
            margin: 10px;
          }
        }
        .el-icon-check{
          color: #09AE6A;
          font-size: 25px;
          cursor: pointer;
        }
      }
      .el-input{
        line-height: 32px;
        display: block;
        width: calc(100% - 71px);

      }
    }
    // 擅长类目
    .sale-chance-wrap {
      background-color: #F8F8F8;
      padding: 5px 12px;
      line-height: 26px;
      margin: 10px 0;
      .chance-checkbox {
        margin: 0 5px 0 0;
        min-width: 110px;
      }
    }
    //附件案例
    .fujian-list{
      display: inline-block;
      float: left;
      margin-right: 20px;
      line-height: 35px;
      i{
        color:#999;
      }
    }
    .height40{
      height: 40px;
    }
    .line-height25{
      line-height: 25px;
      width: calc(100% - 70px);
      float: right;
      margin-top: 0;
    }
    .grey-color{
      color: #CDCECF;
    }
    /deep/ .has-img{
      .el-upload--picture-card{
        width: 50%;
        border: none;
        background: none;
      }

    }
    /deep/ .el-upload--picture-card{
      width: 58px;
      height: 58px;
      line-height: 58px;
      margin-right: 10px;
      position: relative;
      img{
        width: 100%;
      }
      .el-icon-error{
        position: absolute;
        top: -6px;
        right: -6px;
        font-size: 14px;
      }
    }
  }
</style>

<template>
  <div id="add-personal">
    <el-dialog
      :visible="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="840px"
      @close="resetForm"
    >
      <div :class="['kol-header', {'edited': type === 'edit'}]" slot="title">
        <span v-if="type !== 'edit'" :class="{'active': type === 'add'}" @click="handleDialogType('add')">新增KOL</span>
        <span v-if="type === 'edit'" :class="{'active': type === 'edit'}">编辑KOL</span>
        <span v-if="type !== 'edit'" :class="{'active': type === 'import'}" @click="handleDialogType('import')">批量导入</span>
      </div>
      <el-form v-show="type !== 'import'" ref="kolForm" :rules="rules" :model="kolform" label-width="120px">
        <div class="dialog-content" >
          <div class="content-header">主播基础信息</div>
          <div class="content-body">
            <el-form-item label="KOL名称：" prop="kol_name">
              <el-input v-model="kolform.kol_name" size="small" placeholder="请输入KOL名称"></el-input>
            </el-form-item>
            <el-form-item label="KOL标签：" prop="kol_tag">
              <el-radio v-model="kolform.kol_tag" v-for="tag in kolTagList" :label="tag.value" :key="tag.value">{{tag.text}}</el-radio>
            </el-form-item>
            <el-form-item label="擅长领域：" prop="areas">
              <div class="sale-chance-wrap">
                <p><el-checkbox :indeterminate="categorySelection.isIndeterminate" v-model="categorySelection.checkAll" @change="handleCheckAllChange">全选</el-checkbox></p>
                <el-checkbox-group v-model="kolform.areas" @change="handleCheckedCategoryChange">
                  <el-checkbox class="chance-checkbox" v-for="(area, index) in areas" :label="area.value" :key="index">{{area.label}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="已合作品牌：" prop="cooperation_brand">
              <div class="content-value-box" v-for="(brand,brandIndex) in kolform.cooperation_brand" :key="brandIndex">
                <div class="content-value">
                  <div class="icon-right"><i class="gm-icon gm-icon-delete" @click="deleteBrand(brandIndex)"></i></div>
                  <el-input v-model="brand.inputValue" size="small" placeholder="请输入品牌名称"></el-input>
                </div>
              </div>
              <div class="border-dashed" @click="addBrand()" :style="{'margin-top':kolform.cooperation_brand.length ? '10px' : '0'}" ><i class="el-icon-circle-plus" ></i>点击添加</div>
            </el-form-item>
            <el-form-item label="是否可以专票：" prop="special_ticket">
              <el-radio-group v-model="kolform.special_ticket">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="KOL案例：" >
              <div >
                <el-upload class="kol-upload" ref="kolCaseUpload" action="" :http-request="uploadFile" :show-file-list="false" :accept="descriptionAccepts.join(',')">
                  <el-button class="mr10" slot="trigger" size="small" type="primary" v-loading="loading">上传文件</el-button>
                  <span slot="tip" class="el-upload__tip">支持扩展名：.docx .pdf .jpg .xlsx</span>
                </el-upload>
              </div>
              <div class="fujian-list clearfix" v-for="item in kolform.case" :key="item">
                <i class="iconfont iconfujian mr5"></i>
                <span class="brand-color mr5">{{item.split('/')[item.split('/').length -1] || '--'}}</span>
                <i class="el-icon-error" @click="removeCase()"></i>
              </div>
            </el-form-item>
          </div>
          <div class="content-header">联系方式</div>
          <div class="content-body">
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人：" prop="contacts">
                  <el-input v-model="kolform.contacts" size="small" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人电话：" prop="contact_phone">
                  <el-input v-model="kolform.contact_phone" size="small" placeholder="请输入联系人电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="微信号：" prop="contact_wechat">
                  <el-input v-model="kolform.contact_wechat" size="small" placeholder="请输入微信"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="content-header">kol收款银行卡信息</div>
          <div class="content-body">
            <el-row>
              <el-col :span="12">
                <el-form-item label="银行卡号：" prop="bank_info.bank_card_num">
                  <el-input v-model="kolform.bank_info.bank_card_num" size="small" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号：" prop="bank_info.id_number">
                  <el-input v-model="kolform.bank_info.id_number" size="small" placeholder="请输入身份证号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开户行：" prop="bank_info.bank_name">
                  <el-input v-model="kolform.bank_info.bank_name" size="small" placeholder="请输入开户行"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="真实姓名：" prop="bank_info.real_name">
                  <el-input v-model="kolform.bank_info.real_name" size="small" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号：" prop="bank_info.phone">
                  <el-input v-model="kolform.bank_info.phone" size="small" placeholder="请输入手机号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证照片：" prop="bank_info.id_card_pic">
                  <el-upload  list-type="picture-card"  action="" :class="{'has-img':kolform.bank_info.id_card_pic}"  :http-request="uploadImage" :data="{key:'id_card_pic'}" :show-file-list="false" :accept="imageAccepts.join(',')">
                    <span v-if="kolform.bank_info.id_card_pic">
                      <img :src="kolform.bank_info.id_card_pic + '?Authorization=' + getToken()" alt="" v-if="kolform.bank_info.id_card_pic">
                      <i class="el-icon-error" @click="removePic('id_card_pic')"></i>
                    </span>
                    <i v-else class="iconfont iconshangchuantupian grey-color"></i>
                    <span slot="tip" class="el-upload__tip line-height25 grey-color" v-if="!kolform.bank_info.id_card_pic">图片大小：不高于2M <br>支持扩展名：.jpg .jpeg</span>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="银行卡照片：" prop="bank_info.bank_card_pic" >
                  <el-upload  list-type="picture-card" action="" :class="{'has-img':kolform.bank_info.bank_card_pic}" :http-request="uploadImage" :data="{key:'bank_card_pic'}" :show-file-list="false" :accept="imageAccepts.join(',')">
                    <span v-if="kolform.bank_info.bank_card_pic">
                      <img :src="kolform.bank_info.bank_card_pic + '?Authorization=' + getToken()">
                      <i class="el-icon-error" @click="removePic('bank_card_pic')"></i>
                    </span>
                    <i v-else class="iconfont iconshangchuantupian grey-color"></i>
                    <span slot="tip" class="el-upload__tip line-height25 grey-color" v-if="!kolform.bank_info.bank_card_pic" >图片大小：不高于2M<br> 支持扩展名：.jpg .jpeg</span>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="content-header">
            kol擅长平台
            <br/>
            <span>提示：保存平台所填数据前，请先确认是否已【<span>勾选该平台</span>】，否则将不会保留该平台数据。</span>
          </div>
          <div class="content-body" style="width: 700px;">
            <el-tabs type="border-card" v-model="platActive">
              <el-tab-pane v-for="(plat) in platformData" :key="plat.platformKey">
                <span slot="label">
                  <el-checkbox :disabled="plat.platformKey === 'tb' && type === 'edit' && platformTBIsSelect" class="mr10" v-model="plat.platSelected" @change="selectePlatHandle(plat.platformKey,plat.platSelected)"></el-checkbox>{{plat.platformName}}
                </span>
              </el-tab-pane>

              <el-row class="info-header ">基础信息</el-row>
              <el-row v-if="platformData && platActive">
                <el-col :span="12" class="height40" v-for="info in (platB = platformData[platActive]).baseInfo" :key="info.key">
                  <!--输入框的-->
                  <el-form-item :label="info.label+':'" label-width="140px"  v-if="info.label && !info.type" :prop="'platforms['+platB.platformKey+']['+info.key+']'">
                    <el-input v-model="kolform.platforms[platB.platformKey][info.key]" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                  <!--单选的-->
                  <el-form-item :label="info.showLabel+':'" label-width="140px" v-if="info.showLabel" :prop="'platforms['+platB.platformKey+']['+info.key+']'">
                    <el-radio v-model="kolform.platforms[platB.platformKey][info.key]" :label="1">是</el-radio>
                    <el-radio v-model="kolform.platforms[platB.platformKey][info.key]" :label="0">否</el-radio>
                  </el-form-item>
                  <!-- 下拉选择 -->
                  <el-form-item :label="info.label + ':'" label-width="140px" v-if="info.type === 'select'" :prop="'platforms['+platB.platformKey+']['+info.key+']'">
                    <el-select v-model="kolform.platforms[platB.platformKey][info.key]" size="small" placeholder="请选择所属机构">
                      <el-option v-for="(company, index) in companyNameAndIdOption" :key="index" :label="company.company_name" :value="company.company_id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--平台媒体信息-->
              <div v-if="platformData && platActive ">
                <el-row v-for="media in (platM = platformData[platActive]).mediumTypeInfo" :key="media.mediumName">
                  <el-row class="info-header">{{media.mediumName}}</el-row>
                  <!--普通输入框-->
                  <el-col :span="12" v-for="info in media.info" :key="info.key">
                    <el-form-item :label="info.label+':'" label-width="140px" :prop="'platforms['+platM.platformKey+']['+info.key+']'">
                      <el-input v-model="kolform.platforms[platM.platformKey][info.key]" size="small" placeholder="请输入" >
                        <template slot="append" v-if="info.unit">{{info.unit.replace('(', '').replace(')', '')}}</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <!----------------------------其他做特殊处理的------------------------------------->
                  <!--淘宝 直播平台-->
                  <el-col :span="24" v-if="platActive == 0 && media.mediumName == '直播'  ">
                    <el-col :span="12">
                      <el-form-item label="平均观看（pv）" label-width="140px" prop="platforms.tb.pv_average">
                        <el-input v-model="kolform.platforms.tb.pv_average" size="small" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <!--是否已合作-->
                    <el-col :span="24">
                      <el-form-item label="标记已合作" label-width="140px" prop="platforms.tb.is_cooperation">
                        <el-switch v-model="kolform.platforms.tb.is_cooperation"  active-color="#5C82FF" :active-value="yesorno[1]" :inactive-value="yesorno[0]">已合作</el-switch>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="kolform.platforms.tb.is_cooperation == 1">
                      <el-form-item label="客单价" label-width="140px" prop="platforms.tb.sales_price_period">
                        <el-select v-model="kolform.platforms.tb.sales_price_period" size="small">
                          <el-option v-for="option in salesPriceOptions" :key="option.label" :label="option.label" :value="option.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="kolform.platforms.tb.is_cooperation == 1">
                      <el-form-item label="淘客ID" label-width="140px" prop="platforms.tb.wangwang_name">
                        <el-input v-model="kolform.platforms.tb.wangwang_name" size="small" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <!--评分-->
                    <el-col :span="12">
                      <el-form-item label="配合度" label-width="140px" v-if="kolform.platforms.tb.is_cooperation == 1" prop="platforms.tb.responsivity">
                        <el-rate v-model="kolform.platforms.tb.responsivity" style="line-height: 52px;"></el-rate>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <!--微博 图文平台-->
                  <el-col :span="24" v-if="platActive == 4 && media.mediumName == '图文'  ">
                    <el-col :span="12">
                      <el-form-item label="直发是否原创报价" label-width="140px" prop="platforms.weibo.is_direct_original">
                        <el-radio v-model="kolform.platforms.weibo.is_direct_original" :label="1">是</el-radio>
                        <el-radio v-model="kolform.platforms.weibo.is_direct_original" :label="0">否</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </el-tabs>
          </div>
        </div>
      </el-form>
      <star-import-file v-show="type === 'import'" uploadText="KOL" uploadKey="kol" downloadSrc="/template/kol_upload_template.xlsx"/>
      <div v-show="type !== 'import'" class="footer" slot="footer">
        <el-button size="medium" @click="resetForm">取消</el-button>
        <el-button class="save-btn" size="medium" @click="handleSubmitSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { saveKol, uploadCase, uploadKolImage, getCompanyNameAndId } from '@/api/medium' // updateKol
import { salesPriceOptions, categoryOptions } from '@/const/options'
import { kolTagList, platformData } from '@/const/kolConst'
import { getToken } from '@/utils/token'

const platformQuote = {
  // 淘宝直播
  tb: {
    star_id: '',
    star_name: '',
    fans_number: '',
    star_special_cost: undefined,
    star_mix_cost: undefined,
    star_special_price: undefined,
    star_mix_price: undefined,
    video_price: undefined,
    video_publish_price: undefined,
    photo_price: undefined,
    photo_publish_price: undefined,
    pv_average: undefined,
    detail_visible: false,
    is_cooperation: 0,
    responsivity: undefined,
    sales_price_period: 0,
    wangwang_name: undefined
  },
  // // 淘宝短视频
  // tb_video: {
  //   taobao_id: '',
  //   taobao_name: '',
  //   fans_number: '',
  //   taobao_video_price: undefined,
  //   detail_visible: false
  // },
  // // 淘宝图文
  // tb_photo: {
  //   taobao_id: '',
  //   taobao_name: '',
  //   fans_number: '',
  //   taobao_photo_price: undefined,
  //   detail_visible: false
  // },
  // 抖音
  douyin: {
    douyin_id: '',
    douyin_name: '',
    fans_number: '',
    // video_price: undefined,
    live_special_price: undefined,
    live_mix_price: undefined,
    live_special_publish_price: undefined,
    live_mix_publish_price: undefined,
    video_1_20_price: undefined,
    video_21_60_price: undefined,
    video_1_20_publish_price: undefined,
    video_21_60_publish_price: undefined,
    detail_visible: false
  },
  // 快手
  kuaishou: {
    kuaishou_id: '',
    kuaishou_name: '',
    fans_number: '',
    video_price: undefined,
    video_publish_price: undefined,
    live_special_price: undefined,
    live_special_publish_price: undefined,
    live_mix_price: undefined,
    live_mix_publish_price: undefined,
    detail_visible: false
  },
  // 微博
  weibo: {
    weibo_id: '',
    weibo_name: '',
    fans_number: '',
    trans_price: undefined,
    trans_publish_price: undefined,
    direct_price: undefined,
    direct_publish_price: undefined,
    detail_visible: false
  },
  // 微信公众号
  wechat: {
    wechat_id: '',
    wechat_name: '',
    fans_number: '',
    // photo_price: undefined,
    photo_headline_price: undefined,
    photo_second_price: undefined,
    photo_headline_publish_price: undefined,
    photo_second_publish_price: undefined,
    detail_visible: false
  },
  // 哔哩哔哩
  bili: {
    bili_id: '',
    bili_name: '',
    fans_number: '',
    video_price: undefined,
    video_publish_price: undefined,
    detail_visible: false
  },
  // 小红书
  xhs: {
    xhs_id: '',
    xhs_name: '',
    fans_number: '',
    photo_price: undefined,
    photo_publish_price: undefined,
    video_price: undefined,
    video_publish_price: undefined,
    detail_visible: false
  },
  // 一直播
  yizhibo: {
    yizhibo_id: '',
    yizhibo_name: '',
    fans_number: '',
    price: undefined,
    live_publish_price: undefined,
    detail_visible: false
  }
}

// 定义kol表单类
class Kolform {
  constructor() {
    this.kol_name = ''
    this.kol_tag = undefined
    this.areas = [] // 擅长类目
    this.special_ticket = ''
    this.case = [] // kol案例
    this.contacts = ''
    this.contact_phone = ''
    this.contact_wechat = ''
    this.cooperation_brand = [] // 合作品牌
    this.bank_info = { // 银行卡信息
      bank_card_num: '',
      bank_name: '',
      real_name: '',
      id_number: '',
      phone: '',
      bank_card_pic: '',
      id_card_pic: ''
    }
    this.platforms = {} // 平台信息
    // 给每个平台添加字段
    this.addField = function() {
      let platforms = {}
      platformData.forEach(function (plat) {
        platforms[plat.platformKey] = {}
        // 基础信息部分添加字段
        plat.baseInfo.forEach(info => {
          platforms[plat.platformKey][info.key] = ''
        })
        // 媒体信息添加字段
        plat.mediumTypeInfo.forEach(function (medium) {
          medium.info.forEach(function (info) {
            platforms[plat.platformKey][info.key] = ''
          })
          if (medium.hasOwnProperty('otherInfo')) {
            medium.otherInfo.forEach(function (info) {
              platforms[plat.platformKey][info.key] = ''
            })
          }
        })
      })
      this.platforms = platforms
    }
    this.addField()
  }
}

export default {
  name: 'AddPersonal',
  data () {
    return {
      yesorno: [0, 1],
      salesPriceOptions,
      kolTagList, // kol标签
      platformData: JSON.parse(JSON.stringify(platformData)),
      type: 'add',
      visible: false,
      areas: categoryOptions,
      categorySelection: {
        checkAll: false,
        isIndeterminate: false
      },
      platformQuote,
      areasForm: [],
      // 提交后端的数据
      kolform: new Kolform(),
      // 允许修改淘宝直播
      tbliveCantBeModify: false,
      loading: false,
      platSelected: '',
      platActive: '',
      descriptionAccepts: ['docx', 'pdf', 'jpg', 'xlsx'],
      imageAccepts: ['jpg', 'jpeg'],
      // 机构下拉选项
      companyNameAndIdOption: [],
      platformTBIsSelect: false, // 淘宝平台是否选中
      rules: {
        kol_name: [
          { required: true, message: '请输入kol名称', trigger: 'blur' }
        ],
        kol_tag: [
          { required: true, message: '请选择kol标签', trigger: 'blur' }
        ],
        'platforms[tb][star_id]': [
          { required: true, message: '请输入淘宝ID', trigger: 'blur' }
        ],
        'platforms[tb][star_name]': [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    getToken,
    // 切换弹窗面板
    handleDialogType (type) {
      this.type = type
    },
    // 显示新增弹窗，供父组件调用，勿删
    show (kolInfo) {
      let vm = this
      // 传入详情，修改
      // debugger
      // 获取所属机构的选项
      this.getCompanyNameOptions()

      if (kolInfo) {
        this.type = 'edit'
        // 赋值基本信息
        let kolform = JSON.parse(JSON.stringify(kolInfo.kol_info))

        kolform.special_ticket += ''
        // 赋值擅长领域
        if (kolform.areas === '') {
          kolform.areas = []
        } else {
          const areasNameArr = kolform.areas.split('、')
          // 保存的是['个护']文字数组，展现需要服务领域的id数组
          kolform.areas = areasNameArr.map(item => {
            if (this.areas.find(v => v.label === item)) {
              return this.areas.find(v => v.label === item).value
            }
          })
          this.categorySelection.checkAll = areasNameArr.length === this.areas.length
          this.categorySelection.isIndeterminate = areasNameArr.length > 0 && areasNameArr.length < this.areas.length
        }
        // 赋值KOL案例
        if (kolform.case === '') {
          kolform.case = []
        } else {
          kolform.case = kolform.case.split(',')
        }
        // 处理品牌
        kolform.cooperation_brand = kolform.cooperation_brand.map(item => {
          return { inputValue: item }
        })

        // 赋值活跃平台
        vm.platformData.forEach((val, index) => {
          if (kolform.platforms.indexOf(val.platformKey) > -1) {
            if (val.platformKey === 'tb') {
              this.platformTBIsSelect = true
            }
            val.platSelected = true
            // 设置擅长平台中的第一个为激活状态
            if (vm.platActive === '') {
              vm.platActive = index.toString()
            }
          } else {
            val.platSelected = false
          }
        })
        var platforms = JSON.parse(JSON.stringify(this.kolform)).platforms
        //
        kolform.platforms.split('、').forEach(function (val) {
          if (val === 'tb') {
            platforms.tb = kolInfo['star_info']
          } else {
            platforms[val] = kolInfo['kol_' + val + '_info']
          }
        })
        kolform.platforms = platforms
        vm.$set(this, 'kolform', kolform)
        // // 判断一个特殊情况，当存在star_info的时候，添加淘宝直播的时候，需要传入id
        /* if (kolInfo[`star_info`] && kolInfo.kol_info.platforms.includes('tb_live')) {
          this.tbliveCantBeModify = true
        } */
      } else {
        this.type = 'add'
        if (this.type !== 'edit') {
          document.getElementsByClassName('el-dialog__headerbtn')[0].querySelector('i').style.position = 'absolute'
        }
      }
      this.visible = true
    },
    // 擅长类目全选
    handleCheckAllChange (val) {
      // debugger
      this.kolform.areas = val ? this.areas.map(item => item.value) : []
      this.categorySelection.isIndeterminate = false
    },
    // 单选擅长类目
    handleCheckedCategoryChange (value) {
      let checkedCount = value.length
      this.categorySelection.checkAll = checkedCount === this.areas.length
      this.categorySelection.isIndeterminate = checkedCount > 0 && checkedCount < this.areas.length
    },
    // 提交保存
    handleSubmitSave () {
      // 先验证一下必填项
      this.$refs['kolForm'].validateField('kol_name', (reskolname) => {
        this.$refs['kolForm'].validateField('kol_tag', (reskoltag) => {
          if (!reskolname && !reskoltag) {
            // 保存字段过滤 start
            // this.saveFilter()
            const form = JSON.parse(JSON.stringify(this.kolform))

            // 处理选中的平台数据
            for (let plat in form.platforms) {
              let selectPlatList = this.platformData.filter((dataPlat) => {
                return dataPlat.platSelected
              }).map(val => {
                return val.platformKey
              })
              if (selectPlatList.indexOf(plat) === -1) {
                this.$delete(form.platforms, plat)
              }
            }
            // 处理擅长类目
            form.areas = form.areas.join(',')
            form.cooperation_brand = form.cooperation_brand.map(item => item.inputValue)
            // 处理案例
            form.case = form.case.join(',')
            // 保存字段过滤 end

            // saveKol(this.kolform).then(res => {
            saveKol(form).then(res => {
              this.$message({
                type: res.data.success ? 'success' : 'warning',
                message: res.data.message,
                duration: 2000,
                showClose: true
              })
              if (res.data.success) {
                this.resetForm()
                // 触发父组件事件
                if (this.type === 'add') {
                  this.$emit('added')
                } else {
                  this.$emit('edited')
                }
              }
            }).catch(err => {
              console.log(err)
              this.$message({
                type: 'warning',
                message: 'KOL保存失败',
                duration: 2000,
                showClose: true
              })
            })
          } else {
            document.getElementsByClassName('dialog-content')[0].scrollTop = 0
            return false
          }
        })
      })
    },
    // 重置表单
    resetForm () {
      this.categorySelection.checkAll = false
      this.categorySelection.isIndeterminate = false
      this.platformData = JSON.parse(JSON.stringify(platformData))
      this.$refs['kolForm'].resetFields()
      this.kolform = new Kolform()
      this.platActive = '0'
      this.visible = false
      this.$emit('cancel')
    },

    /**
     *平台勾选
     */
    selectePlatHandle(key, isChecked) {
      // console.log(key, isChecked, this.platActive)
      // debugger
    },
    /**
     * 添加合作品牌
     */
    addBrand() {
      this.kolform.cooperation_brand.push({inputValue: ''})
    },
    /**
     * 删除合作品牌
     * @param index
     */
    deleteBrand(index) {
      this.kolform.cooperation_brand.splice(index, 1)
    },
    /**
     * 删除案例
     * @param index
     */
    removeCase(index) {
      this.kolform.case.splice(index, 1)
    },
    /**
     * 上传文件成功时回调
     */
    uploadFile(params) {
      let vm = this
      let file = params.file
      let fileType = file.name.split('.')[file.name.split('.').length - 1]
      var found = this.descriptionAccepts.find(type => {
        return type.toLowerCase() === fileType.toLowerCase()
      })
      if (!found) {
        this.$message.error('上传格式不正确！')
        return
      }

      this.loading = true
      let form = new FormData()
      form.append('file', file)
      uploadCase(form).then(data => {
        vm.loading = false
        if (data.data) {
          vm.kolform.case.push(data.data.data.source)
        }
      }).catch(() => {
        vm.loading = false
      })
    },
    /**
     * 上传银行卡照片
     */
    uploadImage(params) {
      let vm = this
      let file = params.file
      let type = params.data.key
      let fileType = file.name.split('.')[1]
      var found = this.imageAccepts.find(type => {
        return type.toLowerCase() === fileType.toLowerCase()
      })
      if (!found) {
        this.$message.error('上传文件格式不正确！')
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error('上传文件大小不能超过 2MB!')
        return
      }
      this.loading = true
      let form = new FormData()
      form.append('file', file)
      uploadKolImage(form).then(data => {
        vm.loading = false
        if (data.data) {
          vm.kolform.bank_info[type] = data.data.data.source
        }
      }).catch(() => {
        vm.loading = false
      })
    },
    /**
     * 删除银行卡等照片
     * @param type
     */
    removePic(type) {
      this.kolform.bank_info[type] = ''
    },
    /**
     * 获取所属机构的下拉选项
     */
    getCompanyNameOptions () {
      getCompanyNameAndId().then(res => {
        if (res.data.success) {
          this.companyNameAndIdOption = res.data.data
          this.companyNameAndIdOption.unshift({company_id: 0, company_name: "请选择机构"})
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
    }
  },
  watch: {
    'kolform.platforms.tb.is_cooperation': function (nval, oval) {
      if (nval === 1) {
        if (!this.kolform.platforms.tb.sales_price_period) {
          this.kolform.platforms.tb.sales_price_period = 0
        }
      }
    }
  }
}
</script>
