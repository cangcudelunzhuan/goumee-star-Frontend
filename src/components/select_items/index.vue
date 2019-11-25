<template>
  <div class="selectitem-container">
    <div class="choose-block">
      <div class="name">{{title}}:</div>
      <div class="category-list" v-if="dataitems && dataitems.length > 0">
        <div class="category-item" :class="{current: currentIndex === item[value]}" v-for="item in dataitems" :key="item[value]" @click="handleSelectItem(item[value])">{{item[label]}}</div>
      </div>
      <span v-else>--</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectItems',
  props: ['title', 'dataitems', 'value', 'label'],
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    handleSelectItem (val) {
      this.currentIndex = val
      this.$emit('selectClick', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .selectitem-container {
    .choose-block {
      min-height: 60px;
      box-sizing: border-box;
      font-size: 0;
      border-bottom: 1px dashed #eff0f1;
      padding: 15px 12px;
      display: flex;
      .name {
        font-size: 14px;
        color: #999;
        line-height: 24px;
        display: inline-block;
        width: 80px;
      }
      .category-list {
        display: inline-block;
        flex: 1;
        .category-item {
          display: inline-block;
          // padding: 0 17px;
          font-size: 14px;
          color: #666;
          line-height: 30px;
          padding: 0 10px;
          margin: 0 10px;
          border-bottom: #fff solid 2px;
          cursor: pointer;
          &:hover {
            color: $color-primary;
          }
          &.current {
            color: #fff!important;
            background: $color-primary;
            border-radius: 15px;
          }
        }
      }
    }
  }
</style>
