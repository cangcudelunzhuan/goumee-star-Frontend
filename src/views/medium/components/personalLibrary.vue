<!--
 * @Description: KOL 个人库
 * @Author: 白青
 * @Date: 2019-08-29 11:23:15
 * @LastEditTime: 2019-09-10 15:36:35
 * @LastEditors: 白青
 -->
<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  #personal-library {
    .medium-operator {
      background-color: #fff;
      .medium-choose {
        .choose-block {
          min-height: 60px;
          box-sizing: border-box;
          font-size: 0;
          border-bottom: 1px dashed #eff0f1;
          padding: 15px 12px;
          display: flex;
          .name {
            font-size: 14px;
            color: #999;
            line-height: 24px;
            display: inline-block;
            width: 80px;
          }
          .category-list {
            display: inline-block;
            flex: 1;
            .category-item {
              display: inline-block;
              // padding: 0 17px;
              font-size: 14px;
              color: #666;
              line-height: 30px;
              padding: 0 10px;
              margin: 0 10px;
              border-bottom: #fff solid 2px;
              cursor: pointer;
              &:hover {
                color: $color-primary;
              }
              &.current {
                color: #fff!important;
                background: $color-primary;
                border-radius: 15px;
              }
            }
          }
        }
      }
      .medium-search-bar {
        padding: 14px 12px 0;
        .medium-label {
          color: #999;
          font-size: 14px;
        }
        .range-input {
          width: 100px;
        }
      }
    }
    // 搜索结果
    .result-list {
      padding: 12px;
      background: #fff;
      margin-top: 12px;
      .opreate-btns {
        margin-bottom: 12px;
        .el-button {
          min-width: 80px;
          &.sub-btn{
            background: $color-primary;
            border-color: $color-primary;
            color: #fff;
          }
          &.del-btn{}
        }
      }
      .contract-pagination {
        padding: 0;
        margin-top: 12px;
        /deep/ .el-input.el-input--mini.el-input--suffix {
          margin: 0;
        }
      }
      // kol信息
      .star-info {
        display: flex;
        flex-direction: row;
        .avatar {
          width:60px;
          height:60px;
          border-radius:50%;
          margin-right: 10px;
        }
        .default {
          object-fit: none;
          border: 1px solid rgba(233, 228, 228, 0.979)
        }
        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .title {
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(68,68,68,1);
            margin-bottom: 6px;
          }
          .tags {
            display: flex;
            flex-direction: row;
            .tag {
              background:rgba(255,255,255,1);
              border:1px solid rgba(233, 228, 228, 0.979);
              border-radius:2px;
              margin-right: 3px;
              font-size:11px;
              font-family:Microsoft YaHei;
              font-weight:500;
              color:rgba(163,166,169,1);
              padding: 0px 6px;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 14px;
                height: 14px;
                margin-right: 3px;
              }
            }
          }
        }
      }
      .is-cooperation {
        height: 14px;
        span {
          background: #FFB423;
          color: #fff;
          font-size: 12px;
          position: absolute;
          height: 14px;
          line-height: 14px;
          padding: 1px 2px;
          border-radius: 2px;
        }
      }
      // 擅长领域
      .good-at {
        display: block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      // 擅长平台
      .active-platform {
        .first-active-platform {
          vertical-align: middle;
        }
        .cooperation-platform {
          color: #fff;
          background: #FFB423;
          font-size: 10px;
          border-radius: 2px;
          padding: 1px 2px;
        }
        .el-icon-arrow-down {
          color: #ABAFC3;
        }
      }
      // 粉丝数
      .fans-count-wrap {
        .el-icon-arrow-down {
          color: #ABAFC3;
        }
      }
      .fans-count-wrap .first-fans-count-platform {
        font-size: 12px;
        color: #999;
      }
      // 报价单
      .quotation-wrap {
        .el-icon-arrow-down {
          color: #ABAFC3;
        }
      }
      .quotation-wrap .first-quotation-platform {
        font-size: 12px;
        color: #999;
      }
      // 联系人
      .connect-wrap {
        .first-connect-persen {
          color: #999;
          font-size: 12px;
        }
        .el-icon-arrow-down {
          color: #ABAFC3;
        }
      }
      .empty-placeholder {
        padding: 150px 0;
      }
    }
    .area_funs {
      display: flex;
      flex-direction: column;
      .detail_info {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5px;
        font-size: 14px;
        img {
          width: 18px;
          height: 18px;
          margin-right: 5px;
        }
      }
    }
    .klprice {
      color: #666;
      font-size: 14px;
      .num {
        color: #5C82FF
      }
    }
  }
