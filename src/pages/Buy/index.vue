<template>
  <div class="buyContainer">

    <Header title='值得买'/> 

    <scroller  :on-infinite="infinite">
      <div class="navWrap">
        <div class="bg">
          <img class="logo" src="https://m.you.163.com/topic/index/img/topic_logo.c2284970.png" alt="">
          <span class="title">严选好物 用心生活</span>
          <img class="bg1" src="../../static/image/bg1.png" alt="">
        </div>
      <div class="nav">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide class="swiperSlide" v-for="(item) in navList" :key="item.id">
            <img :src="item.picUrl" alt="">
            <span class="name">{{item.mainTitle}}</span>
            <span class="intro">{{item.viceTitle}}</span>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="recManual" >
      <waterfall :col='col'  :data="trecManualData"  @loadmore="loadmore" >
        <template >
            <div class="cell-item" v-for="(item,index) in trecManualData" :key="index">
              <div class="item-body">
                  <div class="item-footer">
                    <img class="avatar" :src="item.picUrl" alt="">
                    <div class="title">{{item.title}}</div>
                    <div class="like" >
                        <img :src="item.avatar">
                        <i >{{item.nickname?item.nickname:'xxx'}}</i>
                        <span class="like-total">{{item.readCount>10000?item.readCount/1000+'k':item.readCount}}</span>  
                    </div>
                  </div>
              </div>
            </div>
        </template>
      </waterfall>
    </div >
    </scroller>
    
  </div>
</template>

<script>
import axios from "axios"
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import "swiper/css/swiper.css"
import Header from '@/components/Header'
export default {
  name:"Buy",
  components: {
      Swiper,
      SwiperSlide,
      Header
    },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      navList:[],
      col:2,
      trecManualData:[],
      isScroll:false
    };
  },
  mounted() {
    this.getNavList()
    this.geTrecManualData()
  },
  methods: {
    async getNavList(){
      const result = await axios('/abc/topic/v1/know/navWap.json')
      this.navList = result.data.data.navList
    },
    async geTrecManualData(){
      const result = await axios('/abc/topic/v1/find/recManual.json')
      this.trecManualData = result.data.data[0].topics
    },
    infinite (done) {
      if(this.isScroll) return 
      this.isScroll = true
      setTimeout(() => {
        axios('/abc/topic/v1/find/recAuto.json?page=1&size=1')
        .then((res)=>{
          let trecManualData = res.data.data.result[0].topics
          this.trecManualData = this.trecManualData.concat(trecManualData)
        })
        done()
        this.isScroll = false
      }, 1500)
    },
    switchCol(col){
      this.col = col
      console.log(this.col)
    },
    loadmore(){
      this.trecManualData = this.trecManualData.concat(this.trecManualData)
    }
  },
  computed: {
    itemWidth(){  
      return (138*0.5*(document.documentElement.clientWidth/375)) 
    },
    gutterWidth(){
      return (9*0.5*(document.documentElement.clientWidth/375))
    }
  },
};
</script>

<style lang="stylus" scoped>
  .buyContainer
    height 100%
    .navWrap
      height 760px
      position relative
      margin-top 100px
      .bg
        position relative
        .logo
          position absolute
          left 12px
          top 60px
          width 130px
          height 68px
        .title
          position absolute
          height 44px 
          color  #fff
          left 146px
          top 79px
          font-size 30px
        .bg1
          height 518px
          width 100%
      .nav
        position absolute
        top 170px
        left 0
        width 705px
        height 540px
        margin-left 25px
        border-radius 20px
        background #fff
        .swiper
          height 100%
          justify-content space-around
          .swiperSlide
            display flex
            flex-direction column
            align-items center
            width 168px
            height 200px
            margin-top 50px
            margin-right 0
            img 
              width 120px
              height 120px
            .name
              font-size 28px
              font-weight 700
              margin-top 10px
            .intro
              font-size 20px
              color #999
    .recManual
      background #eee
      .cell-item
        width 326px
        display flex
        background #fff
        border-radius 20px
        overflow hidden
        margin-left 25px
        margin-top 30px
        .item-footer
          .avatar
            width 326px
            height 346px
          .title
            font-size 28px
            margin 20px 0
          .like 
            display flex
            justify-content space-around
            margin-bottom 20px
            img
              width 48px
              height 48px
              border-radius 50%
</style>
