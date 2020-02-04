<template>
	<view class="main-body">
		<!-- 轮播图 start -->
		<swiper class="grace-swiper swiper1"
		autoplay="true" indicator-dots 
		indicator-color="rgba(255, 255, 255, 1)" 
		indicator-active-color="#FF0036" 
		style="height:400rpx" 
		interval="3000">
			<swiper-item v-for="(item, index) in swiperItems" :key="index">
				<view class="grace-img-in" @tap="showImages(item)">
					<image :src="item.rootUrl+item.qiniuKey" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 轮播图 end -->
	</view>
</template>
<script>
let that;
export default {
	props: {
		swiperItems: {
			type: Array,
			default: function() {return [];}
		}
	},
	data() {
		return {
			obj: {}
		}
	},
	created: function(){
		that = this;
	},
	methods: {
		showImages: function(obj) {
			console.log(obj);
			that.obj = obj; that.showDialog = true;
		},
	},
	components: {
	}
}
</script>
<style scoped>
</style>