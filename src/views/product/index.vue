<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-06 09:35:27
 * @LastEditTime: 2019-11-25 13:46:32
 * @LastEditors: 白青
 -->
<template>
  <section style="margin-top:10px">
    <el-row style="background:#fff;padding:12px">
      <el-form
        :inline="true"
        class="search-pro-form"
        size="small"
        :model="searchProductForm"
      >
        <el-row>
          <el-form-item label="主播昵称">
            <el-select
              v-model="searchProductForm.star_name"
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in allStars"
                :key="index"
                :value="item.value"
                :label="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否预售">
            <el-select
              v-model="searchProductForm.is_presell"
              clearable
            >
              <el-option
                v-for="(item, index) in isPresellOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="直播日期">
            <el-date-picker
              placeholder="请选择日期"
              v-model="searchProductForm.display_time"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="品 类">
            <el-select
              v-model="searchProductForm.category"
              clearable
              placeholder="选择商品品类"
            >
              <el-option
                v-for="(item, index) in categoryOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="录入人">
            <el-select
              v-model="searchProductForm.add_by"
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in allAddBy"
                :key="index"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否出单">
            <el-select
              v-model="searchProductForm.is_display"
              clearable
              placeholder="选择是否出单"
            >
              <el-option
                v-for="(item, index) in isDisplayOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最近直播">
            <el-select
              v-model="searchProductForm.latest_display_time"
              placeholder="选择最近直播"
              clearable
            >
              <el-option
                v-for="(item, index) in latestDisplayTimeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺/商品名称">
            <el-input
              v-model="shopName"
              placeholder="店铺/商品名称"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row class="search-pro-btn">
        <el-button
          size="small"
          type="primary"
          class="btn-search"
          @click="searchProduct"
        >查询</el-button>
        <el-button
          size="small"
          class="btn-search"
          @click="searchReset"
        >重置</el-button>
      </el-row>
    </el-row>
    <!-- main-table -->
    <el-row style="background:#fff;padding:12px;margin-top:10px">
      <el-button
        v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.del_product)"
        size="small"
        class="product-delete-btn"
        @click="clickBatchDelete"
      >批量删除</el-button>
      <productTable
        v-loading="productTableLoading"
        :productTableData="productTableData"
        :size="'medium'"
        @comQueryProduct="comQueryProduct"
        @passDeleteData="passDeleteData"
      >
      </productTable>
      <div style="margin-top:14px">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.currentPage"
          :page-size.sync="pagination.pageSize"
          :page-sizes.sync="pagination.pageSizes"
          layout="sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </el-row>
  </section>
</template>
<script>
import {
  isPresellOptions,
  categoryOptions,
  isDisplayOptions,
  latestDisplayTimeOptions,
  livePeriodOption,
  liveDurationOption
} from "@/const/options"
import { queryStarSug } from "@/api/star"
import { queryProducts, deleteProduct } from "@/api/display"
import { allStars } from "@/const/getStar"
// import { getUserInfo } from '@/api/auth'
// import { USER_ROLE } from '@/utils/config'
import { RIGHT_CODE } from "@/const/roleCode"