</style>
<style>
  /* 擅长领域 */
  .personal-library-good-at-popover {
    max-width: 300px;
    min-width: 300px;
    text-align: left;
  }
  .personal-library-good-at-popover .good-at-category span {
    display: inline-block;
    background: #F2F2F2;
    margin: 3px;
    padding: 4px 6px;
  }
  /* 公用弹窗样式 */
  .personal-library-public-popover{
    min-width: initial;
    width: 360px;
    padding: 10px 0;
  }
  .personal-library-public-popover-content {
    width: 360px;
    overflow: hidden;
  }
  .personal-library-public-popover-content-item {
    display: block;
    float: left;
    line-height: 27px;
    min-width: 135px;
    overflow: hidden;
    padding: 0 12px;
  }
  .personal-library-public-popover-content-item:nth-child(odd) {
    border-right: #EBEBEB dashed 1px;
  }
  .personal-library-public-popover-content-line {
    padding: 0 12px;
    line-height: 27px;
  }
  .personal-library-public-popover-content-line .line-param {
    color: #999;
  }
  /* 擅长平台 */
  .personal-library-active-platform-popover .cooperation-platform {
    color: #fff;
    background: #FFB423;
    font-size: 10px;
    border-radius: 2px;
    padding: 1px 2px;
    margin-left: 6px;
  }
  /* 粉丝数 */
  .personal-library-fans-count-popover .fans-count-item {
    display: block;
    float: left;
    line-height: 27px;
    width: 155px;
    overflow: hidden;
    padding: 0 12px;
    color: #999;
    font-size: 12px;
  }
  .personal-library-fans-count-popover .fans-count-item .fans-count {
    color: #666;
    font-size: 14px;
  }
  /* 报价单 */
  .personal-library-quotation-popover .quotation-item {
    display: block;
    float: left;
    line-height: 27px;
    width: 155px;
    overflow: hidden;
    padding: 0 12px;
    color: #999;
    font-size: 12px;
  }
  .personal-library-quotation-popover .quotation-item .quotation {
    color: #666;
    font-size: 14px;
  }
</style>
<style>
.delete-kol-alert.el-message-box .el-message-box__content{
  height: initial;
}
.delete-kol-alert.el-message-box .el-message-box__content .el-message-box__message {
  top: 0;
}
</style>

