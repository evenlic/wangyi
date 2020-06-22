<template>
  <div class="indexContainer">
    <!-- 头部 -->
    <div class="header-wrap">
      <div class="header">
        <a href="/" class="logo">
          <img src="../../static/image/logo.png">
        </a>
        <div class="search" @click="toSearch">
          <i class="iconfont icon-search"></i>
          <span class="text">搜索商品, 共33483款好物</span>
        </div>
        <div class="login" v-if="!userInfo.name" @click="toLogin">登陆</div>
      </div>
      <div class="nav">
        <div class="navItem active">推荐</div>
        <div class="navItem">居家生活</div>
        <div class="navItem">居家生活</div>
        <div class="navItem">居家生活</div>
        <div class="navItem more">↓</div>
      </div>
    </div>
    <Recommend/>
    <div class="test"></div>
  </div>
</template>

<script>
import Recommend from "@/components/Recommend"
export default {
  name:"Home",
  components:{
    Recommend
  },
  data() {
    return {
      userInfo:{}
    };
  },
  mounted() {
    const userInfo = localStorage.getItem('userInfo')
    if(userInfo){
      this.userInfo = JSON.parse(userInfo)
    }
  },
  methods: {
    toSearch(){
      this.$router.push({path:'/search'})
    },
    toLogin(){
      this.$router.push({path:'/login'})
    }
  },
  
};
</script>

<style lang="stylus" scoped>
  .indexContainer
    background #fff
    .header-wrap
      .header
        display flex  
        margin 16px 30px
        align-items center
        .logo
          display block
          margin-right 20px
          img
            display block
            width 138px
            height 40px
        .search
          width 442px
          height 56px
          background #ededed
          border-radius 8px
          text-align center
          line-height 56px  
          .iconfont
            font-size 28px
            margin-right 10px 
          .text
            font-size 28px
        .login
          width 72px
          height 38px
          border 1px solid #DD1A21
          color #DD1A21
          line-height 38px
          text-align center
          margin-left 16px
          border-radius 8px
          font-size 24px
      .nav
        display flex
        height 60px
        padding-left 15px
        .navItem
          font-size 28px
          line-height 60px
          margin-left 20px
          padding 0 16px
          box-sizing border-box
          &.active
            color #BB2C08
            border-bottom 4px solid #BB2C08
    .test
      height 97px
</style>  
