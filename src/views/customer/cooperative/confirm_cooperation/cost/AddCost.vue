<template>
  <common-dialog ref="AddCostDialog" :isAppendToBody="true" :title="title"
    :width="800" @dialogCancel="handledialogCancel" @dialogSubmit="handledialogSubmit" :isfooter="true">
    <div class="addcost-container">
      <sub-panel :title="'客户信息'" :iserect="true">
        <CustomerSimpleDetail />
      </sub-panel>
      <sub-panel :title="'安排成本'" :iserect="true">
        <div class="cost-form">
          <el-card class="box-card" shadow="hover" v-for="item in cost_info_list" :key="item.id" style="margin-top: 15px;">
            <div slot="header" class="clearfix">
              <span class="title">请填写</span>
              <i v-if="!isedite" class="el-icon-delete icon-del" @click="deleteForm(item.id)"></i>
            </div>
            <el-form :model="item" :ref="`add_cost_form${item.id}`" :rules="add_cost_form_rules" label-width="105px" size="small">
              <el-form-item label="关联业绩:" prop="cost_type">
                <el-radio v-model="item.cost_type" :label="1" style="width: 50%;" @change="(val) => costTypeChange(val, item)">
                  <el-select size="small" v-model="item.achievement_uid" style="width: 100%;" filterable placeholder="请搜索选择业绩Id" @change="(val) => selectAchievementUid(val, item)">
                    <el-option
                      v-for="item in achievement_uids"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-radio>
                <el-radio v-model="item.cost_type" :label="2" @change="(val) => costTypeChange(val, item)">借款</el-radio>
              </el-form-item>
              <el-form-item label="KOL名称:" prop="kol_id">
                <el-select size="small" v-model="item.kol_id" style="width: 100%; margin-top: 3px;" filterable placeholder="请搜索选择KOL" @change="(val) => selectKOL(val, item)">
                  <el-option
                    v-for="item in kolinfos"
                    :key="item.kol_id"
                    :label="item.kol_name"
                    :value="item.kol_id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构名称:" prop="is_personal">
                <el-radio v-model="item.is_personal" :label="2" style="width: 50%;" @change="(val) => isPersonalChange(val, item)">
                  <el-select size="small" v-model="item.company_id" style="width: 100%;" placeholder="请选择机构" :disabled="item.kol_id == ''" @change="(val) => selectCompany(val, item)">
                    <el-option
                      v-for="item in kol_company"
                      :key="item.company_id"
                      :label="item.company_name"
                      :value="item.company_id">
                    </el-option>
                  </el-select>
                </el-radio>
                <el-radio v-model="item.is_personal" :label="1" @change="(val) => isPersonalChange(val, item)">个人</el-radio>
                <p class="tip">请先选择KOL再选择该KOL所属的机构</p>
              </el-form-item>
              <el-form-item label="打款时间:" prop="pay_date">
                <el-date-picker
                  size="small"
                  placeholder="请选择打款时间"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                  v-model="item.pay_date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="打款金额:" prop="pay_amount">
                <el-input size="small" placeholder="请输入打款金额" type="number" v-model.number="item.pay_amount" style="width: 100%;">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="打款方式:" prop="pay_way">
                <el-radio v-model="item.pay_way" :label="1">银行卡</el-radio>
                <el-radio v-model="item.pay_way" :label="2">V任务</el-radio>
              </el-form-item>
              <el-row v-if="item.pay_way === 2" style="margin-left: 96px; background:rgba(248,248,248,1); border-radius:2px; margin-bottom: 10px; padding-top: 18px; padding-right: 18px; margin-top: 12px;">
                <el-col :span="12">
                  <el-form-item label="v任务链接" :hide-required-asterisk="false" prop="v_task_url">
                    <el-input v-model.trim="item.v_task_url" placeholder="请输入v任务链接"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品链接" :hide-required-asterisk="false" prop="item_url">
                    <el-input v-model.trim="item.item_url" placeholder="请输入产品链接"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="打款账户:" prop="pay_account">
                <template slot="label">
                  <span>
                    打款账户
                    <el-tooltip placement="top" effect="light">
                      <div slot="content">
                        <p style="font-size: 13px; font-weight: 500; line-height: 20px;">时光机：</p>
                        <p style="font-size: 12px; line-height: 20px;">支付宝名称：嘉兴市经开城南时光机营销策划工作室</p>
                        <p style="font-size: 12px; line-height: 20px;">账户：gmrenwupaifa@163.com</p>
                        <p style="font-size: 12px; line-height: 20px;">淘宝会员名：GM任务派发</p>
                        <p style="font-size: 13px; font-weight: 500; margin-top: 10px; line-height: 20px;">玥每映像：</p>
                        <p style="font-size: 12px; line-height: 20px;">支付宝名称：嘉兴玥每映像文化传媒有限公司</p>
                        <p style="font-size: 12px; line-height: 20px;">账户： yuemeiyx@126.com</p>
                      </div>
                      <i class="el-icon-question" style="cursor: pointer;"></i>
                    </el-tooltip>
                  </span>
                </template>
                <el-radio v-model="item.pay_account" :label="1">时光机</el-radio>
                <el-radio v-model="item.pay_account" :label="2">玥美映像</el-radio>
              </el-form-item>
              <el-form-item label="是否开票:" prop="is_invoice">
                <el-radio v-model="item.is_invoice" :label="1">是</el-radio>
                <el-radio v-model="item.is_invoice" :label="0">否</el-radio>
              </el-form-item>
              <el-row v-if="item.is_invoice === 1" style="margin-left: 96px; background:rgba(248,248,248,1); border-radius:2px; margin-bottom: 10px; padding-top: 18px; padding-right: 18px; margin-top: 12px;">
                <el-col :span="12">
                  <el-form-item label="税点金额" :hide-required-asterisk="false" prop="tax_point">
                    <el-input type="number" v-model.number="item.tax_point" placeholder="请输入税点金额"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="开票凭证:" prop="invoice_certificate_pic" v-show="item.is_invoice === 1">
                <div>
                  <el-upload class="kol-upload" action="" :http-request="(params) => uploadPlans(params, item)" :show-file-list="false" :accept="descriptionAccepts.join(',')">
                    <el-button class="mr10" slot="trigger" size="small" type="primary">上传文件</el-button>
                    <span slot="tip" class="el-upload__tip">
                      支持扩展名：.jpg .jpeg .png
                    </span>
                  </el-upload>
                </div>
                <div class="fujian-list clearfix" v-if="item.invoice_certificate_pic != ''">
                  <i class="iconfont iconfujian mr5"></i>
                  <span class="brand-color mr5">{{item.invoice_certificate_pic.split('/')[item.invoice_certificate_pic.split('/').length -1] || '--'}}</span>
                  <i class="el-icon-error" @click="removePlan(item)"></i>
                </div>
              </el-form-item>
              <el-form-item label="备 注:" prop="note">
                <el-input
                  type="textarea"
                  :rows="2"
                  :maxlength="100"
                  placeholder="请输入备注（不超过100字）"
                  style="width: 100%;"
                  v-model="item.note">
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
          <div v-if="!isedite" class="border-dashed" @click="addForm"><i class="el-icon-circle-plus"></i>新增表单</div>
        </div>
      </sub-panel>
    </div>
  </common-dialog>