<template>
  <div id="personal-library">
    <el-row class="medium-operator">
      <el-row class="medium-choose">
        <div class="choose-block">
          <div class="name">擅长平台:</div>
          <div class="category-list">
            <div
              class="category-item"
              :class="{current:searchForm.platform === item.key}"
              v-for="item in cooperationPlatformList"
              :key="item.type"
              @click="selectTypeHandle('platform', item.key)">{{item.value}}</div>
          </div>
        </div>
        <div class="choose-block">
          <div class="name">媒介类型:</div>
          <div class="category-list">
            <div
              class="category-item"
              :class="{current:searchForm.platform_type === item.key}"
              v-for="item in mediaTypeList"
              :key="item.type"
              @click="selectTypeHandle('platform_type', item.key)">{{item.value}}</div>
          </div>
        </div>
        <div class="choose-block">
          <div class="name">擅长领域:</div>
          <div class="category-list">
            <div
              class="category-item"
              :class="{current:searchForm.area === item.key}"
              v-for="item in areaTypeList"
              :key="item.key"
              @click="selectTypeHandle('area', item.key)">{{item.value}}</div>
          </div>
        </div>
        <div class="choose-block">
          <div class="name">KOL标签:</div>
          <div class="category-list">
            <div
              class="category-item"
              :class="{current:searchForm.kol_tag === item.key}"
              v-for="item in kolTagList"
              :key="item.key"
              @click="selectTypeHandle('kol_tag', item.key)">{{item.value}}</div>
          </div>
        </div>
      </el-row>
      <el-form class="medium-search-bar" :inline="true" size="small" style="border-bottom: 1px dashed #eff0f1;">
        <el-form-item class="medium-cls">
          <span slot="label" class="medium-label">是否专票:</span>
          <el-select v-model="searchForm.special_ticket" placeholder="请选择" style="width: 100px;">
            <el-option v-for="item in ticketList" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="medium-cls">
          <span slot="label" class="medium-label" style="margin-left:10px;">是否合作:</span>
          <el-select v-model="searchForm.is_coop" placeholder="请选择" style="width: 100px;">
            <el-option v-for="item in conbinList" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="searchForm.platform != ''" class="medium-cls">
          <span slot="label" class="medium-label" style="margin-left:10px;">粉丝数:</span>
          <el-input class="range-input" v-model="searchForm.min_fans_num" @keyup.native="handleInputNumber('min_fans_num')"><span class="suffix" slot="suffix">万</span></el-input> - <el-input class="range-input" v-model="searchForm.max_fans_num" @keyup.native="handleInputNumber('max_fans_num')"><span class="suffix" slot="suffix">万</span></el-input>
        </el-form-item>
      </el-form>
      <el-form class="medium-search-bar" :inline="true" size="small">
        <el-form-item class="medium-cls">
          <span slot="label" class="medium-label">昵称搜索:</span>
          <el-input v-model.trim="searchForm.kol_name" style="width: 210px;" placeholder="请输入KOL昵称" clearable @clear="clickQueryMedium"></el-input>
        </el-form-item>
        <el-form-item class="medium-cls">
          <span slot="label" class="medium-label">合作品牌:</span>
          <el-input v-model.trim="searchForm.cooperation_brand" style="width: 210px;" placeholder="请输入合作品牌" clearable @clear="clickQueryMedium"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickQueryMedium">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetMedium">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div class="result-list">
      <div class="opreate-btns">
        <el-button v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.add_kol)" class="sub-btn" size="small" @click="handleAddKolClick">新增KOL</el-button>
        <el-button v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.export_kol) && pagination.total !== 0" size="small" @click="handleExportKolClick">导出</el-button>
        <el-button v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.del_kol)" class="del-btn" size="small" @click="handleBatchDeleteKolClick">删除</el-button>
      </div>
      <div class="list">
        <el-table
          :data="results"
          stripe
          style="width: 100%"
          v-loading="loading"
          :header-cell-style="{backgroundColor: '#F3F5F8', color: '#666'}"
          :cell-style="{cursor: 'pointer'}"
          @row-click="handleRowClick"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="30"
            fixed="left">
          </el-table-column>
          <el-table-column
            :formatter="(row, column, cellValue, index) => (pagination.currentPage - 1) * 10 + (index + 1)"
            label="序号"
            width="50"
            fixed="left"
            align="center">
          </el-table-column>
          <el-table-column
            min-width="200px"
            prop="contract_uid"
            label="KOL基础信息">
            <template slot-scope="{row}">
              <div class="star-info" slot="reference">
                <img v-if="row.kol_info.avatar" :src="row.kol_info.avatar" class="avatar" />
                <img v-else src="@/assets/img/kol/default_pic.png" class="avatar default" />
                <div class="content">
                  <div class="title">{{row.kol_info.kol_name}}</div>
                  <div class="tags">
                    <div class="tag" v-if="row.kol_info.kol_tag">
                      <img src="@/assets/img/kol/zuanshi.png" />
                      {{kolTagFormat(row.kol_info.kol_tag)}}
                    </div>
                    <div class="tag" v-show="row.kol_info.is_cooperation == 1">
                      <img src="@/assets/img/kol/hezuo.png" />
                      已合作
                    </div>
                    <div class="tag" v-if="row.kol_info.special_ticket === 1">
                      <img src="@/assets/img/kol/fapiao.png" />
                      <span>提供专票</span>
                    </div>
                    <div class="tag" v-if="row.kol_info.special_ticket === 0">
                      <img src="@/assets/img/kol/no_fapiao.png" />
                      <span>不提供专票</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="contract_uid"
            label="擅长平台 / 粉丝数">
            <template slot-scope="{row}">
              <el-popover
                placement="bottom-start"
                trigger="hover"
                width="130"
                visible-arrow="false"
                popper-class="personal-library-active-platform-popover personal-library-public-popover"
                v-if="platformsAndfunsSort(row).length > 0"
              >
                <div style="padding: 0 18px;">
                  <div style="display: flex; flex-direction: row; align-items: center; margin-top: 10px;" v-for="(item, index) in platformsAndfunsSort(row)" :key="index">
                    <img :src="item.src" style="width: 20px; height: 20px; margin-right: 5px;" /><span>{{item.fans_number === '0万' ? 0 : item.fans_number}}</span>
                  </div>
                </div>
                <div class="area_funs" slot="reference">
                  <div class="detail_info" v-for="(item, index) in platformsAndfunsSort(row, false)" :key="index">
                    <img :src="item.src" /><span>{{item.fans_number === '0万' ? 0 : item.fans_number}}</span>
                  </div>
                </div>
              </el-popover>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="contract_uid"
            label="擅长领域">
            <template slot-scope="{row}">
              <el-popover
                placement="bottom-start"
                trigger="hover"
                width="70"
                visible-arrow="false"
                popper-class="personal-library-active-platform-popover personal-library-public-popover"
                v-if="areaFormat(row.kol_info.areas).length > 0"
              >
                <div style="padding: 0 18px;">
                  <p v-for="(item, index) in areaFormat(row.kol_info.areas)" :key="index">{{item}}</p>
                </div>
                <div slot="reference">
                  <p v-for="(item, index) in areaFormat(row.kol_info.areas, false)" :key="index">{{item}}</p>
                </div>
              </el-popover>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="contract_uid"
            min-width="120px"
            label="刊例价 / 元">
            <template slot-scope="{row}">
              <el-popover
                placement="bottom-start"
                trigger="hover"
                popper-class="personal-library-fans-count-popover personal-library-public-popover"
                v-if="klpriceFomartAndDis(row, false).length > 0"
              >
                <div class="fans-count-wrap" slot="reference">
                    <p class="klprice" v-for="(item, index) in klpriceFomartAndDis(row, false)" :key="index">
                      {{item.name}}{{Object.keys(item.klprice)[0].substring(0, Object.keys(item.klprice)[0].length - 3)}}: <span class="num">{{item.klprice[Object.keys(item.klprice)[0]]}}</span>
                    </p>
                </div>
                <div class="personal-library-public-popover-content">
                  <div v-for="(item, index) in klpriceFomartAndDis(row)" :key="index">
                    <p style="padding: 0 12px; font-size: 14px; margin-bottom: 3px;">{{item.name}}:</p>
                    <el-row>
                      <el-col :span="12" v-for="(item1, index1) in Object.keys(item.klprice)" :key="index1" style="font-size: 12px; margin-top: 5px;">
                        <span style="color: #666; margin-left: 10px;">{{item1}}: </span> <span style="color: #5C82FF">{{item.klprice[item1]}}</span>
                      </el-col>
                    </el-row>
                    <hr style="border:1px dashed rgba(233, 228, 228, 0.979);" v-show="index < (klpriceFomartAndDis(row).length - 1)"/>
                  </div>
                </div>
              </el-popover>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="contract_uid"
            label="合作品牌">
            <template slot-scope="{row}">
              <el-popover
                placement="bottom-start"
                trigger="hover"
                width="150"
                visible-arrow="false"
                popper-class="personal-library-active-platform-popover personal-library-public-popover"
                v-if="cooperationbrandFormat(row.kol_info.cooperation_brand).length > 0"
              >
                <div style="padding: 0 18px;">
                  <div v-if="row.kol_info.cooperation_brand.length > 0">
                    <p v-for="(item, index) in cooperationbrandFormat(row.kol_info.cooperation_brand)" :key="index">{{item}}</p>
                  </div>
                </div>
                <div slot="reference">
                  <div v-if="row.kol_info.cooperation_brand.length > 0">
                    <p v-for="(item, index) in cooperationbrandFormat(row.kol_info.cooperation_brand, false)" :key="index">{{item}}</p>
                  </div>
                </div>
              </el-popover>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <div class="empty-placeholder" slot="empty" v-show="!loading">
            <img src="@/assets/img/pls_import_product.png">
            <p>空空如也</p>
          </div>
        </el-table>
        <el-pagination
          class="contract-pagination"
          background
          :current-page.sync="pagination.currentPage"
          :page-sizes.sync="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @current-change="handleCurrentChange"
          @size-change="handlePageSizeChange">
        </el-pagination>
      </div>
    </div>
    <add-personal ref="addPersonalKolDialog" @added="clickQueryMedium" @edited="clickQueryMedium" @cancel="clickQueryMedium"></add-personal>
    <personal-detail v-if="detailId" ref="personalDetailDialog" :detailId="detailId" @closed="closedDetail"></personal-detail>
  </div>
