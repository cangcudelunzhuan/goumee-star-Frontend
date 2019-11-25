<template>
  <el-dialog
    :visible="dialogVisible"
    :width="width ? `${width}px` : '800px'"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="common-dialog"
    :modal="ismodal"
    :append-to-body="isAppendToBody"
    @close="handleCancelClick"
  >
    <div :class="['title', {'sub': subtitle && subtitle !== ''}]" slot="title">
      {{title}}
      <span v-if="subtitle" class="sub-title">{{subtitle}}</span>
    </div>
    <slot />
    <div v-if="isfooter" slot="footer" class="dialog-footer">
      <el-button @click="handleCancelClick">取 消</el-button>
      <el-button type="primary" @click="handleSubmitClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CommonDialog',
  props: ['title', 'width', 'isfooter', 'subtitle', 'ismodal', 'isAppendToBody', 'isDestroyOnClose'],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    // 打开弹窗
    dialogOpen () {
      this.dialogVisible = true
    },
    // 关闭弹窗
    dialogClose () {
      this.dialogVisible = false
    },
    // 取消按钮
    handleCancelClick () {
      this.dialogClose()
      this.$emit('dialogCancel')
    },
    // 确定按钮
    handleSubmitClick () {
      this.$emit('dialogSubmit')
    }
  }
}
</script>

<style lang="scss">
  .common-dialog {
    .el-dialog__header {
      background-color: #F8F8F8;
      padding: 0;
      height: 50px;
      line-height: 50px;
      border-bottom: #EFEFEF solid 1px;

      .title {
        color: #666;
        font-size: 16px;
      }
      .sub {
        float: left;
        margin-left: 15px;
        .sub-title {
          font-size:12px;
          font-weight:400;
          margin-left: 10px;
          color:rgba(136,136,136,1) !important;
        }
      }
      .el-dialog__headerbtn {
        top: 14px;
        font-size: 22px;
        right: 15px;
        .el-dialog__close {
          color: #999!important;
        }
      }
    }
    .el-dialog__body {
      padding: 0;
      .el-form-item__error {
        padding: 0;
      }
    }
    .el-dialog__footer {
      padding-top: 25px;
      padding-bottom: 40px;
      .dialog-footer {
        .el-button {
          height: 34px;
          padding: 0;
          line-height: 33px;
          width: 80px;
        }
      }
    }
  }
</style>