</template>

<script>
import CustomerSimpleDetail from '../../components/CustomerSimpleDetail'
import {mapActions} from 'vuex'
import {getAchievementUIdsByCooperation, uploadCertificate, addCostList, updateCostList} from '@/api/cooperative'
import {queryKolNames, queryAllKolNames, queryCompanyByKol} from '@/api/medium'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'AddCost',
  components: {
    CustomerSimpleDetail
  },
  mixins: [CooperativeStore],
  data() {
    return {
      title: '',
      page: null,
      cost_info_list: [],
      add_cost_form: {
        achievement_uid: '', // 业绩Uid
        cost_type: '', // 关联业绩 1 业绩Id 2 借款
        kol_id: '', // kol
        company_id: '', // 机构Id
        is_personal: '', // 是否是个人 1 是 2 否
        pay_date: new Date().toLocaleDateString().replace('/', '-').replace('/', '-'), // 打款日期
        pay_amount: '', // 打款金额
        pay_way: '', // 打款方式 1 银行卡 2 v任务
        v_task_url: '', // v任务链接
        item_url: '', // 产品链接
        pay_account: '', // 打款账户 1 时光机 2 玥每映像
        is_invoice: 0, // 是否开票
        tax_point: '', // 税点金额
        note: '', // 备注
        invoice_certificate_pic: '' // 开票凭证
      },
      add_cost_form_rules: {
        cost_type: [ // 关联业绩
          { required: true, message: '请选择关联业绩', trigger: 'change' }
        ],
        kol_id: [ // kol名称
          { required: true, message: '请选择KOL', trigger: 'change' }
        ],
        is_personal: [ // 机构名称
          { required: true, message: '请选择机构名称', trigger: 'change' }
        ],
        pay_amount: [ // 打款金额
          { required: true, message: '请输入打款金额', trigger: 'blur' }
        ],
        pay_way: [ // 打款方式
          { required: true, message: '请选择打款方式', trigger: 'change' }
        ],
        v_task_url: [
          { required: true, message: '请输入v任务链接', trigger: 'blur' }
        ],
        item_url: [
          { required: true, message: '请输入产品链接', trigger: 'blur' }
        ],
        tax_point: [
          { required: true, message: '请输入税点金额', trigger: 'blur' }
        ],
        pay_account: [ // 打款账户
          { required: true, message: '请选择打款账户', trigger: 'change' }
        ]
      },
      achievement_uids: [], // 业绩Uid集合
      kols: [], // kols
      kolinfos: [],
      platforms_keys: ['kol_bili_info', 'kol_douyin_info', 'kol_kuaishou_info', 'kol_wechat_info', 'kol_weibo_info', 'kol_xhs_info', 'kol_yizhibo_info', 'star_info'],
      kol_company: [], // kol机构
      descriptionAccepts: ['jpg', 'jpeg', 'png'], // 扩展名
      isedite: false
    }
  },
  methods: {
    ...mapActions({
      GetAchievementList: 'cooperative/GetAchievementList',
      GetCoostList: 'cooperative/GetCoostList'
    }),
    // 显示
    show (cost, page) {
      if (cost) { // 修改
        this.title = '安排成本修改'
        // this.add_cost_form = Object.assign(this.add_cost_form, cost)
        if (page) this.page = page
        this.isedite = true
        let _add_cost_form = {
          achievement_uid: cost.achievement_uid, // 业绩Uid
          cost_type: cost.cost_type, // 关联业绩 1 业绩Id 2 借款
          kol_id: cost.kol_id, // kol
          company_id: cost.company_id === 0 ? '' : cost.company_id, // 机构Id
          is_personal: cost.is_personal, // 是否是个人 1 是 2 否
          pay_date: cost.pay_date, // 打款日期
          pay_amount: cost.pay_amount, // 打款金额
          pay_way: cost.pay_way, // 打款方式 1 银行卡 2 v任务
          v_task_url: cost.pay_way_detail.v_task_url, // v任务链接
          item_url: cost.pay_way_detail.item_url, // 产品链接
          pay_account: cost.pay_account, // 打款账户 1 时光机 2 玥每映像
          is_invoice: cost.is_invoice, // 是否开票
          tax_point: cost.tax_point, // 税点金额
          note: cost.note, // 备注
          invoice_certificate_pic: cost.invoice_certificate_pic, // 开票凭证
          cost_id: cost.cost_id
        }
        this.cost_info_list.push({..._add_cost_form, ...{id: Math.ceil(Math.random() * 10000), cooperation_id: this.CooperationDetail.cooperation_id}})
        queryCompanyByKol({kol_id: cost.kol_id}).then(res => {
          this.kol_company = res.data.data
        })
      } else { // 新增
        this.title = '安排成本'
        this.isedite = false
        this.addForm()
      }
      this.getAchievementUIds()
      this.getAllKolName()
      this.$refs.AddCostDialog.dialogOpen()
    },
    // 获取当前安排的成本编号
    getAchievementUIds () {
      getAchievementUIdsByCooperation({
        cooperation_id: this.CooperationDetail.cooperation_id
      }).then(res => {
        this.achievement_uids = res.data.data.data.map(a => (a.achievement_uid))
      })
    },
    // 获取所有kol
    getAllKolName () {
      queryAllKolNames().then(res => {
        this.kolinfos = res.data.data
      })
    },
    // 获取kol
    getKolNames () {
      queryKolNames().then(res => {
        let _result = res.data.data.data
        let platforms_keys = JSON.parse(JSON.stringify(this.platforms_keys))
        // 过滤没有机构的KOL
        let _kolinfos = []
        if (_result.length > 0) {
          _result.map(k => {
            if (k.hasOwnProperty('kol_info') && k.kol_info.kol_name !== '') {
              let _kolinfo = {
                kol_id: k.kol_info.kol_id,
                kol_name: k.kol_info.kol_name,
                companys: []
              }
              platforms_keys.map(p => {
                if (k.hasOwnProperty(p) && k[p].company_id !== '' && k[p].company_name !== '') {
                  let _hscom = _kolinfo.companys.find(c => c.company_id === k[p].company_id)
                  if (!_hscom) {
                    _kolinfo.companys.push({
                      company_id: k[p].company_id,
                      company_name: k[p].company_name
                    })
                  }
                }
              })
              if (_kolinfo.companys.length > 0) {
                _kolinfos.push(_kolinfo)
              }
            }
          })
        }
        this.kolinfos = _kolinfos
      })
    },
    // 选择KOL
    selectKOL (val, item) {
      // let _kols = JSON.parse(JSON.stringify(this.kolinfos))
      // let _currkol = _kols.find(k => k.kol_id === val)
      // this.kol_company = _currkol.companys
      this.kol_company = []
      item.company_id = ''
      queryCompanyByKol({kol_id: val}).then(res => {
        this.kol_company = res.data.data
      })
    },
    // 选择业绩Id
    selectAchievementUid (val, item) {
      if (val) item.cost_type = 1
    },
    // 选择关联业绩
    costTypeChange (val, item) {
      if (val === 2) item.achievement_uid = ''
    },
    // 选择关联业绩
    isPersonalChange (val, item) {
      if (val === 1) item.company_id = ''
    },
    // 选择机构
    selectCompany (val, item) {
      if (val) item.is_personal = 2
    },
    // 添加表单
    addForm () {
      let _add_cost_form = JSON.parse(JSON.stringify(this.add_cost_form))
      this.cost_info_list.push({..._add_cost_form, ...{id: Math.ceil(Math.random() * 10000), cooperation_id: this.CooperationDetail.cooperation_id}})
    },
    // 删除表单
    deleteForm (id) {
      let _cost_info_list = JSON.parse(JSON.stringify(this.cost_info_list))
      if (_cost_info_list.length <= 1) {
        this.$message.error('表单至少有一个')
      } else {
        this.$confirm('确定删除该表单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          iconClass: 'warning-icon'
        }).then(() => {
          let _currindex = _cost_info_list.findIndex(f => f.id === id)
          if (_currindex > -1) {
            this.cost_info_list.splice(_currindex, 1)
          }
        }).catch(() => {})
      }
    },
    // 提交验证表单
    submitForm(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName][0].validate((valid) => {
          if (valid) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },
    /**
     * 上传文件成功时回调
     */
    uploadPlans(params, item) {
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
      let form = new FormData()
      form.append('file', file)
      form.append('type', 'certificate/cost_invoice_certificate')
      uploadCertificate(form).then(data => {
        if (data.data) {
          item.invoice_certificate_pic = data.data.data.source
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    /**
     * 删除凭证
     * @param
     */
    removePlan(item) {
      item.invoice_certificate_pic = ''
    },
    // 关闭弹窗
    handledialogCancel () {
      this.cost_info_list = []
    },
    judgetoSelectHandle (name1, name2, errmsg) {
      let _cost_info_list = JSON.parse(JSON.stringify(this.cost_info_list))
      let _result = false
      _cost_info_list.map(f => {
        if (f[name1] === 1 && f[name2] === '') _result = true
      })
      if (_result) {
        this.$message.error(errmsg)
      }
      return !_result
    },
    // 弹窗确认操作
    handledialogSubmit () {
      let _cost_info_list = JSON.parse(JSON.stringify(this.cost_info_list))
      let _results = []
      _cost_info_list.map(async f => {
        let _result = await this.submitForm(`add_cost_form${f.id}`)
        if (_result) {
          _results.push(_result)
        }
        if (_results.length === _cost_info_list.length) {
          this.submitHandle(_cost_info_list)
        }
      })
    },
    submitHandle (cost_info_list) {
      let _result = this.judgetoSelectHandle('cost_type', 'achievement_uid', '请选择业绩Id')
      if (_result) {
        if (this.isedite) {
          updateCostList(cost_info_list[0]).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message)
              // 更新客户信息
              this.GetCustomerDetail(this.CooperationDetail.customer_id)
              // 更新合作详情
              this.GetCooperationDetail({
                customer_id: this.CustomerDetail.id,
                cooperation_id: this.CooperationDetail.cooperation_id
              })
              // 更新业绩列表
              this.GetCoostList({
                cooperation_id: this.CooperationDetail.cooperation_id,
                num: this.page.pageSize,
                page_num: this.page.currentPage
              })
              this.$refs.AddCostDialog.dialogClose()
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          addCostList(cost_info_list).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message)
              // 更新客户信息
              this.GetCustomerDetail(this.CooperationDetail.customer_id)
              // 更新合作详情
              this.GetCooperationDetail({
                customer_id: this.CustomerDetail.id,
                cooperation_id: this.CooperationDetail.cooperation_id
              })
              this.GetCoostList({
                cooperation_id: this.CooperationDetail.cooperation_id,
                num: 10,
                page_num: 1
              })
              this.$refs.AddCostDialog.dialogClose()
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            this.$message.error('保存失败')
            console.error(err)
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .addcost-container {
    padding: 0 20px;
    .cost-form {
      padding-top: 5px;
      .form-block {
        padding-right: 100px;
        /deep/ .el-input__inner {
          border-radius: 2px;
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
      .title {
        font-weight:bold;
        color: #666666;
      }
      .icon-del {
        float: right;
        padding: 3px 0;
        font-size: 16px;
        cursor: pointer;
      }
      /deep/ .el-card__header {
        background-color: #F9F9F9;
        padding: 12px 18px;
      }
      /deep/ .el-form-item {
        margin-bottom: 10px;
      }
    }
    .border-dashed{
      border: 1px dashed #E1E4EB;
      text-align: center;
      cursor: pointer;
      line-height: 39px;
      margin-top: 18px;
      i{
        color: #C3C3C3;
        margin-right: 10px;
      }
    }
    p.tip {
      color: #ccc;
      line-height: initial;
      font-size: 12px;
      margin-bottom: -9px;
      margin-top: 5px;
    }
  }
</style>
