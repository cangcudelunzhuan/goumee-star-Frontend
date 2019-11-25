<template>
  <div class="card-items">
    <div :class="['card', {'mb5': index > 0}]" v-for="(item, index) in items" :key="index">
      <img :src="item.src">
      <div class="card-content">
        <p class="card-title">{{item.title}}</p>
        <p class="card-subtitle">{{item.subtitle}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItems',
  props: ['items'],
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scopd>
  .card-items {
    background-color: #fff;
    padding: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .card {
      width: 12rem;
      height: 4.5rem;
      border: 1px solid rgba(222,227,233,1);
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 1.5rem;
      img {
        width: 2.8rem;
        height: 2.8rem;
      }
      .card-content {
        margin-left: .5rem;
        display: flex;
        flex-direction: column;
        .card-title {
          color: #333333;
          font-size: 16px;
          font-weight: bold;
        }
        .card-subtitle {
          margin-top: .1rem;
          color: #ABAEB1;
          font-size: 13px;
        }
      }
    }
    .mb5 {
      margin-left: 25px;
    }
  }
</style>
