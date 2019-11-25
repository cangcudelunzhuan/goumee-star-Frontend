<template>
  <div class="livedata-container">
    <div class="content">
      <sub-panel :title="'直播数据'" :iserect="true">
        <displayInfo :ctype="'cooperative'"/>
      </sub-panel>
    </div>
  </div>
</template>

<script>
import displayInfo from '@/views/display'

export default {
  name: 'LiveData',
  components: {
    displayInfo
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .livedata-container {
    width: 100%;
    background-color: #F6F6F6;
    padding-top: 15px;
    .content {
      background-color: #fff;
      padding: 10px 24px;
    }
  }
</style>