import productTable from "./component/productTable"
export default {
  data () {
    return {
      RIGHT_CODE,
      // isAdminUser: true,
      searchProductForm: {
        star_name: "",
        is_presell: "",
        display_time: "",
        category: "",
        add_by: "",
        is_display: "",
        latest_display_time: "",
        num: "",
        page_num: ""
      },
      isPresellOptions,
      categoryOptions,
      isDisplayOptions,
      latestDisplayTimeOptions,
      livePeriodOption,
      liveDurationOption,
      allStars,
      allAddBy: [],
      productTableData: [],
      productTableLoading: false,
      editProDialogVisible: false,
      proDialogFormData: {},
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 100
      },
      batchDeleteData: [],
      // 店铺名称
      shopName: ""
    }
  },
  components: { productTable },
  activated () {
    // getUserInfo().then(response => {
    //   if (response.data.data.role === USER_ROLE.CUSTOMER_MANAGER || response.data.data.role === USER_ROLE.PROJECT_MANAGER) {
    //     this.isAdminUser = false
    //   }
    // })
    // const role = this.$store.getters['user/getUserRole']
    // if (role === USER_ROLE.CUSTOMER_MANAGER || role === USER_ROLE.PROJECT_MANAGER) {
    //   this.isAdminUser = false
    // }

    let searchsugpass = { num: 1000 }
    queryStarSug(searchsugpass).then(response => {
      let result = response.data
      if (result.success) {
        this.allAddBy = result.data.user_data
      } else {
        console.log(result.message)
      }
    })
    this.queryProduct()
  },
  mounted () {
    // 匹配主播跳转过来的
    if (this.$route.query.starName) {
      this.searchProductForm.star_name = this.$route.query.starName
      this.searchProduct()
    }
  },
  methods: {
    passDeleteData (value) {
      this.batchDeleteData = []
      value.forEach(item => {
        this.batchDeleteData.push(item.id)
      })
    },
    clickBatchDelete () {
      if (this.batchDeleteData.length === 0) {
        this.$gmMessage("请先选择商品", "tip")
      } else {
        this.$confirm("此操作将永久删除数据，是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          iconClass: "warning-icon"
        })
          .then(() => {
            let deletepass = {
              id: JSON.stringify(this.batchDeleteData)
            }
            this.productTableLoading = true
            deleteProduct(deletepass).then(response => {
              let result = response.data
              this.productTableLoading = false
              if (result.success) {
                this.$gmMessage(result.message)
                this.queryProduct()
              } else {
                this.$gmMessage(result.message, "tip")
              }
            })
          })
          .catch(() => { })
      }
    },
    searchProduct () {
      this.pagination.currentPage = 1
      this.queryProduct()
    },
    // 重置按钮
    searchReset () {
      this.searchProductForm = {
        star_name: "",
        is_presell: "",
        display_time: "",
        category: "",
        add_by: "",
        is_display: "",
        latest_display_time: "",
        num: "",
        page_num: ""
      }
      this.shopName = ""
      this.searchProduct()
    },
    comQueryProduct () {
      this.queryProduct()
    },
    queryProduct () {
      this.productTableData = []
      this.productTableLoading = true
      this.searchProductForm.num = this.pagination.pageSize
      this.searchProductForm.page_num = this.pagination.currentPage
      for (var item in this.searchProductForm) {
        if (this.searchProductForm[item] === "") {
          delete this.searchProductForm[item]
        }
      }
      this.searchProductForm.shop_name = this.shopName.trim()
      let productpass = this.searchProductForm
      queryProducts(productpass)
        .then(response => {
          let data = response.data
          if (data.success) {
            let res = data.data.data
            for (var i in res) {
              this.productTableData.push(Object.assign(res[i]))
            }
            this.pagination.total = data.data.total
          } else {
            this.$gmMessage(data.message, "tip")
          }
          this.productTableLoading = false
        })
        .catch(error => {
          console.log(error)
          this.productTableLoading = false
        })
    },
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.$emit("handleSizeChange", val)
      this.queryProduct()
    },
    handleCurrentChange () {
      this.queryProduct()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';
.search-pro-form {
  // min-width: 1006px;
  /deep/ .el-form-item__label {
    width: 100px;
  }
  /deep/ .el-form-item__content {
    width: calc(100% - 100px);
  }
  .el-row {
    .el-form-item {
      width: 24%;
      margin: 5px 0;
    }
  }
}
</style>
<style lang="scss">
.search-pro-form {
  .el-form-item__label {
    // width: 29%;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-form-item__content {
    // width: 70%;
    .el-select,
    .el-input {
      width: 100%;
    }
  }
}
.search-pro-btn {
  font-size: 0;
  .btn-search {
    padding: 8px 0;
    vertical-align: top;
    width: 80px;
    margin: 10px 0 0 0;
    font-size: 14px;
    text-align: center;
    &:nth-child(n + 2) {
      margin-left: 10px;
    }
  }
}
.product-delete-btn {
  margin-bottom: 12px;
}
</style>
