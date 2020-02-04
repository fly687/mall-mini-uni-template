<template>
	<!-- 头部导航及搜索条 -->
	<graceHeader background="#34CD6D">
		<view class="grace-header-body">
			<!-- 返回按钮 -->
			<view class="icons grace-icons icon-scancode grace-white" style="font-size:44rpx;"></view>
			<!-- 中间内容 -->
			<!-- <view class="grace-header-content-noflex">
				<graceSearch @tap="gotoSearch()"></graceSearch>
			</view> -->
			<view class="zsl-search">
				<view class="zsl-search-in grace-nowrap">
					<view class="grace-icons icon-search zsl-search-icon"></view>
					<view class="input grace-flex1"><input type="search" placeholder="关键字" @tap="gotoSearch"/></view>
				</view>
			</view>
			<!-- 用户按钮 -->
			<view class="icons grace-icons icon-user grace-white"></view>
		</view>
	</graceHeader>
</template>

<script>
let that;
import graceHeader from '@/graceUI/components/graceHeader.vue';
import graceSearch from '@/graceUI/components/graceSearch.vue';
export default {
	props: {
	},
	data() {
		return {
		}
	},
	created: function(){
		that = this;
	},
	methods: {
		gotoSearch: function() {
			uni.navigateTo({
				url:"../search/search"
			})
		}
	},
	components: {
		graceHeader,graceSearch
	}
}
</script>
<style scoped>
	.zsl-search {
		background:#FFF; border-radius: 15px;
	}
	.zsl-search-in {
	}
	.zsl-search-icon {width: 18px; height: 20px; line-height: 24px; padding-left: 18rpx;}
</style>