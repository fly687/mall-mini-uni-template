<template name="graceSpread">
	<view class="grace-spread" :style="{height:reHeight}">
		<slot></slot>
		<view class="grace-spread-btn">
			<text v-if="isBtn" class="grace-spread-btn-text grace-icons" @tap="spreadContent" :style="{color:btnColor}">{{btnTxt}} &#xe633;</text>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		height:{
			type : String,
			default : "600rpx"
		},
		btnTxt:{
			type : String,
			default : "展开阅读全文"
		},
		btnColor:{
			type : String,
			default : "#999999"
		}
	},
	data() {
		return {
			reHeight: "600px",
			isBtn : true
		}
	},
	created:function(){
		this.reHeight = this.height;
	},
	methods: {
		spreadContent : function () {
			this.reHeight = '';
			this.isBtn = false;
		}
	},
}
</script>
<style scoped>
.grace-spread{overflow:hidden;}
.grace-spread-btn{height:68rpx; background-color:rgba(255,255,255, 0.2); position:absolute; left:0; right:0; bottom:0; flex-direction:column;}
.grace-spread-btn-text{line-height:68rpx; text-align:center; font-size:26rpx;}
</style>