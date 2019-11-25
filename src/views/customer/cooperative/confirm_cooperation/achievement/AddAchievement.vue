<template>
  <common-dialog ref="AddAchievementDialog" :isAppendToBody="true" :title="title" :width="800" @dialogCancel="handledialogCancel" @dialogSubmit="handledialogSubmit" :isfooter="true">
    <div class="addachievement-container">
      <sub-panel :title="'客户信息'" :iserect="true">
        <CustomerSimpleDetail />
      </sub-panel>
      <sub-panel :title="'登记业绩'" :iserect="true">
        <el-form ref="add_achievement_from" :model="add_achievement_from" :rules="add_achievement_from_rules" label-width="120px">
          <div class="form-block">
            <el-form-item label="业绩Id:" prop="achievement_uid">
              <span>{{add_achievement_from.achievement_uid}}</span>
            </el-form-item>
            <el-form-item label="收款时间:" prop="gather_date">
              <el-date-picker
                size="small"
                placeholder="请选择收款时间"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
                v-model="add_achievement_from.gather_date">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="收款方式:" prop="gather_way">
              <el-radio-group v-model="add_achievement_from.gather_way">
                <el-radio v-for="item in gatherWayList" :label="item.value" :key="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" v-show="add_achievement_from.gather_way === 1">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model.trim="add_achievement_from.order_wangwang_id" style="width: 100%;">
                    <template slot="prepend">
                      <span style="color: #f56c6c; margin-right: 3px;">*</span>下单旺旺号:
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <el-input placeholder="请输入" type="number" v-model.number="add_achievement_from.task_id" style="width: 100%;">
                    <template slot="prepend">
                      <span style="color: #f56c6c; margin-right: 3px;">*</span>任务Id:
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="收款金额:" prop="gather_amount">
              <el-input placeholder="请输入收款金额" type="number" v-model.number="add_achievement_from.gather_amount" style="width: 100%; margin-bottom: 5px;">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="收款凭证:" prop="gather_certificate_pic">
              <div>
                <el-upload class="kol-upload" action="" :http-request="uploadPlans" :show-file-list="false" :accept="descriptionAccepts.join(',')">
                  <el-button class="mr10" slot="trigger" size="small" type="primary" v-loading="loading">上传文件</el-button>
                  <span slot="tip" class="el-upload__tip">
                    支持扩展名：.jpg .jpeg .png
                  </span>
                </el-upload>
              </div>
              <div class="fujian-list clearfix" v-if="add_achievement_from.gather_certificate_pic != ''">
                <i class="iconfont iconfujian mr5"></i>
                <span class="brand-color mr5">{{add_achievement_from.gather_certificate_pic.split('/')[add_achievement_from.gather_certificate_pic.split('/').length -1] || '--'}}</span>
                <i class="el-icon-error" @click="removePlan()"></i>
              </div>
            </el-form-item>
            <el-form-item label="是否开票:" prop="is_invoice">
              <el-radio-group v-model="add_achievement_from.is_invoice">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
      </sub-panel>
    </div>
  </common-dialog>
</template>

