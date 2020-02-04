<template>
	<view class="grace-box-banner grace-border-radius-small" 
	:style="{background:background, paddingTop:padding, paddingBottom:padding}">
	    <view class="grace-box-items" v-for="(item, index) in items" :key="index">
	        <view class="line1" :style="{color:color[0],fontSize:fontSize[0]}">{{item[0]}}<text :style="{color:color[1],fontSize:fontSize[1]}">{{item[1]}}</text></view>
	        <view class="line2" :style="{color:color[2],fontSize:fontSize[2]}">{{item[2]}}</view>
	    </view>
	</view>
</template>
<script>
export default {
	props: {
		items:{
			type : Array,
			default : function () {
				return []
			}
		},
		color:{
			type : Array,
			default : function () {
				return ['#333333', '#999999', '#999999']
			}
		},
		fontSize:{
			type : Array,
			default : function () {
				return ['36rpx', '24rpx', '24rpx']
			}
		},
		background : {
			type : String,
			default : ''
		},
		padding:{
			type : String,
			default : '25rpx'
		}
	}
}
</script>
<style scoped>
.grace-box-banner{padding:26rpx 0; display:flex; flex-wrap:nowrap; overflow:hidden; background:#FFF;}
.grace-box-items{width:100%; justify-content:center; line-height:1.5em; text-align:center;}
.grace-box-banner .line1{line-height:50rpx; overflow:hidden; text-align:center;}
.grace-box-banner .line1 text{line-height:50rpx; margin-left:2px;}
.grace-box-banner .line2{line-height:32rpx; text-align:center;}
</style>