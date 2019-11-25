<!--
 * @Description: 合同附件的弹出窗列表主体
 * @Author: 白青
 * @Date: 2019-09-07 13:43:59
 * @LastEditTime: 2019-09-12 14:55:04
 * @LastEditors: 白青
 -->
<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  #attachment-list-popover {
    ul > li {
      height: 50px;
      line-height: 50px;
      border-bottom: #E8E8E8 dashed 1px;
      &:last-child(1) {
        border: none;
      }
      .item-name, img, a, em, .item-status-name {
        vertical-align: middle;
      }
      .file-link {
        text-decoration: none;
        color: $color-primary;
        display: inline-block;
        width: 127px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .status-dot {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        vertical-align: middle;
        margin-left: 30px;
        &.status-dot-1 { background-color: #FF8549; }
        &.status-dot-2 { background-color: $color-primary; }
        &.status-dot-3 { background-color: #F34B60; }
        &.status-dot-4 { background-color: #F34B60; }
        &.status-dot-5 { background-color: #aaa; }
      }
      .item-status-name {
        display: inline-block;
        width: 65px;
      }
      .download-link {
        color: #BFC1C8;
        font-size: 20px;
        &:hover {
          color: #999;
        }
      }
    }
  }
</style>

<template>
  <div id="attachment-list-popover">
    <ul>
      <li v-if="detail.contract_detail && detail.contract_detail.attachment_url">
        <span class="item-name">合同附件：</span>
        <img src="@/assets/img/file_icon.png">
        <a class="file-link" :href="detail.contract_detail.attachment_url" target="_blank">{{detail.contract_detail.attachment_url.split('/')[detail.contract_detail.attachment_url.split('/').length - 1]}}</a>
        <em :class="`status-dot status-dot-${detail.contract_info.contract_status}`"></em>
        <span class="item-status-name">{{detail.contract_info.contract_status_str}}</span>
        <a class="download-link" :href="detail.contract_detail.attachment_url" target="_blank"><i class="el-icon-download"></i></a>
      </li>
      <!-- <template v-if="detail.contract_annex_info && detail.contract_annex_info.length > 0"> -->
      <li v-for="(item, index) in annexList" :key="index">
        <span class="item-name">补充附件：</span>
        <img src="@/assets/img/file_icon.png">
        <a class="file-link" :href="item.attachment_url" target="_blank">{{item.attachment_url.split('/')[item.attachment_url.split('/').length - 1]}}</a>
        <em :class="`status-dot status-dot-${item.contract_annex_status}`"></em>
        <span class="item-status-name">{{item.contract_annex_status_str}}</span>
        <a class="download-link" :href="item.attachment_url" target="_blank"><i class="el-icon-download"></i></a>
      </li>
      <!-- </template> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AttachmentListPopover',
  props: {
    detail: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      annexList: []
    }
  },
  watch: {
    // detail: {
    //   deep: true,
    //   handler: ()
    // }
  },
  mounted () {
    this.handleAttachmentList()
  },
  methods: {
    // 处理附件数据
    handleAttachmentList () {
      // 由于一些合同附件包含多个附件文件，需单独整理
      this.annexList = []
      if (this.detail.contract_annex_info && this.detail.contract_annex_info.length > 0) {
        for (let i = 0; i < this.detail.contract_annex_info.length; i++) {
          if (this.detail.contract_annex_info[i].attachment_url_list && this.detail.contract_annex_info[i].attachment_url_list.length > 0) {
            for (let j = 0; j < this.detail.contract_annex_info[i].attachment_url_list.length; j++) {
              this.annexList.push({
                // 文件地址
                attachment_url: this.detail.contract_annex_info[i].attachment_url_list[j],
                // 附件审核状态
                contract_annex_status: this.detail.contract_annex_info[i].contract_annex_status,
                // 附件审核状态文字
                contract_annex_status_str: this.detail.contract_annex_info[i].contract_annex_status_str
              })
            }
          }
        }
      }
    }
  }
}
</script>
