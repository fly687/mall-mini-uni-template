<template>
	<view>
		<view class="column-title" @tap="onClick">
			<text :class="'zsl-icons column-icon '+titleIcon"></text>
			<text class="column-title-name">{{titleName}}</text>
			<view class="more-button zsl-icons icon-right"></view>
		</view>
		<view class="product-list-main">
			<navigator v-for="(item, index) in proList" :key="index" :url="'../product/show?id='+item.id">
				<view class="single-product">
					<view class="pro-image">
						<image :src="item.headImgUrl" mode="aspectFit"/>
						<view class="count-view">
							<text class="zsl-icons icon-heart count-icon"></text>
							<text class="count-value">{{rebuildCount(item)}}</text>
						</view>
					</view>
					<view class="pro-content grace-nowrap">
						<view class="" style="width:70%;">
							<view class="pro-title">{{item.title}}</view>
							<view class="pro-sale-count">销量：{{item.saleCount+item.defaultSale}}</view>
						</view>
						<view class="grace-flex1 pro-price">￥ {{item.price}}</view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
let that;
export default {
	props: {
		proList:{
			type : Array,
			default : function(){return [];}
		},
		titleIcon: {
			type: String,
			default: ''
		},
		titleName: {
			type: String,
			default: '产品'
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
		rebuildCount: function(item) {
			return parseInt(item.readCount/2) + item.favoriteCount;
		},
		onClick: function() {
			this.$emit("onClick");
		}
	},
	components: {
	}
}
</script>
<style scoped>
	.column-title {width:100%; height: 40px; line-height: 40px; background: #ffffff; padding-left: 20rpx; position: relative;}
	.column-icon {color:#34cd6d; font-size: 46rpx;}
	.column-title-name {color:#393939; font-size:36rpx; margin-left: 20rpx;}
	.more-button {
		display: inline-block; position: absolute; right:10px; padding: 0px 8px;
	}
	
	.product-list-main {
		width:100%;
		padding: 20rpx 0px; background:#F4F5F6;
	}
	.single-product {
		width:90%; margin-left: 5%; min-height: 10px; border-radius: 10px;
		box-shadow: 5px 5px 5px 2px #BBBBBB; margin-bottom: 15px;
	}
	.pro-image {
		padding:0px; position: relative;
	}
	.pro-image image {
		width:100%; border-radius: 10px 10px 0px 0px; /* background:#B7DEFA; */background:#FFFFFF; position: relative;
	}
	.count-view {
		position: absolute; right: 10px; bottom: 10px; padding: 2px 4px; border-radius: 5px; opacity: 0.3; background: #000;
	}
	.count-icon {
		font-size: 16px; opacity: 0.9; color:#FFF; font-weight: normal;
	}
	.count-view text.count-value {color:#FFF; opacity: 1; font-size: 14px; padding-left: 2px; font-weight: normal; line-height: 22px;}
	
	.pro-content {
		background:#FFF; border-radius: 0px 0px 10px 10px; min-height: 25px;
	}
	.pro-price {
		font-size: 16px; color:#E51C23; text-align: right; padding-right: 15px; line-height: 50px;
	}
	.pro-title {
		font-size:14px; color:#555; margin: 6px 0px 6px 8px;
	}
	.pro-sale-count {
		font-size:10px; color:#aaa; margin-left: 8px; margin-bottom: 10px;
	}
</style>