<!--
 * @Description: 用户管理
 * @Author: your name
 * @Date: 2019-08-06 09:35:27
 * @LastEditTime: 2019-11-25 13:27:14
 * @LastEditors: 白青
 -->
<style lang="scss">
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
      width: 540px;
      margin: 0 auto;
      .edit-input {
        display: inline-block;
        width: 428px;
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
        :model="displayQuery"
        ref="searchForm"
        style="overflow:hidden; display: flex;"
      >
        <el-form-item
          label="所属部门"
          prop="department"
        >
          <el-select
            v-model="displayQuery.department"
            size="small"
            style="width:150px;"
            clearable
            placeholder="请选择"
            @change="handleDepartChange"
            @clear="queryUserList"
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
        <el-form-item
          label="所属角色"
          prop="role"
        >
          <el-select
            v-model="displayQuery.role"
            size="small"
            style="width:150px;"
            clearable
            no-data-text="请先选择部门"
            placeholder="请选择"
            @clear="queryUserList"
          >
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="状态"
          prop="is_checked"
        >
          <el-select
            v-model="displayQuery.is_checked"
            size="small"
            style="width:150px;"
            clearable
            placeholder="请选择"
            @clear="queryUserList"
          >
            <el-option
              v-for="item in userStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="displayQuery.username"
            placeholder="请输入用户名 / 手机号"
            class="pls-search"
            clearable
            size="small"
            @clear="queryUserList"
          ></el-input>
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
    <div class="list-wrap">
      <el-table
        :header-cell-style="{background:'#f0f1f2',height:'48px',color:'#666'}"
        stripe
        :data="displayData"
        v-loading="userInfoDisplay_loading"
        style="width:100%"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          class-name="table-user"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          class-name="table-user"
        >
          <template slot-scope="{row}">
            {{row.phone || '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="role"
          label="所属部门"
        >
          <template slot-scope="{row}">
            {{row.user_roles && row.user_roles[0] ? row.user_roles[0].department : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="role"
          label="所属角色"
        >
          <template slot-scope="{row}">
            {{row.user_roles && row.user_roles[0] ? row.user_roles[0].role_name : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="register_time_str"
          label="注册时间"
          width="120"
        >
          <template slot-scope="{row}">
            {{addDateFormat(row.register_time_str, 'YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="last_login_time_str"
          label="最后登录"
          width="160"
        >
          <template slot-scope="{row}">
            {{row.last_login_time_str || '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="is_checked"
          label="状态"
          align="center"
        >
          <template slot-scope="{row}">
            <span :class="`user-status user-status-${row.is_checked}`">{{stateFormat(row.is_checked)}}</span>
          </template>
        </el-table-column>
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
                v-if="row.is_checked === 1 || row.is_checked === 2"
                slot="reference"
                class="gm-icon gm-icon-edit"
                @click="handleEditClick(row)"
              ></i>
            </el-popover>
            <el-popover
              placement="top"
              content="审核"
              popper-class="oprate-tips"
              trigger="hover"
            >
              <i
                v-if="row.is_checked === 0"
                slot="reference"
                class="oprate-icon-btn approval-icon"
                @click="handleApprovalClick(row)"
              ></i>
            </el-popover>
            <el-popover
              placement="top"
              content="重新审核"
              popper-class="oprate-tips"
              trigger="hover"
            >
              <i
                v-if="row.is_checked === 4"
                slot="reference"
                class="oprate-icon-btn re-approval-icon"
                @click="handleEditClick(row)"
              ></i>
            </el-popover>
            <el-popover
              placement="top"
              content="删除用户"
              popper-class="oprate-tips"
              trigger="hover"
            >
              <i
                v-if="row.is_checked === 2"
                slot="reference"
                class="gm-icon gm-icon-delete"
                @click="handleDeleteClick(row)"
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
    <!-- 编辑用户弹窗 -->
    <!-- <el-dialog title="编辑用户信息" :visible.sync="dialogTableVisible" :close-on-click-modal="false" append-to-body width="30%" class="edit-user-dialog" :close-on-press-escape="false">
      <el-form :inline="false" :data="updateUserInfo" label-width="80px" label-position="top">
        <el-form-item label="角色">
          <el-select placeholder="请选择角色" v-model="updateUserInfo.role" size="small">
            <el-option v-for="item in updateUserInfo.roleOptions" :label="item.label" :key="item.value" :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select placeholder="请选择状态" v-model="updateUserInfo.is_checked" size="small">
            <el-option v-for="item in updateUserInfo.stateOptions" :label="item.label" :key="item.value" :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible=false" size="small" style="width:80px">取消</el-button>
      <el-button type="primary" @click="updateUserInfoSubmit()" size="small" style="width:80px">保存</el-button>
      </span>
    </el-dialog> -->
    <!-- 审核弹窗 -->
    <el-dialog
      :visible="approvalDialogVisible"
      class="userinfo-customer-dialog"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="approvalDialogVisible = false"
    >
      <div
        class="userinfo-customer-dialog-header"
        slot="title"
      >审核</div>
      <div class="approval-content">
        <el-radio-group v-model="approvalForm.is_checked">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="4">拒绝</el-radio>
        </el-radio-group>
      </div>
      <div
        class="userinfo-customer-dialog-footer"
        slot="footer"
      >
        <el-button
          plain
          @click="approvalDialogVisible = false"
        >取消</el-button>
        <el-button
          type="primary"
          @click="handleApprovalSubmitClick"
        >确定</el-button>
      </div>
    </el-dialog>
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
      >编辑用户</div>
      <div class="edit-content">
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editForm"
          label-width="110px"
        >
          <el-form-item
            label="用户角色："
            prop="role"
          >
            <el-cascader
              v-model="editForm.role_selected_arr"
              class="edit-input"
              :options="departList"
              size="small"
              separator=">"
              placeholder="请选择用户角色"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="修改用户名："
            prop="username"
          >
            <el-input
              v-model="editForm.username"
              class="edit-input"
              size="small"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="修改密码："
            prop="password"
          >
            <el-input
              v-model="editForm.password"
              type="password"
              class="edit-input"
              size="small"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="状态："
            prop="is_checked"
          >
            <el-radio-group v-model="editForm.is_checked">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
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
import { queryUser, UpdateUser, deleteUser } from "@/api/user"
import { loginRequired } from "@/utils/init"
import { getAllRoles } from "@/api/auth"
import { addDateFormat } from "@/utils/format"
// import {getUserInfo} from '@/api/auth'
// import { USER_ROLE } from '@/utils/config'
import { RIGHT_CODE } from "@/const/roleCode"
import { userStatus } from "@/const/options"

const editFormRules = {
  role: [{ required: true, message: "请选择用户角色", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  is_checked: [{ required: true, message: "请选择用户状态", trigger: "blur" }]
}

export default {
  data () {
    return {
      departList: [],
      roleList: [],
      userStatus,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 0
      },
      displayQuery: {
        username: "",
        department: "",
        role: "",
        is_checked: ""
      },
      updateUserInfo: {
        userId: "",
        username: "",
        role: "",
        is_checked: "",
        roleOptions: [
          {
            value: 0,
            label: "客户执行"
          },
          {
            value: 1,
            label: "管理员"
          },
          {
            value: 2,
            label: "客户经理"
          },
          {
            value: 3,
            label: "项目经理"
          }
        ],
        stateOptions: [
          {
            value: 0,
            label: "未审核"
          },
          {
            value: 1,
            label: "已审核"
          },
          {
            value: 2,
            label: "禁用"
          }
        ]
      },
      editUserData: [],
      displayData: [],
      userInfoDisplay_loading: false,
      dialogTableVisible: false,

      // 审核
      approvalDialogVisible: false,
      approvalForm: {
        id: undefined,
        is_checked: undefined
      },
      editDialogVisible: false,
      editForm: {
        id: undefined,
        username: undefined,
        role: undefined,
        role_selected_arr: undefined,
        is_checked: undefined,
        password: undefined
      },
      editFormRules
    }
  },
  created () {
    const roleArr = this.$store.getters["user/getUserRole"]
    if (!roleArr.includes(RIGHT_CODE.view_users)) {
      this.$router.push({ path: "/" })
    }

    loginRequired()
    // this.select()
    this.queryUserList()
    this.getDepartList()
  },
  methods: {
    addDateFormat,
    // 每页数量发生变化
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.queryUserList()
    },
    // 翻页
    handleCurrentChange () {
      this.queryUserList()
    },
    // 点击查询按钮
    queryUserInfosubmit () {
      this.pagination.currentPage = 1
      this.queryUserList()
    },
    // 获取列表
    queryUserList () {
      const data = this.displayQuery
      this.userInfoDisplay_loading = true
      this.displayQuery.num = this.pagination.pageSize
      this.displayQuery.page_num = this.pagination.currentPage
      queryUser(data)
        .then(res => {
          const data = res.data
          if (data.success) {
            this.pagination.total = data.data.total
            this.displayData = data.data.data
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
        // console.log(res)
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
    // 部门选项选择事件
    handleDepartChange (depart) {
      this.roleList = []
      this.displayQuery.role = undefined
      const department = this.departList.find(item => item.value === depart)
      if (department) {
        this.roleList = department.children
      }
    },
    // 重置
    handleResetClick () {
      this.$refs.searchForm.resetFields()
      this.pagination.currentPage = 1
      this.queryUserList()
    },
    // 点击审核按钮
    handleApprovalClick (row) {
      // console.log(row)
      this.approvalDialogVisible = true
      this.approvalForm.is_checked = row.is_checked
      this.approvalForm.id = row.id
    },
    // 点击审核弹窗保存
    handleApprovalSubmitClick () {
      if (!this.approvalForm.is_checked) {
        return this.$message({
          type: "warning",
          message: "请选择审核状态",
          duration: 2000,
          showClose: true
        })
      }

      UpdateUser(this.approvalForm).then(res => {
        if (res.data.success) {
          // 初始化数据
          this.displayData = []
          this.approvalDialogVisible = false
          this.queryUserList()
          this.$message({
            type: "success",
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
        } else {
          this.$message({
            type: "warning",
            message: res.data.message,
            duration: 2000,
            showClose: true
          })
        }
      })
    },
    // 点击编辑按钮
    handleEditClick (row) {
      this.editDialogVisible = true
      // const detail = row
      for (let key in this.editForm) {
        if (row[key]) {
          this.editForm[key] = row[key]
        }
      }
      // this.editForm = detail
      this.editForm.role_selected_arr = [
        parseInt(row.user_roles[0].department_code),
        row.user_roles[0].role_code
      ]
      // debugger
    },
    // 点击编辑弹窗保存
    handleEditSubmitClick () {
      this.editForm.role = this.editForm.role_selected_arr[1]
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // console.log(this.editForm)
          UpdateUser(this.editForm).then(res => {
            if (res.data.success) {
              this.displayData = []
              this.editDialogVisible = false
              this.queryUserList()
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
              this.queryUserList()
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