<script>
import CustomerSimpleDetail from '../../components/CustomerSimpleDetail'
import {getAchievementUid, uploadCertificate, saveAchievement} from '@/api/cooperative'
import {gatherWayList} from '@/const/cooperative'
import {mapActions} from 'vuex'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'AddAchievement',
  components: {
    CustomerSimpleDetail
  },
  mixins: [CooperativeStore],
  data () {
    return {
      gatherWayList, // 收款方式
      title: '',
      page: null,
      add_achievement_from: {
        achievement_uid: '', // 业绩编号
        gather_date: new Date().toLocaleDateString().replace('/', '-').replace('/', '-'), // 收款时间
        gather_way: '', // 1-构美网（v任务），2-支付宝，3-对公账户
        gather_amount: '', // 收款金额
        order_wangwang_id: '', // 下单旺旺号
        task_id: '', // 任务Id
        gather_certificate_pic: '', // 收款凭证
        is_invoice: 0 // 是否开票
      },
      // 表单验证规则
      add_achievement_from_rules: {
        gather_amount: [
          { required: true, message: '请输入销售金额', trigger: 'blur' }
        ],
        gather_way: [
          { required: true, message: '请选择收款方式', trigger: 'change' }
        ]
      },
      descriptionAccepts: ['jpg', 'jpeg', 'png'], // 扩展名
      loading: false
    }
  },
  methods: {
    ...mapActions({
      GetAchievementList: 'cooperative/GetAchievementList'
    }),
    // 显示
    show (achievement, page) {
      if (achievement) { // 修改
        this.title = '登记业绩修改'
        this.add_achievement_from = Object.assign(this.add_achievement_from, achievement)
        this.add_achievement_from = {...JSON.parse(JSON.stringify(this.add_achievement_from)), ...achievement.gather_way_detail}
        if (page) this.page = page
      } else { // 新增
        this.title = '登记业绩'
        // 获取业绩Id
        this.getAchievementId()
      }
      this.$refs.AddAchievementDialog.dialogOpen()
    },
    // 取消弹窗
    handledialogCancel () {
      this.$refs.add_achievement_from.resetFields()
      let add_achievement_from = {
        achievement_uid: '', // 业绩编号
        gather_date: new Date().toLocaleDateString().replace('/', '-').replace('/', '-'), // 收款时间
        gather_way: '', // 1-构美网（v任务），2-支付宝，3-对公账户
        gather_amount: '', // 收款金额
        order_wangwang_id: '', // 下单旺旺号
        task_id: '', // 任务Id
        gather_certificate_pic: '', // 收款凭证
        is_invoice: 0 // 是否开票
      }
      this.add_achievement_from = add_achievement_from
    },
    // 弹窗确定操作
    handledialogSubmit () {
      this.$refs.add_achievement_from.validate(pass => {
        if (pass) {
          let add_achievement_from = JSON.parse(JSON.stringify(this.add_achievement_from))
          add_achievement_from = {...add_achievement_from, ...{cooperation_id: this.CooperationDetail.cooperation_id}}
          if (add_achievement_from.gather_way === 1) { // v任务
            if (add_achievement_from.order_wangwang_id === '') {
              this.$message.error('下单旺旺号不能为空！')
              return
            }
            if (add_achievement_from.task_id === '') {
              this.$message.error('任务Id不能为空！')
              return
            }
          }
          saveAchievement(add_achievement_from).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message)
              // 更新客户信息
              this.GetCustomerDetail(this.CooperationDetail.customer_id)
              // 更新合作详情
              this.GetCooperationDetail({
                customer_id: this.CustomerDetail.id,
                cooperation_id: this.CooperationDetail.cooperation_id
              })
              if (this.page === null) { // 新增
                // 更新业绩列表
                this.GetAchievementList({
                  cooperation_id: this.CooperationDetail.cooperation_id,
                  num: 10,
                  page_num: 1
                })
              } else { // 修改
                // 更新业绩列表
                this.GetAchievementList({
                  cooperation_id: this.CooperationDetail.cooperation_id,
                  num: this.page.pageSize,
                  page_num: this.page.currentPage
                })
              }
              this.$refs.AddAchievementDialog.dialogClose()
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            this.$message.error('保存失败')
            console.error(err)
          })
        }
      })
    },
    // 获取业绩Id
    getAchievementId () {
      getAchievementUid().then(res => {
        if (res && res.data && res.data.data) {
          this.add_achievement_from.achievement_uid = res.data.data
        }
      })
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
      form.append('type', 'certificate/achievement_gather_certificate')
      uploadCertificate(form).then(data => {
        vm.loading = false
        if (data.data) {
          vm.add_achievement_from.gather_certificate_pic = data.data.data.source
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
      this.add_achievement_from.gather_certificate_pic = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .addachievement-container {
    padding: 0 20px;
    .form-block {
      padding-right: 100px;
      /deep/ .el-input__inner {
        border-radius: 2px;
      }
      .el-form-item {
        margin-bottom: 16px;
      }
      //附件
      .fujian-list{
        display: inline-block;
        float: left;
        margin-right: 20px;
        line-height: 35px;
        i{
          color:#999;
        }
      }
      /deep/ .el-input-group__prepend {
        padding: 0 10px !important;
      }
    }
  }
</style>
