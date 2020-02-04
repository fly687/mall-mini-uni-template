<template>
	<view class="graceIconClasses">
		<navigator :url="item.path" :open-type="item.navMode" class="item" :style="{background:item.bgColor}" v-for="(item, index) in classes" :key="index">
			<!-- <image :src="item.icon" mode="widthFix"></image> -->
			<view class="content">
				<view :class="'big-icons zsl-icons '+item.icon"></view>
				<view class="txt">
					{{item.txt}}<text>{{item.smallTxt}}</text>
				</view>
				<view :class="'bg-icons zsl-icons '+item.icon"></view>
			</view>
		</navigator>
	</view>
</template>

<script>
let that;
export default {
	props: {
		classes:{
			type : Array,
			default : function(){return [];}
		}
	},
	data() {
		return {
		}
	},
	created: function(){
		that = this;
	},
	mounted: function() {
	},
	methods: {
	},
	components: {
	}
}
</script>
<style scoped>
	.graceIconClasses{display:flex; flex-direction:row; flex-wrap:wrap; justify-content:space-between;}
	.graceIconClasses > .item{width:31.3%; height:168rpx; display:flex; border-radius:5px; background:#6DCD70; color:#FFF; position:relative; margin:10rpx 0; overflow:hidden;}
	/* .graceIconClasses > .item > .big-icons{width:40%; position:absolute; z-index:1; opacity:0.15; height:auto; right:3px; bottom:3px;} */
	.graceIconClasses > .item > .content{width:100%; height:168rpx; display:flex; flex-wrap:wrap; align-items:center !important; position: relative;}
	.graceIconClasses > .item > .content .txt{font-size:28rpx !important; color:#FFFFFF; text-indent:20rpx; margin-top: 0px; margin-top:-30rpx;}
	.graceIconClasses > .item > .content .txt text{font-size:20rpx; margin-left:5rpx; opacity:0.8;}
	.graceIconClasses > .item > .content .bg-icons {font-size:80rpx; position: absolute;opacity:0.3; bottom: 1rpx; right:1rpx; text-align: right; padding-right: 3rpx; padding-bottom: 3rpx;}
	
	.big-icons {font-size:80rpx; margin:10rpx 0px 0px 10rpx; margin-bottom:0px; width:100%;}
</style>