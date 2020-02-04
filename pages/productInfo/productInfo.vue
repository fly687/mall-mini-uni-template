<template>
	<view>
		<!-- 轮播图 -->
		<swiper class="grace-swiper swiper1"  autoplay="true" indicator-dots 
		indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#3688FF" 
		style="height:300rpx" interval="5000">
			<swiper-item v-for="(item, index) in swiperItems" :key="index">
				<image :src="item" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<!-- 商品标题 分享按钮 -->
		<view class="grace-body grace-space-between">
			<view class="grace-product-title">{{product.name}}</view>
			<button class="grace-product-share" @tap="share" open-type="share"><text class="grace-icons icon-share3"></text></button>
		</view>
		<view class="line"></view>
		<!-- 价格 -->
		<view class="grace-body grace-product-price">
			￥{{product.price}}<text>￥{{product.priceMarket}}</text>
		</view>
		<view class="grace-body grace-product-desc">
			<text>运费 ￥0.00</text>
			<text>已售 21008 件</text>
			<text>浏览 36万次</text>
		</view>
		<view class="line"></view>
		<!-- 其他信息 -->
		<view class="grace-body grace-product-menu">
			<view :class="[active == 1 ? 'active' : '']" @tap="showInfo">商品详情</view>
			<view :class="[active == 2 ? 'active' : '']" @tap="showComments">商品评论</view>
		</view>
		<!-- 详情 请根据项目情况自行改进 可以使用 富文本-->
		<view class="grace-body grace-product-info" :hidden="active == 2">
			<image src="https://img30.360buyimg.com/sku/jfs/t21838/18/2275707529/311540/cba1d04c/5b4f155fNac3aa2f0.jpg" mode="widthFix"></image>
			<image src="https://img30.360buyimg.com/sku/jfs/t22021/327/2281785192/48707/57806074/5b4f1579Nae7adb49.jpg" mode="widthFix"></image>
			<image src="https://img30.360buyimg.com/sku/jfs/t21682/256/2344553276/204456/cf7a2ddb/5b4ffbbfN48c54307.jpg" mode="widthFix"></image>
		</view>
		<!-- 评论 -->
		<view class="grace-body grace-product-info" :hidden="active == 1">
			<view class="grace-comments">
				<view class="items" v-for="(item, index) in commentContents" :key="index">
					<view class="face">
						<image :src="item.face" mode="widthFix"></image>
					</view>
					<view class="body">
						<view class="header">
							<text>{{item.name}}</text><text class="grace-icons icon-zan"></text>
						</view>
						<view class="info">
							<text>{{item.date}}</text><text>{{item.zan}}</text>
						</view>
						<view class="imgs" v-if="item.imgs">
							<view v-for="(img, indexImg) in item.imgs" :key="indexImg"><image :src="img" mode="widthFix" @click.stop="showImgs(index, indexImg)"></image></view>
						</view>
						<view class="replay" v-if="item.Reply">
							<text v-for="(itemRe, indexRe) in item.Reply" :key="indexRe">{{itemRe.name}} : {{itemRe.content}}\n</text>
						</view>
						<view class="content">{{item.content}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height:60px;"></view>
		<!-- 底部 -->
		<view class="grace-footer">
			<view class="icon-btn">
				<view class="icon grace-icons icon-home"></view>
				<view class="text">首页</view>
			</view>
			<view class="icon-btn">
				<view class="icon grace-icons icon-shoucang active"></view>
				<view class="text active">收藏</view>
			</view>
			<button type="warn" style="background:#E55D52;" @click="buyNow">立即购买</button>
			<button type="warn" style="background:#F37B1D;" @click="buyNow">加入购物车</button>
		</view>
		<!-- 商品属性  start -->
		<view class="grace-shade grace-shade-black" v-if="attrIsShow" @tap.stop="" @touchmove.stop="">
			<view class="grace-product-attr" v-if="attrIsShow">
				<form @submit="attrSubmit" class="grace-form">
					<!-- 关闭按钮  -->
					<view class="grace-product-attr-close" @click="closeAttr">
						<text class="grace-icons icon-close2"></text>
					</view>
					<!-- 头部商品信息 -->
					<view class="grace-product-attr-info">
						<image src="https://img13.360buyimg.com/n7/jfs/t1/9085/2/12381/146200/5c371c5bE08328383/4f4ba51aed682207.jpg" mode="widthFix"></image>
						<view class="title">
							{{product.name}}
							<text>\n库存 : 1999件</text>
						</view>
					</view>
					<!-- 属性列表区 -->
					<scroll-view style="height:700rpx;" scroll-y>
						<view class="grace-title grace-margin-top">选择颜色</view>
						<view><graceSelectTags selectedColor="#FF0036" :items="colorTips" type="radio" @change="change1"></graceSelectTags></view>
						<view class="grace-title grace-margin-top">选择类型</view>
						<view><graceSelectTags selectedColor="#FF0036" :items="typeTips" type="radio" @change="change2"></graceSelectTags></view>
						<view class="grace-items" style="margin-top:8px;">
							<view class="grace-label">购买数量</view>
							<graceNumberBox :value="buyNum" v-on:change="buyNumChange"></graceNumberBox>
						</view>
					</scroll-view>
					<view class="grace-product-attr-btn">
						<button type="warn" style="background-color:#FF0036;" class="grace-button grace-border-radius" formType="submit">立即购买</button>
					</view>
				</form>
			</view>
		</view>
		<!-- 商品属性 end -->
	</view>
</template>
<script>
import graceNumberBox from "../../graceUI/components/graceNumberBox.vue";
import graceSelectTags from "../../graceUI/components/graceSelectTags.vue";
export default {
	data() {
		return {
			// 轮播图 
			swiperItems : [
				'http://i1.mifile.cn/f/i/2019/C76029A6/part6-2.jpg',
				'http://i1.mifile.cn/f/i/2019/C76029A6/part4-1.jpg',
				'http://i1.mifile.cn/f/i/2019/C76029A6/part4-3.jpg'
			],
			product : {
				name: "小米 MIX3 一面科技 一面艺术 ( 磁动力滑盖全面屏 | 故宫特别版 )",
				logo : "../../static/logo.png",
				imgs : [
					{imgUrl : this.staticUrl + 'banners/1.png'},
					{imgUrl : this.staticUrl + 'banners/2.png'},
					{imgUrl : this.staticUrl + 'banners/3.png'}
				],
				price : 3188,
				priceMarket : 3200
			},
			active:1,
			//属性
			attrIsShow : false, //属性界面是否隐藏
			colorTips : [
				{ name: '灰色', value: '灰色', checked: true },
				{ name: '银色', value: '银色', checked: false}
			],
			colorSelected : "灰色",
			typeTips : [
				{ name: '套餐一', value: '套餐一', checked: true },
				{ name: '套餐二', value: '套餐二', checked: false},
				{ name: '套餐三', value: '套餐三', checked: false}
			],
			typeSelected : "套餐一",
			buyNum : 1,
			// 模拟评论数据 (实际项目来自api请求)
			commentContents : [
				{
					"content":"故国三千里，深宫二十年。一声何满子，双泪落君前。",
					"name":"graceUI - 小码",
					"face":"https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png",
					"date":"08/10 08:00",
					"zan" : 188,
					"Reply" : [
						{'name' : "张晓曦", "content":"不错不错"},
						{'name' : "王大陆", "content":"赞了~"},
					]
				},
				{
					"content":"而今渐行渐远，渐觉虽悔难追。漫寄消寄息，终久奚为。也拟重论缱绻，争奈翻覆思维。纵再会，只恐恩情，难似当时。",
					"name":"路过繁华",
					"face":"https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png",
					"date":"02/10 18:00",
					"zan" : 288
				},
				{
					"content":"图片回复，点击图片可以预览......",
					"name":"林夕阳",
					"imgs" : [
						"https://graceui.oss-cn-beijing.aliyuncs.com/scollimgs/4.png",
						"https://graceui.oss-cn-beijing.aliyuncs.com/scollimgs/3.png",
						"https://graceui.oss-cn-beijing.aliyuncs.com/scollimgs/1.png",
					],
					"face":"https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png",
					"date":"08/12 09:00",
					"zan" : 955
				}
			]
		};
	},
	onShareAppMessage(res) {
	  return {
		title: '微信小程序测试分享',
		path: '/pages/common/login'
	  }
	},
	methods:{
		// 分享
		share: function () {uni.showToast({ title: '请自行完善分享代码', icon: "none"});},
		// 切换到评论
		showComments : function(){ this.active = 2; },
		// 切换到详情
		showInfo: function () { this.active = 1; },
		// 返回首页
		home : function(){ uni.switchTab({ url:'../index/index'});},
		//打开属性视图
		buyNow : function(){this.attrIsShow = true;},
		//属性
		attrSubmit : function(e){
			//后续操作
			uni.showToast({
				title:"属性已经收集,请观察控制台",
				icon:"none"
			});
			console.log("颜色 : " + this.colorSelected, "类型 : " + this.typeSelected , '数量 : ' + this.buyNum);
			//如果想关闭属性
			//this.attrIsShow = false;
		},
		// 关闭属性
		closeAttr : function(){this.attrIsShow = false;},
		// 预览评论图片
		showImgs : function(commentsIndex, imgIndex){
			uni.previewImage({
				urls:this.commentContents[commentsIndex].imgs,
				current:this.commentContents[commentsIndex].imgs[imgIndex]
			})
		},
		// 颜色选择
		change1 : function (e) {this.colorSelected = e;},
		// 类型选择
		change2 : function (e) {this.typeSelected = e;},
		// 购买数量变化
		buyNumChange : function (e) {
			this.buyNum = e[0];
		}
	},
	components:{
		graceNumberBox,
		graceSelectTags
	}
}
</script>
<style>
.grace-body{padding:25rpx;}
.line{background:#F6F7F8; height:16rpx; width:100%;}
/* 商品展示 */
.grace-product-title{background:#FFF; font-weight:bold; line-height:1.8em; font-size:30rpx;}
.grace-product-share{width:40px; padding:0; text-align:center; background:none; border:none; box-shadow:none; height:40px; font-size:24px; color:#FF7900; line-height:40px; flex-shrink:0; margin-left:12px;}
.grace-product-share:after{width:0; height:0;}
.grace-product-price{background:#FFF; color:#FF7900; line-height:30px; font-size:36rpx; font-weight:bold; margin-top:10rpx; padding-bottom:5rpx;}
.grace-product-price text{color:#999; font-size:30rpx; text-decoration:line-through; line-height:1.8em; margin-left:16rpx;}
.grace-product-desc{background:#FFF; color:#999999; font-size:22rpx; line-height:1.8em; justify-content:space-between; display:flex; flex-wrap:nowrap; padding-top:0;}
.grace-product-menu{background:#FFF; display:flex; flex-wrap:nowrap; padding:10rpx 0;}
.grace-product-menu view{width:40%; margin:0 5%; line-height:88rpx; border-bottom:5rpx solid #FFFFFF; font-size:28rpx; text-align:center;}
.grace-product-menu .active{border-color:#FF7900; font-weight:bold; color:#FF7900;}
.grace-product-info{background:#FFF;}
.grace-product-info image{width:100%;}
.grace-product-btn{width:30%; height:90rpx; line-height:90rpx; font-size:30rpx; color:#FFF; text-align:center; background:#FF7900;}
.grace-product-attr{padding:25rpx; position:absolute; left:0; bottom:0; border-top-left-radius:10rpx; border-top-right-radius:10rpx; background:#FFF;}
.grace-product-attr-info{overflow:hidden; display:flex; justify-content:space-between;  border-bottom:1px solid #F1F1F3; padding-bottom:26rpx;}
.grace-product-attr-info image{width:60px; height:auto; margin-right:10px; flex-shrink:0;}
.grace-product-attr-info .title{width:100%;}
.grace-product-attr-info .title text{font-size:20rpx; color:#666666;}
.grace-product-attr-btn{margin:25rpx 0;}
.grace-product-attr-btn button{height:40px; line-height:40px;}
.grace-product-attr-close{padding:10rpx 0; line-height:60rpx; text-align:right;}
.grace-product-attr-close text{font-size:50rpx; color:#666666;}
</style>