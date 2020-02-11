<template>
	<view style="padding: 0px 20rpx;">
		<!-- <graceImmersedStatusbar bgColor="#34CD6D"></graceImmersedStatusbar> -->
		<view class="grace-list" style="padding-top: 30rpx;">
			<!-- <view class="grace-h4 grace-margin-top" style="padding:20rpx 0;">个人中心</view> -->
			<view class="grace-list-items" >
					<view class="grace-list-image ucenter-face grace-relative">
						<image class="grace-list-image ucenter-face-image" :src="custom.headImgUrl" mode="widthFix"></image>
					</view>
					<view class="grace-list-body">
						<view class="grace-list-title"><text class="grace-list-title-text">{{custom.nickname}}</text></view>
						<view class="grace-list-body-desc">描述信息</view>
					</view>
					<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
			</view>
		</view>

		<view class="ucenter-line"></view>
		<view>
			<graceBoxBanner :items="items"></graceBoxBanner>
		</view>
		<view class="ucenter-line"></view>
		<view class="grace-list grace-margin-top">
			<view class="grace-list-items" @tap="gotoFun('coupon')">
				<text class="grace-list-icon zsl-icons icon-coupon grace-red"></text>
				<view class="grace-list-body grace-border-b">
					<view class="grace-list-title">
						<text class="grace-list-title-text">我的优惠券</text>
					</view>
				</view>
				<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
			</view>
			<view class="grace-list-items" @tap="gotoFun('address')">
				<text class="grace-list-icon grace-icons icon-address grace-blue"></text>
				<view class="grace-list-body grace-border-b">
					<view class="grace-list-title">
						<text class="grace-list-title-text">收货地址</text>
					</view>
				</view>
				<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
			</view>
			<view class="grace-list-items" @tap="gotoFun('agent')">
				<text class="grace-list-icon grace-icons icon-kf1 grace-green"></text>
				<view class="grace-list-body grace-border-b">
					<view class="grace-list-title">
						<text class="grace-list-title-text">我要代理</text>
					</view>
				</view>
				<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
			</view>
			<view class="grace-list-items" @tap="gotoFun('favorite')">
				<text class="grace-list-icon grace-icons icon-shoucang grace-blue-sky"></text>
				<view class="grace-list-body">
					<view class="grace-list-title">
						<text class="grace-list-title-text">我的收藏</text>
					</view>
				</view>
				<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
			</view>
		</view>
		<view class="ucenter-line"></view>
		<view class="grace-list grace-margin-top">
			<view class="grace-list-items">
				<text class="grace-list-icon grace-icons icon-set grace-yellow"></text>
				<view class="grace-list-body grace-border-b">
					<view class="grace-list-title">
						<text class="grace-list-title-text">账户设置</text>
					</view>
				</view>
				<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
			</view>
			<view class="grace-list-items">
				<text class="grace-list-icon grace-icons icon-phone grace-red"></text>
				<view class="grace-list-body">
					<view class="grace-list-title">
						<text class="grace-list-title-text">手机密保</text>
					</view>
				</view>
				<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
			</view>
		</view>
		<view class="ucenter-line"></view>
	</view>
</template>
<script>
import gracePage from "../../graceUI/components/gracePage.vue";
import graceBoxBanner from "../../graceUI/components/graceBoxBanner.vue";
import config from "@/common/config.js";
export default{
	data() {
		return {
			custom: {},
			items: [
				[80, '', '动态'],
				[100, '', '好友'],
				[50, '', '私信'],
				['￥199', '', '余额']
			]
		}
	},
	onLoad() {
		const custom = uni.getStorageSync(config.CUR_CUSTOM);
		//console.log(custom)
		this.custom = custom;
	},
	methods: {
		gotoFun: function(fun) {
			if(fun==='address') {uni.navigateTo({ url: "./address" })}
			else if(fun==='agent') {uni.navigateTo({ url: "../agent/apply/apply" })}
			else if(fun==='favorite') {uni.navigateTo({ url: "./favorite" })}
			else if(fun==='coupon') {uni.navigateTo({ url: "./coupon" })}
		},
	},
	components:{
		graceBoxBanner,gracePage
	}
}
</script>
<style>
.ucenter-face{width:100rpx !important; height:100rpx !important;}
.ucenter-face-image{width:100rpx !important; height:100rpx !important;}
.ucenter-line{height:12rpx; background-color:#F4F5F6; margin:16rpx 0;}
</style>