<!--
 * @Description: 附件审批 - 合同附件的弹出窗列表主体
 * @Author: 白青
 * @Date: 2019-09-07 13:43:59
 * @LastEditTime: 2019-09-12 15:00:10
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
        width: 200px;
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
      <template v-if="annexList.length > 0">
        <li v-for="(item, index) in annexList" :key="index">
          <img src="@/assets/img/file_icon.png">
          <a class="file-link" :href="item" target="_blank">{{item.split('/')[item.split('/').length - 1]}}</a>
          <a class="download-link" :href="item" target="_blank"><i class="el-icon-download"></i></a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AttachmentListPopover',
  props: {
    annexList: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
