<template>
  <div class="vue-canvas-move-line"></div>
</template>

<script>
import CanvasNest from 'canvas-nest.js'

export default {
  name: 'moveLine',
  props: {
    config: {
      type: Object,
      default () {
        return {
          color: '255,255,255',
          count: 88,
          opacity: 0.9,
          zIndex: -1
        }
      }
    },
    el: {
      type: String,
      default: '.vue-canvas-move-line'
    }
  },
  mounted () {
    this.createCanvasNest()
  },
  methods: {
    createCanvasNest () {
      const elm = document.querySelector(this.el)
      this.cn = new CanvasNest(elm, this.config)
    }
  },
  beforeDestroy () {
    // const elm = document.querySelector(this.el)
    this.cn.destroy()
  }
}
</script>
<style scoped>
.vue-canvas-move-line {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -2;
  opacity: 1;
  color: red;
}
</style>
