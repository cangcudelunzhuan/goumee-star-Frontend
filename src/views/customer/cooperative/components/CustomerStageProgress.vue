<template>
  <div class="csp-container">
    <div v-if="isvertical" class="vertical-container">
      <div class="line"></div>
      <div class="line-current" :style="`height: ${28 * stage - 14}px`"></div>
      <ul class="list">
        <template v-for="(item, index) in customerStageList">
          <li class="item" :class="{sign: index < stage, current: index == (stage - 1)}" :key="index" v-if="index >= 0">
            <span class="icon"></span>
            <span class="text">{{item.value}}</span>
          </li>
        </template>
      </ul>
    </div>
    <div v-else class="horizontal-container">
      <div v-if="issimple" style="width: 60%; margin-left: -15%;">
        <el-steps :active="stage - 1" align-center>
          <el-step class="simplestep" v-for="item in customerStageList" :key="item.type"></el-step>
        </el-steps>
      </div>
      <div v-else style="width: 100%;" class="horizontal-detail">
        <p class="title">合作进度</p>
        <el-steps :active="stage" align-center>
          <el-step @click.native="() => handleStepClick(item.type)" v-for="item in customerStageList" :key="item.type" :title="item.value" :description="item.subtitle">
            <p slot="title">
              <span :class="{'overtitle': stage > item.type, 'pretitle':  stage < item.type}">{{item.value}}</span>
            </p>
            <p slot="description" class="step-description">
              <span>{{item.subtitle}}</span>
              <i v-if="judgeEditPowers(item.type)" :class="['iconfont', 'iconjindubianji']" @click.stop="() => handleOperateClick(item.type, 'edit')"></i>
              <i v-else-if="judgeAddPowers(item.type)" class="iconfont iconjindutianjia" @click.stop="() => handleOperateClick(item.type, 'add')"></i>
            </p>
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
import {customerStageList} from '@/const/cooperative'
import {RIGHT_CODE} from '@/const/roleCode'
import CooperativeStore from '@/views/customer/cooperative/mixin/CooperativeStore'

export default {
  name: 'CustomerStageProgress',
  props: ['isvertical', 'stage', 'issimple'],
  mixins: [CooperativeStore],
  data () {
    return {
      RIGHT_CODE,
      customerStageList
    }
  },
  methods: {
    // 点击步骤跳转详情
    handleStepClick (val) {
      if (this.stage >= val) {
        this.$emit('stepOperate', {
          stage: val,
          type: 'detail'
        })
      }
    },
    // 点击操作
    handleOperateClick (val, type) {
      this.$emit('stepOperate', {
        stage: val,
        type
      })
    },
    // 判断权限
    judgeEditPowers (type) {
      let _result = type <= this.stage
      switch (type) {
        case 1: // 意向客户
          return _result && this.UserRoles.includes(RIGHT_CODE.update_cooperation)
        case 2: // 确认合作
          return _result && this.UserRoles.includes(RIGHT_CODE.update_cooperation)
        case 3: // 执行项目
          return _result && this.UserRoles.includes(RIGHT_CODE.update_cooperation)
        case 4: // 执行结束
          return _result && this.UserRoles.includes(RIGHT_CODE.update_cooperation)
        case 5: // 数据入库
          return _result && this.UserRoles.includes(RIGHT_CODE.update_cooperation)
        default:
          return _result
      }
    },
    // 判断权限
    judgeAddPowers (type) {
      let _result = type === this.stage + 1
      switch (type) {
        case 2: // 确认合作
          return _result && this.UserRoles.includes(RIGHT_CODE.update_cooperation)
        case 3: // 执行项目
          return _result && this.UserRoles.includes(RIGHT_CODE.update_cooperation)
        case 4: // 执行结束
          return _result && this.UserRoles.includes(RIGHT_CODE.update_cooperation)
        case 5: // 数据入库
          return _result && this.UserRoles.includes(RIGHT_CODE.update_cooperation)
        default:
          return _result
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/vars.scss';
  .csp-container {
    .vertical-container {
      position: relative;
      margin-left: 7px;
      margin-top: 5px;
      .line {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 140px;
        background: #d6d6d6;
      }
      .line-current {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        background: $color-primary;
      }
      .list {
        position: relative;
        .item {
          height: 28px;
          display: flex;
          .icon {
            margin-left: -3px;
            margin-top: 10px;
            width: 5px;
            height: 5px;
            border: 1px solid #d6d6d6;
            border-radius: 50%;
            background: #fff;
          }
          .text {
            margin-left: 14px;
            line-height: 28px;
            color: #AAAAAA;
          }
          &.sign {
            .icon {
              border-color: $color-primary;
            }
            .text {
              color: #666666;
            }
          }
          &.current {
            .icon {
              border-color: $color-primary;
              background: $color-primary;
            }
            .text {
                color: #666666;
            }
          }
        }
      }
    }
    .horizontal-container {
      margin: 20px 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      /deep/ .el-steps {
        cursor: pointer;
        .is-process {
          color: #c0c4cc;
          border-color: #c0c4cc;
          .is-text {
            border-radius: 50%;
            border: 7px solid;
            width: 40px;
            height: 40px;
            background-color: #c0c4cc;
            color: #fff;
          }
        }
        .el-step__line {
          height: 2px;
          top: 20px;
        }
        .is-finish {
          .is-text {
            border-radius: 50%;
            border: 7px solid;
            width: 40px;
            height: 40px;
            background-color: $color-primary;
            color: #fff;
          }
        }
        .el-step__title {
          font-size: 15px;
          font-weight: bold;
        }
        .is-wait {
          .is-text {
            border-radius: 50%;
            border: 7px solid;
            width: 40px;
            height: 40px;
            background-color: #c0c4cc;
            color: #fff;
          }
        }
        .el-step__description {
          width: 7rem;
          color: #c0c4cc;
          margin-left: .5rem;
        }
      }
      .simplestep {
        /deep/ .is-process {
          color: $color-primary;
          border-color: $color-primary;
          .is-text {
            background-color: $color-primary;
          }
        }
        /deep/ .is-finish {
          color: #c0c4cc;
          border-color: #c0c4cc;
          .is-text {
            background-color: #c0c4cc;
          }
        }
      }
      .horizontal-detail {
        margin-left: -2.4rem;
        .title {
          font-size:16px;
          font-weight:bold;
          color:rgba(51,51,51,1);
          margin-left: 24px;
          margin-bottom: 10px;
        }
        .step-description {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .overtitle {
          color: #333333 !important;
        }
        .pretitle {
          color: #A5A8AB !important;
        }
        .iconjindubianji {
          font-size: 33px !important;
          border-radius: 50%;
          width: 33px;
          height: 33px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 3px;
          cursor: pointer;
          background-color: #EAEFFF !important;
          border: none !important;
          color: $color-primary !important;
        }
        .iconjindubianji:hover {
          // border: 1px solid #d6d6d6 !important;;
          background-color: $color-primary !important;;
          color: #fff !important;;
        }
        .iconjindutianjia {
          font-size: 33px !important;
          border-radius: 50%;
          width: 33px;
          height: 33px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 3px;
          cursor: pointer;
        }
      }
      .over {
        background-color: #EAEFFF !important;
        border: none !important;
        color: $color-primary !important;
      }
    }
  }
</style>
