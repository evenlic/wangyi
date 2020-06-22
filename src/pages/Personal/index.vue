<template>
	<div class="personalContaner" :style="{background:'#eee'}">
		<div class="header">
      <img class="userImg" :src="userInfo.avatarUrl?userInfo.avatarUrl:'//yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'" alt="">
			<div class='userInfo'>
				<p>{{userInfo.name?userInfo.name:'未登录'}}</p>
				<p>{{userInfo.name?'微信用户':'点击登录账号'}}</p>
			</div>

		</div>
		
		<div class="content">
			<h2>我的资产</h2>
			<p class='line'></p>
			<div class="myAssetList">
				<div class='assetItem'>
					<span>￥0</span>
					<span>回馈金</span>
				</div>
				<div class='assetItem'>
					<span>￥0</span>
					<span>红包</span>
				</div>
				<div class='assetItem'>
					<span>￥0</span>
					<span>优惠券</span>
				</div>
				<div class='assetItem'>
					<span>￥0</span>
					<span>津贴</span>
				</div>
				<div class='assetItem'>
					<span>￥0</span>
					<span>礼品卡</span>
				</div>
			</div>
			<!-- 列表选项 -->
			<div class="personalList">
				<div class="navItem" v-for='(item, index) in personalList' :key='index'>
					<i class='iconfont ' :class='item.icon'></i>
					<p>{{item.name}}</p>
				</div>
			</div>
		</div>
    <div class="logOut" @click="logOut">退出登陆</div>
	</div>
</template>

<script>
import { Dialog } from 'vant';
	export default {
		data(){
			return {
				userInfo: {},
				personalList: [
					{
						name: '我的订单',
						icon: 'icon-dingdan11'
					},
					{
						name: '我的拼团',
						icon: 'icon-pintuandingdan'
					},
					{
						name: '领红包',
						icon: 'icon-tubiaolunkuo-1'
					},
					{
						name: '我的积分',
						icon: 'icon-jifen3'
					},
					{
						name: '地址管理',
						icon: 'icon-dizhiguanli'
					},
					{
						name: '账号安全',
						icon: 'icon-dingdan11'
					},
					{
						name: '联系客服',
						icon: 'icon-zhanghaoanquan'
					},
					{
						name: '用户反馈',
						icon: 'icon-tubiaolunkuo-'
					},
					{
						name: '帮助中心',
						icon: 'icon-bangzhuzhongxin'
					},
					{
						name: '退还/售后',
						icon: 'icon-shouhou'
					}
				]
			}
		},
		mounted(){
			const userInfo = localStorage.getItem('userInfo')
			if(userInfo){
				this.userInfo = JSON.parse(userInfo)
			}
		},
		methods: {
			logOut(){
				console.log(111)
				Dialog.confirm({
					message: '是否退出登陆?',
				}).then(() => {
					localStorage.removeItem('userInfo')
					this.$router.replace('/home')
				}).catch(()=>{
					return 
				})
			}
		},
	}
</script>

<style lang="stylus">
	.personalContaner
		height 100%
		padding-bottom 250px
		.header
			display flex
			background url(//yanxuan.nosdn.127.net/5905098f74e04c39fa5e76ebb9ff591b.png?imageView&type=webp)
			background-position bottom center
			background-size 100%
			box-sizing border-box
			height 270px
			padding 64px 0
			.userImg
				width 142px
				height 142px
				margin 0 50px 0 30px
				background #fff
				border-radius 50%
			.userInfo
				display flex
				flex-direction column
				justify-content center
				p
					height 50px
					line-height 50px
					&:first-child
						font-size 28px
					&:last-child
						font-size 24px
		.content
			background #fff
			h2
				font-size 26px
				line-height 100px
				margin-left 5%
			.line
				width 90%
				height 2px
				background #eee
				margin 0 auto
			.myAssetList
				width 90%
				margin 20px auto
				display flex
				.assetItem
					width 25%
					display flex
					flex-direction column
					align-items center
					font-size 24px
					color #333333
					line-height 40px
			.personalList
				display flex
				flex-wrap wrap
				margin-top 20px
				border-top 1px solid #EEEEEE
				.navItem
					width 33.3333%
					height 181px
					display flex
					flex-direction column
					justify-content center
					text-align center
					border-bottom 1px solid #EEEEEE
					border-right 1px solid #EEEEEE
					box-sizing border-box
					padding 30px 0
					&:nth-child(3n)
						border-right none
					.iconfont 
						font-size 60px
					p
						font-size 24px
						line-height 40px
		.logOut
			height 94px
			border 1px solid #fff
			background #fff
			margin 30px 0 
			font-size 32px
			text-align center
			line-height 94px
	.van-dialog
		width 630px
		height 305px
		display flex
		flex-direction column
		justify-content space-between
		.van-dialog__content
			height 60%
			.van-dialog__message
				height 100%
				line-height 100px
				font-size 30px	
		.van-hairline--top 
			button
				font-size 30px
				margin-bottom 30px
</style>
