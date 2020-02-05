<template>
	<view class="grace-text-center grace-margin-top">
		<view class="zsl-icons icon-kong empty-image"></view>
		<text class="empty-message">{{message}} </text>
		<text class="empty-message-opt grace-blue" v-if="optMsg" style="margin-left:20rpx;" @tap="gotoTarget">{{optMsg}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			message: {
				type : String,
				default : "空空如也。"
			},
			optMsg: {
				type: String,
				default: ""
			},
			
		},
		data() {
			return {
				
			};
		},
		methods: {
			gotoTarget: function() {
				this.$emit("onClick");
			}
		}
	}
</script>

<style>
.empty-image {
	font-size: 150rpx; color:#DDDDDD; margin-top: 80rpx; padding-bottom: 40rpx;
}
.empty-message {
	font-size: 12px; color:#AAAAAA;
}
</style>
