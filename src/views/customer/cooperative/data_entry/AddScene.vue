<template>
  <common-dialog ref="AddSceneDialog" :title="'新增场次'" :width="800" @dialogCancel="handledialogCancel" :isfooter="false">
    <div class="addscene-container">
      <CustomerStageProgress :isvertical="false" :stage="5" :issimple="true"/>
      <hr class="line" />
      <div class="addsceneform">
        <div class="cutom-header" slot="title">
          <span
            :class="['dialog-tab', dialogShowBlockIndex === 0 ? 'active' : '']"
            @click="dialogShowBlockIndex = 0">新增场次</span>
          <span
            :class="['dialog-tab', dialogShowBlockIndex === 1 ? 'active' : '']"
            @click="dialogShowBlockIndex = 1">批量导入</span>
        </div>
        <div v-show="dialogShowBlockIndex === 0">
          <el-form :inline="true" size="small" :model="displayInfoForm" label-width="80px" label-position="top" ref="displayInfoForm">
            <el-form-item label="直播标题" prop="title">
              <el-input name="title" v-model="displayInfoForm.title" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="主播昵称" prop="starName" :rules="[{required: true, message: '主播昵称是必填项'}]">
              <el-autocomplete
                name="starName"
                v-model="displayInfoForm.starName"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelectAdd"
                :fetch-suggestions="querySearchAdd"
                @keyup.native="starKeyUp">
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="主 播 ID" prop="starId" :rules="[{required: true, message: '主播id是必填项'}]">
              <el-input name="starId" v-model="displayInfoForm.starId" placeholder="请输入内容" type="number"></el-input>
            </el-form-item>
            <el-form-item label="场次PV" prop="pv" :rules="[{required: true, message: '场次PV是必填项'}]">
              <el-input name="pv" v-model="displayInfoForm.pv" placeholder="请输入内容" type="number">
                <template slot="append">万</template>
              </el-input>
            </el-form-item>
            <el-form-item label="场次UV" prop="uv">
              <el-input type="number" v-model="displayInfoForm.uv">
                <template slot="append">次</template>
              </el-input>
            </el-form-item>
            <el-form-item label="直播类型" prop="displayType" :rules="[{required: true, message: '直播类型是必填项'}]">
              <el-select name="displayType" v-model="displayInfoForm.displayType" placeholder="请选择直播类型">
                <el-option v-for="item in displayTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="直播日期" prop="displayTime" :rules="[{required: true, message: '直播时间是必填项'}]">
              <el-date-picker
                name="displayTime"
                v-model="displayInfoForm.displayTime"
                placeholder="请选择直播日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否预售场" prop="isPresell" :rules="[{required: true, message: '是否预售场为必填项'}]">
              <el-select placeholder="请选择是否为预售场" name="isPresell" v-model="displayInfoForm.isPresell">
                <el-option v-for="(item, index) in presellSelectOption" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="import-wrap" v-show="dialogShowBlockIndex === 1">
          <el-row style="text-align:center">
            <el-upload v-if="isAdminUser" class="display-import-button" ref="upload" :action='""' :http-request="uploadDisplay" :show-file-list="false" multiple :file-list="fileList">
              <el-button size="small" type="primary" :loading="uploadLoading" style="width:auto">
                <div class="upload-icon"></div>
                <p class="icon-title">导入场次</p>
                <p class="icon-tip">点击此处选择要导入的文件</p>
              </el-button>
            </el-upload>
          </el-row>
          <el-row style="text-align:center; margin-top:25px" class="download-btns">
            <el-button size="small" type="info" plain @click="downloadModelxlsx">下载模板</el-button>
            <el-button size="small" type="info" plain @click="downloadModelDesc">下载使用说明文档</el-button>
          </el-row>
        </div>
      </div>
      <span v-show="dialogShowBlockIndex === 0" slot="footer" class="dialog-footer">
        <el-button size="small" style="width:80px" @click="handledialogCancel">取消</el-button>
        <el-button type="primary" style="width:80px" size="small" @click="saveDisplays('displayInfoForm')">添加</el-button>
      </span>
    </div>
  </common-dialog>
</template>

