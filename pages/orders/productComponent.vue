<template>
	<view class="product-view">
		<view v-if="data.length<=0" class="no-date-view">
			<emptyCompent message="所选商品可能已失效或库存不足" optMsg="去逛逛" @onClick="gotoIndex"></emptyCompent>
		</view>
		<view class="single-product-view grace-nowrap" v-for="(item, index) in data" :key="index">
			<view class="pro-img">
				<image :src="item.proImg" class="grace-shoppingcard-goods-image" mode="widthFix"></image>
			</view>
			<view class="grace-flex1">
				<view class="grace-nowrap">
					<view class="grace-flex1 pro-content">
						<view class="pro-title">{{item.proTitle}}</view>
						<view class="pro-specs-name">{{item.specsName}}</view>
					</view>
					<view class="pro-price">
						<view class="price">￥{{item.price}}</view>
						<view class="count grace-nowrap"> 
							<text class="operater-text" @tap="changeAmount(item, item.amount-1)">-</text>
							<input class="operater-input" disabled="true" :value="item.amount"/>
							<text class="operater-text" @tap="changeAmount(item, item.amount+1)">+</text>
						</view>
					</view>
				</view>
				<view class="delivery-date" v-if="item.saleMode==='2' && item.deliveryDate">预计发货：{{item.deliveryDate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
var that;
import emptyCompent from "@/components/emptyComponent.vue";
export default {
	props: {
		productList: {
			type: Array,
			default: function() {return [];}
		},
		type: {
			type:String,
			default: 'basket'
		}
	},
	data() {
		return {
			data: [],
		}
	},
	created() {
		that = this;
	},
	methods: {
		initData: function(productList) {
			this.data = productList;
		},
		changeAmount: function(obj, amount) {
			//console.log(amount, obj);
			if(amount>0) {
				this.rebuildData(obj.key, amount);
			}
		}, 
		rebuildData: function(key, amount) {
			const data = [];
			this.data.map((item)=> {
				if(key===item.key) {item.amount = amount;}
				data.push(item);
			});
			that.$emit("changeAmount", {key:key, amount:amount});
			this.data = data;
		},
		gotoIndex: function() { //到首页
			uni.switchTab({
				url:"../index/index"
			})
		},
	},
	components: {emptyCompent}
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
.single-product-view:last-child {
	border-bottom: none;
}

.pro-price {
	width: 65px; text-align: right; color:#999;
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

.operater-input {
	background:#f8f8f8; border: 1px #e0e0e0 solid; color:#999; border-radius:4px; text-align:center; min-width: 25px; line-height: 14px; font-size: 12px; height: 14px; 
}
.operater-text {
	line-height: 20px; padding: 0px 6px;
}
.delivery-date {
	padding-top: 5px; color:#a20;
}
</style>
