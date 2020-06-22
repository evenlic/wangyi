<template>
	<div class="cartContainer">
		<div class="title">购物车</div>
		
		<!-- 没有登录 -->
		<div v-if="!userInfo.name">
			<div class="header">
				<span>30天无忧退货</span>
				<span>48小时快速退货</span>
				<span>满99元免邮费</span>
			</div>
			<div class="contentContainer">
        <img class="cartImg" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imagediv&type=webp" alt="">
				<button @click="toLogin">登录</button>
			</div>
		</div>
		<!-- 购物车列表 -->
		<div v-else>
			<div v-if="cartList.length">
				<div class="cartList">
					<div class="cartItem" v-for="(shopItem,index) in cartList" :key="shopItem.id">
						<span class='iconfont icon-credit-level' :class="{selected: shopItem.selected}" @click="changeSelected(!shopItem.selected,index)"></span>
						<div class="shopItem">
							<img class="shopImg" :src="shopItem.listPicUrl" alt="">
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
					<span class='iconfont icon-credit-level' :class="{selected:isAllSelected}" @click="changeAllSelected()"></span>
					<span class="allSelected">已选 {{allCountAndAllPrice.allCount}}</span>
					<div class="right">
						<span class="totalPrice">合计: ￥{{allCountAndAllPrice.allPrice}}</span>
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
          <img class="cartImg" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imagediv&type=webp" alt="">
					<button @click="toLogin">登录</button>
					<div class="addMore">去添加点什么吧</div>
				</div>
			</div>
		</div>
		
		
		
	</div>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from "vuex"
	export default {
		name:'Cart',
		data() {
			return {
				userInfo:{}
			};
		},
		beforeMount() {
      const userInfo = localStorage.getItem('userInfo')
      if(userInfo){
        this.userInfo = JSON.parse(userInfo)
      }
		},
		methods:{
			...mapMutations({
				changeCountMutation:'changeCountMutation',
				changeSeletedMutation:'changeSeletedMutation',
				changeAllSeletedMutation:'changeAllSeletedMutation'
			}),
			changeCount(isadd,index){
				this.changeCountMutation({isadd,index})
			},
			changeSelected(selected,index){
				this.changeSeletedMutation({selected,index})
			},
			changeAllSelected(){
				this.changeAllSeletedMutation(!this.isAllSelected)
      },
      toLogin(){
				this.$router.push('/login')
      }
		},
		computed:{
			...mapState({
				cartList: state => state.cartData.cartList
			}),
			...mapGetters(['isAllSelected']),
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
		}
	}
</script>

<style lang="stylus">
/* iconfont 公共样式 */
	.cartImg
		display block
		width 248px
		height 248px
		margin 300px auto 50px
		
		
	.cartContainer
		position relative
		background #f4f4f4
		height 100%
		.title
			font-size 32px
			line-height 80px
			margin-left 30px
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
			button
				width 100%
				height 92px
				background #DD1A21
				color #fff
				font-size 32px
				line-height 92px
			.addMore
				text-align center
				font-size 26px
				color #7f7f7f
				line-height 60rpx
		.cartList
			.cartItem
				position relative
				display flex
				height 172px
				background #fff
				margin-top 20px
				padding 20px
				.iconfont
					font-size 40px
					line-height 172px
					margin 0 40px
					color #999
					&.selected
						color: #BB2C08
				.shopItem
					display flex 
					.shopImg
						width 172px
						height 172px
						background #eee
					.shopInfo
						font-size 28px
						display flex
						flex-direction column
						margin-left 20px
						span
							line-height 60px
						.price
							color: #BB2C08
				.countCtrl
					position absolute
					right 20px
					bottom 30px
					span
						display inline-block
						width 60px
						height 50px
						text-align center
						line-height 50px
						border 1px solid #EEEEEE
						&:nth-child(2)
							border none
							border-top 1px solid #EEEEEE
							border-bottom 1px solid #EEEEEE
		.cartFooter
			position absolute
			display flex	
			bottom 0
			height 96px
			line-height 96px
			width 100%
			background #fff
			font-size 30px
			.iconfont
				font-size 40px
				margin 0 20px
				color: #999
				&.selected
					color: #BB2C08
			.right 
				height 96px
				position absolute
				right 0
				.totalPrice
					display inline-block
					height 96px
					line-height 96px
				.preOrder
					display inline-block
					background #DD1A21
					width 225px
					height 96px
					line-height 96px
					text-align center
					font-size 28px
					color #fff
					margin-left 30px
		.hint
			text-align center
			font-size 28px
</style>
