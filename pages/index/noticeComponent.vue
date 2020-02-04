<template>
	<view>
	<!-- 通知公告start -->
	<view class="grace-swiper-msg">
		<view class="grace-swiper-msg-icon" :class="[iconClass]" :style="{color:iconColor}"><text class="zsl-icons icon-mod"></text></view>
		<swiper :vertical="vertical" autoplay="true" circular="true" :interval="interval" :style="{height:height}">
			<swiper-item v-for="(item, index) in dataSource" :key="index" :style="{height:height}">
				<navigator 
				:url="item.url" :open-type="item.opentype"
				 v-if="item.openMode==='2'"
				 class="notice-content">{{item.content}}</navigator>
				 <view class="notice-content" @tap="showNotice(item)" v-if="item.openMode!=='2'">{{item.content}}</view>
			</swiper-item>
	  </swiper>
	</view>
	
	<graceDialog title="公告提示" :show="showDialog" :isBtns="false" v-on:closeDialog="closeDialog">
		<view class="content1" slot="content">
			<text>{{obj.content}}</text>
		</view>
	</graceDialog>
	<!-- 通知公告end -->
	</view>
</template>

<script>
let that;
import graceDialog from "@/graceUI/components/graceDialog.vue";
export default {
	props: {
		dataSource: {
			type: Array,
			default: function() {return [];}
		},
		msgs : {
		  type  : Array,
		  default : function(){return [];}
		},
		iconClass : {
		  type  : String,
		  default : ""
		},
		iconColor : {
		  type  : String,
		  default : "#3688FF"
		},
		interval : {
		  type : Number,
		  default: 3000
		},
		vertical : {
		  type : Boolean,
		  default : true
		},
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
	mounted: function(){
		//console.log(this.dataSource)
	},
	methods: {
		showNotice: function(notice) {
			if(notice.openMode==='1') {
				that.obj = notice; that.showDialog = true;
			}
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
	.notice-content {fontSize:26rpx; color:#333333; height:60rpx; line-height:60rpx;}
	.grace-swiper-msg{width:100%; display:flex; flex-wrap:nowrap; align-items:center;}
	.grace-swiper-msg-icon{margin-right:16rpx; display:inline-block; flex-shrink:0;}
	.grace-swiper-msg-icon text {font-size:36rpx; margin-left: 16rpx;}
	.grace-swiper-msg swiper{width:100%; height:60rpx; overflow:hidden;}
	.grace-swiper-msg swiper-item{overflow:hidden;}
	.grace-swiper-msg navigator{line-height:60rpx; overflow:hidden;}
	
	.content1{padding:25rpx; font-size:26rpx; text-align:center; line-height:60rpx;background-color:#F8F8F8; display:block;}
</style>