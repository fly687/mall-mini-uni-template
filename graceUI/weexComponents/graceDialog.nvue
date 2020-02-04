<template>
	<view class="grace-dialog-shade" v-if="show" @tap.stop="closeDialog" @touchmove.stop="stopFun" :style="{backgroundColor:background}">
		<view class="grace-dialog gdFadeIn" @tap.stop="stopFun" :style="{width:width, borderRadius:borderRadius}">
			<text class="grace-dialog-title" v-if="isTitle" :style="{fontSize:titleSize, color:titleColor,fontWeight:titleWeight?'900':''}">{{title}}</text>
			<view @tap.stop="stopFun"><slot name="content"></slot></view>
			<text class="grace-dialog-close-btn grace-icons" :style="{color:closeBtnColor}" v-if="isCloseBtn" @tap.stop="closeDialog">&#xe632;</text>
			<view v-if="isBtns"><slot name="btns"></slot></view>
		</view>
	</view>
</template>
<script>
export default {
	name: "graceDialog",
	props: {
		show : {
			type : Boolean,
			default : false
		},
		width : {
			type : String,
			default : '580rpx'
		},
		isCloseBtn: {
			type : Boolean,
			default : true
		},
		closeBtnColor : {
			type : String,
			default : '#FF0036'
		},
		isTitle : {
			type : Boolean,
			default : true
		},
		title : {
			type : String,
			default : ''
		},
		titleWeight : {
			type : Boolean,
			default : true
		},
		titleSize : {
			type : String,
			default : '28rpx'
		},
		titleColor : {
			type : String,
			default : '#333333'
		},
		isBtns : {
			type : Boolean,
			default : true
		},
		background:{
			type : String,
			default : 'rgba(0, 0, 0, 0.5)'
		},
		borderRadius : {
			type : String,
			default : '6rpx'
		}
	},
	data() {
		return {
			
		}
	},
	methods:{
		closeDialog : function(){
			this.$emit('closeDialog');
		},
		stopFun : function(){}
	}
}
</script>
<style scoped>
.grace-dialog-shade{position:fixed; width:750rpx; flex:1; left:0; top:0; bottom:0; justify-content:center; align-items:center;}
.grace-dialog{width:580rpx; background-color:#FFFFFF;}
.grace-dialog-title{line-height:100rpx; height:100rpx; font-size:30rpx; text-align:center;}
.grace-dialog-close-btn{position:absolute; right:0px; top:0px; font-size:30rpx; width:80rpx; height:80rpx; line-height:80rpx; text-align:center;}
</style>