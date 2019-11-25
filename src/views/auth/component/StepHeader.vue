<style lang="scss" scoped>
  #step-header {
    .step-wrap {
      border-bottom: #F2F2F2 solid 1px;
    }
    .step-inner {
      margin: 0 22px;
      position: relative;
      .el-icon-arrow-right {
        color: #ddd;
        position: absolute;
        right: -34px;
        top: 31%;
        font-size: 24px;
      }
    }
    .step-item {
      height: 70px;
      line-height: 68px;
      text-align: center;
      .index {
        display: inline-block;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        background: #DDDDDD;
        border-radius: 50%;
        margin-right: 10px;
        .index-text {
          color: #fff;
          font-weight: bold;
          font-size: 14px;
        }
      }
      .step-text {
        color: #999;
        font-size: 16px;
        font-weight:400;
      }
      &.process {
        .step-inner {
          border-bottom: #5C82FF solid 2px;
        }
        .index {
          background: #5C82FF;
          .el-icon-check {
            display: none;
          }
        }
        .step-text {
          color: #5C82FF;
          font-weight: bold;
        }
      }
      &.success {
        .el-icon-arrow-right {
          color: #5C82FF;
        }
        .index {
          background: #5C82FF;
          .index-text {
            display: none;
          }
          .el-icon-check {
            color: #fff;
            font-size: 16px;
          }
        }
        .step-text {
          color: #5C82FF;
          font-weight: bold;
        }
      }
      &.wait {
        .index {
          .el-icon-check {
            display: none;
          }
        }
      }
    }
  }
</style>

<template>
  <div id="step-header">
    <el-row class="step-wrap">
      <el-col :span="8" :class="['step-item', getStepStatusClass(1)]">
        <div class="step-inner">
          <span class="index">
            <span class="index-text">1</span>
            <i class="el-icon-check"></i>
          </span>
          <span class="step-text">{{stepName[0]}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-col>
      <el-col :span="8" :class="['step-item', getStepStatusClass(2)]">
        <div class="step-inner">
          <span class="index">
            <span class="index-text">2</span>
            <i class="el-icon-check"></i>
          </span>
          <span class="step-text">{{stepName[1]}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-col>
      <el-col :span="8" :class="['step-item', getStepStatusClass(3)]">
        <div class="step-inner">
          <span class="index">
            <span class="index-text">3</span>
            <i class="el-icon-check"></i>
          </span>
          <span class="step-text">{{stepName[2]}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'step-header',
  props: {
    active: {
      type: Number,
      default: 1
    },
    stepName: {
      type: Array,
      default() {
        return ['注册账号', '填写账号信息', '注册完成']
      }
    }
  },
  methods: {
    getStepStatusClass (step) {
      let className = ''
      if (step === 1) {
        if (this.active === 1) className = 'process'
        if (this.active === 2) className = 'success'
        if (this.active === 3) className = 'success'
      } else if (step === 2) {
        if (this.active === 1) className = 'wait'
        if (this.active === 2) className = 'process'
        if (this.active === 3) className = 'success'
      } else if (step === 3) {
        if (this.active === 1) className = 'wait'
        if (this.active === 2) className = 'wait'
        if (this.active === 3) className = 'process'
      }
      return className
    }
  }
}
</script>
