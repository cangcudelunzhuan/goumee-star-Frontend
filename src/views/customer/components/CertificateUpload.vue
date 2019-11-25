<template>
  <common-dialog ref="certificateUploadDialog" :isAppendToBody="true" :title="'上传' + name" :width="500" :isfooter="false" @dialogCancel="dialogCancelHandle">
    <div style="padding-bottom: 15px;">
      <el-upload style="padding: 10px 50px;" action="" :http-request="uploadPlans" :show-file-list="false" :accept="descriptionAccepts.join(',')">
        <el-button class="mr10" slot="trigger" size="small" type="primary" v-loading="loading">上传文件</el-button>
        <span slot="tip" class="el-upload__tip">
          支持扩展名：.jpg .jpeg .png
        </span>
      </el-upload>
      <div class="fujian-list clearfix" v-if="certificate_pic != ''" style="margin-left: 50px">
        <i class="iconfont iconfujian mr5"></i>
        <span class="brand-color mr5">{{certificate_pic.split('/')[certificate_pic.split('/').length -1] || '--'}}</span>
        <i class="el-icon-error" @click="removePlan()"></i>
      </div>
    </div>
  </common-dialog>
</template>

<script>
import {uploadCertificate} from '@/api/cooperative'

export default {
  name: 'CertificateUpload',
  props: ['id', 'name', 'type'],
  data() {
    return {
      descriptionAccepts: ['jpg', 'jpeg', 'png'], // 扩展名
      loading: false,
      certificate_pic: ''
    }
  },
  methods: {
    // 显示
    show () {
      this.certificate_pic = ''
      this.$refs.certificateUploadDialog.dialogOpen()
    },
    /**
     * 上传文件成功时回调
     */
    uploadPlans(params) {
      let vm = this
      let file = params.file
      let fileType = file.name.split('.')[file.name.split('.').length - 1]
      var found = this.descriptionAccepts.find(type => {
        return type.toLowerCase() === fileType.toLowerCase()
      })
      if (!found) {
        this.$message.error('上传格式不正确！')
        return
      }
      // if (file.size > 2 * 1024 * 1024) {
      //   this.$message.error('上传图片需小于2M')
      //   return
      // }
      this.loading = true
      let form = new FormData()
      form.append('file', file)
      form.append('achievement_or_cost_id', this.id)
      form.append('type', this.type)
      uploadCertificate(form).then(data => {
        vm.loading = false
        if (data.data && data.data.success) {
          vm.certificate_pic = data.data.data.source
          this.$message.success(this.name + '上传成功！')
        } else {
          this.$message.error(this.name + '上传失败！')
        }
      }).catch(() => {
        vm.loading = false
      })
    },
    /**
     * 删除凭证
     * @param
     */
    removePlan() {
      this.certificate_pic = ''
    },
    // 关闭弹窗
    dialogCancelHandle () {
      this.$emit('uploadClose', this.certificate_pic === '')
    }
  }
}
</script>

<style lang="scss" scoped>
  //附件
  .fujian-list {
    display: inline-block;
    margin-right: 20px;
    line-height: 15px;
    i {
      color: #999;
    }
  }
</style>
