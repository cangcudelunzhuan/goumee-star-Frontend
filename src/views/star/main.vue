<template>
  <section class="ranking-table page-section">
    <div class="ranking-title">
      <div
        class="title"
        :class="{current:rankingType===1}"
        @click="rankingType=1"
      ><span>合作主播销售榜</span></div>
      <div
        class="title"
        :class="{current:rankingType===2}"
        @click="rankingType=2"
      ><span>主播达人榜</span></div>
    </div>
    <template v-if="rankingType===1">
      <el-row class="ranking-choose">
        <el-col :span="24">
          <div class="choose-block">
            <div class="name">类目：</div>
            <div class="category-list">
              <div
                class="category-item"
                :class="{current:categoryIndex===index}"
                v-for="(item, index) in categoryList"
                :key="index"
                @click="selectCategory(index)"
              >{{item}}</div>
            </div>
          </div>
          <div class="choose-block">
            <!-- <div class="name">筛选：</div> -->
            <div class="category-list">
              <el-date-picker
                v-model="selectTime"
                :editable="false"
                :clearable="false"
                :format="formatSelectTime"
                type="month"
                placeholder="选择月份"
                :picker-options="pickerOptions1"
                @change="getStarSalesRankings"
                size="small"
              >
              </el-date-picker>
              <div class="dimension-tips">
                <i class="icon-time"></i><span class="text">更新时间：实时更新导入的销售数据</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-el-row">
        <el-col
          :span="24"
          style="padding:10px"
        >
          <el-table
            :data="starSaleRankingsList"
            highlight-current-row
            @row-click="clickTableColumn"
            class="main-page-table"
            stripe
            :header-cell-style="{background:'#f0f1f2',color:'#666'}"
            :header-row-style="{height:'50px'}"
            v-loading="rankingLoading"
            :height="tableHeight1"
          >
            <template slot="empty">
              <img src="@/assets/img/pls_import_product.png">
              <p>暂无数据</p>
            </template>
            <el-table-column
              label="排名"
              width="80"
              align="center"
            >
              <template slot-scope="scope">
                <div class="seq">
                  <strong :class="{isRank1: scope.row.ranking === 1, isRank2: scope.row.ranking === 2, isRank3: scope.row.ranking === 3}">{{scope.row.ranking}}</strong>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label=""
              align="center"
              width="64"
            >
              <template slot-scope="scope">
                <img
                  class="star-avatar"
                  :src="scope.row.picUrl"
                  alt=""
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="starName"
              label="主播信息"
              width="180"
            >
              <template slot-scope="scope">
                <div class="star-box">
                  <p class="p01">{{scope.row.starName}}</p>
                  <p class="p02">{{scope.row.star_category || ''}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="粉丝数/万"
              align="center"
            >
              <template slot-scope="scope">
                <p class="is-gray">{{scope.row.fansNum}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="averageClickNum"
              :render-header="formatClickTime"
              align="center"
            ></el-table-column>
            <el-table-column
              :render-header="formatClickMoney"
              align="center"
            >
              <template slot-scope="scope">
                <p class="is-gray">￥{{scope.row.averageSalesPrice}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="averageSalesNum"
              :render-header="formatSellTime"
              align="center"
            ></el-table-column>
            <el-table-column
              :render-header="formatSellMoney"
              align="center"
            >
              <template slot-scope="scope">
                <p class="is-fans">￥{{scope.row.averageSalesAmount}}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </template>
    <template v-if="rankingType===2">
      <el-row>
        <el-col
          :span="24"
          style="padding:10px"
        >
          <div class="dimension">
            <span style="font-size:14px;color:#666">排序：</span>
            <el-select
              v-model="sortStarDimen.value"
              style="width:170px"
              size="small"
              placeholder="粉丝数"
            >
              <el-option
                v-for="item in sortStarDimen"
                :key="item.label"
                :value="item.value"
                @click.native="selectSortDimen(item)"
              >{{item.value}}</el-option>
            </el-select>
            <span style="font-size:14px;color:#666; margin-left: 20px;">筛选：</span>
            <el-select
              v-model="selectDimen.value"
              style="width:100px"
              size="small"
              placeholder="全部"
            >
              <el-option
                v-for="item in selectDimen"
                :key="item.value"
                :value="item.value"
                @click.native="selecteConcert(item)"
              >{{item.value}}</el-option>
            </el-select>
          </div>
          <el-table
            :data="rankingTableData"
            highlight-current-row
            @row-click="clickTableColumn"
            class="main-page-table"
            stripe
            :header-cell-style="{background:'#f0f1f2',color:'#666'}"
            :header-row-style="{height:'50px'}"
            v-loading="rankingLoading"
            :height="tableHeight2"
          >
            <el-table-column
              label="排名"
              width="80"
              align="center"
            >
              <template slot-scope="scope">
                <div class="seq">
                  <strong :class="{isRank1: scope.row.ranking === 1, isRank2: scope.row.ranking === 2, isRank3: scope.row.ranking === 3}">{{scope.row.ranking}}</strong>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label=""
              align="center"
              width="64"
            >
              <template slot-scope="scope">
                <img
                  class="star-avatar"
                  :src="scope.row.picUrl"
                  alt=""
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="starName"
              label="主播昵称"
            >
              <template slot-scope="scope">
                <p>{{scope.row.starName}}</p>
                <span
                  :class="scope.row.isConcert === '未合作' ? 'no-concert':'is-concert'"
                  class="concert-text"
                  v-if="scope.row.isConcert === '已合作'"
                >
                  <!-- <i class="concert-icon" :class="scope.row.isConcert === '未合作' ? 'no-concert-icon':'is-concert-icon'"></i> -->
                  <span class="concert-icon-text">{{scope.row.isConcert}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="starId"
              label="主播ID"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="organization"
              label="所属机构"
              align="center"
            ></el-table-column>
            <el-table-column
              label="粉丝数/万"
              align="center"
            >
              <template slot-scope="scope">
                <p :class="isFans ? 'is-fans':'is-gray'">{{scope.row.fansNum}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="直播场次数"
              align="center"
            >
              <template slot-scope="scope">
                <p :class="isDisplay ? 'is-display':'is-gray'">{{scope.row.displayNum}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="最近7场场均观看数/万"
              align="center"
              width="160"
            >
              <template slot-scope="scope">
                <p :class="isWatch ?'is-watch':'is-gray'">{{scope.row.latestWatchNum}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="starAttr"
              label="主播属性"
              align="center"
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </template>
  </section>
</template>
<script>
import { sortStar, getStarSalesRankings } from "@/api/stat"
import { formatTime, getPreMonth } from "@/utils/tools"
import { categoryList } from "@/utils/format"
export default {
  data () {
    return {
      rankingLoading: false,
      isRank: false,
      isFans: true,
      isDisplay: false,
      isWatch: false,
      sortStarDimen: [
        {
          value: "粉丝数",
          label: "fans_num"
        },
        {
          value: "直播场次数",
          label: "display_num"
        },
        {
          value: "最近七场场均观看数",
          label: "watch_num"
        }
      ],
      selectDimen: [
        {
          value: "全部",
          label: 2
        },
        {
          value: "已合作",
          label: 1
        }
      ],
      rankingTableData: [],
      currentDimen: "fans_number",
      isConcertSelect: 2,
      // 主播销售榜
      starSaleRankingsList: [],
      selectTime: getPreMonth(new Date()),
      // 1--主播销售榜 2--主播达人榜
      rankingType: 1,
      pickerOptions1: {
        disabledDate (date) {
          let ret = false
          let year = date.getFullYear()
          let month = date.getMonth()
          let currentTime = new Date()
          let currentYear = currentTime.getFullYear()
          let currentMonth = currentTime.getMonth() + 1
          // 2018-08-01后才有数据
          if (date.getTime() < new Date("2018/8/1").getTime()) {
            ret = true
          }
          if (year > currentYear) {
            ret = true
          } else if (year === currentYear && month >= currentMonth) {
            ret = true
          }
          return ret
        }
      },
      categoryList: categoryList,
      categoryIndex: 0,
      tableHeight1: 600,
      tableHeight2: 600,
      defaultVal: "--",
      number: 100
    }
  },
  computed: {
    formatSelectTime () {
      let ret = ""
      let time = this.selectTime
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      // 获取每月的总天数
      let day = new Date(year, month, 0).getDate()
      ret = `${year}-${month}-01 ~ ${year}-${month}-${day}`
      return ret
    }
  },
  created () {
    this.sortStarDimen.value = "粉丝数"
    this.selectDimen.value = "全部"
    let sortstarpass = {
      num: this.number
    }
    this.getStarSalesRankings()
    this.sortStarInfo(sortstarpass)
  },
  mounted () {
    this.getHeight()
    window.onresize = () => {
      this.getHeight()
    }
  },
  methods: {
    getHeight () {
      this.tableHeight1 = window.innerHeight - 48 - 46 - 300 + 7 + 60 + 60
      this.tableHeight2 = window.innerHeight - 48 - 46 - 194 + 7 + 60
    },
    // 格式化表头
    /* eslint-disable indent */
    formatClickTime (h, { column, $index }) {
      return (
        <div class="format-title">
          <p class="p01">(平均)</p>
          <p class="p02">
            点击数/场
            <el-tooltip
              content="自然月内总点击数 / 自然月内场次数 = 自然月内每场平均点击数。"
              placement="top"
              effect="dark"
            >
              <i class="el-icon-question" />
            </el-tooltip>
          </p>
        </div>
      )
    },
    formatClickMoney (h, { column, $index }) {
      return (
        <div class="format-title">
          <p class="p01">(平均)</p>
          <p class="p02">
            客单价/场
            <el-tooltip
              content="自然月内客单价总额 / 自然月内场次数=自然月内每场平均客单价。"
              placement="top"
              effect="dark"
            >
              <i class="el-icon-question" />
            </el-tooltip>
          </p>
        </div>
      )
    },
    formatSellTime (h, { column, $index }) {
      return (
        <div class="format-title">
          <p class="p01">(平均)</p>
          <p class="p02">
            销售数/场
            <el-tooltip
              content="自然月内总销售数 / 自然月内场次数 = 自然月内每场平均销售数。"
              placement="top"
              effect="dark"
            >
              <i class="el-icon-question" />
            </el-tooltip>
          </p>
        </div>
      )
    },
    formatSellMoney (h, { column, $index }) {
      return (
        <div class="format-title">
          <p class="p01">(平均)</p>
          <p class="p02">
            销售额/场
            <el-tooltip
              content="自然月内销售总额 / 自然月内场次数 = 自然月内每场平均销售额。"
              placement="top"
              effect="dark"
            >
              <i class="el-icon-question" />
            </el-tooltip>
          </p>
        </div>
      )
    },
    selectSortDimen (item) {
      this.currentDimen = item.label
      let sortstarpass = {
        choice: item.label,
        num: this.number,
        is_cooperation: this.isConcertSelect
      }
      this.isWatch = false
      this.isFans = false
      this.isDisplay = false
      this.sortStarInfo(sortstarpass)
      if (item.label === "watch_num") {
        this.isWatch = true
      }
      if (item.label === "display_num") {
        this.isDisplay = true
      }
      if (item.label === "fans_num") {
        this.isFans = true
      }
    },
    clickTableColumn (value) {
      this.$router.push({
        path: "/star-personal",
        query: {
          starName: value.starName,
          starId: value.star_id
        }
      })
    },
    selecteConcert (value) {
      this.isConcertSelect = value.label
      let sortstarpass = {
        choice: this.currentDimen,
        num: this.number,
        is_cooperation: this.isConcertSelect
      }
      this.sortStarInfo(sortstarpass)
    },
    sortStarInfo (sortstarpass) {
      this.rankingLoading = true
      sortStar(sortstarpass)
        .then(response => {
          let data = response.data
          if (data.success) {
            this.rankingTableData = []
            let res = response.data.data.data
            res.forEach((item, index) => {
              if (item.is_cooperation === this.isConcertSelect) {
                if (item.is_cooperation === 1) {
                  item.is_cooperation = "已合作"
                } else if (item.is_cooperation === 0) {
                  item.is_cooperation = "未合作"
                }
                this.rankingTableData.push({
                  ranking: index + 1,
                  starName: item.star_name,
                  starId: item.star_id,
                  organization: item.organization,
                  fansNum: item.fans_number,
                  displayNum: item.display_num,
                  starAttr: item.star_attribute || this.defaultVal,
                  isConcert: item.is_cooperation,
                  latestWatchNum: item.latest_display_watch_num,
                  picUrl: item.pic_url
                })
              } else if (this.isConcertSelect === 2) {
                if (item.is_cooperation === 1) {
                  item.is_cooperation = "已合作"
                } else if (item.is_cooperation === 0) {
                  item.is_cooperation = "未合作"
                }
                this.rankingTableData.push({
                  ranking: index + 1,
                  starName: item.star_name,
                  starId: item.star_id,
                  organization: item.organization,
                  fansNum: item.fans_number,
                  displayNum: item.display_num,
                  starAttr: item.star_attribute || this.defaultVal,
                  isConcert: item.is_cooperation,
                  latestWatchNum: item.latest_display_watch_num,
                  picUrl: item.pic_url
                })
              }
              this.rankingLoading = false
            })
          } else {
            this.rankingLoading = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取合作主播销售榜列表
    getStarSalesRankings () {
      this.rankingLoading = true
      let params = {
        num: this.number,
        page_num: 1,
        category: this.categoryIndex,
        month: formatTime(this.selectTime.getTime(), "yyyyMM")
      }
      getStarSalesRankings(params)
        .then(res => {
          this.rankingLoading = false
          if (res.data.success) {
            let arr = []
            let data = res.data.data.data
            data.forEach((item, index) => {
              let categorys = ""
              item.category_items.forEach(item => {
                if (item) {
                  categorys += item + "/"
                }
              })
              categorys = categorys.substring(0, categorys.length - 1)
              arr.push({
                ranking: index + 1,
                starName: item.star_name,
                starId: item.star_id,
                fansNum: item.fans_number.toFixed(2),
                displayNum: item.display_num,
                averageClickNum: item.average_click_num.toFixed(2),
                averageSalesAmount: (
                  item.average_sales_amount.toFixed(2) + ""
                ).replace(/\d{1,4}(?=(\d{4})+(\.\d*)?$)/g, "$&,"),
                averageSalesNum: item.average_sales_num.toFixed(2),
                averageSalesPrice: item.average_sales_price.toFixed(2),
                picUrl: item.pic_url,
                categorys,
                star_category: item.star_category
              })
            })
            this.starSaleRankingsList = arr
            // console.log(this.starSaleRankingsList)
          }
        })
        .catch(() => {
          this.rankingLoading = false
        })
    },
    // 选择品类
    selectCategory (index) {
      this.categoryIndex = index
      this.getStarSalesRankings()
    }
  }
}
</script>
<style lang="scss">
.main-page-table tr {
  cursor: pointer;
  .seq {
    color: #9fafb0;
    font-size: 20px;
  }
}
.table-el-row {
  th {
    padding: 9px 0;
    div.format-title {
      p {
        line-height: 16px;
      }
      .p01 {
        color: #999;
        line-height: 18px;
      }
      .p02 {
        color: #666;
        .el-icon-question {
          color: #ccc;
          margin-left: 3px;
        }
      }
    }
  }
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '@/styles/vars.scss';

.home-page-top {
  overflow: hidden;
  strong {
    float: left;
    color: #666;
    font-size: 16px;
    margin-top: 14px;
  }
  p {
    float: right;
    color: #666;
    i {
      color: #555;
    }
  }
}
.ranking-table {
  // margin-top: 10px;
  min-width: 968px;
  background: #fff;
  .ranking-title {
    font-size: 0;
    text-align: center;
    border-bottom: #efefef solid 1px;
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
      .icon-sell {
        width: 22px;
        height: 22px;
        background: url('../../assets/img/main_sprite_new.png') -10px -10px;
      }
      .icon-person {
        width: 22px;
        height: 22px;
        background: url('../../assets/img/main_sprite_new.png') -10px -52px;
      }
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
      // &.current {
      //   background: $color-primary;
      //   color: #fff;
      //   border: 0;
      //   line-height: 46px;
      //   i {
      //     margin-top: 11px;
      //   }
      //   .icon-sell {
      //     background-position: -52px -10px;
      //   }
      //   .icon-person {
      //     background-position: -52px -52px;
      //   }
      // }
    }
  }
  .ranking-choose {
    .choose-block {
      height: 60px;
      box-sizing: border-box;
      font-size: 0;
      &:nth-child(1) {
        padding: 15px 20px;
        // border-bottom: 1px solid #f4f5f6;
      }
      &:nth-child(2) {
        padding: 0 20px;
        height: 37px;
      }
      .name {
        font-size: 14px;
        color: #999;
        line-height: 24px;
        display: inline-block;
        width: 62px;
      }
      .category-list {
        display: inline-block;
        .category-item {
          display: inline-block;
          // padding: 0 17px;
          font-size: 14px;
          color: #666;
          line-height: 30px;
          padding: 0 10px;
          margin: 0 10px;
          cursor: pointer;
          &:hover {
            color: $color-primary;
          }
          &.current {
            color: #fff !important;
            background: $color-primary;
            border-radius: 15px;
          }
        }
      }
    }
  }
  .dimension-tips {
    padding: 5px 0 15px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    .icon-time {
      margin-top: -1px;
      display: inline-block;
      vertical-align: top;
      width: 14px;
      height: 14px;
      background: url('../../assets/img/main_sprite_new.png') -94px -10px;
    }
    .text {
      margin-left: 6px;
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
      line-height: 14px;
      color: #999;
    }
  }
  .star-avatar {
    display: block;
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
  .star-box {
    .p01 {
      font-size: 14px;
      color: #666;
    }
    .p02 {
      font-size: 12px;
      color: #b1b1b1;
    }
  }
  .el-row {
    background: #fff;
  }
  i {
    display: inline-block;
  }
  .dimension {
    overflow: hidden;
    line-height: 50px;
    height: 50px;
    color: #666;
    .select {
      float: right;
    }
  }
}
.isRank1 {
  display: inline-block;
  width: 36px;
  height: 45px;
  line-height: 60px;
  color: #fff;
  font-size: 18px;
  background: url(../../assets/img/main_sprite.png);
  background-position: -43px -11px;
}
.isRank2 {
  display: inline-block;
  width: 36px;
  height: 45px;
  line-height: 60px;
  color: #fff;
  font-size: 18px;
  background: url(../../assets/img/main_sprite.png);
  background-position: -43px -121px;
}
.isRank3 {
  display: inline-block;
  width: 36px;
  height: 45px;
  line-height: 60px;
  color: #fff;
  font-size: 18px;
  background: url(../../assets/img/main_sprite.png);
  background-position: -43px -65px;
}
.concert-text {
  margin-top: 2px;
  font-size: 12px;
  display: block;
  height: 16px;
  line-height: 16px;
  width: 46px;
  border-radius: 2px;
  text-align: center;
}
.no-concert {
  border: 1px solid #c7c7c7;
  color: #c7c7c7;
}
.is-concert {
  color: $color-primary;
  border: 1px solid $color-primary;
}
.is-fans,
.is-display,
.is-watch {
  color: $color-primary;
}
.is-gray {
  color: #666;
}
.concert-icon {
  vertical-align: top;
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-top: 2px;
}
.concert-icon-text {
  vertical-align: top;
  display: inline-block;
}
.is-concert-icon {
  background: url(../../assets/img/main_sprite.png);
  background-position: -6px -55px;
}
.no-concert-icon {
  background: url(../../assets/img/main_sprite.png);
  background-position: -7px -75px;
}
</style>
