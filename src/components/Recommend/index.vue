<template>
  <div class="recommendContainer">
    <!-- 轮播图 -->
    <div class="swiper">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :key="banner.id" v-for="banner in indexData.focusList">
            <img :src="banner.picUrl">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!-- 小标签 -->
    <div class="servicePolicyList">
      <div class="servicePolicyItem" v-for="(item, index) in indexData.policyDescList" :key="index">
        <img v-lazy="item.icon">
        <span>{{item.desc}}</span>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content-wrap">
      <!-- 内容区导航 -->
      <div class="kingKongNav" v-if="indexData.kingKongModule">
        <div class="kingKongItem" v-for="(item, index) in indexData.kingKongModule.kingKongList" :key="index">
          <img v-lazy="item.picUrl" alt="">
          <span>{{item.text}}</span>
        </div>
      </div>
      <!-- 热销榜 -->
      <div class="allRanking">
        <div class="title">类目热销榜</div>
        <div class="content">
          <div class="line1" >
            <div class="item1" v-for="(item, index) in ranking1" :key="index">
              <span>{{item.categoryName}}</span>
              <img v-lazy="item.picUrl" alt="">
            </div>
          </div>
          <div class="line2">
            <div class="item2" v-for="(item, index) in ranking2" :key="index">
              <span>{{item.categoryName}}</span>
              <img v-lazy="item.picUrl" alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 限时购物 -->
      <div class="flashSale">
        <div class="title">
          <span>限时购</span>
          <span>更多></span>
        </div>
        <div class="content" v-if="indexData.flashSaleModule">
          <div class="flashSaleItem" v-for="(item) in indexData.flashSaleModule.itemList" :key="item.itemId">
            <img v-lazy="item.picUrl" alt="">
            <div>
              <span class="currentPrice">￥{{item.activityPrice}}</span>
              <span class="originalPrice">￥{{item.originPrice}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 新品首发 -->
      <div class="newShop">
        <div class="title">
          <span>新品首发</span>
          <span>更多></span>
        </div>
        <div class="content">
          <div class="newShopItem" v-for="(item) in indexData.newItemList" :key="item.id">
            <img v-lazy="item.showPicUrl" alt="">
            <span class="name">{{item.name}}</span>
            <span class="price">￥{{item.retailPrice}}</span>
            <span class="tagWraper">{{item.itemTagList[0].name}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="content">
        <div class="bd">
          <a href="#" class="btn btn1">下载APP</a>
          <a href="#" class="btn">电脑版</a>
        </div>
        <div class="copyright">
          <p>网易公司版权所有 © 1997-</p>
          <p>食品经营许可证：JY13301080111719</p>
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <div class="gotop" v-show="gotop" @click="toTop">↑</div>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex"
export default {
  name:"Recommend",
  props: {},
  data() {
    return {
      swiperOption:{
        pagination:{
          el:'.swiper-pagination'
        },
        loop:true,
        autoplay:{
          delay:1000,
          disableOnInteraction:false
        },
        speed:1000,
      },
      gotop:false,
      ranking1:[],
      ranking2:[]
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true); //回到顶部逻辑
    this.getIndexData()
  },  
  methods: {
    ...mapActions({
      getIndexData:'getIndexData'
    }),
    handleScroll() { //回到顶部
      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 500 ? (this.gotop = true) : (this.gotop = false);
    },
    toTop() { //回到顶部
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  },
  computed: {
    ...mapState({
      indexData: state=>state.homeData.indexData
    }),
  },
  watch: {
    indexData(){
      this.ranking1 = this.indexData.categoryHotSellModule.categoryList.slice(0,2)
      this.ranking2 = this.indexData.categoryHotSellModule.categoryList.slice(2)
    }
  },
};
</script>

<style lang="stylus" scoped>
  .recommendContainer
    .swiper
      .swiper-slide
        height 296px
        img
          width 100%
          height 100%
    .servicePolicyList
      display flex
      justify-content space-around
      align-items center
      height 72px
      img 
        width 32px
        height 32px
        vertical-align middle
      span 
        vertical-align middle
        margin-left 8px
    .content-wrap
      padding-bottom 20px
      background #ededed
      .kingKongNav
        display flex
        flex-wrap wrap
        height 372px
        background #fff
        .kingKongItem
          display flex
          flex-direction column
          align-items center
          width 110px
          margin 10px 20px
          img 
            width 110px
            height 110px
          span 
            margin-top 10px
            font-size 24px
      .allRanking
        padding 0 30px
        background #fff
        margin-top 20px
        .title
          height 100px
          line-height 100px
          font-size 32px
        .content
          display flex
          flex-direction column
          .line1
            display flex
            margin-bottom 10px
            justify-content space-between
            .item1
              display flex
              width 340px
              height 200px
              justify-content space-around
              align-items center
              background rgb(249, 243, 228)
              img
                width 200px
                height 200px
              span  
                margin-left 30px
                font-size 28px
                &:after
                  position relative
                  top 10px
                  content ''
                  display block
                  width 50px
                  height 4px
                  background black
          .line2
            display flex
            flex-wrap wrap
            justify-content space-between
            .item2
              display flex
              flex-direction column
              align-items center
              width 165px
              height 180px
              background rgb(245, 245, 245);
              justify-content space-around
              margin-bottom 10px
              img
                width 120px
                height 120px
      .flashSale
        padding 0 30px
        background #fff
        margin-top 20px
        .title
          display flex
          justify-content space-between
          height 100px
          font-size 32px
          line-height 100px
        .content
          display flex
          flex-wrap wrap
          justify-content space-between
          .flashSaleItem
            display flex
            flex-direction column
            width 216px
            margin-bottom 30px
            img 
              width 216px
              height 216px
              background rgb(245, 245, 245);
            .currentPrice
              color red
              font-size 28px
            .originalPrice
              text-decoration line-through
              margin-left 20px
      .newShop
        background #fff
        margin-top 20px
        padding 0 30px
        .title
          display flex
          justify-content space-between
          height 100px
          font-size 32px
          line-height 100px
        .content
          display flex
          flex-wrap wrap
          justify-content space-between
          .newShopItem
            width 216px
            display flex
            flex-direction column
            margin-bottom 13px
            img 
              width 216px
              height 216px
              background rgb(245, 245, 245);
            .name            
              display -webkit-box
              -webkit-box-orient vertical
              -webkit-line-clamp 2
              overflow: hidden
              font-size 22px
            .price
              color rgb(221, 26, 33);
              font-size 28px
              margin-top 5px
              flex-shrink 0
            .tagWraper
              border 1px solid rgb(221, 26, 33);
              border-radius 15px
              font-size 18px
              line-height 28px
              height 28px
              text-align center
              margin-top 5px
    .footer
      height 244px
      border 1px solid rgba(0, 0, 0, 0.15)
      background #414141
      .content
        margin 54px 20px 28px
        height 162px
        .bd
          display flex
          justify-content center
          margin-bottom 36px
          .btn
            display block
            color #fff
            width 170px
            height 60px
            border 1px solid rgb(153, 153, 153);
            line-height 60px
            text-align center
            &.btn1
              margin-right 50px
        .copyright
          color rgb(153, 153, 153);
          p
            text-align center
    .gotop
      position fixed
      text-align center
      right 50px
      bottom 170px
      width 50px
      height 50px
      line-height 50px
      cursor pointer
      padding 10px
      border-radius 50%
      background #fff
      font-size 40px

</style>
