<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="grace-body" style="background:#f8f8f8;min-height: 100vh;">
			
			<view class="SegmentedControlIn" style="margin-top: 10px;">
				<segmentedControl :items="cates" :current="type" @change="onTypeChange"
					bgColor="#f0f0f0" color="#F37B1D"></segmentedControl>
			</view>
			
			<view v-if="type===0">
			<view class="grace-space-between" v-if="hasProduct">
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
			<view v-if="!hasProduct">
				<emptyCompent message="什么也没有搜到,换一个试试"></emptyCompent>
			</view>
			</view>
			
			<view v-if="type===1">
			<view class="grace-space-between" v-if="hasNews">
				<view class="grace-waterfall-item" v-for="(lists, index1) in newsList" :key="index1">
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
			<view v-if="!hasNews">
				<emptyCompent message="什么也没有搜到,换一个试试"></emptyCompent>
			</view>
			</view>
			
		</view>
	</gracePage>
</template>

<script>
import gracePage from "../../graceUI/components/gracePage.vue";
import segmentedControl from '@/components/segmentedControl.vue';
import emptyCompent from "@/components/emptyComponent.vue";
export default {
	props: {
		productList: {
			type: Array,
			default: function() {return [[],[]]}
		},
		newsList: {
			type: Array,
			default: function() {return [[],[]]}
		}
	},
	data() {
		return {
			cates : ["产品", "资讯"],
			type: 0,
			hasProduct: true, //是否有产品信息
			hasNews: false,
		}
	},
	created() {
		this.hasProduct = this.productList[0].length>0;
		this.hasNews = this.newsList[0].length>0;
	},
	methods: {
		onTypeChange: function(e) {
			if(e!==this.type) {
				this.type = e;
				this.$emit("onTypeChange", e);
			}
		},
		gotoShow: function(id) {
			uni.navigateTo({ url: '../product/show?id='+id })
		},
	},
	components: {
		gracePage,
		segmentedControl,
		emptyCompent
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
