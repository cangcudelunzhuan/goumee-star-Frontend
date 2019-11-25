<style lang="scss" scoped>
  .upload-wrap {
    padding: 90px 0;
    text-align: center;
  }
  .upload-area {
    width: 500px;
    margin: 0 auto;
    border: #D0D0D0 dashed 1px;
    background: #FCFCFC;
    border-radius: 2px;
  }
  .import {
    width: 500px;
    height: 240px;
    overflow: hidden;
    .upload-icon {
      width: 78px;
      height: 70px;
      background: url(../../assets/img/import_icon.png) no-repeat;
      margin: 60px auto 20px;
    }
    .upload-title {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
    .upload-tip {
      color: #bbb;
      font-size: 12px;
    }
    &:hover {
      .upload-icon {
        background-position: -78px 0;
      }
    }
  }
  .download-template-link {
    display: inline-block;
    margin: 20px 0;
    text-decoration: none;
    color: #666;
    width: 140px;
    height: 34px;
    line-height: 34px;
    border-radius: 2px;
    font-size: 14px;
    border: solid 1px #dcdcdc;
    background: #f6f6f6;
    &:hover {
      background: #f2f2f2;
      color: #555;
    }
    &:active {
      border-color: #5c82ff;
    }
  }
</style>

<template>
  <div class="upload-wrap">
    <el-upload
      class="upload-area"
      action="/"
      multiple
      :http-request="handleImport"
      :show-file-list="false"
    >
      <el-button size="small" :loading="uploadLoading">
        <div class="import">
          <div class="upload-icon"></div>
          <p class="upload-title">批量导入{{uploadText}}</p>
          <p class="upload-tip">点击此处选择要导入的文件</p>
        </div>
      </el-button>
    </el-upload>
    <el-row style="text-align:center; margin-top:12px; margin-left:33px">
      <a :href="fileurl" class="download-template-link" target="_blank">下载模板</a>
      <slot></slot>
    </el-row>
  </div>
</template>

<script>
import { uploadFile } from '@/api/upload'
import {fileMaxSize, fileMaxSizeTips} from '@/utils/config'
export default {
  props: [
    'uploadText',
    'uploadKey',
    'downloadSrc'
  ],
  data () {
    return {
      uploadLoading: false
    }
  },
  computed: {
    fileurl() {
      return `${window.location.origin}${this.downloadSrc}`
    }
  },
  methods: {
    handleImport (param) {
      this.uploadLoading = true
      let {file} = param
      if (file.size > fileMaxSize) {
        this.$message.error(fileMaxSizeTips)
        this.uploadLoading = false
        return
      }
      const formData = new FormData()
      formData.append('operate', this.uploadKey)
      formData.append('file', file, file.name)
      uploadFile(formData).then(res => {
        this.uploadLoading = false
        this.$gmMessage({
          content: res.data.message,
          type: 'success',
          showBtn: true,
          duration: 0,
          submutConfig: {
            visible: true,
            primaryText: '查看结果',
            infoText: '继续导入',
            callback: () => {
              this.$router.push({
                path: '/operation-center/import-log'
              })
            }
          }
        })
      }).catch(() => {
        this.uploadLoading = false
        this.$message({
          type: 'warning',
          message: '导入出错，请稍后重试'
        })
      })
      return false
    }
  }
}
</script>
