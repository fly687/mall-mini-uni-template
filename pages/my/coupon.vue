<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="grace-body" style="background:#f8f8f8;min-height: 100vh;">
			
			<view class="SegmentedControlIn" style="margin-top: 10px;">
				<segmentedControl :items="cates" :current="status" @change="onTypeChange"
					bgColor="#f0f0f0" color="#F37B1D"></segmentedControl>
			</view>
			
			<view class="grace-space-between" v-if="couponList.length>0">
				<view class="waterfall-item" v-for="(item, index1) in couponList" :key="index1">
					<couponComponent :coupon="item" @onClick="onClick"></couponComponent>
				</view>
			</view>
			<view v-if="couponList.length<=0">
				<emptyCompent ></emptyCompent>
			</view>
			<view class="grace-margin-top grace-text-center">
				<text class="grace-text zsl-loadmore-text">{{bottomMsg}}</text>
			</view>
			<graceLoading :loadingType="loadingType"></graceLoading>
		</view>
	</gracePage>
</template>

<script>
var that;
import gracePage from "@/graceUI/components/gracePage.vue";
import graceLoading from '@/graceUI/components/graceLoading.vue';
import segmentedControl from '@/components/segmentedControl.vue';
import emptyCompent from "@/components/emptyComponent.vue";
import couponComponent from "./couponComponent.vue";
export default {
	data() {
		return {
			cates : ["全部", "可使用", "已过期", "已使用"],
			status: 0,
			page: 0,
			couponList: [],
			pageSize: 15,
			bottomMsg: '上划加载更多 ^_^',
			canPage: true,
			loadingType: '3',
			append: true,
		}
	},
	onLoad(options) {
		const status = options.status;
		this.status = status?status:0;
		that = this;
		that.loadData();
	},
	onReachBottom: function() {
		if (this.loadingType == 1 || this.loadingType == 2){return ;}
		this.loadMoreFunc();
	},
	methods: {
		loadData: function() {
			that.$request.get("miniCouponService.listOwn",{page: that.page, status: that.status, 
				size: that.pageSize}).then((res)=> {
				const data = res.couponList;
				that.rebuildData(data);
				if(data.length>=that.pageSize) {that.canPage = true;}
				else {that.canPage = false; that.bottomMsg = "我也是有底线的";}
				that.page = that.page + 1;
				that.append = true;
			});
		},
		rebuildData: function(data) {
			const oldData = that.append?that.couponList:[];
			that.couponList = oldData.concat(data);
		},
		loadMoreFunc: function(e) {
			//console.log(e);
			that.loadData();
		},
		onTypeChange: function(e) {
			that.status = e;
			that.page = 0;
			that.canPage = true;
			that.append = false;
			that.loadData();
		},
		onClick: function(proId) {
			//console.log(proId);
			if(proId && proId>0) {
				uni.navigateTo({
					url: "../product/show?id="+proId
				})
			} else {
				uni.navigateTo({
					url: "../product/listProduct"
				})
			}
		},
	},
	components: {
		gracePage,
		graceLoading,
		segmentedControl,
		emptyCompent,
		couponComponent
	}
}
</script>

<style>
.waterfall-item {width:100%; padding: 12px 0px 12px 0px;}
</style>
