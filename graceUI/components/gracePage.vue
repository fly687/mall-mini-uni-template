<template>
	<view class="grace-sbody">
		<!-- 头部导航 -->
		<view v-if="customHeader">
			<view class="grace-page-header" :style="{'z-index':headerIndex, background:headerBG}">
				<!-- 沉浸式状态栏 -->
				<view class="grace-page-status-bar" :style="{height:statusBarHeight+'px', background:statusBarBG}"></view>
				<!-- 头部核心 -->
				<view class="grace-page-header-nav" :style="{height:headerHeight+'px'}">
					<view class="grace-header-main">
						<slot name="gHeader"></slot>
					</view>
					<view :style="{width:BoundingWidth, height:'10px'}"></view>
				</view>
			</view>
			<!-- 占位 view -->
			<view :style="{width:'100%', height:(statusBarHeight + headerHeight) + 'px'}"></view>
		</view>
		<!-- 页面主体 -->
		<view class="grace-page-body">
			<slot name="gBody"></slot>
		</view>
		<!-- #ifndef APP-PLUS -->
		<view v-if="!isSwitchPage" :style="{width:'100%', height:iphoneXButtomHeight+'px'}"></view>
		<!-- #endif -->
		<!-- 页面底部 -->
		<view class="grace-page-footer" :style="{'z-index':footerIndex, background:footerBg}">
			<slot name="gFooter"></slot>
			<!-- iphoneX 占位 view -->
			<!-- #ifndef APP-PLUS -->
			<view v-if="!isSwitchPage" :style="{width:'100%', height:iphoneXButtomHeight+'px'}"></view>
			<!-- #endif -->
		</view>
		<!-- 右下角悬浮按钮 -->
		<view class="gui-page-rb-area" :style="{right:rbRight+'rpx', bottom:rbBottom+'rpx', width:rbWidth+'rpx'}"><slot name="gRTArea"></slot></view>
	</view>
</template>
<script>
export default{
	props:{
		customHeader : { type : Boolean, default : true },
		headerHeight : { type : Number,  default : 44 },
		headerIndex  : { type : Number,  default : 999 },
		headerBG     : { type : String,  default : 'none' },
		statusBarBG  : { type : String,  default : 'none' },
		footerIndex  : { type : Number,  default : 999 },
		footerBg     : { type : String,  default : ''},
		isSwitchPage :  { type : Boolean, default : false },
		rbWidth      : { type : Number, default : 100},
		rbBottom     : { type : Number, default : 100 },
		rbRight      : { type : Number, default : 20 }
	},
	data() {
		return {
			statusBarHeight : 0,
			iphoneXButtomHeight:0,
			BoundingWidth : '0px'
		}
	},
	created:function(){
		try {
		    var res = uni.getSystemInfoSync();
			res.model = res.model.replace(' ', '');
			res.model = res.model.toLowerCase();
			if(res.model.indexOf('iphonex') != -1 || res.model.indexOf('iphone11') != -1){
				this.iphoneXButtomHeight = uni.upx2px(50);
			}
		} catch (e){return null;}
		if(!this.customHeader){return ;}
		// #ifndef MP-ALIPAY
			this.statusBarHeight = res.statusBarHeight;
			// #ifdef MP-WEIXIN
			// 小程序胶囊按钮
			var res  = uni.getMenuButtonBoundingClientRect();
			this.BoundingWidth = (res.width + 20) + 'px';
		// #endif
		// #endif
	}
}
</script>
<style>
page{width:100%; height:100vh; display:flex; flex-direction:column;}
.grace-sbody{
	display:flex; flex-direction:column; width:100%; flex:1;
	 /* #ifdef MP-ALIPAY || MP-BAIDU */
	height: 100vh;
	/* #endif */
}
.grace-page-header{width:100%; position:fixed; left:0; top:0; z-index:99;}
.grace-page-status-bar{width:100%; height:0;}
.grace-page-header-nav{width:100%; display:flex; flex-direction:row; flex-wrap:nowrap; height:44px; align-items:center;}
.grace-header-main{width:300rpx; flex:auto; overflow:hidden;}
.grace-page-body{width:100%; flex:1; display:flex; flex-direction:column;}
.grace-page-footer{width:100%; position:fixed; left:0; bottom:0; z-index:99;}
.gui-page-rb-area{width:100rpx; position:fixed; right:20rpx; bottom:100rpx; z-index:100;}
</style>