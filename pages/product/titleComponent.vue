<template>
	<!-- 头部导航及搜索条 -->
	<graceHeader background="#34CD6D">
		<view class="grace-header-body grace-nowrap">
			<!-- 返回按钮 -->
			<view class="icons grace-icons icon-arrow-left grace-white" style="font-size:44rpx;" @tap="gotoBack"></view>
			<!-- 中间内容 -->
			<view class="pro-title grace-flex1">
				{{title}}
			</view>
			<!-- 用户按钮 -->
			<button plain="true" open-type="share" class="icons grace-icons icon-share grace-white pro-share-btn"></button>
		</view>
	</graceHeader>
</template>

<script>
let that;
import graceHeader from '@/graceUI/components/graceHeader.vue';
export default {
	props: {
		title: {
			type: String,
			default: "产品详情"
		}
	},
	data() {
		return {
		}
	},
	created: function(){
		that = this;
	},
	methods: {
		gotoBack: function() {
			uni.navigateBack({
				
			})
		}
	},
	components: {
		graceHeader
	}
}
</script>
<style scoped>
.pro-title {text-align: center; color:#FFF; width:100%; font-size: 14px;}
.pro-share-btn {
	background:none; border:none; font-size: 18px;
}
</style>