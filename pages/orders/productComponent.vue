<template>
	<view class="product-view">
		<view class="single-product-view grace-nowrap" v-for="(item, index) in basketList" :key="index">
			<view class="pro-img">
				<image :src="item.proImg" class="grace-shoppingcard-goods-image" mode="widthFix"></image>
			</view>
			<view class="grace-flex1 pro-content">
				<view class="pro-title">{{item.proTitle}}</view>
				<view class="pro-specs-name">{{item.specsName}}</view>
			</view>
			<view class="pro-price">
				<view class="price">￥{{item.price}}</view>
				<view class="count">x {{item.amount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		basketList: {
			type: Array,
			default: function() {return [];}
		},
	},
	data() {
		return {
			
		}
	},
	methods: {
		
	}
}
</script>

<style>
.product-view {
	background:#FFF; border-radius: 10px; padding: 8px 10px; margin-top: 10px;
}
.single-product-view {
	width:100%; padding-bottom: 15px; border-bottom: 1px #e5e5e5 dotted; padding-top: 10px;
}
.single-product-view .pro-img {
	width:100px;
}
.single-product-view .pro-img image {
	width:100px;
}

.pro-price {
	width: 60px; text-align: right; color:#999;
}
.pro-price .price {
	font-size: 16px; color:#666; padding-bottom: 5px;
}
.pro-price .count {
	font-size: 14px;
}
.pro-content {
	/* flex-shrink:0; display:flex; align-items:center; */
	justify-content: center;
}
.pro-title {
	width: 100%; font-size:14px; color:#555;
}
.pro-specs-name {
	width:100%; font-size:14px; color:#aaa; margin-top: 8px;
}
</style>
