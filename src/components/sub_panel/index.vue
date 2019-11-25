<template>
  <div class="subpanel-container">
    <div :class="iserect ? 'erect-content-title' : 'content-title'">
      {{title}}
    </div>
    <div class="content-text">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubPanel',
  props: ['title', 'iserect']
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .subpanel-container {
    .content-title {
      margin-top: 30px;
      border-bottom: 1px dashed #efefef;
      line-height: 1;
      font-size: 14px;
      color: #666666;
      font-weight: bold;
      position: relative;
      padding: 0 0 12px 12px;
    }
    .erect-content-title {
      margin-top: 18px;
      border-bottom: 1px dashed #efefef;
      line-height: 1;
      font-size: 14px;
      color: #666666;
      font-weight: bold;
      position: relative;
      padding: 0 0 12px 12px;
      &::before {
        position: absolute;
        top: 2px;
        left: 0;
        width: 3px;
        height: 10px;
        content: '';
        background: $color-primary;
      }
    }
    .content-text {
      padding: 3px 20px 0;
    }
  }
</style>
