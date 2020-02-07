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
				<navigator :url='item.content' :open-type="item.navMode" class="grace-img-in" v-if="item.openMode==='2'">
					<image :src="item.url" mode="widthFix"></image>
				</navigator>
				<view class="grace-img-in" v-if="item.openMode==='1'" @tap="showContent(item)">
					<image :src="item.url" mode="widthFix"></image>
				</view>
				<view class="grace-img-in" v-if="item.openMode==='0'">
					<image :src="item.url" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 轮播图 end -->
		<graceDialog :title="obj.title" :show="showDialog" :isBtns="false" v-on:closeDialog="closeDialog">
			<view class="content1" slot="content">
				<text>{{obj.content}}</text>
			</view>
		</graceDialog>
	</view>
</template>
<script>
let that;
import graceDialog from "@/graceUI/components/graceDialog.vue";
export default {
	props: {
		swiperItems: {
			type: Array,
			default: function() {return [];}
		}
	},
	data() {
		return {
			showDialog: false,
			obj: {}
		}
	},
	created: function(){
		that = this;
	},
	methods: {
		showContent: function(obj) {
			//console.log(obj);
			that.obj = obj; that.showDialog = true;
		},
		closeDialog: function() {
			that.showDialog=false;
		}
	},
	components: {
		graceDialog
	}
}
</script>
<style scoped>
	.content1{padding:25rpx; font-size:26rpx; text-align:center; line-height:60rpx;background-color:#F8F8F8; display:block;}
</style>