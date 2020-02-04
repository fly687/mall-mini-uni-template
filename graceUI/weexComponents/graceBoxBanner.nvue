<template>
	<view class="grace-box-banner grace-border-radius-small" 
	:style="{backgroundColor:background, paddingTop:padding, paddingBottom:padding}">
	    <view class="grace-box-items" v-for="(item, index) in items" :key="index">
			<view class="grace-flex-center grace-box-line1">
				<text :style="{color:color[0],fontSize:fontSize[0]}">{{item[0]}}</text>
				<text :style="{color:color[1],fontSize:fontSize[1]}" style="margin-left:2px;">{{item[1]}}</text>
			</view>
	        <text class="grace-box-line2" :style="{color:color[2],fontSize:fontSize[2]}">{{item[2]}}</text>
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
.grace-box-banner{flex-wrap:nowrap; flex-direction:row; overflow:hidden;}
.grace-box-items{justify-content:center; width:700rpx; flex:1; text-align:center;}
.grace-box-line1{align-items:center;}
.grace-box-line2{line-height:32rpx; margin-top:3px; text-align:center;}
</style>