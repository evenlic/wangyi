<template>
<div class="cartContainer">
  <div class="title">购物车</div>
  <div v-if="!userInfo.name">
    <div class="header">
      <span>30天无忧退货</span>
        <span>48小时快速退货</span>
      <span>满99元免邮费</span>
    </div>
    <div class="contentContainer">
      <img class="cartImg" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp" alt="">
        <button v-if="!userInfo.name" @click="toLogin">登录</button>
      <div v-else class="addMore">去添加点什么吧</div>
    </div>
  </div>
  
  <div v-else>
    <div v-if="cartList.length">
      <div class="cartList">
        <div class="cartItem" v-for="(shopItem,index) in cartList" :key="shopItem.id">
          <span
            class='iconfont icon-xuanzhong'
            :class="{selected: shopItem.selected}"
            @click="changeSelected(!shopItem.selected,index)"
            ></span>
          <div class="shopItem">
            <!-- <image class="shopImg" :src="shopItem.listPicUrl" mode=""></image> -->
            <img image class="shopImg" src="shopItem.listPicUrl" alt="">
            <div class="shopInfo">
              <span>{{shopItem.name}}</span>
              <span class="price">￥{{shopItem.retailPrice}}</span>
            </div>
          </div>
          <!-- 控制数量 -->
          <div class="countCtrl">
            <span class="add" @click="changeCount(true,index)"> + </span>
            <span class="count"> {{shopItem.count}} </span>
            <span class="del" @click="changeCount(false,index)"> - </span>
          </div>
        </div>
      </div>
      <!-- 底部下单 -->
      <div class="cartFooter">
        <span class='iconfont icon-xuanzhong'  @click="changeAllSelected()"></span>
        <span class="allSelected">已选 {{allCountAndAllPrice.allCount}}</span>
        <!-- <text class="allSelected">已选 2</text> -->
        <div class="right">
          <span class="totalPrice">合计: ￥{{allCountAndAllPrice.allPrice}}</span>
          <!-- <text class="totalPrice">合计: ￥2000</text> -->
          <span class="preOrder">下单</span>
        </div>
      </div>
    </div>
    <!-- 购物车无商品 -->
    <div v-else>
      <div class="header">
        <span>30天无忧退货</span>
        <span>48小时快速退货</span>
        <span>满99元免邮费</span>
      </div>
      <div class="contentContainer">
        <!-- <image class="cartImg" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp" mode=""></image> -->
        <img class="cartImg" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp" alt="">
        <button @click="toLogin">登录</button>
        <div class="addMore">去添加点什么吧</div>
      </div>
    </div>
  </div>
			
</div>
  
</template>

<script>
import {mapState} from "vuex"
export default {
  name:"Cart",
  data() {
    return {
      userInfo:{},
      shopList:{}
    };
  },
  beforeMount() {
    const userInfo = localStorage.getItem('userInfo')
    if(userInfo){
      this.userInfo = JSON.parse(userInfo)
    }
  },
  mounted() {
    
  },
  methods: {
    toLogin(){
      this.$router.push({path:'/login'})
    },
    changeCount(isadd,index){
      this.changeCountMutation({isadd,index})
    },
    changeSelected(selected,index){
      this.changeSeletedMutation({selected,index})
    },
    changeAllSelected(){
      this.changeAllSeletedMutation(!this.isAllSelected)
    }
  },
  computed: {
    ...mapState({
      cartList: state => state.cartData.cartList
    }),
    allCountAndAllPrice:function(){
      let allPrice = 0
      let allCount = 0
      this.cartList.forEach((item) =>{
        if(item.selected){
          allPrice += item.retailPrice*item.count
          allCount += item.count
        }
      })
      return {allCount,allPrice}
    }
  },
};
</script>

<style lang="stylus" scoped>
  .cartImg
    display block
    width 248px
    height 248px
    margin 300px auto 50px
	.cartContainer
		position relative
		height 100%
		background #f4f4f4
		.title
      background #fff
      font-size 36px
      line-height 80px
      padding-left 30px
		.header
			display flex
			background #eee
			span
				width 33.333%
				height 80px
				line-height 80px
				text-align center
				font-size 26px
		.contentContainer
      display flex
      flex-direction column
      align-items center
      margin auto
			button
				width 480px
				height 92px
				background #DD1A21
				color #fff
				font-size 32px
				line-height 92px
  .cartList
    position absolute
    display flex
    bottom 0
    height 96upx
    line-height 96upx
    width 100%
    background #fff
    font-size 30upx
    .iconfont
      font-size 40upx
      margin 0 20upx
      color: #999
      &.selected
        color: #BB2C08
      .right 
        height 96upx
        position absolute
        right 0
        .totalPrice
          display inline-block
          height 96upx
          line-height 96upx
        .preOrder
          display inline-block
          background #DD1A21
          width 225upx
          height 96upx
          line-height 96upx
          text-align center
          font-size 28upx
          color #fff
          margin-left 30upx
</style>
