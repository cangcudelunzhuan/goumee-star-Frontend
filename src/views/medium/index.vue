<!--
 * @Description: 公司库
 * @Author: 白青
 * @Date: 2019-08-16 16:28:45
 * @LastEditTime: 2019-09-05 17:40:51
 * @LastEditors: 白青
 -->
<template>
  <section class="medium-wrapper">
    <div class="common-block-wrapper">
      <div class="medium-title">
        <!-- <div class="title" @click="mediumType=1"><span>公司库</span></div> -->
        <div class="title" :class="{current:mediumType===2}" @click="mediumType=2"><span>KOL库</span></div>
        <div class="title" :class="{current:mediumType===1}" @click="mediumType=1"><span>公司库</span></div>
      </div>
      <el-row v-show="mediumType===1" class="medium-operator">
        <el-row class="medium-choose">
          <div class="choose-block">
            <div class="name">擅长平台：</div>
            <div class="category-list">
              <div class="category-item" :class="{current:cooperationPlatformIndex===item.type}" v-for="(item, index) in cooperationPlatformList" :key="index" @click="selectCooperationPlatform(item.type)">{{item.value}}</div>
            </div>
          </div>
          <div class="choose-block">
            <div class="name">擅长领域：</div>
            <div class="category-list">
              <div class="category-item" :class="{current:categoryIndex===index}" v-for="(item, index) in categoryList" :key="index" @click="selectCategory(index)">{{item}}</div>
            </div>
          </div>
        </el-row>
        <el-form class="medium-search-bar" :inline="true" size="small">
          <el-form-item class="medium-cls">
            <span slot="label" class="medium-label">是否可以专票：</span>
            <el-select v-model="ticketValue" placeholder="请选择" style="width: 120px;">
              <el-option v-for="item in ticketList" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="medium-cls">
            <el-input v-model="companyName" style="width: 210px;" placeholder="请输入公司名称" clearable @clear="clickQueryMedium"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="clickQueryMedium">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetMedium">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <el-row v-show="mediumType===1" class="common-block-wrapper comon-table-box">
      <el-row class="search-display-button" style="margin-bottom: 12px;">
        <el-button v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.add_company)" type="primary" size="small" @click="addCompany()">新增公司</el-button>
        <!-- <el-button type="primary" style="width:80px" size="small" @click="exportCompany">导出</el-button> -->
        <el-button v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.del_company)" size="small" style="width:80px" @click="delCompany">删除</el-button>
      </el-row>
      <el-table v-loading="tableLoading" @selection-change="handleSelectionChange" :data="companyList" stripe :header-row-style="{fontSize:'15px'}" :header-cell-style="{background:'#f0f1f2',height:'48px',color:'#666'}"
        class="company-table" @row-click="goDetail">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column min-width="110" label="公司名称">
          <template slot-scope="scope">
            <el-tooltip placement="top" trigger="hover" effect="light" :content="scope.row.name">
              <span class="company-name">{{scope.row.name}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="110" prop="category" label="擅长领域">
          <template slot-scope="scope">
            <div>
              {{scope.row.areas}}
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="110" label="擅长平台">
          <template slot-scope="scope">
            {{scope.row.platforms}}
          </template>
        </el-table-column>
        <el-table-column min-width="110" label="联系方式">
          <template slot-scope="scope">
            <p v-if="scope.row.contact_person"><span class="key">联系人：</span><span class="value">{{scope.row.contact_person}}</span></p>
            <p v-if="scope.row.contact_no"><span class="key">联系电话：</span><span class="value">{{scope.row.contact_no}}</span></p>
            <p v-if="scope.row.wechat"><span class="key">微信号：</span><span class="value">{{scope.row.wechat}}</span></p>
            <p v-if="scope.row.contact_email"><span class="key">邮箱：</span><span class="value">{{scope.row.contact_email}}</span></p>
            <div v-if="!scope.row.contact_person&&!scope.row.contact_no&&!scope.row.contact_email">{{defaultVal}}</div>
          </template>
        </el-table-column>
        <el-table-column label="是否可以专票" align="center" >
          <template slot-scope="scope">
            {{scope.row.special_ticket?'是':scope.row.special_ticket===0?'否':defaultVal}}
          </template>
        </el-table-column>
        <el-table-column label="报价单" width="100" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.quotation">
              <el-tooltip placement="top" trigger="hover" effect="light" content="预览报价单">
                <a @click.stop="preview(scope.row)"><i class="gm-icon gm-icon-preview"></i></a>
              </el-tooltip>
              <el-tooltip placement="top" trigger="hover" effect="light" content="下载报价单">
                <a @click.stop :href="fixFileToken(scope.row.quotation)" download target="_blank"><i class="gm-icon gm-icon-download2"></i></a>
              </el-tooltip>
            </template>
            <template v-else>
              {{defaultVal}}
            </template>
          </template>
        </el-table-column>
        <div slot="empty" class="empty-box" style="padding: 40px 0;">
          <img src="@/assets/img/anchor_nodata.png" />
        </div>
      </el-table>
      <div class="block" style="margin:16px 0 10px 0">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes.sync="pagination.pageSizes"
          :page-size.sync="pagination.pageSize" layout="sizes, prev, pager, next, jumper" :total="pagination.total">
        </el-pagination>
      </div>
    </el-row>
    <add-company v-if="companyVisible" @close="close" @save="saveCompany"></add-company>
    <personal-library v-show="mediumType===2"></personal-library>
  </section>
</template>
<script>
import { queryCompanyList, deleteCompany, exportCompany } from '@/api/medium'
import { categoryList, cooperationPlatformList } from '@/utils/format'
import { fixFileToken } from '@/utils/tools'
import addCompany from './components/addCompany'
import PersonalLibrary from './components/personalLibrary'
import { RIGHT_CODE } from '@/const/roleCode'

export default {
  components: {
    addCompany,
    PersonalLibrary
  },
  data() {
    return {
      RIGHT_CODE,
      mediumType: 2,
      categoryList,
      categoryIndex: 0,
      cooperationPlatformList,
      cooperationPlatformIndex: 0,
      ticketValue: '',
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
      companyName: '',
      companyVisible: false,
      companyList: [],
      multipleSelection: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 100
      },

      // -----------------
      defaultVal: '--',
      tableLoading: true
    }
  },
  created() {
    this.queryMedium()
  },
  methods: {
    addCompany() {
      this.companyVisible = true
    },
    close() {
      this.companyVisible = false
    },
    selectCooperationPlatform(index) {
      this.cooperationPlatformIndex = index
      this.queryMedium()
    },
    selectCategory(index) {
      this.categoryIndex = index
      this.queryMedium()
    },
    resetMedium() {
      this.cooperationPlatformIndex = 0
      this.categoryIndex = 0
      this.companyName = ''
      this.ticketValue = ''
      this.pagination.currentPage = 1
      this.queryMedium()
    },
    saveCompany() {
      this.close()
      this.resetMedium()
    },
    // 点击查询公司列表
    clickQueryMedium() {
      this.pagination.currentPage = 1
      this.queryMedium()
    },
    // 获取公司列表
    queryMedium() {
      this.tableLoading = true
      let params = {
        platforms: this.cooperationPlatformIndex,
        areas: this.categoryIndex,
        special_ticket: this.ticketValue,
        name: this.companyName.replace(/(^\s*)|(\s*$)/g, ''),
        num: this.pagination.pageSize,
        page: this.pagination.currentPage
      }
      queryCompanyList(params).then(res => {
        this.tableLoading = false
        if (res.data.success) {
          this.companyList = res.data.data.data
          this.pagination.total = res.data.data.total
        }
      })
    },
    // 导出公司
    exportCompany() {
      let ids = ''
      // 没选默认导出所有
      if (this.multipleSelection.length === 0) {
        this.companyList.forEach(item => {
          if (ids) {
            ids = ids + ',' + item.id
          } else {
            ids = '' + item.id
          }
        })
      } else {
        // 选了导出选择的
        this.multipleSelection.forEach(item => {
          if (ids) {
            ids = ids + ',' + item.id
          } else {
            ids = '' + item.id
          }
        })
      }
      let params = {
        ids
      }
      exportCompany(params)
    },
    // 删除公司
    delCompany() {
      if (this.multipleSelection.length === 0) {
        this.$gmMessage('请先选择公司', 'tip')
      } else {
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          iconClass: 'warning-icon'
        }).then(() => {
          let ids = ''
          this.multipleSelection.forEach(item => {
            if (ids) {
              ids = ids + ',' + item.id
            } else {
              ids = '' + item.id
            }
          })
          let params = {
            ids
          }
          deleteCompany(params).then(res => {
            if (res.data.success) {
              this.queryMedium()
            } else {
              this.$gmMessage(res.data.message, 'tip')
            }
          })
        })
      }
    },
    preview(row) {
      const url = row.quotation
      const arr = ['.doc', '.ppt', '.xls']
      const wrUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(this.fixFileToken(url))
      if (url.includes(arr[0]) || url.includes(arr[1]) || url.includes(arr[2])) {
        if (row.quotation_size < 5) {
          window.open(wrUrl)
        } else {
          this.$message({
            message: '该文件过大（超过5M），请下载后查看！',
            type: 'warning'
          })
        }
      } else {
        window.open(this.fixFileToken(url))
      }
    },
    // 下载报价单
    downloadQuotation(url) {
      window.open(this.fixFileToken(url))
    },
    // previewQuotation(url) {
    //   window.open(`http://www.xdocin.com/xdoc?_func=to&amp;_format=html&amp;_cache=1&amp;_xdoc=${this.fixFileToken(url)}`)
    // },
    goDetail(row) {
      this.$router.push({
        path: '/medium/detail',
        query: {
          id: row.id
        }
      })
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.queryMedium()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.queryMedium()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    fixFileToken
  }
}
</script>

<style lang="scss">
@import '@/styles/vars.scss';
.company-table {
  .el-table__row {
    cursor: pointer;
  }
}
</style>

<style lang="scss" scoped>
@import '@/styles/vars.scss';
.medium-wrapper {
  min-width: 1160px;
  .medium-title {
    font-size: 0;
    text-align: center;
    border-bottom: #efefef solid 1px;
    background: #fff;
    .title {
      display: inline-block;
      width: 140px;
      height: 60px;
      color: #333;
      box-sizing: border-box;
      line-height: 60px;
      background: #fff;
      margin: 0 30px;
      cursor: pointer;
      span {
        display: inline-block;
        vertical-align: top;
        margin-left: 3px;
        font-size: 16px;
      }
      &.current {
        color: #5c82ff;
        border-bottom: #5c82ff solid 2px;
      }
    }
  }
  .medium-operator {
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
    }
  }
  .company-table {
    .company-name {
      color: $color-primary;
    }
    .key {
      color: #999;
      font-size: 12px;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
