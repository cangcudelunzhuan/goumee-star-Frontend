<template>
  <div v-if="displayDetail != null">
    <section class="display-detail">
      <div class="detail-header">
        <i v-if="!pdata" class="el-icon-arrow-left" @click="back"></i>
        <h2>场次信息</h2>
        <p v-if="displayDetail !== null">
          <span>录入人：{{displayDetail.add_by}}  {{showProDateFormat(displayDetail.gmt_create)}}</span>|
          <span>最终修改人：{{displayDetail.modified_by}}  {{showProDateFormat(displayDetail.gmt_modified)}}</span>
        </p>
        <div class="opt-btns">
          <span v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.update_display) && judgeProCurrentPower(displayDetail.add_by_id)"><i class="gm-icon gm-icon-edit" @click="handleDisplayEditClick"></i></span>
          <span v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.del_display) && judgeProCurrentPower(displayDetail.add_by_id)"><i class="gm-icon gm-icon-delete" @click="deleteDisplay(displayDetail)"></i></span>
        </div>
      </div>
      <div class="detail-content" v-if="displayDetail !== null">
        <div class="detail-table">
          <table>
            <tr>
              <td><span class="label">直播标题：</span>{{displayDetail.title?displayDetail.title:'--'}}</td>
              <td><span class="label">主播昵称：</span>{{displayDetail.star_name}}</td>
              <td><span class="label">直播类型：</span>{{displayTypeFormate(displayDetail)}}<span class="tag">{{getIsPresell(displayDetail)}}</span></td>
              <td><span class="label">销售量：</span>{{displayDetail.display_sales_num>-1?displayDetail.display_sales_num:'--'}}件</td>
              <td><span class="label">PV：</span>{{displayDetail.pv}}万</td>
            </tr>
            <tr>
              <td><span class="label">直播日期：</span>{{showZhCnDate(displayDetail.display_time)}}</td>
              <td><span class="label">主播ID：</span>{{displayDetail.star_id}}</td>
              <td><span class="label">是否出单：</span><span :class="['status', getIsDisplay(displayDetail) === '已出单' ? 'active' : '']">{{getIsDisplay(displayDetail)}}</span></td>
              <td><span class="label">销售额：</span>{{displayDetail.display_sales_amount>-1?displayDetail.display_sales_amount:'--'}}元</td>
              <td><span class="label">UV：</span>{{displayDetail.uv>-1?displayDetail.uv+'次':'--'}}</td>
            </tr>
          </table>
        </div>
      </div>
    </section>
    <section class="product-detail-section">
      <!-- <el-button type="primary" size="small" style="margin-bottom:20px;width:80px" @click="back">返回</el-button> -->
      <el-button
        v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.add_product) && judgeProCurrentPower(displayDetail.add_by_id)"
        type="primary"
        @click="openAddProductDialog"
        size="small"
        style="margin-bottom:20px">添加商品</el-button>
      <el-button
        v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.del_product) && judgeProCurrentPower(displayDetail.add_by_id)"
        @click="batchDeleteProduct"
        size="small"
        style="margin-bottom:20px">删除</el-button>
      <!-- <el-upload v-if="isAdminUser" ref="upload" style="display:inline;margin-left:10px" :action='""' :http-request="uploadProduct" :show-file-list="false" multiple :file-list="fileList">
        <el-button size="small" type="primary" :loading="uploadLoading" style="width:auto">导入商品</el-button>
      </el-upload> -->
      <!-- <el-button size="small" type="primary" @click="downloadModelxlsx" style="margin-left:10px">下载模板</el-button> -->
      <el-table
        :header-cell-style="{background:'#f0f1f2',height:'48px',color:'#666'}"
        :header-row-style="{fontSize:'15px'}"
        ref="liveTitle"
        v-loading="ProductData_loading"
        :data="ProductData"
        id="export-table"
        stripe
        class="product-list"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column
          prop="productId"
          label="商品ID"
          align="center" v-if="false">
        </el-table-column> -->
        <el-table-column type="selection" v-if="isAdminUser" />
        <el-table-column label="商品信息" min-width="178">
          <template slot-scope="scope">
            <!-- <el-popover trigger="hover" placement="top">
              <p style="margin:0;padding:0">商品名称：{{scope.row.product_name}}</p>
              <div slot="reference">
                <p style="margin:0">{{getProductName(scope.row.product_name)}}</p>
              </div>
            </el-popover>
            <span class="is-top" v-show="scope.row.is_top">置顶</span>
            <span class="is-top" v-show="scope.row.is_related_product === 2">关联商品</span>
            <span class="is-top is-gray-color" v-show="scope.row.is_presell === 0">非预售</span>
            <span class="is-top" v-show="scope.row.is_presell === 1">预售</span>
            <span class="is-top is-gray-color" v-show="scope.row.is_presell === -1">未录入</span> -->
            <el-popover trigger="hover" placement="top">
              <p>{{scope.row.product_name}}</p>
              <div slot="reference">
                <p class="product-title">
                  <span class="label">商品：</span>
                  <a :href="scope.row.product_url" target="_blank" @click.stop="() => {}"><i class="link-icon"></i></a>
                  <span class="product-detail-link">{{scope.row.product_name}}</span>
                </p><!-- {{getProductName(scope.row.product_name)}} -->
              </div>
            </el-popover>
            <p><span class="label">活动价：</span>{{scope.row.product_sales_price}}元</p>
          </template>
        </el-table-column>
        <el-table-column label="店铺信息" min-width="160">
          <template slot-scope="scope">
            <p class="product-title"><span class="label">店铺：</span>{{scope.row.shop_name || '--'}}</p>
            <p><span class="label">品类：</span>{{categoryFormate(scope.row)}}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="130" :render-header="liveInfoCustomerHeader">
          <template slot-scope="scope">
            <p v-if="scope.row.is_related_product === 1"><span class="label">直播成本：</span>{{scope.row.display_cost}}元</p>
            <p v-if="scope.row.is_related_product === 1"><span class="label">直播报价：</span>{{scope.row.display_price}}元</p>
            <p v-if="scope.row.is_related_product === 2" style="color: #C0C4CC;">暂无报价</p>
          </template>
        </el-table-column>
        <el-table-column label="点击数/次" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{scope.row.product_click_num === -1 ? '未出单':scope.row.product_click_num}}</span> -->
            <span>{{scope.row.product_click_num === '' ? '未出单' : scope.row.product_click_num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售量/件" min-width="90">
          <template slot-scope="scope">
            <!-- <p>{{scope.row.product_sales_num === -1 ? 0 : scope.row.product_sales_num}}</p> -->
            <p>{{scope.row.product_sales_num === '' ? '--' : scope.row.product_sales_num}}</p>
          </template>
        </el-table-column>
        <el-table-column label="销售额/元" min-width="90">
          <template slot-scope="scope">
            <!-- <p>{{scope.row.product_sales_amount === -1 ? 0 : scope.row.product_sales_amount}}</p> -->
            <p>{{scope.row.product_sales_amount === '' ? '--' : scope.row.product_sales_amount}}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="90" align="center">
          <template slot-scope="{row}">
            <el-tooltip placement="left" effect="light" content="编辑" v-if="judgeProCurrentPower(displayDetail.add_by_id)">
              <span><i class="gm-icon gm-icon-edit" @click="productClick(row)"></i></span>
            </el-tooltip>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :render-header="customColumnHeader" min-width="120">
          <template slot-scope="scope">
            <div>
              <p style="margin:0;white-space:nowrap;line-height:18px" v-show="scope.row.product_sales_amount !== -1">销售额：{{scope.row.product_sales_amount === -1 ? '未出单':scope.row.product_sales_amount + '元'}}</p>
              <p style="margin:0;white-space:nowrap;line-height:18px" v-show="scope.row.product_sales_num !== -1">销量：{{scope.row.product_sales_num === -1 ? '未出单':scope.row.product_sales_num + '件'}}</p>
              <span class="is-top" v-show="scope.row.is_display === 2">已出单</span>
              <span class="is-top is-gray-color" v-show="scope.row.is_display === 1">未出单</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="活动价(客单价)" min-width="130">
          <template slot-scope="scope">
            <span>{{scope.row.product_sales_price === -1 ? '未出单':scope.row.product_sales_price}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="display_time"
          label="直播日期"
          :formatter="dateFormat"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="display_period"
          label="直播时间"
          :formatter="periodFormate"
          min-width="94">
        </el-table-column>
        <el-table-column
          prop="duration"
          label="直播时长"
          :formatter="getDuration"
          min-width="110">
        </el-table-column> -->
        <!-- <el-table-column label="操作" width="90" align="center">
          <template slot-scope="scope">
            <i class="gm-icon gm-icon-edit" @click="openEditProductDialog(scope.row); updateProductDialogVisible = true" v-if="isAdminUser" title="编辑"></i>
            <el-tooltip placement="top" effect="light" content="查看详情">
              <i class="gm-icon gm-icon-detail" @click="showDetail(scope.row)"></i>
            </el-tooltip>
            <el-tooltip placement="top" effect="light" content="删除">
              <i class="gm-icon gm-icon-delete" @click="deleteProduct(scope.row)" v-if="isAdminUser"></i>
            </el-tooltip>
          </template>
        </el-table-column> -->
        <div slot="empty" class="empty-box" style="padding: 40px 0;">
          <img src="@/assets/img/anchor_nodata.png" />
        </div>
      </el-table>
      <!-- add/edit product-dialog -->
      <el-dialog :title="editProDialogTitle" :visible.sync="updateProductDialogVisible" top="12vh" append-to-body class="edit-product-dialog" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeAddProductDialog('updateproductInfo')">
        <el-form size="small" :model="updateproductInfo" :inline="true" label-width="110px" label-position="top" ref="updateproductInfo">
          <el-row>
            <el-form-item label="主播昵称">
              <el-input v-model="updateproductInfo.star_name" disabled placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="活动价(客单价)" prop="product_sales_price" :rules="[{required: true, message: '活动价(客单价)是必填项'}]">
              <el-input name="product_sales_price" v-model="updateproductInfo.product_sales_price" placeholder="请输入内容" type="number" class="editdialog-salesprice">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品名称" prop="product_name" :rules="[{required: true, message: '商品名称是必填项'}]">
              <el-input name="product_name" v-model="updateproductInfo.product_name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="产品销售量">
              <el-input v-model="updateproductInfo.product_sales_num" placeholder="未出单请勿填写,未售出则填0" type="number">
                <template slot="append">件</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品链接" prop="product_url" :rules="[{required: true, message: '商品链接是必填项'}]">
              <el-input name="product_url" v-model="updateproductInfo.product_url" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="产品销售额">
              <el-input v-model="updateproductInfo.product_sales_amount" placeholder="未出单请勿填写,未售出则填0" type="number">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="店铺名称" prop="shop_name" :rules="[{required: true, message: '店铺名称是必填项'}]">
              <el-input name="shop_name" v-model="updateproductInfo.shop_name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="产品点击数" prop="product_click_num" :rules="[{required: true, message: '产品点击数是必填项'}]">
              <el-input name="product_click_num" v-model="updateproductInfo.product_click_num" placeholder="请输入内容" type="number">
                <template slot="append">次</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="直播日期" prop="display_time" :rules="[{required: true, message: '直播日期是必填项'}]">
              <el-date-picker
                v-model="updateproductInfo.display_time"
                placeholder="请选择直播日期"
                value-format="yyyy-MM-dd"
                name="display_time">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="直播报价" prop="display_price" :rules="[{required: true, message: '直播报价是必填项'}]">
              <el-input name="display_price" v-model="updateproductInfo.display_price" placeholder="请输入内容" type="number">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="品类" prop="category" :rules="[{required: true, message: '品类是必选项'}]">
              <el-select name="category" v-model="updateproductInfo.category" placeholder="请选择品类">
                <el-option v-for="item in categoryOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="直播成本" prop="display_cost" :rules="[{required: true, message: '直播成本是必填项'}]">
              <el-input  name="display_cost" v-model="updateproductInfo.display_cost" placeholder="请输入内容" type="number">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="直播时长" prop="duration" :rules="[{required: true, message: '直播时长是必选项'}]">
              <el-select name="duration" placeholder="请选择直播时长" v-model="updateproductInfo.duration">
                <el-option v-for="item in liveDurationOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="直播时间段" prop="display_period" :rules="[{required: true, message: '直播时间段是必选项'}]">
              <el-select name="display_period" placeholder="请选择直播时间段" v-model="updateproductInfo.display_period">
                <el-option v-for="item in livePeriodOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item>
              <el-checkbox style="margin-left:4%" :true-label="1" :false-label="0" v-model="updateproductInfo.is_top">是否置顶</el-checkbox>
            </el-form-item>
            <el-form-item v-if="isEditDialog">
              <el-checkbox style="margin-left:4%" :true-label="2" :false-label="1" v-model="updateproductInfo.is_related_product">是否为关联商品</el-checkbox>
            </el-form-item>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button style="width:80px" size="small" @click="updateProductDialogVisible=false">取消</el-button>
          <el-button style="width:80px" type="primary" size="small" @click="editProduct('updateproductInfo')" v-show="isEditDialog">保存</el-button>
          <el-button style="width:80px" type="primary" size="small" @click="addProduct('updateproductInfo')" v-show="!isEditDialog">添加</el-button>
        </span>
      </el-dialog>
      <!-- show-detail-dialog -->
      <el-dialog title="查看详情" :visible.sync="showDetailDialogVisible" append-to-body class="show-product-dialog" :close-on-click-modal="false" :close-on-press-escape="false">
        <section>
          <div class="detail-left">
            <div>
              <p>标签</p>
              <span>
                <strong v-show="detailData.is_top">置顶</strong>
                <em class="is-display" v-show="detailData.is_display === 2">已出单</em>
                <em class="is-display is-gray-color" v-show="detailData.is_display === 1">未出单</em>
                <em class="is-display" v-show="detailData.is_related_product === 2">关联商品</em>
                <em class="is-display is-gray-color" v-show="detailData.is_presell === 0">非预售</em>
                <em class="is-display" v-show="detailData.is_presell === 1">预售</em>
              </span>
            </div>
            <div><p>商品名称</p><span>{{detailData.product_name}}</span></div>
            <div>
              <p>商品链接</p>
              <span><a :href="detailData.product_url" target="_blank" :title="detailData.product_name"></a></span>
            </div>
            <div><p>店铺名称</p><span>{{detailData.shop_name === ''?'-':detailData.shop_name}}</span></div>
            <div><p>主播昵称</p><span>{{detailData.star_name}}</span></div>
            <div><p>主播ID</p><span>{{detailData.star_id}}</span></div>
            <div><p>品类</p><span>{{detailData.category}}</span></div>
            <div><p>直播日期</p><span>{{detailData.display_time}}</span></div>
            <div><p>直播时间</p><span>{{detailData.display_period}}</span></div>
          </div>
          <div class="detail-right" style="border:none">
            <div><p>直播时长</p><span>{{detailData.duration}}</span></div>
            <div><p>直播报价</p><span>{{detailData.display_price}} 元</span></div>
            <div><p>直播成本</p><span>{{detailData.display_cost}} 元</span></div>
            <div><p>产品点击数</p><span>{{detailData.product_click_num}} <em class="is-display-text" v-show="detailData.product_click_num !== '未出单'">次</em></span></div>
            <div><p>产品销售额</p><span>{{detailData.product_sales_amount}} <em class="is-display-text" v-show="detailData.product_sales_amount !== '未出单'">元</em></span></div>
            <div><p>产品销量</p><span>{{detailData.product_sales_num}} <em class="is-display-text" v-show="detailData.product_sales_num !== '未出单'">件</em></span></div>
            <div><p>活动价(客单价)</p><span>{{detailData.product_sales_price}} <em class="is-display-text" v-show="detailData.product_sales_price !== '未出单'">元</em></span></div>
            <div><p>录入人</p><span>{{detailData.add_by}}</span></div>
            <div><p>最终修改人</p><span>{{detailData.modified_by}}</span></div>
          </div>
        </section>
      </el-dialog>
    </section>
    <!-- 编辑场次 弹框和表单 :title="displayDialogTitle"  -->
    <el-dialog
      custom-class="dialog-min-width"
      :visible.sync="addDisplayDialogVisible"
      :close-on-click-modal="false"
      append-to-body
      width="36%"
      title="编辑场次"
      class="edit-display-dialog"
      :close-on-press-escape="false"
      > <!-- @close="closeAddDiplayDialog('displayInfoForm')"-->
      <el-form :inline="true" size="small" :model="displayInfoForm" label-width="80px" label-position="top" ref="displayInfoForm">
        <el-form-item label="直播标题">
          <el-input name="title" v-model="displayInfoForm.title" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="主播昵称" prop="starName" :rules="[{required: true, message: '主播昵称是必填项'}]">
          <el-autocomplete
          name="starName" v-model="displayInfoForm.starName" placeholder="请输入内容"
          :trigger-on-focus="false" @keyup.native="starKeyUp"
          :disabled="!isAddButton">
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="主 播 ID" prop="starId" :rules="[{required: true, message: '主播id是必填项'}]">
          <el-input name="starId" v-model="displayInfoForm.starId" :disabled="!isAddButton" placeholder="请输入内容" type="number"></el-input>
        </el-form-item>
        <el-form-item label="场次PV" prop="pv" :rules="[{required: true, message: '场次PV是必填项'}]">
          <el-input name="pv" v-model="displayInfoForm.pv" placeholder="请输入内容" type="number">
            <template slot="append">万</template>
          </el-input>
        </el-form-item>
        <el-form-item label="场次UV">
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
      <span slot="footer" class="dialog-footer">
        <el-button size="small" style="width:80px" @click="addDisplayDialogVisible=false">取消</el-button>
        <el-button type="primary" style="width:80px" size="small" @click="saveDisplays('displayInfoForm')" v-show="isAddButton">添加</el-button>
        <el-button type="primary" style="width:80px" size="small" @click="updateDisplays('displayInfoForm')" v-show="!isAddButton">保存</el-button>
      </span>
    </el-dialog>
    <!-- 产品详情弹窗 -->
    <el-dialog :visible.sync="productDetailDialogVisiable" append-to-body class="product-detail-dialog" @closed="edittingDataField = ''" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="cutom-header" slot="title"><span>商品详情</span></div>
      <div class="tips-wrap">
        <el-alert
          v-show="updateDetailMsg"
          class="tips"
          :title="updateDetailMsg"
          type="error"
          @close="updateDetailMsg = ''">
        </el-alert>
      </div>
      <div class="product-detail-table" v-if="rowDetailData" v-loading="updateOneFieldLoading">
        <div class="tr">
          <div class="td label">直播成本</div>
          <div class="td content">
            <span v-show="edittingDataField !== 'display_cost'">{{productDetailEdittingData.display_cost}}元</span>
            <el-input v-show="edittingDataField === 'display_cost'" v-model="productDetailEdittingData.display_cost" class="detai-input" placeholder="请输入直播成本" size="small"></el-input>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'display_cost'" @click="editOneField('display_cost')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'display_cost'" @click="saveProductOneField('display_cost')"></i>
          </div>
          <div class="td label">直播时长</div>
          <div class="td content">
            <span v-show="edittingDataField !== 'duration'">{{getDuration(productDetailEdittingData)}}</span>
            <el-select v-show="edittingDataField === 'duration'" v-model="productDetailEdittingData.duration" placeholder="请选择直播时长" size="small">
              <el-option v-for="item in liveDurationOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'duration'" @click="editOneField('duration')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'duration'" @click="saveProductOneField('duration')"></i>
          </div>
        </div>
        <div class="tr">
          <div class="td label">直播报价</div>
          <div class="td content">
            <span v-show="edittingDataField !== 'display_price'">{{productDetailEdittingData.display_price}}元</span>
            <el-input v-show="edittingDataField === 'display_price'" v-model="productDetailEdittingData.display_price" class="detai-input" placeholder="请输入直播报价" size="small"></el-input>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'display_price'" @click="editOneField('display_price')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'display_price'" @click="saveProductOneField('display_price')"></i>
          </div>
          <div class="td label">点击数</div>
          <div class="td content">
            <span v-show="edittingDataField !== 'product_click_num'">{{productDetailEdittingData.product_click_num}}次</span>
            <el-input v-show="edittingDataField === 'product_click_num'" v-model="productDetailEdittingData.product_click_num" class="detai-input" placeholder="请输入点击数" size="small"></el-input>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'product_click_num'" @click="editOneField('product_click_num')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'product_click_num'" @click="saveProductOneField('product_click_num')"></i>
          </div>
        </div>
        <div class="tr">
          <div class="td label">店铺</div>
          <div class="td content">
            <span v-show="edittingDataField !== 'shop_name'">{{productDetailEdittingData.shop_name}}</span>
            <el-input v-show="edittingDataField === 'shop_name'" v-model="productDetailEdittingData.shop_name" class="detai-input" placeholder="请输入店铺名称" size="small"></el-input>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'shop_name'" @click="editOneField('shop_name')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'shop_name'" @click="saveProductOneField('shop_name')"></i>
          </div>
          <div class="td label">销售额</div>
          <div class="td content">
            <!-- <span v-show="edittingDataField !== 'product_sales_amount'">{{productDetailEdittingData.product_sales_amount > -1?productDetailEdittingData.product_sales_amount+'元':'--'}}</span> -->
            <span v-show="edittingDataField !== 'product_sales_amount'">{{productDetailEdittingData.product_sales_amount === '' ? '--' : productDetailEdittingData.product_sales_amount + '元'}}</span>
            <el-input v-show="edittingDataField === 'product_sales_amount'" v-model="productDetailEdittingData.product_sales_amount" class="detai-input" placeholder="请输入销售额" size="small"></el-input>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'product_sales_amount'" @click="editOneField('product_sales_amount')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'product_sales_amount'" @click="saveProductOneField('product_sales_amount')"></i>
          </div>
        </div>
        <div class="tr">
          <div class="td label">商品</div>
          <div class="td content">
            <span v-show="edittingDataField !== 'product_name'">{{productDetailEdittingData.product_name}}</span>
            <el-input v-show="edittingDataField === 'product_name'" v-model="productDetailEdittingData.product_name" class="detai-input" placeholder="请输入商品名称" size="small"></el-input>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'product_name'" @click="editOneField('product_name')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'product_name'" @click="saveProductOneField('product_name')"></i>
          </div>
          <div class="td label">销售量</div>
          <div class="td content">
            <!-- <span v-show="edittingDataField !== 'product_sales_num'">{{productDetailEdittingData.product_sales_num>-1?productDetailEdittingData.product_sales_num+'件':'--'}}</span> -->
            <span v-show="edittingDataField !== 'product_sales_num'">{{productDetailEdittingData.product_sales_num === '' ? '--' : productDetailEdittingData.product_sales_num + '件'}}</span>
            <el-input v-show="edittingDataField === 'product_sales_num'" v-model="productDetailEdittingData.product_sales_num" class="detai-input" placeholder="请输入销售量" size="small"></el-input>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'product_sales_num'" @click="editOneField('product_sales_num')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'product_sales_num'" @click="saveProductOneField('product_sales_num')"></i>
          </div>
        </div>
        <div class="tr">
          <div class="td label">商品链接</div>
          <div class="td content">
            <span v-show="edittingDataField !== 'product_url'"><a :href="productDetailEdittingData.product_url" target="_blank">{{productDetailEdittingData.product_url}}</a></span>
            <el-input v-show="edittingDataField === 'product_url'" v-model="productDetailEdittingData.product_url" class="detai-input" placeholder="请输入商品链接" size="small"></el-input>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'product_url'" @click="editOneField('product_url')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'product_url'" @click="saveProductOneField('product_url')"></i>
          </div>
          <div class="td label">录入人</div>
          <div class="td content">{{rowDetailData.add_by}}</div>
        </div>
        <div class="tr">
          <div class="td label">品类</div>
          <div class="td content">
            <span v-show="edittingDataField !== 'category'">{{categoryFormate(productDetailEdittingData)}}</span>
            <el-select v-show="edittingDataField === 'category'" v-model="productDetailEdittingData.category" placeholder="请选择品类" size="small">
              <el-option v-for="item in categoryOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'category'" @click="editOneField('category')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'category'" @click="saveProductOneField('category')"></i>
          </div>
          <div class="td label">录入时间</div>
          <div class="td content">{{showProDateFormat(rowDetailData.gmt_create)}}</div>
        </div>
        <div class="tr">
          <div class="td label">活动价</div>
          <div class="td content">
            <span v-show="edittingDataField !== 'product_sales_price'">{{productDetailEdittingData.product_sales_price}}元</span>
            <el-input v-show="edittingDataField === 'product_sales_price'" v-model="productDetailEdittingData.product_sales_price" class="detai-input" placeholder="请输入活动价" size="small"></el-input>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'product_sales_price'" @click="editOneField('product_sales_price')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'product_sales_price'" @click="saveProductOneField('product_sales_price')"></i>
          </div>
          <div class="td label">最终修改人</div>
          <div class="td content">{{rowDetailData.modified_by}}</div>
        </div>
        <div class="tr">
          <div class="td label">标签</div>
          <div class="td content">
            <div v-show="edittingDataField !== 'tag'">
              <span class="tag">{{getIsPresell(rowDetailData)}}</span>
              <span :class="['tag', getIsDisplay(rowDetailData) === '已出单' ? '' : 'is-sold-tag']">{{getIsDisplay(rowDetailData)}}</span>
              <span class="tag" v-if="productDetailEdittingData.is_related_product === 2">关联商品</span>
              <span class="tag" v-if="productDetailEdittingData.is_top === 1">置顶</span>
            </div>
            <div v-show="edittingDataField === 'tag'">
              <template><el-checkbox :true-label="1" :false-label="0" v-model="productDetailEdittingData.is_top">置顶</el-checkbox></template>
              <template><el-checkbox :true-label="2" :false-label="1" v-model="productDetailEdittingData.is_related_product">关联商品</el-checkbox></template>
            </div>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'tag'" @click="editOneField('tag')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'tag'" @click="saveProductOneField('tag')"></i>
          </div>
          <div class="td label">修改时间</div>
          <div class="td content">{{showProDateFormat(rowDetailData.gmt_modified)}}</div>
        </div>
        <div class="tr">
          <div class="td label">直播时间</div>
          <div class="td content">
            <span v-show="edittingDataField !== 'display_period'">{{periodFormate(productDetailEdittingData)}}</span>
            <el-select v-show="edittingDataField === 'display_period'" v-model="productDetailEdittingData.display_period" placeholder="请选择直播时间段" size="small">
              <el-option v-for="item in livePeriodOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
            <i v-if="hasUpdateProductRight" class="gm-icon gm-icon-edit" v-show="edittingDataField !== 'display_period'" @click="editOneField('display_period')"></i>
            <i class="submit-icon" v-show="edittingDataField === 'display_period'" @click="saveProductOneField('display_period')"></i>
          </div>
          <div class="td label"></div>
          <div class="td content"></div>
        </div>
      </div>
      <div class="btns-wrap">
        <el-button v-if="$store.getters['user/getUserRole'].includes(RIGHT_CODE.del_product)" type="info" plain size="small" @click="deleteProduct(rowDetailData)">删除商品</el-button>
        <el-button type="info" plain size="small" @click="productDetailDialogVisiable = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 新增商品 弹窗 -->
    <el-dialog :visible.sync="addProductDialogVisiable" append-to-body class="add-product-dialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="cutom-header" slot="title">
        <span
          :class="['dialog-tab', dialogShowBlockIndex === 0 ? 'active' : '']"
          @click="dialogShowBlockIndex = 0">添加商品</span>
        <span
          :class="['dialog-tab', dialogShowBlockIndex === 1 ? 'active' : '']"
          @click="dialogShowBlockIndex = 1">批量导入</span>
      </div>
      <div v-show="dialogShowBlockIndex === 0">
        <el-form size="small" :model="updateproductInfo" :inline="true" label-width="110px" label-position="top" ref="updateproductInfo">
          <el-row>
            <el-form-item label="主播昵称">
              <el-input v-model="updateproductInfo.star_name" disabled placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="活动价(客单价)" prop="product_sales_price" :rules="[{required: true, message: '活动价(客单价)是必填项'}]">
              <el-input name="product_sales_price" v-model="updateproductInfo.product_sales_price" placeholder="请输入内容" type="number" class="editdialog-salesprice">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品名称" prop="product_name" :rules="[{required: true, message: '商品名称是必填项'}]">
              <el-input name="product_name" v-model="updateproductInfo.product_name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="产品销售量">
              <el-input v-model="updateproductInfo.product_sales_num" placeholder="未出单请勿填写,未售出则填0" type="number">
                <template slot="append">件</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品链接" prop="product_url" :rules="[{required: true, message: '商品链接是必填项'}]">
              <el-input name="product_url" v-model="updateproductInfo.product_url" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="产品销售额">
              <el-input v-model="updateproductInfo.product_sales_amount" placeholder="未出单请勿填写,未售出则填0" type="number">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="店铺名称" prop="shop_name" :rules="[{required: true, message: '店铺名称是必填项'}]">
              <el-input name="shop_name" v-model="updateproductInfo.shop_name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="产品点击数" prop="product_click_num" :rules="[{required: true, message: '产品点击数是必填项'}]">
              <el-input name="product_click_num" v-model="updateproductInfo.product_click_num" placeholder="请输入内容" type="number">
                <template slot="append">次</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <!-- <el-form-item label="直播日期" prop="display_time" :rules="[{required: true, message: '直播日期是必填项'}]">
              <el-date-picker
                v-model="updateproductInfo.display_time"
                placeholder="请选择直播日期"
                value-format="yyyy-MM-dd"
                name="display_time">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="品类" prop="category" :rules="[{required: true, message: '品类是必选项'}]">
              <el-select name="category" v-model="updateproductInfo.category" placeholder="请选择品类">
                <el-option v-for="item in categoryOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="直播报价" prop="display_price" :rules="[{required: true, message: '直播报价是必填项'}]">
              <el-input name="display_price" v-model="updateproductInfo.display_price" placeholder="请输入内容" type="number">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="直播时长" prop="duration" :rules="[{required: true, message: '直播时长是必选项'}]">
              <el-select name="duration" placeholder="请选择直播时长" v-model="updateproductInfo.duration">
                <el-option v-for="item in liveDurationOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="直播成本" prop="display_cost" :rules="[{required: true, message: '直播成本是必填项'}]">
              <el-input  name="display_cost" v-model="updateproductInfo.display_cost" placeholder="请输入内容" type="number">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item>
              <el-checkbox style="margin-left:4%" :true-label="1" :false-label="0" v-model="updateproductInfo.is_top">是否置顶</el-checkbox>
            </el-form-item>
            <el-form-item label="直播时间段" prop="display_period" :rules="[{required: true, message: '直播时间段是必选项'}]">
              <el-select name="display_period" placeholder="请选择直播时间段" v-model="updateproductInfo.display_period">
                <el-option v-for="item in livePeriodOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <!-- <el-form-item v-if="isEditDialog">
              <el-checkbox style="margin-left:4%" :true-label="2" :false-label="1" v-model="updateproductInfo.is_related_product">是否为关联商品</el-checkbox>
            </el-form-item> -->
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button style="width:80px" size="small" @click="addProductDialogVisiable = false">取消</el-button>
          <!-- <el-button style="width:80px" type="primary" size="small" @click="editProduct('updateproductInfo')" v-show="isEditDialog">保存</el-button> -->
          <el-button style="width:80px" type="primary" size="small" @click="addProduct('updateproductInfo')" :disabled="isAddingEditing" v-show="!isEditDialog">添加</el-button>
        </span>
      </div>
      <div v-show="dialogShowBlockIndex === 1" class="upload-wrap">
        <el-upload
          class="import-product-btn"
          v-if="isAdminUser"
          ref="upload"
          style="display:inline;margin-left:10px"
          :action='""'
          :http-request="uploadProduct"
          :show-file-list="false"
          multiple
          :file-list="fileList">
          <el-button size="small" type="primary" :loading="uploadLoading">
            <div class="upload-icon"></div>
            <p class="icon-title">导入商品</p>
            <p class="icon-tip">点击此处选择要导入的文件</p>
          </el-button>
        </el-upload>
        <p class="template-link">
          <el-button class="download-tpl" size="small" type="info" plain @click="downloadModelxlsx">下载模板</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {queryProducts, deleteProduct, updateProduct, saveProduct, queryDisplays, deleteDisplay, updateDisplay} from '@/api/display'
import {displayTypeFormate, categoryFormate, dateFormat, periodFormate, getDuration, showProDateFormat, getIsDisplay, getIsPresell, showZhCnDate} from '@/utils/format'
import {fileMaxSize, fileMaxSizeTips} from '@/utils/config' // USER_ROLE
import {categoryOptions, livePeriodOption, liveDurationOption, displayTypeOptions, presellSelectOption} from '@/const/options'
// import {getUserInfo} from '@/api/auth'
import {domain} from '@/utils/variable'
import {uploadFile} from '@/api/upload'
import { ROLE_CODE, RIGHT_CODE } from '@/const/roleCode'
import PubSub from 'pubsub-js'

export default {
  props: ['pdata'],
  data () {
    return {
      RIGHT_CODE,
      domain,
      isAddButton: false,
      uploadLoading: false,
      fileList: [],
      isAdminUser: true,
      isProduct: false,
      categoryOptions,
      livePeriodOption,
      liveDurationOption,
      ProductData: [],
      ProductData_loading: false,
      updateProductDialogVisible: false,
      editProDialogTitle: '编辑商品信息',
      isEditDialog: false,
      currentDisplayId: '',
      currentStarName: '',
      currentstarId: '',
      updateproductInfo: {},
      detailData: {},
      showDetailDialogVisible: false,
      addDisplayDialogVisible: false, // 编辑场次弹窗显示标志
      displayInfoForm: { // 编辑场次form
        title: '',
        starName: '',
        starId: '',
        category: '',
        displayType: '',
        pv: '',
        displayTime: null,
        id: '',
        isPresell: false
      },
      displayTypeOptions,
      presellSelectOption,
      displayDetail: null, // 场次详情
      productDetailDialogVisiable: false, // 商品详情弹窗
      rowDetailData: null, // 当前点击的商品详情（弹窗中展示的数据）
      productDetailEdittingData: { // 编辑商品详情保存数据的对象
        display_cost: 0,
        duration: null,
        display_price: 0,
        product_click_num: 0,
        shop_name: '',
        product_sales_amount: 0,
        product_name: '',
        product_sales_num: 0,
        category: null,
        product_sales_price: 0,
        display_period: null,
        product_url: '',
        is_top: 0,
        is_related_product: 1,
        id: null,
        display_time: ''
      },
      edittingDataField: '', // 编辑的字段
      updateOneFieldLoading: false,
      updateDetailMsg: '', // 错误提示信息
      addProductDialogVisiable: false, // 新增商品弹窗是否显示
      dialogShowBlockIndex: 0, // 弹窗激活按钮的索引
      selectedProductsIds: [],
      isAddingEditing: false, // 当点击添加和保存修改的按钮时，限制重复点击
      cpdata: null
    }
  },
  created () {
    // getUserInfo().then(response => {
    //   // 只有项目经理无法操作
    //   if (response.data.data.role === USER_ROLE.PROJECT_MANAGER) {
    //     this.isAdminUser = false
    //   }
    // })
    // 只有项目经理无法操作
    const role = this.$store.getters['user/getUserRole']
    if (role === ROLE_CODE.customer_manager) {
      this.isAdminUser = false
    }

    if (this.$route.query.displayId) {
      this.currentDisplayId = this.$route.query.displayId
      this.currentstarId = this.$route.query.currentstarId
      this.currentStarName = this.$route.query.currentStarName
      this.showProducts(this.currentDisplayId)
    }
    if (Object.keys(this.$route.query).length === 0 && !this.pdata) {
      // this.$router.push({path: '/data/display-info'})
      this.$router.push({path: '/operation-center/display-management'})
    }

    // 加载场次详情
    this.getDisplayDetail()
    // 监听
    this.subscribePD()
  },
  methods: {
    subscribePD () {
      let _vm = this
      // 监听消息
      PubSub.subscribe('toProductDetail', function(msg, data) {
        if (data) {
          _vm.cpdata = data
          const role = _vm.$store.getters['user/getUserRole']
          if (role === ROLE_CODE.customer_manager) {
            _vm.isAdminUser = false
          }
          // 加载场次详情
          _vm.getDisplayDetail()
          _vm.currentDisplayId = data.displayId
          _vm.currentstarId = data.currentstarId
          _vm.currentStarName = data.currentStarName
          _vm.showProducts(_vm.currentDisplayId)
        }
      })
    },
    // 判断当前用户权限，仅合作创建人/所属客户经理/指定AE可操作
    judgeProCurrentPower (userid) {
      if (this.pdata) {
        const _userinfo = JSON.parse(JSON.stringify(this.$store.getters['user/getUserInfo']))
        if (_userinfo && _userinfo.id === userid) {
          return true
        } else {
          const _cooperationDetail = JSON.parse(JSON.stringify(this.$store.getters['cooperative/CooperationDetail']))
          if (_cooperationDetail && _userinfo) {
            if (_cooperationDetail.ae && _cooperationDetail.ae.length > 0) {
              let _index = _cooperationDetail.ae.findIndex(a => a.ae_id === _userinfo.id)
              if (_index > -1) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          } else {
            return false
          }
        }
      } else {
        return true
      }
    },
    // getProductName (row) {
    //   let subLen
    //   let width = this.$refs.liveTitle.bodyWidth
    //   width = parseInt(width.substring(0, width.length - 2))
    //   if (width >= 1500) {
    //     subLen = 20
    //   } else if (width >= 1200) {
    //     subLen = 16
    //   } else {
    //     subLen = 11
    //   }
    //   if (row.length > subLen) {
    //     return row.substring(0, subLen - 1) + '..'
    //   } else {
    //     return row
    //   }
    // },
    downloadModelxlsx: function () {
      window.open(this.domain + '/api/star/upload_product_template')
    },
    // 导入商品
    uploadProduct: function (param) {
      this.uploadLoading = true
      let file = param.file
      if (file.size > fileMaxSize) {
        this.$message.error(fileMaxSizeTips)
        this.uploadLoading = false
        return
      }
      let form = new FormData()
      form.append('param_id', this.currentDisplayId)
      form.append('file', file)
      form.append('operate', 'product')
      uploadFile(form).then(response => {
        let result = response.data
        if (result.success) {
          // this.$gmMessage(result.message, 'tip')
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
                this.saveStarDialogVisible = false
                this.$router.push({
                  path: '/operation-center/import-log'
                })
              }
            }
          })
          setTimeout(() => {
            this.showProducts(this.currentDisplayId)
          }, 0)
          this.uploadLoading = false
        } else {
          this.$gmMessage(result.message, 'tip')
          this.uploadLoading = false
        }
      })
    },
    back () {
      this.$router.go(-1)
    },
    showDetail (value) {
      this.detailData = JSON.parse(JSON.stringify(value))
      this.detailData.display_time = this.showProDateFormat(this.detailData.display_time)
      this.detailData.display_period = this.periodFormate(this.detailData)
      this.detailData.category = this.categoryFormate(this.detailData)
      this.detailData.duration = this.getDuration(this.detailData)
      for (var item in this.detailData) {
        if (this.detailData[item] === -1) this.detailData[item] = '未出单'
      }
      if (this.detailData.modified_by === '') {
        this.detailData.modified_by = '-'
      }
      if (this.detailData.add_by === '') {
        this.detailData.add_by = '-'
      }
      this.showDetailDialogVisible = true
    },
    closeAddProductDialog (formName) {
      this.$refs[formName].resetFields()
      this.updateproductInfo.isTop = false
    },
    // 新增商品验证&请求数据
    addProduct (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let productpass = JSON.parse(JSON.stringify(this.updateproductInfo))
          this.isAddingEditing = true
          saveProduct(productpass).then((response) => {
            let data = response.data
            if (data.success) {
              this.$gmMessage(data.message)
              this.addProductDialogVisiable = false
              this.ProductData_loading = true
              if (this.pdata) {
                PubSub.publish('addScene', true)
              }
              this.showProducts(this.currentDisplayId)
              this.updateproductInfo = {}
            } else {
              this.$gmMessage(data.message, 'tip')
            }
            this.isAddingEditing = false
          }).catch((error) => {
            this.isAddingEditing = false
            console.log(error)
          })
        } else {
          return false
        }
      })
    },
    editProduct (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let productpass = JSON.parse(JSON.stringify(this.updateproductInfo))
          let deleteAttr = ['title', 'requirement_product_id', 'flag', 'is_presell', 'tag', 'add_by', 'gmt_modified', 'gmt_create', 'modified_by', 'is_display']
          deleteAttr.forEach(key => {
            delete productpass[key]
          })
          productpass.display_time = new Date(productpass.display_time)
          if (productpass.category === '无') {
            this.$gmMessage('品类属性不能为“无”', 'tip')
          } else {
            this.isAddingEditing = true
            updateProduct(productpass).then((response) => {
              let data = response.data
              if (data.success) {
                this.$gmMessage(data.message)
                this.updateProductDialogVisible = false
                this.ProductData_loading = true
                this.showProducts(this.currentDisplayId)
              } else {
                this.$gmMessage(data.message, 'tip')
              }
              this.isAddingEditing = false
            }).catch((error) => {
              this.isAddingEditing = false
              console.log(error)
            })
          }
        } else {
          return false
        }
      })
    },
    deleteProduct (scope) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'warning-icon'
      }).then(() => {
        let productpass = {
          'id': scope.id
        }
        deleteProduct(productpass).then((response) => {
          let data = response.data
          if (data.success) {
            this.$gmMessage(data.message)
            if (this.pdata) {
              PubSub.publish('addScene', true)
            }
            this.showProducts(this.currentDisplayId)
            this.productDetailDialogVisiable = false
          } else {
            this.$gmMessage(data.message, 'tip')
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    showProducts (displayId) {
      let productpass = {
        'display_id': displayId
      }
      this.ProductData_loading = true
      this.getDisplayDetail()
      queryProducts(productpass).then(response => {
        let data = response.data
        if (data.success) {
          this.ProductData = []
          for (var i in data.data.data) {
            this.ProductData.push(Object.assign(data.data.data[i]))
          }
          this.ProductData_loading = false
        } else {
          if (data.error_code !== 100) {
            this.$gmMessage(data.message, 'tip')
          }
        }
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    // 点击新增商品打开弹窗
    openAddProductDialog () {
      this.isEditDialog = false
      // this.editProDialogTitle = '添加商品'
      this.updateproductInfo = {
        id: '',
        product_name: '',
        category: '',
        star_id: '',
        star_name: '',
        shop_name: '',
        product_url: '',
        product_click_num: '',
        product_sales_amount: '',
        product_sales_num: '',
        product_sales_rice: '',
        display_price: '',
        display_cost: '',
        display_time: '',
        is_top: 0,
        duration: '',
        display_period: '',
        display_id: ''
      }
      this.updateproductInfo.star_name = this.currentStarName
      this.updateproductInfo.display_id = this.currentDisplayId
      this.updateproductInfo.star_id = this.currentstarId
      this.addProductDialogVisiable = true
      this.$nextTick(() => {
        this.$refs['updateproductInfo'].resetFields()
      })
    },
    openEditProductDialog (scope) {
      this.isEditDialog = true
      this.editProDialogTitle = '编辑商品信息'
      this.updateproductInfo = JSON.parse(JSON.stringify(scope))
      this.updateproductInfo.display_time = new Date(this.updateproductInfo.display_time)
      for (var item in this.updateproductInfo) {
        if (this.updateproductInfo[item] === -1) this.updateproductInfo[item] = ''
      }
      if (this.updateproductInfo.category === 0) this.updateproductInfo.category = '无'
      if (this.updateproductInfo.display_period === null) this.updateproductInfo.display_period = '未录入'
    },
    customColumnHeader (h, {column, $index}) {
      return (
        <span>销售情况
          <el-tooltip content="未出单商品则不填该字段,若填写则认为商品已出单" placement="top" effect="light">
            <i class="el-icon-question" style="cursor:pointer;margin-left:4px"></i>
          </el-tooltip>
        </span>
      )
    },
    showProDateFormat,
    displayTypeFormate,
    categoryFormate,
    periodFormate,
    dateFormat,
    getDuration,
    getIsDisplay,
    getIsPresell,
    showZhCnDate,
    // 监控编辑场次按钮
    handleDisplayEditClick () {
      this.addDisplayDialogVisible = true
    },
    // 获取场次详情
    getDisplayDetail () {
      let displayId = 0
      if (this.$route.query.displayId !== undefined) {
        displayId = this.$route.query.displayId
      } else {
        if (this.cpdata != null) {
          displayId = this.cpdata.displayId
        }
      }
      let displaypass = {
        display_id: displayId
      }

      queryDisplays(displaypass).then((response) => {
        let data = response.data
        this.displayDetail = data.data.data['0']
        this.displayInfoForm = {
          title: this.displayDetail.title,
          starName: this.displayDetail.star_name,
          starId: this.displayDetail.star_id,
          category: this.displayDetail.category,
          displayType: this.displayDetail.display_type,
          pv: this.displayDetail.pv > -1 ? this.displayDetail.pv : '',
          uv: this.displayDetail.uv > -1 ? this.displayDetail.uv : '',
          displayTime: showZhCnDate(this.displayDetail.display_time),
          id: this.displayDetail.id,
          isPresell: this.displayDetail.is_presell
        }
      }).catch(() => {
      })
    },
    // 删除场次
    deleteDisplay: function (scope) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'warning-icon'
      }).then(() => {
        let displaypass = {
          'id': JSON.stringify(scope.id)
        }
        deleteDisplay(displaypass).then((response) => {
          let data = response.data
          if (data.success) {
            this.$gmMessage(data.message)
            if (this.pdata) {
              this.$emit('deleteScene')
            } else {
              this.$router.back()
            }
          } else {
            this.$gmMessage(data.message, 'tip')
          }
        }).catch((error) => {
          console.log(error)
          this.loading = false
        })
      }).catch(() => {
      })
    },
    // 点击单个商品
    productClick (row) {
      this.productDetailDialogVisiable = true
      this.rowDetailData = row
      for (let key in this.productDetailEdittingData) {
        let value = this.rowDetailData[key]
        // if ((key === 'duration' || key === 'display_period') && this.rowDetailData[key] === -1) {
        //   value = null
        // }
        if ((key === 'category') && this.rowDetailData[key] === 0) {
          value = null
        }
        // if (key === 'is_top') {
        //   value = this.rowDetailData[key] === 1
        // }
        // if (key === 'is_related_product') {
        //   value = this.rowDetailData[key] === 2
        // }
        this.productDetailEdittingData[key] = value
      }
    },
    // 点击编辑一个字段
    editOneField (fieldName) {
      this.edittingDataField = fieldName
    },
    // 保存商品编辑弹窗中的一个字段
    saveProductOneField (fieldName) {
      let data = this.productDetailEdittingData
      // if (fieldName !== 'tag') {
      //   data[fieldName] = this.productDetailEdittingData[fieldName]
      // } else {
      //   data['is_top'] = this.productDetailEdittingData['is_top']
      //   data['is_related_product'] = this.productDetailEdittingData['is_related_product']
      // }
      data.display_time = this.showProDateFormat(data.display_time)

      let msg = {
        display_cost: '直播成本',
        display_price: '直播报价',
        product_click_num: '点击数',
        shop_name: '店铺',
        product_sales_amount: '销售额',
        product_name: '商品',
        product_sales_num: '销售量',
        product_url: '商品链接',
        product_sales_price: '活动价'
      }
      if (data[fieldName] === '' && msg[fieldName]) {
        this.updateDetailMsg = '请输入' + msg[fieldName]
        return false
      } else if (data.duration === null) {
        this.updateDetailMsg = '请选择直播时长'
        return false
      } else if (data.category === null) {
        this.updateDetailMsg = '请选择品类'
        return false
      } else if (data.display_period === null) {
        this.updateDetailMsg = '请选择直播时间'
        return false
      } else {
        this.updateDetailMsg = ''
      }

      this.updateOneFieldLoading = true
      updateProduct(data).then((response) => {
        let data = response.data
        if (data.success) {
          this.$gmMessage(data.message)
          this.updateProductDialogVisible = false
          this.ProductData_loading = true
          this.showProducts(this.currentDisplayId)
          if (this.pdata) {
            PubSub.publish('addScene', true)
          }
          this.edittingDataField = ''
          this.updateOneFieldLoading = false
        } else {
          // debugger
          this.updateOneFieldLoading = false
          this.$gmMessage(data.message, 'tip')
        }
      }).catch(() => {
        this.$gmMessage('更新失败', 'tip')
      })
    },
    // 编辑场次信息
    updateDisplays: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let updatedisplaypass = {
            'id': this.displayInfoForm.id,
            'star_id': this.displayInfoForm.starId,
            'star_name': this.displayInfoForm.starName,
            'title': this.displayInfoForm.title,
            'display_type': this.displayInfoForm.displayType,
            'pv': this.displayInfoForm.pv,
            'display_time': showProDateFormat(this.displayInfoForm.displayTime),
            'is_presell': this.displayInfoForm.isPresell,
            'uv': this.displayInfoForm.uv
          }
          if (updatedisplaypass.uv === '未录入') updatedisplaypass.uv = ''
          if (updatedisplaypass.is_presell === '未录入') {
            this.$gmMessage('是否预售场不能为“未录入”', 'tip')
          } else {
            updateDisplay(updatedisplaypass).then(response => {
              let data = response.data
              if (data.success) {
                this.$gmMessage(data.message)
                this.addDisplayDialogVisible = false
                this.getDisplayDetail()
                if (this.pdata) {
                  PubSub.publish('addScene', true)
                }
              } else {
                this.$gmMessage(data.message, 'tip')
              }
            }).catch(error => {
              console.log(error)
            })
          }
        } else {
          return false
        }
      })
    },
    // 监控选择框选择事件
    handleSelectionChange (val) {
      this.selectedProductsIds = val.map(item => item.id)
    },
    // 批量删除操作
    batchDeleteProduct () {
      if (this.selectedProductsIds.length === 0) {
        return this.$gmMessage('至少选择一个商品', 'tip')
      }
      this.$confirm('此操作将删除商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'warning-icon'
      }).then(() => {
        let productpass = {
          'id': JSON.stringify(this.selectedProductsIds)
        }
        deleteProduct(productpass).then((response) => {
          let data = response.data
          if (data.success) {
            this.$gmMessage(data.message)
            if (this.pdata) {
              PubSub.publish('addScene', true)
            }
            this.showProducts(this.currentDisplayId)
          } else {
            this.$gmMessage(data.message, 'tip')
          }
        })
      })
    },
    // 直播信息自定义表头
    liveInfoCustomerHeader() {
      return (
        <span>直播信息
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              <p>关联商品无报价及成本</p>
            </div>
            <i class="el-icon-warning" style="cursor:pointer;margin-left:4px;color:#909399;"></i>
          </el-tooltip>
        </span>
      )
    },
    // 是否拥有修改商品的权限
    hasUpdateProductRight () {
      return this.$store.getters['user/getUserRole'].includes(RIGHT_CODE.update_product)
    }
  }
}
</script>
<style lang="scss">
  @import '@/styles/vars.scss';

  .el-dialog__header, .el-dialog__footer {
    text-align: center !important;
  }
  .edit-product-dialog, .show-product-dialog {
    .el-form-item__label {
      padding-bottom: 0;
      line-height: 18px;
      margin-left: 4%;
    }
    .el-dialog__body {
      padding: 20px;
      text-align: initial;
    }
    .el-dialog__footer {
      border-top: 1px solid #f0f1f2;
      padding-bottom: 10px;
    }
    .el-form-item__error {
      top: -16px;
      margin-right: 6%;
    }
  }
  .el-table td, .el-table th {
    padding: 6px 0;
  }
  .product-list {
    tr td .cell {
      cursor: pointer;
    }
    .product-detail-link {
      color: #666;
      text-decoration: none;
      &:hover {
        color: #5C82FF;
      }
    }
    .product-title {
      .link-icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url(../../assets/img/link_icon.png) no-repeat 0 0;
        &:hover {
          background: url(../../assets/img/link_icon.png) no-repeat -12px 0;
        }
      }
    }
  }
  // 商品详情弹窗
  .product-detail-table {
    border-left: #EBEBEB solid 1px;
    border-bottom: #EBEBEB solid 1px;
    width: 745px;
    margin: 0 auto;
    .tr {
      overflow: hidden;
      width: 745px;;
      .td {
        float: left;
        line-height: 48px;
        border-top: #EBEBEB solid 1px;
        border-right: #EBEBEB solid 1px;
        &.label {
          width: 87px;
          height: 48px;
          background: #F8F8F8;
          padding-right: 16px;
          text-align: right;
          color: #999;
        }
        &.content {
          width: 217px;
          height: 48px;
          padding-right: 34px;
          padding-left: 16px;
          color: #666;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          position: relative;
          a {
            color: $color-primary;
            text-decoration: none;
          }
          .detai-input {
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
          .gm-icon-edit {
            display: none;
            position: absolute;
            right: 0;
            top: 7px;
          }
          &:hover {
            .gm-icon-edit {
              display: block;
            }
          }
        }
        .tag {
          font-size: 12px;
          color: $color-primary;
          border: $color-primary solid 1px;
          border-radius: 3px;
          padding: 0 2px;
          &.is-sold-tag {
            color: #999;
            border-color: #999;
          }
        }
        i.submit-icon {
          display: block;
          width: 30px;
          height: 30px;
          background: url(../../assets/img/data_save_iocn.png) no-repeat;
          position: absolute;
          right: 0;
          top: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .btns-wrap {
    text-align: center;
    margin-top: 30px;
  }
  .el-dialog__body {
    position: relative;
  }
  .tips-wrap {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    .tips {
      display: inline-block;
      width: initial;
      padding-right: 30px;
    }
  }
</style>

<style lang="scss" scoped>
  @import '@/assets/scss/productInfo.scss';
</style>

<style>
  /* 商品详情弹窗 */
  .product-detail-dialog .el-dialog__header {
    background: #F8F8F8;
    border-bottom: #EFEFEF solid 1px;
    color: #666;
    padding: 0;
    text-align: left!important;
  }
  .product-detail-dialog .el-dialog__headerbtn i {
    color: #909399!important;
    position: relative;
    top: -3px;
  }
  .product-detail-dialog .cutom-header {
    text-align: center;
    font-size: 16px;
  }
  .product-detail-dialog .cutom-header span {
    color: #666!important;
    line-height: 50px;
    display: inline-block;
    width: 120px;
    text-align: center;
    cursor: pointer;
  }
  .product-detail-dialog .el-dialog {
    min-width: 800px;
    max-width: 800px;
  }
  .product-detail-dialog .el-form-item--small .el-form-item__label {
    line-height: 15px;
    padding-bottom: 4px;
  }
  /* 编辑场次弹窗 */
  .edit-display-dialog .el-dialog {
    min-width: 500px;
    max-width: 600px;
  }
  .edit-display-dialog .el-dialog__header {
    background: #F8F8F8;
    border-bottom: #EFEFEF solid 1px;
    color: #666;
    padding: 0;
    text-align: left!important;
    height: 40px;
    line-height: 40px;
    text-align: center!important;
  }
  .edit-display-dialog .el-dialog__header .el-dialog__title {
    color: #666!important;
    font-size: 14px;
  }
  .edit-display-dialog .el-dialog__headerbtn i {
    color: #909399!important;
    position: relative;
    top: -7px;
  }
  .edit-display-dialog .cutom-header span {
    color: #666!important;
    line-height: 50px;
    display: inline-block;
    width: 120px;
    text-align: center;
    cursor: pointer;
  }
  .edit-display-dialog .cutom-header span.active {
    background: #fff;
    color: #5C82FF!important;
    position: relative;
  }
  .edit-display-dialog .cutom-header span.active::after {
    content: " ";
    display: block;
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: -2px;
    background: #fff;
  }
  .edit-display-dialog .el-form-item {
    width: 79%;
    margin: 2px auto;
    position: relative;
    margin-left: 10%;
  }
  .edit-display-dialog .el-autocomplete {
    width: 100%;
  }
  .edit-display-dialog .el-select.el-select--small {
    width: 100%;
  }
  .edit-display-dialog .el-date-editor.el-input {
    width: 100%;
  }
  /* 新增商品弹窗 手输入/导入 */
  .add-product-dialog .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
  }
  .add-product-dialog .el-dialog {
    min-width: 800px;
    max-width: 800px;
  }
  .add-product-dialog .el-dialog__header {
    background: #F8F8F8;
    border-bottom: #EFEFEF solid 1px;
    color: #666;
    padding: 0;
    text-align: left!important;
  }
  .add-product-dialog .el-dialog__headerbtn i {
    color: #909399!important;
    position: relative;
    top: -3px;
  }
  .add-product-dialog .cutom-header span {
    color: #666!important;
    line-height: 50px;
    display: inline-block;
    width: 120px;
    text-align: center;
    cursor: pointer;
  }
  .add-product-dialog .cutom-header span.active {
    background: #fff;
    color: #5C82FF!important;
    position: relative;
  }
  .add-product-dialog .cutom-header span.active::after {
    content: " ";
    display: block;
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: -2px;
    background: #fff;
  }
  .add-product-dialog .el-date-editor,
  .add-product-dialog .el-select {
    width: 100%;
  }
  .add-product-dialog .el-form-item {
    width: 43%;
    margin: 0 3%;
    margin-bottom: 6px;
  }
  .add-product-dialog .dialog-footer {
    display: block;
    text-align: center;
    margin-top: 10px;
  }
  .import-product-btn {
    display: block!important;
    width: 500px!important;
    height: 240px;
    margin: 0 auto!important;
  }
  .import-product-btn button{
    display: block;
    width: 500px!important;
    height: 240px;
    background: #fcfcfc;
  }
  .add-product-dialog .upload-wrap {
    margin: 92px 0px;
  }
  .add-product-dialog .upload-wrap .el-upload button {
    display: block;
    color: #666;
    background: #FCFCFC;
    border-radius: 0;
    border: #D0D0D0 dashed 1px;
  }
  .add-product-dialog .upload-icon {
    width: 78px;
    height: 70px;
    background: url(../../assets/img/import_icon.png) 0 0 no-repeat;
    margin: 0 auto;
  }
  .add-product-dialog .upload-wrap .el-upload button:hover .upload-icon {
    background-position: -78px 0;
  }
  .icon-title {
    color: #666;
    margin: 30px 0 13px;
    font-size: 16px;
  }
  .icon-tip {
    color: #BBBBBB;
  }
  .add-product-dialog .template-link {
    text-align: center;
    padding-top: 20px;
  }
  .add-product-dialog button.download-tpl.el-button--info.is-plain {
    display: block;
    margin: 30px auto 0;
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
    padding: 0;
  }
  .add-product-dialog button.download-tpl.el-button--info.is-plain:hover:hover {
    background: #f2f2f2;
    color: #555;
  }
  .add-product-dialog button.download-tpl.el-button--info.is-plain:hover:active {
    border-color: #5c82ff;
  }
  .add-product-dialog .el-form-item--small .el-form-item__label {
    line-height: 15px;
    padding-bottom: 4px;
  }
</style>
