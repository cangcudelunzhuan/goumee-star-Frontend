<template>
  <common-dialog ref="SceneDetailDialog" :title="'场次详情'" :width="1000" @dialogCancel="handledialogCancel" :isAppendToBody="true" :isDestroyOnClose="true" :isfooter="false">
    <productDetail :pdata="pdata" @deleteScene="deleteSceneHandle"/>
  </common-dialog>
</template>

<script>
import productDetail from '../productDetail'
import PubSub from 'pubsub-js'

export default {
  name: 'SceneDetailDialog',
  components: {
    productDetail
  },
  data() {
    return {
      pdata: null
    }
  },
  methods: {
    show (data) {
      this.pdata = data
      this.$refs.SceneDetailDialog.dialogOpen()
      setTimeout(() => {
        PubSub.publish('toProductDetail', data)
      }, 300)
    },
    handledialogCancel () {
      this.$refs.SceneDetailDialog.dialogClose()
    },
    // 删除场次
    deleteSceneHandle () {
      this.$refs.SceneDetailDialog.dialogClose()
      PubSub.publish('addScene', true)
    }
  }
}
</script>

<style lang="scss" scopd>

</style>
