<template>
  <div class="top">
    <div class="head">
      <i class="iconfont icon-home" @click="changePage('home')"></i>
      <div class="title" v-if="title">{{title}}</div>
      <div class="title" v-else>
        <img src="../../static/image/logo.png" alt="">
      </div>
      <i class="iconfont icon-search" @click="changePage('search')"></i>
      <i class="iconfont icon-cart-Empty cart" @click="changePage('cart')"></i>
    </div>
  </div>
</template>

<script>
export default {
  name:"Header",
  props: {title:String},
  data() {
    return {

    };
  },
  methods: {
    changePage(page){
      if(page === 'home') this.$router.push('/home')
      if(page === 'search') this.$router.push('/search')
      if(page === 'cart') this.$router.push('/cart')
    }
  },
};
</script>

<style lang="stylus" scoped>
    .top
      height 100px
      width 100%
      .head
        position fixed
        display flex
        width 100%
        height 100px
        line-height 100px
        justify-content space-around
        background #ffffff
        z-index 10
        i 
          font-size 60px
        .title
          flex 1
          text-align center
          font-size 40px
          img 
            margin-top 30px
        .cart
          margin-left 30px
</style>