<script>
import CustomerStageProgress from '../components/CustomerStageProgress'
import { ROLE_CODE, RIGHT_CODE } from '@/const/roleCode'
import {presellSelectOption, displayTypeOptions} from '@/const/options'
import {fileMaxSize, fileMaxSizeTips} from '@/utils/config' // USER_ROLE
import {domain} from '@/utils/variable'
import {queryStarSug} from '@/api/star'
import {saveDisplay} from '@/api/display'
import {uploadFile} from '@/api/upload'
import PubSub from 'pubsub-js'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'AddScene',
  components: {
    CustomerStageProgress
  },
  mixins: [CooperativeStore],
  data() {
    return {
      domain,
      ROLE_CODE,
      RIGHT_CODE,
      checkStar: false,
      displayTypeOptions,
      allStars: [],
      dialogShowBlockIndex: 0, // 场次弹窗标志
      displayInfoForm: {
        title: '',
        starName: '',
        starId: '',
        category: '',
        displayType: '',
        pv: '',
        displayTime: null,
        id: '',
        isPresell: ''
      },
      isAdminUser: true,
      presellSelectOption,
      fileList: [],
      starSuggest: [],
      uploadLoading: false
    }
  },
  methods: {
    show () {
      const role = this.$store.getters['user/getUserRole']
      if (role === ROLE_CODE.customer_manager) {
        this.isAdminUser = false
      }
      this.getStarSug()
      this.$refs.AddSceneDialog.dialogOpen()
    },
    // 主播昵称输入的时候
    starKeyUp: function () {
      // console.log(Date.now())
      this.starSuggest = this.allStars
      this.allStars.forEach(star => {
        if (star.value !== this.displayInfoForm.starName) {
          this.displayInfoForm.starId = ''
        }
      })
    },
    // 加载对应的输入建议
    querySearchAdd (queryString, cb) {
      var starSuggest = this.starSuggest
      var results = queryString ? starSuggest.filter(this.createFilter(queryString)) : starSuggest
      cb(results)
    },
    createFilter (queryString) {
      return (starSuggest) => {
        return (starSuggest.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 点击主播昵称选项
    handleSelectAdd (item) {
      this.displayInfoForm.starId = item.star_id
    },
    getStarSug () {
      queryStarSug({
        num: 10000
      }).then((response) => {
        let result = response.data
        if (result.success) {
          this.allStars = []
          result.data.star_data.forEach((item) => {
            this.allStars.push({
              'value': item.star_name,
              'star_id': item.star_id
            })
          })
        } else {
          if (result.error_code !== 100) {
            this.$gmMessage(result.message, 'tip')
          }
        }
      })
    },
    // 取消弹窗
    handledialogCancel () {
      this.$refs.displayInfoForm.resetFields()
      this.$refs.AddSceneDialog.dialogClose()
    },
    // 保存场次
    saveDisplays: function (formName) {
      // 判断验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.allStars.forEach((item) => {
            if (this.displayInfoForm.starName === item.value && this.displayInfoForm.starId === item.star_id) {
              this.checkStar = true
            }
          })
          if (this.checkStar) {
            let displaypass = {
              'star_id': this.displayInfoForm.starId,
              'star_name': this.displayInfoForm.starName,
              'title': this.displayInfoForm.title,
              'display_type': this.displayInfoForm.displayType,
              'pv': this.displayInfoForm.pv,
              'display_time': this.displayInfoForm.displayTime,
              'is_presell': this.displayInfoForm.isPresell,
              'uv': this.displayInfoForm.uv,
              cooperation_id: this.CooperationDetail.cooperation_id
            }
            if (displaypass.is_presell) {
              displaypass.is_presell = 1
            } else {
              displaypass.is_presell = 0
            }
            saveDisplay(displaypass).then((response) => {
              let data = response.data
              if (data.success) {
                this.$gmMessage(data.message)
                // 更新合作详情
                this.GetCooperationDetail({
                  customer_id: this.CustomerDetail.id,
                  cooperation_id: this.CooperationDetail.cooperation_id
                })
                // 更新合作详情状态
                this.SetCooperationdetailStatus(5)
                // 推送消息
                this.addSceneToData()
                this.$refs.AddSceneDialog.dialogClose()
              } else {
                this.$gmMessage(data.message, 'tip')
              }
            }).catch((error) => {
              console.log(error)
            })
          } else {
            this.$gmMessage('请检查主播ID和主播昵称', 'tip')
          }
        } else {
          return false
        }
      })
    },
    // 导入场次
    uploadDisplay (param) {
      this.uploadLoading = true
      let file = param.file
      if (file.size > fileMaxSize) {
        this.$message.error(fileMaxSizeTips)
        this.uploadLoading = false
        return
      }
      let form = new FormData()
      form.append('file', file)
      form.append('param_id', this.CooperationDetail.cooperation_id)
      form.append('operate', 'display')
      uploadFile(form).then(response => {
        let result = response.data
        if (result.success) {
          this.addSceneToData()
          this.$gmMessage({
            content: result.message,
            type: 'success',
            showBtn: true,
            duration: 0,
            submutConfig: {
              visible: true,
              primaryText: '查看结果',
              infoText: '继续导入',
              callback: () => {
                this.$refs.AddSceneDialog.dialogClose()
                this.$router.push({
                  path: '/operation-center/import-log'
                })
              }
            }
          })
          this.uploadLoading = false
        } else {
          this.$gmMessage(result.message, 'tip')
          this.uploadLoading = false
        }
      })
    },
    // 下载模板
    downloadModelxlsx: function () {
      window.open(this.domain + '/api/star/upload_display_template')
    },
    // 下载doc模板
    downloadModelDesc () {
      window.open(this.domain + '/template/display_upload_doc.docx')
    },
    // 推送消息
    addSceneToData () {
      PubSub.publish('addScene', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .addscene-container {
    padding-bottom: 20px;
    .line {
      border: 1px solid #F5F5F5;
    }
    .addsceneform {
      border: 1px solid #DFDFDF;
      margin: 30px 50px;
      padding-bottom: 25px;
    }
    .el-form-item__error {
      margin-right: 10%;
      top: -16px;
    }
    .el-form-item__label {
      padding-bottom: 0;
      line-height: 18px;
      margin-left: 10%;
    }
    .el-dialog__footer {
      border-top: 1px solid #f0f1f2;
      padding: 15px 20px;
    }
    .el-dialog__body {
      padding: 10px 20px;
    }
    .el-dialog__header {
      background: #F8F8F8;
      border-bottom: #EFEFEF solid 1px;
      color: #666;
      .el-dialog__headerbtn .el-dialog__close {
        color: #909399!important;
        position: relative;
        top: -7px;
      }
    }
  }
</style>
<style>
  .addscene-container .el-form-item--small .el-form-item__label {
    line-height: 15px;
    padding-bottom: 4px;
  }
  .addscene-container .el-dialog {
    min-width: 600px;
    max-width: 600px;
  }
  .addscene-container .el-dialog__header {
    background: #F8F8F8;
    border-bottom: #EFEFEF solid 1px;
    color: #666;
    padding: 0;
    text-align: left!important;
  }
  .addscene-container .el-dialog__headerbtn i {
    color: #909399!important;
    position: relative;
    top: -3px;
  }
  .addscene-container .cutom-header {
    background: #F9F9F9;
    margin-bottom: 30px;
  }
  .addscene-container .cutom-header span {
    color: #666!important;
    line-height: 50px;
    display: inline-block;
    width: 120px;
    text-align: center;
    cursor: pointer;
  }
  .addscene-container .cutom-header span.active {
    background: #fff;
    color: #5C82FF!important;
    position: relative;
  }
  .addscene-container .cutom-header span.active::after {
    content: " ";
    display: block;
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: -2px;
    background: #fff;
  }
  .addscene-container .el-form-item {
    width: 79%;
    margin: 2px auto;
    position: relative;
    margin-left: 10%;
  }
  .addscene-container .el-autocomplete {
    width: 100%;
  }
  .addscene-container .el-select.el-select--small {
    width: 100%;
  }
  .addscene-container .el-date-editor.el-input {
    width: 100%;
  }
  .addscene-container .dialog-footer{
    display: block;
    text-align: center;
    margin-top: 20px;
  }
  .addscene-container .import-wrap .el-upload {
    display: block;
    width: 500px;
    height: 240px;
    margin: 0 auto;
  }
  .addscene-container .import-wrap .el-upload button {
    display: block;
    width: 100%!important;
    height: 100%;
    background: #FCFCFC;
    border: #D0D0D0 dashed 1px;
  }
  .addscene-container .upload-icon {
    width: 78px;
    height: 70px;
    background: url(../../../../assets/img/import_icon.png) 0 0 no-repeat;
    margin: 0 auto;
  }
  .addscene-container  .import-wrap .el-upload button:hover .upload-icon {
    background-position: -78px 0;
  }
  .display-table .el-table__row {
    cursor: pointer;
  }
  .display-title {
    height: 23px;
    display: block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .display-title:hover {
    color: #5C82FF;
  }
  .addscene-container .download-btns button {
    width: auto!important;
    display: inline-block;
    margin: 20px 0;
    text-decoration: none;
    color: #666;
    width: 140px;
    height: 34px;
    line-height: 34px;
    border-radius: 2px;
    font-size: 14px;
    border: solid 1px #dcdcdc!important;
    background: #f6f6f6;
    padding: 0 20px;
  }
  .addscene-container .download-btns button:hover {
    background: #f2f2f2!important;
    color: #555!important;
  }
  .addscene-container .download-btns button:active {
    border-color: #5c82ff!important;
  }
</style>
