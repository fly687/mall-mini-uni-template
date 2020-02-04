<template>
	<view class="gui-sbody" :style="{flex:flexVal}">
		<!-- 头部导航 -->
		<view v-if="customHeader">
			<view class="gui-page-header" :style="{'z-index':headerIndex, backgroundColor:headerBG}">
				<!-- 沉浸式状态栏 -->
				<view class="gui-page-status-bar" :style="{height:statusBarHeight+'px', backgroundColor:statusBarBG}"></view>
				<!-- 头部核心 -->
				<view class="gui-page-header-nav" :style="{height:headerHeight+'px'}">
					<view class="gui-header-main gui-flex-auto">
						<slot name="gHeader"></slot>
					</view>
					<view :style="{width:BoundingWidth, height:'10px'}"></view>
				</view>
			</view>
			<!-- 占位 view -->
			<view :style="{width:'750rpx', height:(statusBarHeight + headerHeight) + 'px'}"></view>
		</view>
		<!-- 页面主体 -->
		<view class="gui-page-body" :style="{flex:flexVal}"><slot name="gBody"></slot></view>
		<!-- 页面底部 -->
		<view class="gui-page-footer" :style="{'z-index':footerIndex, backgroundColor:footerBg}">
			<slot name="gFooter"></slot>
		</view>
		<!-- 右下角悬浮按钮 -->
		<view class="gui-page-rb-area" :style="{right:rbRight+'rpx', bottom:rbBottom+'rpx', width:rbWidth+'rpx'}"><slot name="gRTArea"></slot></view>
	</view>
</template>
<script>
export default{
	props:{
		customHeader : { type : Boolean, default : true },
		headerHeight : { type : Number, default : 44 },
		headerIndex  : { type : Number, default : 999 },
		headerBG     : { type : String, default : '#FFFFFF'},
		statusBarBG  : { type : String, default : '#FFFFFF'},
		footerIndex  : { type : Number, default : 999},
		rbWidth      : { type : Number, default : 100},
		rbBottom     : { type : Number, default : 100 },
		rbRight      : { type : Number, default : 20 },
		footerBg     : { type : String, default : '' },
		flexVal      : { type : String, default : ''}
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
		} catch (e){
		    return null;
		}
		if(!this.customHeader){return ;}
		this.statusBarHeight = res.statusBarHeight;
	}
}
</script>
<style scoped>
.gui-sbody{width:750rpx;}
.gui-page-header{width:750rpx; position:fixed; left:0; top:0; z-index:99;}
.gui-page-status-bar{width:750rpx; height:0;}
.gui-page-header-nav{width:750rpx; flex-direction:row; flex-wrap:nowrap;}
.gui-header-main{width:750rpx;}
.gui-page-body{width:750rpx;}
.gui-page-footer{width:750rpx; position:fixed; left:0; bottom:0; z-index:99;}
.gui-page-rb-area{width:100rpx; position:fixed; right:20rpx; bottom:100rpx; z-index:100;}
</style>