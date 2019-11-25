<template>
  <common-dialog ref="ImageDialog" :isAppendToBody="true" :title="title || '预览图片'" :width="600" :isfooter="false">
    <img :src="`${imgsrc}?Authorization=${getToken()}`" alt="" class="dis-img"/>
  </common-dialog>
</template>

<script>
import { getToken } from '@/utils/token'

export default {
  name: 'ImageDialog',
  props: ['title', 'imgsrc'],
  methods: {
    getToken,
    show () {
      this.$refs.ImageDialog.dialogOpen()
    }
  }
}
</script>

<style lang="scss" scoped>
  .dis-img {
    width:100%;
    height:100%;
  }
  /deep/ .el-dialog__header {
    margin-bottom: 0px;
  }
</style>
