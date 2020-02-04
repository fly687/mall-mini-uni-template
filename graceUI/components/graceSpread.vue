<template name="graceSpread">
	<view class="grace-spread" :style="{height:reHeight}">
		<slot></slot>
		<view v-if="isBtn" class="btn" @tap="spreadContent" :style="{color:btnColor}">{{btnTxt}}<text :style="{color:btnColor}" class="gsd-arrow-down"></text></view>
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
			this.reHeight = 'auto';
			this.isBtn = false;
		}
	},
}
</script>
<style scoped>
.grace-spread{overflow:hidden; position:relative;}
.grace-spread > .btn{
	width:100%; height:38px; 
	line-height:38px; padding-top:15px; 
	background:linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 100%);
	position:absolute;
	z-index:999999;
	left:0; bottom:0;
	text-align:center;
}
@font-face {font-family:"gFont"; src:url('https://at.alicdn.com/t/font_1348754_ac85tokgewg.ttf') format('truetype');}
.gsd-arrow-down{margin-left:5px; font-size:28rpx;}
.gsd-arrow-down text{font-size:28rpx;}
.gsd-arrow-down:before{font-family:"gFont"; content: "\e638";}
</style>