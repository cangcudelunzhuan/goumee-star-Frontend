<!--
 * @Description: 客户列表
 * @Author: 白青
 * @Date: 2019-09-29 15:22:06
 * @LastEditTime: 2019-11-25 13:49:08
 * @LastEditors: 白青
 -->
<template>
  <section class="customer-index-wrapper">
    <el-row class="customer-operator">
      <el-row class="medium-choose">
        <div class="choose-block">
          <div class="name">客户类目:</div>
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
          <div class="name">店铺类型:</div>
          <div class="category-list">
            <div
              class="category-item"
              :class="{current:shopTypeIndex===item.type}"
              v-for="(item, index) in shopType"
              :key="index"
              @click="selectshopType(item.type)"
            >{{item.value}}</div>
          </div>
        </div>
        <select-items
          :title="'客户类型'"
          :dataitems="companyType"
          :value="'type'"
          :label="'value'"
          @selectClick="selectcompanyType"
        ></select-items>
      </el-row>
      <el-form
        class="customer-search-bar"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="客户分类:"
          class="media-cls"
        >
          <el-select
            v-model="customerClass"
            placeholder="请选择"
            style="width: 120px"
            @change="selectCustomerClass"
          >
            <template v-for="(item, index) in customerClassList">
              <el-option
                :key="item.value"
                :label="item.value"
                :value="item.type"
                v-if="index > 0"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item
          label="创建人:"
          class="media-cls"
        >
          <el-input
            v-model.trim="addBy"
            style="width: 210px"
            placeholder="创建人名称"
            clearable
            @clear="clickQueryCustomer"
          ></el-input>
        </el-form-item>
        <el-form-item class="media-cls">
          <el-input
            v-model.trim="multArgs"
            style="width: 210px"
            placeholder="请输入店铺或公司名称"
            clearable
            @clear="clickQueryCustomer"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="clickQueryCustomer"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetCustomer">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="comon-table-box">
      <el-row
        class="search-display-button"
        style="margin-bottom: 12px"
      >
        <el-button
          v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.add_customer)"
          type="primary"
          size="small"
          @click="addCustomer()"
        >新增客户</el-button>
        <el-button
          v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.export_customer)"
          style="width:80px"
          size="small"
          @click="exportCustomers"
        >导出</el-button>
        <el-button
          v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.del_customer)"
          size="small"
          style="width:80px"
          @click="delCustomer"
        >删除</el-button>
      </el-row>
      <el-table
        v-loading="tableLoading"
        @selection-change="handleSelectionChange"
        :data="customerList"
        stripe
        :header-row-style="{fontSize:'15px'}"
        :header-cell-style="{background:'#f0f1f2',height:'48px',color:'#666'}"
        :row-style="{height: '60px'}"
        class="customer-table"
        @row-click="goDetail"
      >
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column
          label="序号"
          width="60"
        >
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <!-- /类目 -->
        <el-table-column
          min-width="100"
          label="店铺名称 / 类型 / 类目"
        >
          <template slot-scope="scope">
            <img
              class="shop-type-icon"
              v-if="scope.row.shop_type === 1"
              src="@/assets/img/icons/taobao.png"
            >
            <img
              class="shop-type-icon"
              v-if="scope.row.shop_type === 2"
              src="@/assets/img/icons/tianmao.png"
            >
            <span class="shop-name">{{scope.row.shop_name}}</span>
            <div class="customer-type">{{categoryList[scope.row.category]}}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="110"
          label="公司名称 / 客户类型"
        >
          <template slot-scope="scope">
            <div class="company-name">{{scope.row.company_name}}</div>
            <div class="customer-type">{{companyTypeList[scope.row.company_type] ? companyTypeList[scope.row.company_type].value : '--'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="客户分类"
          align="center"
          :render-header="() => DispayHelp('khfl')"
        >
          <template slot-scope="scope">
            {{customerClassList[scope.row.customer_class] ? customerClassList[scope.row.customer_class].value : ''}}
          </template>
        </el-table-column>
        <el-table-column
          label="总合作数 / 次"
          align="center"
          :render-header="() => DispayHelp('zhzs')"
        >
          <template slot-scope="{row}">
            {{row.total_coop_times}}
          </template>
        </el-table-column>
        <el-table-column
          label="总合作金额"
          align="center"
          :render-header="() => DispayHelp('zhzje')"
        >
          <template slot-scope="{row}">
            {{row.total_coop_amount_str ? `￥${row.total_coop_amount_str}` : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          label="客户洽谈数 / 次"
          align="center"
        >
          <template slot-scope="{row}">
            {{row.conversation_times}}
          </template>
        </el-table-column>
        <el-table-column
          label="创建人 / 日期"
          width="140"
        >
          <template slot-scope="scope">
            <div class="company-name">{{scope.row.add_by}}</div>
            <div class="customer-type">{{addDateFormat(scope.row.gmt_create)}}</div>
            <!-- <p style="font-size: 12px">{{scope.row.add_by}}</p>
          <p style="font-size: 12px">{{ addDateFormat(scope.row.gmt_create) }}</p> -->
          </template>
        </el-table-column>
        <div
          slot="empty"
          class="empty-box"
          style="padding: 40px 0"
        >
          <img src="@/assets/img/anchor_nodata.png" />
        </div>
      </el-table>
      <div
        class="block"
        style="margin:16px 0 10px 0"
      >
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.currentPage"
          :page-sizes.sync="pagination.pageSizes"
          :page-size.sync="pagination.pageSize"
          layout="sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </el-row>
    <add-customer
      v-if="customerVisible"
      @close="close"
      @save="saveCustomer"
    ></add-customer>
  </section>
</template>
<script>
import {
  queryCustomer,
  queryUserNames,
  exportCustomers,
  delCustomer
} from "@/api/customer"
import {
  categoryFormate,
  addDateFormat,
  customerClassList,
  departmentList,
  customerLevelList,
  categoryList,
  shopType,
  companyType,
  shopTypeList,
  companyTypeList
} from "@/utils/format"
// import { USER_ROLE } from '@/utils/config'
import addCustomer from "./components/addCustomer.vue"
import stepMini from "./components/stepMini"
import { ROLE_CODE, RIGHT_CODE } from "@/const/roleCode"

export default {
  data () {
    return {
      RIGHT_CODE,
      categoryList,
      shopType,
      companyType,
      shopTypeList,
      companyTypeList,
      categoryIndex: 0,
      shopTypeIndex: 0,
      companyTypeIndex: 0,
      // 客户经理列表
      managerList: [],
      customerList: [],
      customerClass: "",
      customerClassType: 0,
      customerLevel: "",
      customerLevelType: 0,
      manager: "",
      addBy: "", // 创建人
      multArgs: "",
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 100
      },
      customerVisible: false,
      multipleSelection: [],
      // 客户分类
      customerClassList,
      // 部门
      departmentList,
      // 客户阶段
      customerLevelList,
      defaultVal: "-",
      tableLoading: true
    }
  },
  computed: {
    currentPage () {
      return this.$store.state.customer.currentPage
    }
  },
  created () {
    this.queryUserNames()
    this.queryCustomer()
  },
  methods: {
    // 表头帮助显示
    DispayHelp (type) {
      switch (type) {
        case "khfl": // 客户分类
          return (
            <span>客户分类
              <el-tooltip placement="top" effect="light">
                <div slot="content">
                  <p>根据合作金额划分：</p>
                  <p>普通客户0-50W</p>
                  <p>重点客户51-150W</p>
                  <p>战略客户151-250W</p>
                  <p>KA客户251W以上</p>
                </div>
                <i class="el-icon-question" style="cursor: pointer margin-left: 3px"></i>
              </el-tooltip>
            </span>
          )
        case "zhzs": // 总合作数
          return (
            <span> 总合作数 / 次
              <el-tooltip placement="top" effect="light">
                <div slot="content">
                  <p>有登记业绩金额的合作，算一次有效合作</p>
                </div>
                <i class="el-icon-question" style="cursor: pointer margin-left: 3px" ></i>
              </el-tooltip>
            </span>
          )
        case "zhzje": // 总合作金额
          return (
            <span>总合作金额
              <el-tooltip placement="top" effect="light">
                <div slot="content">
                  <p>该客户所有合作中，登记业绩金额的总和</p>
                </div>
                <i class="el-icon-question" style="cursor: pointer margin-left: 3px"></i>
              </el-tooltip>
            </span>
          )
        default:
          return <span>--</span>
      }
    },
    addCustomer () {
      this.customerVisible = true
    },
    close () {
      this.customerVisible = false
    },
    resetCustomer () {
      this.customerClass = ""
      this.customerClassType = 0
      this.addBy = ""
      this.multArgs = ""
      this.categoryIndex = 0
      this.shopTypeIndex = 0
      this.companyTypeIndex = 0
      // this.pagination.currentPage = 1
      this.$store.commit("customer/updatePage", 1)
      this.queryCustomer()
    },
    saveCustomer (data) {
      this.$gmMessage("保存成功")
      this.close()
      this.resetCustomer()
      this.queryCustomer()
    },
    // 获取用户
    queryUserNames () {
      // 角色（管理员1，客户执行0，客户经理2，项目经理3）
      let params = {
        role:
          ROLE_CODE.customer_manager + "," + ROLE_CODE.major_customer_manager
      }
      queryUserNames(params).then(res => {
        if (res.data.success) {
          this.managerList = res.data.data.user_data
        }
      })
    },
    selectCategory (index) {
      this.categoryIndex = index
      this.$store.commit("customer/updatePage", 1)
      this.queryCustomer()
    },
    selectshopType (index) {
      this.shopTypeIndex = index
      this.$store.commit("customer/updatePage", 1)
      this.queryCustomer()
    },
    selectcompanyType (index) {
      this.companyTypeIndex = index
      this.$store.commit("customer/updatePage", 1)
      this.queryCustomer()
    },
    /**
     * 绑定导出参数
     */
    bindExportParams () {
      this.exportParams = {
        category: this.categoryIndex,
        shop_type: this.shopTypeIndex,
        company_type: this.companyTypeIndex,
        add_by: this.addBy,
        customer_class: this.customerClassType,
        mult_args: this.multArgs
      }
    },
    // 点击查询客户列表
    clickQueryCustomer () {
      this.$store.commit("customer/updatePage", 1)
      this.queryCustomer()
    },
    // 获取客户列表
    queryCustomer () {
      let params = {
        category: this.categoryIndex === 0 ? "" : this.categoryIndex,
        shop_type: this.shopTypeIndex === 0 ? "" : this.shopTypeIndex,
        company_type: this.companyTypeIndex === 0 ? "" : this.companyTypeIndex,
        customer_class:
          this.customerClassType === 0 ? "" : this.customerClassType,
        add_by: this.addBy,
        mult_args: this.multArgs,
        num: this.pagination.pageSize,
        page_num: this.currentPage
      }
      // 绑定导出参数
      this.bindExportParams()
      this.tableLoading = true
      queryCustomer(params).then(res => {
        this.tableLoading = false
        if (res.data.success) {
          this.customerList = res.data.data.data
          this.pagination.total = res.data.data.total
          this.pagination.currentPage = this.currentPage
        }
      })
    },
    // 导出客户
    exportCustomers () {
      let customerIds = []
      let params = {
        customer_ids: ""
      }
      // 没选默认导出所有
      if (this.multipleSelection.length === 0) {
        if (this.exportParams) {
          params.category = this.exportParams.category || ""
          params.shop_type = this.exportParams.shop_type || ""
          params.company_type = this.exportParams.company_type || ""
          params.customer_class = this.exportParams.customer_class || ""
          if (this.exportParams.add_by) {
            params.add_by = this.exportParams.add_by
          }
          if (this.exportParams.mult_args) {
            params.mult_args = this.exportParams.mult_args
          }
        }
      } else {
        // 选了导出选择的
        customerIds = this.multipleSelection.map(c => c.id)
        params.customer_ids = JSON.stringify(customerIds)
      }
      exportCustomers(params)
    },
    // 删除客户
    delCustomer () {
      if (this.multipleSelection.length === 0) {
        this.$gmMessage("请先选择客户", "tip")
      } else {
        this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          iconClass: "warning-icon"
        }).then(() => {
          let customerId = []
          this.multipleSelection.forEach(item => {
            customerId.push(item.id)
          })
          let params = {
            customer_id: JSON.stringify(customerId)
          }
          delCustomer(params).then(res => {
            if (res.data.success) {
              this.$gmMessage("删除成功")
              this.queryCustomer()
            } else {
              this.$gmMessage(res.data.message, "tip")
            }
          })
        })
      }
    },
    goDetail (row) {
      this.$store.dispatch("cooperative/GetCustomerDetail", row.id).then(() => {
        this.$router.push({
          path: "/customer/detail",
          query: {
            id: row.id
          }
        })
      })
    },
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.$store.commit("customer/updatePage", 1)
      this.queryCustomer()
    },
    handleCurrentChange (val) {
      // this.pagination.currentPage = val
      this.$store.commit("customer/updatePage", val)
      this.queryCustomer()
    },
    // 选择客户分类
    selectCustomerClass (type) {
      this.customerClassType = type
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    categoryFormate,
    addDateFormat
  },
  components: {
    addCustomer,
    stepMini
  },
  watch: {
    currentPage (value) {
      this.pagination.currentPage = value
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/vars.scss';
.el-step-popover-wrapper {
  padding: 0 0 15px;
  .title {
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 34px;
    padding-left: 20px;
    border-bottom: 1px solid #f2f1f1;
  }
}
.customer-index-wrapper {
  .customer-table {
    td {
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '@/styles/vars.scss';
.customer-index-wrapper {
  .customer-operator {
    background: #fff;
    padding: 15px 10px 0;
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
            // padding: 0 17px
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
              color: #fff !important;
              background: $color-primary;
              border-radius: 15px;
            }
          }
        }
      }
    }
  }
  .shop-type-icon {
    width: 18px;
    height: 18px;
    vertical-align: text-bottom;
  }
  .shop-name {
    color: $color-primary;
    cursor: pointer;
    // font-weight: bold
  }
  .company-name {
    font-size: 14px;
    color: #666;
  }
  .customer-type {
    font-size: 12px;
    color: #888;
  }
  .step {
    cursor: pointer;
  }
  .customer-search-bar {
    padding: 14px 12px 0;
    .medium-label {
      color: #999;
      font-size: 14px;
    }
  }
  /deep/ .el-icon-question {
    color: #cccc;
  }
}
</style>