</template>

<script>
import AddPersonal from './addPersonal'
import { queryKolList, deleteKol, exportKol } from '@/api/medium'
import { RIGHT_CODE } from '@/const/roleCode'
import PersonalDetail from '../personalDetail'
import { platformList, mediaType, areaType, kolTag, kolTagFormat } from '@/const/kolConst'

export default {
  name: 'PersonalLibrary',
  components: {
    AddPersonal,
    PersonalDetail
  },
  data () {
    return {
      detailId: null, // 选中kol详情id
      RIGHT_CODE,
      cooperationPlatformList: platformList,
      mediaTypeList: mediaType,
      areaTypeList: areaType,
      kolTagList: kolTag,
      ticketList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      conbinList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      results: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 0
      },
      selection: [], // 被选中的数据
      searchForm: {
        platform: '', // 擅长平台
        platform_type: '', // 媒介类型
        area: '', // 擅长领域
        kol_tag: '', // kol标签
        special_ticket: '', // 是否专票
        kol_name: '', // kol昵称
        cooperation_brand: '', // 合作品牌
        is_coop: '', // 是否合作
        min_fans_num: '', // 最小粉丝数
        max_fans_num: '' // 最大粉丝数
      }
    }
  },
  created () {
    this.clickQueryMedium()
  },
  activated () {
    this.clickQueryMedium()
  },
  methods: {
    // kol标签格式化
    kolTagFormat,
    // 关闭详情页
    closedDetail () {
      this.detailId = null
      this.clickQueryMedium()
    },
    // 擅长平台排序(根据所选擅长平台进行排序)
    platformsSort (kolobj) {
      try {
        let {platforms} = kolobj.kol_info
        if (platforms === '') {
          return []
        }
        let {platform} = this.searchForm
        let platformArr = platforms.split('、')
        let platformIndex = platformArr.findIndex(p => p === platform)
        let newplatformArr = []
        if (platform !== '' && platformIndex > -1) {
          platformArr.splice(platformIndex, 1)
          newplatformArr = [platform].concat(platformArr)
        } else {
          newplatformArr = platformArr
        }
        return newplatformArr
      } catch (error) {
        return []
      }
    },
    // 擅长以及粉丝数平台排序
    platformsAndfunsSort (kolobj, isall = true) {
      try {
        let newplatformArr = this.platformsSort(kolobj)
        let result = []
        if (newplatformArr.length <= 0) {
          return []
        }
        newplatformArr.forEach(p => {
          if (p === 'tb') {
            if (kolobj['star_info']) {
              result.push({
                name: platformList.find(f => f.key === p).value,
                src: require(`@/assets/img/kol/${p}.png`),
                fans_number: kolobj['star_info'].fans_number === '' ? '--' : `${kolobj['star_info'].fans_number}万`
              })
            }
          } else {
            if (kolobj[`kol_${p}_info`]) {
              result.push({
                name: platformList.find(f => f.key === p).value,
                src: require(`@/assets/img/kol/${p}.png`),
                fans_number: kolobj[`kol_${p}_info`].fans_number === '' ? '--' : `${kolobj[`kol_${p}_info`].fans_number}万`
              })
            }
          }
        })
        if (isall) {
          return result
        } else {
          return result.splice(0, 3)
        }
      } catch (error) {
        return []
      }
    },
    // 刊例价排序展示
    klpriceFomartAndDis (kolobj, isall = true) {
      try {
        let newplatformArr = this.platformsSort(kolobj)
        let result = []
        if (newplatformArr.length <= 0) {
          return []
        }
        newplatformArr.forEach(p => {
          switch (p) {
            case 'tb': // 淘宝
              result.push({
                name: platformList.find(f => f.key === p).value,
                klprice: {
                  "混播刊例价": kolobj['star_info'].star_mix_price || '--',
                  "专场刊例价": kolobj['star_info'].star_special_price || '--',
                  "视频刊例价": kolobj['star_info'].video_publish_price || '--',
                  "图文刊例价": kolobj['star_info'].photo_publish_price || '--'
                }
              })
              break
            case 'douyin': // 抖音
              result.push({
                name: platformList.find(f => f.key === p).value,
                klprice: {
                  "混播刊例价": kolobj[`kol_${p}_info`].live_mix_publish_price || '--',
                  "专场刊例价": kolobj[`kol_${p}_info`].live_special_publish_price || '--',
                  "21-60s视频刊例价": kolobj[`kol_${p}_info`].video_21_60_publish_price || '--',
                  "1-20s视频刊例价": kolobj[`kol_${p}_info`].video_1_20_publish_price || '--'
                }
              })
              break
            case 'kuaishou': // 快手
              result.push({
                name: platformList.find(f => f.key === p).value,
                klprice: {
                  "混播刊例价": kolobj[`kol_${p}_info`].live_mix_publish_price || '--',
                  "专场刊例价": kolobj[`kol_${p}_info`].live_special_publish_price || '--',
                  "视频刊例价": kolobj[`kol_${p}_info`].video_publish_price || '--'
                }
              })
              break
            case 'bili': // 哔哩
              result.push({
                name: platformList.find(f => f.key === p).value,
                klprice: {
                  "视频刊例价": kolobj[`kol_${p}_info`].video_publish_price || '--'
                }
              })
              break
            case 'yizhibo': // 一直播
              result.push({
                name: platformList.find(f => f.key === p).value,
                klprice: {
                  "直播刊例价": kolobj[`kol_${p}_info`].live_publish_price || '--'
                }
              })
              break
            case 'weibo': // 微博
              result.push({
                name: platformList.find(f => f.key === p).value,
                klprice: {
                  "直发刊例价": kolobj[`kol_${p}_info`].direct_publish_price || '--',
                  "转发刊例价": kolobj[`kol_${p}_info`].trans_publish_price || '--'
                }
              })
              break
            case 'wechat': // 微信
              result.push({
                name: platformList.find(f => f.key === p).value,
                klprice: {
                  "头条刊例价": kolobj[`kol_${p}_info`].photo_headline_publish_price || '--',
                  "次条刊例价": kolobj[`kol_${p}_info`].photo_second_publish_price || '--'
                }
              })
              break
            case 'xhs': // 小红书
              result.push({
                name: platformList.find(f => f.key === p).value,
                klprice: {
                  "视频刊例价": kolobj[`kol_${p}_info`].video_publish_price || '--',
                  "图文刊例价": kolobj[`kol_${p}_info`].photo_publish_price || '--'
                }
              })
              break
            default:
              break
          }
        })
        if (isall) {
          return result
        } else {
          return result.splice(0, 3)
        }
      } catch (error) {
        return []
      }
    },
    // 擅长领域格式化
    areaFormat (areas, isall = true) {
      if (areas === '') {
        return []
      }
      if (isall) {
        return areas.split('、')
      } else {
        return areas.split('、').splice(0, 3)
      }
    },
    // 合作品牌格式化
    cooperationbrandFormat (cooperationbrand, isall = true) {
      if (isall) {
        return [...cooperationbrand]
      } else {
        return [...cooperationbrand].splice(0, 3)
      }
    },
    // 处理input框整数
    handleInputNumber (key) {
      if (this.searchForm[key]) {
        this.searchForm[key] = this.searchForm[key].replace(/[^\\.\d]/g, '')
      }
    },
    // 查询个人库
    clickQueryMedium () {
      this.loading = true
      let formData = {
        ...this.searchForm,
        page: this.pagination.currentPage,
        num: this.pagination.pageSize
      }
      queryKolList(formData).then(res => {
        if (res.data.success) {
          // 处理数据
          res.data.data.data.map(item => {
            if (item.star_info) item['kol_tb_info'] = item.star_info
            const platforms = item.kol_info.platforms.split('、') // const platforms_list =
            // 遍历生成各个平台报价的数组
            const platformsList = []
            platforms.forEach(platformKey => {
              // 处理价格
              let prices = '--'
              const currPlatformObj = platformList.find(item => item.key !== '' && item.key === platformKey)
              const platformName = currPlatformObj ? currPlatformObj.value : ''

              if (item[`kol_${platformKey}_info`]) {
                switch (platformKey) {
                  case 'bili':
                    prices = item[`kol_${platformKey}_info`].video_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName, prices))
                    break
                  case 'douyin':
                    // 直播专场
                    prices = item[`kol_${platformKey}_info`].live_special_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(直播专场)', prices))
                    // 直播混播
                    prices = item[`kol_${platformKey}_info`].live_mix_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(直播混播)', prices))
                    // 视频1-20秒
                    prices = item[`kol_${platformKey}_info`].video_1_20_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(视频1-20秒)', prices))
                    // 视频21-60秒
                    prices = item[`kol_${platformKey}_info`].video_21_60_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(视频21-60秒)', prices))
                    break
                  case 'kuaishou':
                    // 视频
                    prices = item[`kol_${platformKey}_info`].video_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(视频)', prices))
                    // 直播专场
                    prices = item[`kol_${platformKey}_info`].live_special_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(直播专场)', prices))
                    // 直播混播
                    prices = item[`kol_${platformKey}_info`].live_mix_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(直播混播)', prices))
                    break
                  case 'tb':
                    // prices = item[`kol_${platformKey}_info`].taobao_live_mix_price + '/' + item[`kol_${platformKey}_info`].taobao_live_special_price
                    // 直播专场
                    prices = item[`kol_${platformKey}_info`].star_special_cost
                    // prices = item[`star_info`].star_special_cost
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(直播专场)', prices))
                    // 直播混播
                    prices = item[`kol_${platformKey}_info`].star_mix_cost
                    // prices = item[`star_info`].star_mix_cost
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(直播混播)', prices))
                    // 短视频
                    prices = item[`kol_${platformKey}_info`].video_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(短视频)', prices))
                    // 图文
                    prices = item[`kol_${platformKey}_info`].photo_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(图文)', prices))
                    // if () {
                    //   priceObj = this.handleOneKolManyPlatformPriceFun(platformName, prices)
                    // }
                    break
                  // case 'tb_photo':
                  //   prices = item[`kol_${platformKey}_info`].taobao_photo_price
                  //   platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName, prices))
                  //   break
                  case 'wechat':
                    // prices = item[`kol_${platformKey}_info`].photo_price
                    // platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName, prices))
                    // 头条
                    prices = item[`kol_${platformKey}_info`].photo_headline_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(头条)', prices))
                    // 次条
                    prices = item[`kol_${platformKey}_info`].photo_second_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(次条)', prices))
                    break
                  case 'weibo':
                    // 转发
                    prices = item[`kol_${platformKey}_info`].trans_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(转发)', prices))
                    // 直发
                    prices = item[`kol_${platformKey}_info`].direct_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(直发)', prices))
                    break
                  case 'xhs':
                    // 图文
                    prices = item[`kol_${platformKey}_info`].photo_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(图文)', prices))
                    // 视频
                    prices = item[`kol_${platformKey}_info`].video_price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(视频)', prices))
                    break
                  case 'yizhibo':
                    prices = item[`kol_${platformKey}_info`].price
                    platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName + '(直播)', prices))
                    break
                  // case 'tb_video':
                  //   prices = item[`kol_${platformKey}_info`].taobao_video_price
                  //   platformsList.push(this.handleOneKolManyPlatformPriceFun(platformName, prices))
                  //   break
                }
              }
              // return {
              //   platform_name: platformList.find(item => item.key === platformKey).value,
              //   price: prices
              // }
            })
            item['platforms_list'] = platformsList
            // 遍历生成各个平台粉丝数的数组
            const platformsFansList = []
            platforms.forEach(platformKey => {
              const currPlatformObj = platformList.find(item => item.key !== '' && item.key === platformKey)
              const platformName = currPlatformObj ? currPlatformObj.value : ''
              if (platformName) {
                platformsFansList.push({
                  platform_name: platformList.find(item => item.key === platformKey).value,
                  fans_number: item[`kol_${platformKey}_info`] ? item[`kol_${platformKey}_info`].fans_number : '--'
                })
              }
            })
            item['platforms_fans'] = platformsFansList
            // 返回处理完的每一个kol的对象
            return item
          })
          // debugger
          this.results = res.data.data.data
          this.pagination.total = res.data.data.total
        } else {
          this.$message({
            type: 'warning',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
        }
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.$message({
          type: 'warning',
          message: 'KOL列表查询失败',
          duration: 2000,
          showClose: true
        })
        this.loading = false
      })
    },
    // 重置
    resetMedium () {
      this.searchForm = {
        platform: '', // 擅长平台
        platform_type: '', // 媒介类型
        area: '', // 擅长领域
        kol_tag: '', // kol标签
        special_ticket: '', // 是否专票
        kol_name: '', // kol昵称
        is_coop: '', // 是否合作
        min_fans_num: '', // 最小粉丝数
        max_fans_num: '' // 最大粉丝数
      }
      this.clickQueryMedium()
    },
    // 选择类型
    selectTypeHandle (key, value) {
      this.searchForm[key] = value
      if (key === 'platform' && value === '') {
        this.searchForm.max_fans_num = undefined
        this.searchForm.min_fans_num = undefined
      }
      this.pagination.currentPage = 1
      this.clickQueryMedium()
    },
    // 翻页
    handleCurrentChange () {
      this.clickQueryMedium()
    },
    // 每页条数改变
    handlePageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.clickQueryMedium()
    },
    // 点击新增
    handleAddKolClick () {
      this.$refs.addPersonalKolDialog.show()
    },
    // 点击一条数据，进入详情
    handleRowClick (row) {
      this.detailId = row.kol_info.kol_id
      this.$nextTick(function () {
        this.$refs.personalDetailDialog.visible = true
      })
    },
    // 批量选择
    handleSelectionChange (value) {
      this.selection = value
    },
    // 批量删除
    handleBatchDeleteKolClick () {
      if (this.selection.length === 0) {
        this.$message({
          type: 'warning',
          message: '至少选择一条数据',
          duration: 2000,
          showClose: true
        })
        return false
      }

      this.$confirm(`此操作将删除 ${this.selection.length} 个KOL, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'delete-kol-alert',
        center: true
      }).then(() => {
        deleteKol({
          kol_ids: this.selection.map(item => item.kol_info.kol_id)
        }).then(res => {
          this.$message({
            type: res.data.success ? 'success' : 'warning',
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
          if (res.data.success) {
            this.clickQueryMedium()
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: 'KOL删除失败，稍后重试',
            duration: 2000,
            showClose: true
          })
          console.log(error.message)
        })
      }).catch(() => {})
    },
    // 处理每一条kol数据的报价用到的方法
    handleOneKolManyPlatformPriceFun (platformName, price) {
      return {
        platform_name: platformName,
        price: price
      }
    },
    // 导出Kol
    handleExportKolClick () {
      if (this.selection.length === 0) {
        exportKol(this.searchForm)
      } else {
        // 有选择，直接根据kol_id导出
        const kolIds = this.selection.map(item => item.kol_info.kol_id)
        exportKol({
          kol_ids: JSON.stringify(kolIds)
        })
      }
    }
  }
}
</script>
