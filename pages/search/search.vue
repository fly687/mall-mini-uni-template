<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<graceHeader background="#34CD6D">
				<!-- 搜索组件宽度自适应于外层 -->
				<view class="grace-header-body grace-nowrap">
					<!-- 返回按钮 -->
					<view class="icons grace-icons icon-arrow-left grace-white" @tap="gotoBack" style="font-size:44rpx;"></view>
					<view class="zsl-search">
						<view class="zsl-search-in grace-nowrap">
							<view class="grace-icons icon-search zsl-search-icon"></view>
							<view class="input grace-flex1"><input type="search" placeholder="关键字"/></view>
						</view>
					</view>
				</view>
			</graceHeader>
			<view class="grace-body">
				<view v-if="searchKeyHistory.length > 0">
					<view class="grace-title" style="margin-top:15rpx;">
						<text class="grace-title-text grace-black">搜索历史</text>
						<text class="grace-text-small grace-gray grace-icons icon-remove" @tap="removeAll">清空</text>
					</view>
					<view class="grace-search-tags grace-wrap">
						<view v-for="(item, index) in searchKeyHistory" :key="index" :data-key="item" class="grace-search-tags-items" @tap="setKey">{{item}}</view>
					</view>
				</view>
				<view class="grace-title" style="margin-top:15rpx;">
					<text class="grace-title-text grace-black">热门搜索</text>
				</view>
				<view class="grace-search-tags grace-wrap">
					<view v-for="(item, index) in HotKeyHistory" :key="index" :data-key="item" class="grace-search-tags-items" @tap="setKey">{{item}}</view>
				</view>
			</view>
		</view>
	</gracePage>
</template>
<script>
import gracePage from "../../graceUI/components/gracePage.vue";
import graceSearch from "../../graceUI/components/graceSearch.vue";
import graceHeader from '@/graceUI/components/graceHeader.vue';
export default {
	data() {
		return {
			searchKey : "",
			searchKeyHistory : [ 'GraceUI', '测试', '关键字', '类型' ],
			HotKeyHistory : [ 'GraceUI', '手机', '小米', 'iphone X']
		}
	},
	onLoad:function(){},
	methods:{
		gotoBack: function() {
			uni.navigateBack();
		},
		inputting : function(e){
			console.log(e);
		},
		confirm : function (e) {
			console.log(e);
		},
		setKey : function(e){
			var key = e.currentTarget.dataset.key;
			uni.showToast({
				title : '开始搜索 ' + key,
				icon  : "none"
			});
			this.searchKey = key;
		},
		removeAll : function(){
			this.searchKeyHistory = [];
		}
	},
	components:{
		gracePage, graceSearch,graceHeader
	}
}
</script>
<style>
.grace-search-tags{padding:10rpx 0;}
.grace-search-tags-items{padding:5rpx 20rpx; border-radius:30rpx; margin-right:15rpx; margin-bottom:15rpx; font-size:24rpx; line-height:40rpx; border-width:1px; border-style:solid; border-color:#F1F1F1; color:#A5A7B2; font-size:26rpx;}

.zsl-search {
		background:#FFF; border-radius: 15px;
	}
	.zsl-search-in {
	}
	.zsl-search-icon {width: 18px; height: 20px; line-height: 24px; padding-left: 18rpx;}
</style>