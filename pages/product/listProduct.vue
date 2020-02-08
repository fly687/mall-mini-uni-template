<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="grace-body" style="background:#f8f8f8;">
			
			<view class="SegmentedControlIn" style="margin-top: 10px;">
				<segmentedControl :items="cates" :current="type" @change="onTypeChange"
					bgColor="#f0f0f0" color="#F37B1D"></segmentedControl>
			</view>
			
			<view class="grace-space-between">
				<view class="grace-waterfall-item" v-for="(lists, index1) in productList" :key="index1">
					<view class="grace-img-card-item" v-for="(item, index2) in lists" :key="index2">
						<view class="single-product-view">
						<image :src="item.headImgUrl" @tap="gotoShow(item.id)" mode="widthFix" class="grace-waterfall-img"></image>
						<view class="grace-img-card-title">
						<text :class="['sale-mode-text', item.saleMode==='2'?'sale-mode-presale':'sale-mode-current']">{{item.saleMode==='2'?"预":"当"}}</text>
						{{item.title}}</view>
						<view class="grace-img-card-more">
							<text class="grace-img-card-price">￥{{item.price}}</text>
							<text class="grace-img-card-btn" @tap="gotoShow(item.id)">购买</text>
						</view>
						</view>
					</view>
				</view>
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
import gracePage from "../../graceUI/components/gracePage.vue";
import graceLoading from '@/graceUI/components/graceLoading.vue';
import segmentedControl from '@/components/segmentedControl.vue';
export default {
	data() {
		return {
			cates : ["全部", "当季", "预售"],
			type: 0,
			page: 0,
			productList: [[],[]],
			pageSize: 10,
			bottomMsg: '上划加载更多 ^_^',
			canPage: true,
			loadingType: '3',
			append: true,
		}
	},
	onLoad(options) {
		const type = options.type;
		this.type = type?type:0;
		//console.log(options)
		that = this;
		that.loadData();
	},
	onReachBottom: function() {
		//避免多次触发
		//console.log("----->", this.loadingType)
		if (this.loadingType == 1 || this.loadingType == 2){return ;}
		this.loadMoreFunc();
	},
	methods: {
		loadData: function() {
			if(that.canPage) {
				that.$request.get("miniProductService.list", {page: that.page, type: that.type, 
				size: that.pageSize}).then((res)=> {
					//console.log(res);
					const data = res.data;
					// that.productList = that.productList.concat(data);
					that.rebuildData(data);
					if(data.length>=that.pageSize) {that.canPage = true;}
					else {that.canPage = false; that.bottomMsg = "我也是有底线的";}
					that.page = that.page + 1;
					that.append = true;
				})
			}
		},
		rebuildData: function(data) {
			const oldData = that.append?that.productList:[[],[]];
			let lArr = oldData[0]; let rArr = oldData[1];
			data.map((item, index) => {
				if(index%2===0) {lArr.push(item);}
				else {rArr.push(item);}
			});
			that.productList = [lArr, rArr];
		},
		loadMoreFunc: function(e) {
			//console.log(e);
			that.loadData();
		},
		onTypeChange: function(e) {
			that.type = e;
			that.page = 0;
			that.canPage = true;
			that.append = false;
			that.loadData();
		},
		gotoShow: function(id) {
			uni.navigateTo({ url: './show?id='+id })
		},
	},
	components: {
		gracePage,
		graceLoading,
		segmentedControl
	}
}
</script>

<style>
.grace-waterfall-item{width:340rpx;}
.grace-waterfall-img{width:340rpx;}
.grace-img-card-item {
	margin: 10px 0px; background:#FFFFFF; border-radius: 5px;
	box-shadow: 2px 2px 2px #eee; position: relative;
}
.single-product-view {
	margin: 5px;
}
.sale-mode-text {
	padding:5rpx 10rpx; border-radius: 5px; color:#ffff; margin-right: 4rpx;
}
.sale-mode-presale {
	background:#FF9800
}
.sale-mode-current {
	background:#34CD6D;
}
</style>
