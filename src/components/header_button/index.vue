<template>
  <div class="header-container">
    <i v-show="isback" class="el-icon-arrow-left" @click="handleBack"></i>
    <h2>{{title}}</h2>
    <p v-show="subtitle">
      {{subtitle}}
    </p>
    <div class="opt-btns">
      <span v-show="isedit">
        <el-tooltip :content="edittip" placement="top" effect="light">
          <i class="gm-icon gm-icon-edit" @click="handleEdit"></i>
        </el-tooltip>
      </span>
      <span v-show="isdelete">
        <el-tooltip :content="deltip" placement="top" effect="light">
          <i class="gm-icon gm-icon-delete" @click="handleDelete"></i>
        </el-tooltip>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderButton',
  props: ['title', 'subtitle', 'isback', 'isedit', 'edittip', 'isdelete', 'deltip'],
  data () {
    return {

    }
  },
  methods: {
    // 返回
    handleBack () {
      this.$router.back()
    },
    // 编辑
    handleEdit () {
      this.$emit('editClick')
    },
    // 删除
    handleDelete () {
      this.$emit('deleteClick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-container {
    padding-left: 12px;
    border-bottom: #F5F5F5 solid 1px;
    i,h2,p {
      display: inline-block;
      line-height: 54px;
      margin: 0;
      // vertical-align: middle;
    }
    i.el-icon-arrow-left {
      color: #BFC1C8;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
      margin-right: 5px;
    }
    h2 {
      font-size: 16px;
      color: #666;
    }
    p {
      color: #999;
      font-size: 12px;
      margin-left: 20px;
      span {
        margin: 0 15px;
      }
    }
    .opt-btns {
      float: right;
      span {
        display: inline-block;
        padding: 10px;
        border-left: #F5F5F5 solid 1px;
      }
    }
  }
</style>
