<template>
  <div class="categoryContainer">
    <div class="searchHeader">
      <div class="search" @click="toSearch">
        <i class="iconfont icon-search"></i>
				<span>搜索商品</span>
			</div>
    </div>
    <div class="contentContainer">
			<div class="Nav wrapper" ref="wrapper">
				<div class="scollNav content">
					<span class="text" :class="{active:navId === item.id}" v-for="(item) in NavListData" :key="item.id" @click="changeNavId(item.id)">{{item.name}}</span>
				</div>
			</div>
			<div class="contentR  wrapper" ref="wrapper1">
				<div class="scollContent content"  v-if="navListObj">
          <img class="cateImg" :src="navListObj.imgUrl" alt="">
					<div class="proList">
						<div class='proItem' v-for="(item) in navListObj.subCateList" :key="item.id">
              <img class="img" :src="item.wapBannerUrl" alt="">
							<span class="text">{{item.name}}</span>
						</div>
					</div>			
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import {reqNavListData} from "@/api"
import Bscroll from "better-scroll"
export default {
  name:"Classify",
  props: {},
  data() {
    return {
      NavListData:[],
      navId:0
    };
  },
  created() {
    this.getNavListData()
  },
  methods: {
    async getNavListData(){
      const result = await reqNavListData()
      this.NavListData = result
      this.navId = result[0].id
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {})
      })
    },
    changeNavId(navId){
      this.navId = navId
    },
    toSearch(){
      this.$router.push({path:'/search'})
    }
  },
  computed: {
    navListObj(){
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper1, {})
      })
      return this.NavListData.find(item=>item.id === this.navId)
    }
  },
};
</script>

<style lang="stylus" scoped>
  .categoryContainer
    background #fff
    height 100%
    .searchHeader
      height 75px
      position relative
      z-index 10
      background #fff
      .search
        font-size 28px
        width 690px
        background #EDEDED
        height 58px
        line-height 58px
        border-radius 10px
        margin 15px auto
        text-align center
        i 
          font-size 28px
    .contentContainer
      height 100vh
      display flex
      box-sizing border-box
      border-top 2px solid #eee
      padding-bottom 300px
      .Nav
        width 162px
        font-size 26px
        text-align center
        box-sizing border-box
        border-right 2px solid #eee
        .scollNav
          display flex
          flex-direction column
          .text
            position relative
            height 50px
            margin-top 40px
            color #666
            font-size 28px
            &.active
              color #B4282D
              &::after
                content:''
                height 100%
                width 6px
                background #B4282D
                position absolute
                top:-15%
                left 0
      .contentR
        width 528px
        padding 30px 30px 21px 
        height 100%
        .scollContent
          display flex
          flex-direction column
          .cateImg
            width 520px
            height 19upx
            margin 0 auto
            flex-shrink 0
          .proList
            display flex
            flex-wrap wrap
            flex-shrink 0
            margin-top 20px
            .proItem
              width 33%
              padding 10px
              box-sizing border-box
              display flex 
              align-items center
              flex-direction column
              .img
                width 144px
                height 144px
              .text
                font-size 24px
                text-align center
</style>
