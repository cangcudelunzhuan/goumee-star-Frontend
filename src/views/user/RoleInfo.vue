<!--
 * @Description: 用户管理
 * @Author: your name
 * @Date: 2019-08-06 09:35:27
 * @LastEditTime: 2019-11-25 13:51:26
 * @LastEditors: 白青
 -->
<style lang="scss" scoped>
@import '@/styles/vars.scss';
.edit-user-dialog {
  .el-form-item__label {
    line-height: 16px;
    padding-bottom: 0;
  }
  .el-select {
    width: 100%;
  }
  .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .el-dialog__footer {
    border-top: 1px solid #f2f2f2;
  }
}
.sale-chance-wrap {
  background-color: #f8f8f8;
  padding: 5px 12px;
  line-height: 26px;
  margin: 10px 0;
  .chance-checkbox {
    margin: 0 5px 0 0;
    min-width: 110px;
  }
}
.sale-chance-wrap1 {
  padding: 6px 12px;
  line-height: 25px;
  .chance-checkbox {
    margin: 0 7px 0 0;
    min-width: 90px;
  }
}
/deep/ .el-table__expanded-cell[class*='cell'] {
  padding: 7px 7px 7px 45px !important;
}

.user-info-wrapper {
  .el-button--primary {
    width: 80px;
    padding: 8px 0;
    text-align: center;
    font-size: 14px;
  }
  .table-user {
    padding-left: 20px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .user-status {
    position: relative;
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: $color-primary;
      left: -12px;
      top: 6px;
    }
    &.user-status-0::before {
      background: #ff8549;
    }
    &.user-status-1::before {
      background: $color-primary;
    }
    &.user-status-2::before {
      background: #999999;
    }
    &.user-status-4::before {
      background: #f34b60;
    }
  }
  .list-wrap {
    background: #fff;
    margin-top: 12px;
    padding: 12px 12px 5px;
  }
  .search-wrap {
    background: #fff;
    padding: 5px 0 5px 12px;
    .el-input__inner {
      border-radius: 2px;
    }
  }
  .no-data {
    margin: 200px 0;
    p {
      color: #999999;
      margin-top: 5px;
    }
  }
  .serach-reset-btns {
    .el-button {
      vertical-align: middle;
      width: 80px;
    }
  }
  .oprate-icon-btn {
    display: block;
    width: 34px;
    height: 34px;
    display: inline-block;
    cursor: pointer;
    &.approval-icon {
      background-image: url(../../assets/img/contract_opreate_icon_edit_1.png);
      &:hover {
        background-image: url(../../assets/img/contract_opreate_icon_edit_2.png);
      }
    }
    &.re-approval-icon {
      background-image: url(../../assets/img/re_icon_default.png);
      &:hover {
        background-image: url(../../assets/img/re_icon_hover.png);
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.edit-user-dialog {
  .el-form-item {
    width: 80%;
    margin-left: 10%;
  }
}
.el-select .el-input {
  width: 130px;
}
.pls-search .el-input-group__prepend {
  background-color: #fff;
}
.confirm-change {
  float: right;
}
.userinfo-customer-dialog {
  /deep/ .el-dialog__header {
    background: #f8f8f8;
    padding: 0;
    border-bottom: #efefef solid 1px;
    .userinfo-customer-dialog-header {
      // background: #F8F8F8;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #666;
    }
    .el-dialog__headerbtn {
      top: 10px;
      right: 10px;
      i.el-dialog__close {
        color: #0b1536 !important;
        font-size: 30px;
        opacity: 0.5;
      }
    }
  }
  /deep/ .el-dialog__body {
    .approval-content {
      text-align: center;
      padding: 50px 0;
      .el-radio {
        & + .el-radio {
          padding-left: 60px;
        }
        span.el-radio__input,
        span.el-radio__label {
          vertical-align: text-top;
          font-size: 16px;
        }
      }
    }
    .edit-content {
      width: 550px;
      margin: 0 auto;
      .edit-input {
        display: inline-block;
        width: 483px;
        .el-input__inner {
          border-radius: 2px;
        }
      }
      .el-form-item__content {
        margin-bottom: 15px;
      }
    }
  }
  /deep/ .el-dialog__footer {
    border-top: #f5f5f5 solid 1px;
    padding: 20px;
    .el-button {
      width: 80px;
      padding: 8px 0;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
<style lang="scss">
.oprate-tips {
  height: 24px;
  line-height: 24px;
  padding: 0 12px;
  font-size: 12px;
  color: #666;
  min-width: initial;
}
.delete-user-confirm.el-message-box {
  .el-message-box__content {
    text-align: center;
    height: initial;
    .el-message-box__status {
      position: initial;
    }
    .el-message-box__message {
      top: initial;
    }
  }
}
</style>

<template>
  <section class="user-info-wrapper">
    <div class="search-wrap">
      <el-form
        :inline="true"
        :model="roleQuery"
        ref="searchForm"
        style="overflow:hidden; display: flex; margin-left: 25%;"
      >
        <el-form-item
          label="所属部门"
          prop="department"
        >
          <el-select
            v-model="roleQuery.department"
            size="small"
            style="width:150px;"
            clearable
            placeholder="请选择"
            @change="handleDepartChange"
            @clear="queryRoleList"
          >
            <el-option
              v-for="item in departList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="serach-reset-btns">
          <el-button
            type="primary"
            size="small"
            @click="queryUserInfosubmit()"
          >查询</el-button>
          <el-button
            type="info"
            plain
            size="small"
            @click="handleResetClick"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      class="list-wrap"
      style="margin-left: 25%;"
    >
      <el-table
        :header-cell-style="{background:'#f0f1f2',height:'48px',color:'#666'}"
        stripe
        :data="roleData"
        v-loading="userInfoDisplay_loading"
        style="width:50%"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="role_name"
          label="角色名"
          class-name="table-user"
        ></el-table-column>
        <el-table-column
          prop="department_str"
          label="所属部门"
          class-name="table-user"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="{row}">
            <el-popover
              placement="top"
              content="编辑"
              popper-class="oprate-tips"
              trigger="hover"
            >
              <i
                slot="reference"
                class="gm-icon gm-icon-edit"
                @click="handleEditClick(row)"
              ></i>
            </el-popover>
          </template>
        </el-table-column>
        <div
          class="no-data"
          slot="empty"
        >
          <img src="@/assets/img/pls_import_product.png">
          <p>没有找到用户</p>
        </div>
      </el-table>
      <!-- 分页 -->
      <div
        class="block"
        style="margin:16px 0 12px 0"
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
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog
      :visible="editDialogVisible"
      class="userinfo-customer-dialog"
      width="700px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleEditDialogClose"
    >
      <div
        class="userinfo-customer-dialog-header"
        slot="title"
      >编辑角色</div>
      <div class="edit-content">
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editForm"
        >
          <el-form-item
            label="角色名:"
            prop="role_name"
          >
            <el-input
              v-model="editForm.role_name"
              class="edit-input"
              size="small"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-table
          :data="powerData"
          style="width: 100%; margin-top: 9px;"
          :cell-style="{'padding': '10px 0px'}"
          :row-style="{'backgroundColor': '#ebeef5'}"
          :stripe="false"
          :show-header="false"
          :highlight-current-row="false"
          :default-expand-all="true"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <div class="sale-chance-wrap1">
                <el-checkbox-group
                  v-model="props.row.checkedPowers"
                  @change="val => handleCheckedPowersChange(val, props.row)"
                >
                  <el-checkbox
                    style="font-weight: 400 !important;"
                    class="chance-checkbox"
                    v-for="(right, index) in props.row.powers"
                    :label="right.code"
                    :key="index"
                  >{{right.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-checkbox
                style="font-weight: bolder !important;"
                v-model="scope.row.isSelectAll"
                @change="val => handleCheckdPowersAllChange(val, scope.row)"
              >{{ scope.row.name }}</el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        class="userinfo-customer-dialog-footer"
        slot="footer"
      >
        <el-button
          plain
          @click="handleEditDialogClose"
        >取消</el-button>
        <el-button
          type="primary"
          @click="handleEditSubmitClick"
        >确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { deleteUser } from "@/api/user"
import { loginRequired } from "@/utils/init"
import { getAllRoles, queryRole, getAllRights, UpdateRole } from "@/api/auth"
import { RIGHT_CODE } from "@/const/roleCode"
import { userStatus } from "@/const/options"
import { mapGetters, mapMutations } from "vuex"

const editFormRules = {
  role_name: { required: true, message: "请输入角色名称", trigger: "blur" }
}

export default {
  data () {
    return {
      powerData: [],
      activeNames: ["1"],
      departList: [],
      roleList: [],
      rightCodes: [],
      userStatus,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 0
      },
      roleQuery: {
        department: ""
      },
      roleData: [],
      userInfoDisplay_loading: false,
      dialogTableVisible: false,
      editDialogVisible: false,
      editForm: {
        role_code: undefined,
        role_name: undefined,
        right_codes: []
      },
      editFormRules
    }
  },
  computed: {
    ...mapGetters({
      UsersInfo: "user/getUserInfo"
    })
  },
  created () {
    const roleArr = this.$store.getters["user/getUserRole"]
    if (!roleArr.includes(RIGHT_CODE.view_users)) {
      this.$router.push({ path: "/" })
    }
    loginRequired()
    // this.select()
    this.queryRoleList()
    this.getDepartList()
    this.getRights()
  },
  methods: {
    ...mapMutations({
      updateUserPower: "user/updateUserPower",
      updateUserMenuPower: "user/updateUserMenuPower"
    }),
    // 选择每一个
    handleCheckedPowersChange (val, row) {
      row.isSelectAll = row.checkedPowers.length === row.powers.length
    },
    // 全选每一项
    handleCheckdPowersAllChange (val, row) {
      if (val) {
        row.powers.map(p => (p.isSelect = true))
        row.checkedPowers = row.powers.map(p => p.code)
      } else {
        row.powers.map(p => (p.isSelect = false))
        row.checkedPowers = []
      }
    },
    // 判断是否选择
    judgeCheckdPowers () {
      let selPowers = []
      this.powerData.map(p => {
        selPowers = selPowers.concat(p.checkedPowers)
      })
      return selPowers
    },
    // 每页数量发生变化
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.queryRoleList()
    },
    // 翻页
    handleCurrentChange () {
      this.queryRoleList()
    },
    // 点击查询按钮
    queryUserInfosubmit () {
      this.pagination.currentPage = 1
      this.queryRoleList()
    },
    // 获取角色列表
    queryRoleList () {
      const data = this.roleQuery
      this.userInfoDisplay_loading = true
      this.roleQuery.num = this.pagination.pageSize
      this.roleQuery.page_num = this.pagination.currentPage
      queryRole(data)
        .then(res => {
          const data = res.data
          if (data.success) {
            this.pagination.total = data.data.total
            this.roleData = data.data.data
          } else {
            this.$message({
              type: "warning",
              message: res.data.message,
              duration: 2000,
              showClose: true
            })
          }
          this.userInfoDisplay_loading = false
        })
        .catch(() => {
          this.userInfoDisplay_loading = false
        })
    },
    // 匹配状态名称
    stateFormat (isChecked) {
      let stateName = "--"
      const state = this.userStatus.find(item => item.value === isChecked)
      if (state) stateName = state.label
      return stateName
    },
    // 获取所有部门
    getDepartList () {
      getAllRoles().then(res => {
        if (res.data.success) {
          this.departList = res.data.data
        } else {
          this.$message({
            type: "warning",
            message: res.data.message
          })
        }
      })
    },
    // 获取所有权限
    getRights () {
      getAllRights().then(res => {
        if (res.data.success) {
          this.rightCodes = res.data.data
        } else {
          this.$message({
            type: "warning",
            message: res.data.message
          })
        }
      })
    },
    // 绑定权限数据
    bindPowerData () {
      let powersData = []
      let rightCodes = JSON.parse(JSON.stringify(this.rightCodes))
      let rightData = JSON.parse(JSON.stringify(this.editForm.right_codes))
      if (rightCodes) {
        rightCodes.map(r => {
          let newpower = {
            name: `${r.page_name}【模块】`,
            powers: [],
            isSelectAll: false,
            checkedPowers: []
          }
          if (r.rights && r.rights.length > 0) {
            r.rights.map(rc => {
              if (rightData.indexOf(rc.value) > -1) {
                newpower.checkedPowers.push(rc.value)
              }
              newpower.powers.push({
                code: rc.value,
                name: rc.label
              })
            })
            if (newpower.checkedPowers.length === newpower.powers.length) {
              newpower.isSelectAll = true
            }
          }
          powersData.push(newpower)
        })
      }
      this.powerData = powersData
    },
    // 部门选项选择事件
    handleDepartChange (depart) {
      this.roleList = []
      this.roleQuery.role = undefined
      const department = this.departList.find(item => item.value === depart)
      if (department) {
        this.roleList = department.children
      }
    },
    // 重置
    handleResetClick () {
      this.$refs.searchForm.resetFields()
      this.pagination.currentPage = 1
      this.queryRoleList()
    },
    // 点击编辑按钮
    handleEditClick (row) {
      this.editDialogVisible = true
      let editForm = {
        role_code: row.role_code,
        role_name: row.role_name,
        right_codes: row.right_code_list
      }
      this.editForm = editForm
      this.bindPowerData()
    },
    // 点击编辑弹窗保存
    handleEditSubmitClick () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          let selPowers = this.judgeCheckdPowers()
          if (selPowers.length <= 0) {
            this.$message.warning("请选择权限")
            return
          }
          this.editForm.right_codes = selPowers
          UpdateRole(this.editForm).then(res => {
            if (res.data.success) {
              // 更新当前用户的权限
              this.updateUserRole(this.editForm)
              this.roleData = []
              this.editDialogVisible = false
              this.queryRoleList()
              this.$refs.editForm.resetFields()
            }
            this.$message({
              type: res.data.success ? "success" : "warning",
              message: res.data.message,
              duration: 2000,
              showClose: true
            })
          })
        }
      })
    },
    // 更新用户角色
    updateUserRole (roleinfo) {
      if (roleinfo && roleinfo.role_code === this.UsersInfo.role) {
        // 按钮更新权限
        this.updateUserPower(roleinfo.right_codes)
        // 菜单权限
        this.updateUserMenuPower(this.$router.options.routes[3].children)
      }
    },
    // 关闭编辑弹窗处理方法
    handleEditDialogClose () {
      this.editDialogVisible = false
      this.$refs.editForm.resetFields()
    },
    // 禁用的优化删除操作
    handleDeleteClick (row) {
      // debugger
      this.$confirm(
        `此操作将永久删除用户【${row.username}】, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "delete-user-confirm"
        }
      )
        .then(() => {
          deleteUser({
            id: row.id
          }).then(res => {
            if (res.data.success) {
              this.queryRoleList()
              this.$message({
                type: "success",
                message: res.data.message,
                duration: 2000,
                showClose: true
              })
            } else if (res.data.message) {
              this.$message({
                type: "warning",
                message: res.data.message,
                duration: 2000,
                showClose: true
              })
            }
          })
        })
        .catch(() => { })
    }
  }
}
</script>
