<template>
  <div>
    <common-dialog ref="ChatRecordListDialog" :title="'洽谈记录'" :width="1000" @dialogCancel="handledialogCancel">
      <div class="chatrecordlist-container">
        <p class="title" v-if="CustomerDetail != null">
          <span>【店铺】</span>
          <span class="sname">{{CustomerDetail.shop_name}}</span>
        </p>
        <el-table
          :data="ChatRecord != null ? ChatRecord.data : []"
          :border="true"
          :stripe="true"
          style="width: 100%; margin-bottom: 10px;"
          :header-cell-style="{background:'#F5F6F9', height:'42px', color: '#666666', fontWeight: 'bold'}">
          <template slot="empty">
            <table-no-data :isvertical="false" :title="'还没有洽谈记录哦'"></table-no-data>
          </template>
          <el-table-column
            prop="conversation_date"
            label="洽谈时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="conversation_content"
            label="洽谈内容">
            <template slot-scope="{row}">
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                :disabled="row.conversation_content.length <= 12"
                :content="row.conversation_content">
                <span slot="reference" v-if="row.conversation_content.length > 12">{{row.conversation_content.substring(0, 12) + '...'}}</span>
                <span slot="reference" v-else>{{row.conversation_content}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="note"
            width="210"
            label="备 注">
            <template slot-scope="{row}">
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                :disabled="row.note.length <= 12"
                :content="row.note">
                <span slot="reference" v-if="row.note.length > 12">{{row.note.substring(0, 12) + '...'}}</span>
                <span slot="reference" v-else>{{row.note}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="follower"
            label="跟进人"
            width="150">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="{row}">
              <div v-if="judgeCurrentPower(row.add_by_id)">
                <el-tooltip placement="left" effect="light" content="编辑">
                  <span v-show="UserRoles.includes(RIGHT_CODE.update_conversation)"><i class="gm-icon gm-icon-edit" @click="editChatRecord(row)"></i></span>
                </el-tooltip>
                <el-tooltip placement="right" effect="light" content="删除">
                  <span v-show="UserRoles.includes(RIGHT_CODE.del_conversation)"><i class="gm-icon gm-icon-delete" @click="delChatRecord(row)"></i></span>
                </el-tooltip>
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="contract-pagination"
          background
          :current-page.sync="pagination.currentPage"
          :page-sizes.sync="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="ChatRecord != null ? ChatRecord.total : 0"
          @current-change="handleCurrentChange"
          @size-change="handlePageSizeChange">
        </el-pagination>
      </div>
    </common-dialog>
    <AddChatRecord ref="AddChatRecordDialog" />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {deleteConversation} from '@/api/cooperative'
import AddChatRecord from './AddChatRecord'
import {RIGHT_CODE} from '@/const/roleCode'
import CurrentUserPower from '../mixin/CurrentUserPower'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'ChatRecordList',
  components: {
    AddChatRecord
  },
  mixins: [CurrentUserPower, CooperativeStore],
  data () {
    return {
      RIGHT_CODE,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30]
      }
    }
  },
  computed: {
    ...mapGetters({
      ChatRecord: 'cooperative/ChatRecord'
    })
  },
  methods: {
    ...mapActions({
      GetConversation: 'cooperative/GetConversation'
    }),
    // 显示
    show () {
      this.$refs.ChatRecordListDialog.dialogOpen()
      this.getConversationByPage()
      this.judgeCurrentPower(999)
    },
    // 获取分页数据
    getConversationByPage () {
      this.GetConversation({
        customer_id: this.CustomerDetail.id || 0,
        num: this.pagination.pageSize,
        page_num: this.pagination.currentPage
      })
    },
    // 翻页
    handleCurrentChange () {
      this.getConversationByPage()
    },
    // 每页条数改变
    handlePageSizeChange (pageSize) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = pageSize
      this.getConversationByPage()
    },
    // 关闭弹窗
    handledialogCancel () {
      this.pagination = {
        currentPage: 1,
        pageSize: 10
      }
      this.getConversationByPage()
    },
    // 编辑记录
    editChatRecord (row) {
      let page = JSON.parse(JSON.stringify(this.pagination))
      this.$refs.AddChatRecordDialog.show(row, page)
    },
    // 删除记录
    delChatRecord (row) {
      this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'warning-icon'
      }).then(() => {
        deleteConversation({conversation_id: row.conversation_id}).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.getConversationByPage()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .chatrecordlist-container {
    padding: 15px 30px 30px 30px;
    font-size: 14px;
    .title {
      margin-bottom: 15px;
      .sname {
        color: $color-primary;
      }
    }
    /deep/ .el-table {
      border-right-width: 0;
    }
  }
</style>
