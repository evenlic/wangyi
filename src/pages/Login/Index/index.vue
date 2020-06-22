<template>
  <div class="content">
      <div class="logo">
        <img src="../../../static/image/logo2.png" alt="">
      </div>
      <div class="btn">
        <div @click="toPhoneOrEmail(true)" class="phoneBtn Pbtn">
          <i class="iconfont icon-hot"></i>
          手机号快捷登陆
        </div>
        <div @click="toPhoneOrEmail(false)" class="emailBtn Pbtn">
          <i class="iconfont icon-hot"></i>
          邮箱账号登陆
        </div>
      </div>
      <div class="thirdParty">
        <div class="thirdPartyItem">
          <i class="iconfont icon-weixin"></i>
          微信
        </div>
        <div class="thirdPartyItem QQ">
          <i class="iconfont icon-QQ"></i>
          QQ
        </div>
        <div class="thirdPartyItem">
          <i class="iconfont icon-weibo"></i>
          微博
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name:"",
  props: {},
  data() {
    return {

    };
  },
  methods: {
    toPhoneOrEmail(ifPhone){
      if(ifPhone){
        this.$router.replace('/login/phone')
      }else{
        this.$router.replace('/login/email')
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
    .content
      height 100%
      display flex
      flex-direction column
      justify-content space-around
      .logo
        position relative
        flex 1
        img
          position absolute
          top 0 
          left 0 
          right 0 
          bottom 0
          margin auto
          width 268px
          height 90px
      .btn
        .Pbtn
          display block
          width 670px
          height 94px
          margin 0 auto
          border 1px solid rgb(221, 26, 33)
          border-radius 5px
          font-size 28px
          margin-bottom 30px
          text-align center
          line-height 94px
          &.phoneBtn
            background rgb(221, 26, 33)
            color #fff
          &.emailBtn
            color rgb(221, 26, 33)
          i
            font-size 50px
            vertical-align middle
      .thirdParty
        display flex
        flex 1
        justify-content center
        align-items center
        .thirdPartyItem
          width 170px
          text-align center
          font-size 28px
          color rgb(127, 127, 127)
          i 
            font-size 35px
          &.QQ
            border-left 2px solid rgb(127, 127, 127)
            border-right 2px solid rgb(127, 127, 127)
</style>
