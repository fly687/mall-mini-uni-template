<template>
	<view>
		<titleComponent :title="product.title"/>
		<view v-if="product && product.id">
			<carouseComponent :swiperItems="mediumList"/>
			<view class="product-content">
				<view class="price-content grace-nowrap">
					<view class="" style="width:60%;">
						<view class="pro-price"><text class="logo">￥</text> {{price.minPrice}} - {{price.maxPrice}}</view>
						<view class="pro-ori-price">价格：<text>￥ {{price.minOriPrice}}-{{price.maxOriPrice}}</text></view>
					</view>
					<view class="grace-flex1 pro-fund" v-if="product.fund>0"><text class="zsl-icons icon-nashuichouhuayouhua"/> <text class="fund-value">公益：{{product.fund}}</text></view>
				</view>
				<view class="title-content">
					<text v-if="product.saleMode==='1'" class="sale-mode current-product">当季</text>
					<text v-if="product.saleMode==='2'" class="sale-mode advance-product">预售</text>
					<text class="product-title">{{product.title}}</text>
				</view>
				<view class="product-info grace-nowrap">
					<view class="grace-flex1">快递：0.00</view>
					<view class="grace-flex1">销量：{{product.saleCount+product.defaultSale}}</view>
					<view class="">产地：{{product.provinceName}}{{product.cityName}}{{product.countyName}}</view>
				</view>
				<view class="advance-remark-view" v-if="product.saleMode==='2' && product.deliveryDate">
					预计发货时间：{{product.deliveryDate}}
				</view>
				<view class="choice-view grace-nowrap" @tap="showSpecsDialog">
					<view class="label">选择规格</view>
					<view class="choice-content grace-flex1">{{curSpecs?(curSpecs.name+"-￥"+curSpecs.price):"请选择规格"}}</view>
					<view class="grace-icons icon-arrow-right choice-icon"></view>
				</view>
			</view>
			<!-- <view class="common-line"></view> -->
			
			<graceBottomDialog :show="showSpecs" v-on:closeDialog="closeShow">
				<view class="grace-space-between" slot="btns">
					<view class="grace-dialog-buttons" @tap="closeShow">取消</view>
					<view class="grace-dialog-buttons" style="color:#00B26A;" @tap="closeShow">确定</view>
				</view>
				<view slot="content">
					<specsComponent itemWidth="730rpx" :curId="curSpecs.id" :items="specsList" type="radio" @onOpt="onOpt" @change="changeSpecs"></specsComponent>
				</view>
			</graceBottomDialog>
			
			
			<detailTitleComponent title="产品详情"/>
			<view class="product-html" v-html="product.content"></view>
			
			<view class="grace-footer grace-space-between" style="bottom:0rpx;">
				<view class="grace-grids" style="width:250rpx;">
					<view class="grace-grids-items grace-grids-items2 grace-relative" @tap="onFavorite">
						<text :class="(hasFavorite?'has-favorite':'')+'  grace-grids-icon grace-grids-icon2 grace-icons icon-shoucang '"></text>
						<text :class="(hasFavorite?'has-favorite':'')+ ' grace-grids-text grace-grids-text2'">收藏</text>
					</view>
					<view class="grace-grids-items grace-grids-items2 grace-relative" @tap="gotoBasket">
						<text class="grace-grids-icon grace-grids-icon2 grace-icons icon-shoppingcard">
							<text class="grace-badge grace-bg-red grace-badge-absolute">{{basketCount}}</text>
						</text>
						<text class="grace-grids-text grace-grids-text2">购物车</text>
					</view>
				</view>
				<view class="grace-flex-end" style="width:460rpx;">
					<button type="warn" class="grace-footer-button" style="background:#F37B1D;" @tap="onOpt('basket')">加入购物车</button>
					<button type="warn" class="grace-footer-button" style="background:#259B24;" @tap="onOpt('buy')">立即购买</button>
				</view>
			</view>
		</view>
		<view v-if="!product || !product.id" class="onloading-view">
			<view class="grace-icons icon-loading"></view>
			<text>加载中...</text>
		</view>
	</view>
</template>

<script>
	var that ;
	import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
	import specsComponent from './specsComponent.vue';
	import common from "@/common/common.js";
	
	import titleComponent from "./titleComponent.vue"
	import carouseComponent from "./carouseComponent.vue";
	import detailTitleComponent from "../../components/detailTitleComponent.vue";
	
	export default {
		data() {
			return {
				id: 0,
				product: {},
				price: {},
				specsList: [],
				mediumList: [],
				showSpecs: false,
				hasFavorite: false,
				basketCount: 0, //购物车数量
				curSpecs: null,
			}
		},
		onLoad(options) {
			that = this;
			//console.log(options)
			this.id = options.id;
			that.initData();
		},
		onShareAppMessage(obj) {
			const user = common.getLoginUser();
			console.log(obj, user);
			return {
				title: this.product.title,
				path: '/pages/product/show?id='+this.product.id
			}
		},
		methods: {
			initData: ()=> {
				that.$request.get("miniProductService.loadOne", {id: that.id}).then((res) => {
					that.product = res.product;
					that.specsList = res.specsList;
					that.mediumList = res.mediumList;
					that.price = res.price;
					that.basketCount = res.basketCount;
					
					if(that.specsList.length===1) {that.curSpecs = that.specsList[0]}
					// that.curSpecs = that.specsList[0]
					if(res.favorite) {that.hasFavorite = true;}
				});
			},
			showSpecsDialog: () => {
				that.showSpecs = true;
			},
			closeShow: ()=> {that.showSpecs = false;},
			changeSpecs: (obj) => {
				//console.log(obj);
				that.curSpecs = obj;
			},
			onOpt: function(action) {
				const specs = that.curSpecs;
				const pro = that.product;
				if(!specs) {
					that.showSpecs = true;
				} else {
					if("buy"===action) {
						console.log(specs, pro)
						// const idStr = "_"+specs.id+"_"; //生成
						uni.navigateTo({
							url: "../orders/onPay?ids="+specs.id+"&type=direct"
						})
					} else {
						const obj = {proId: pro.id, proTitle: pro.title, proImg: pro.headImgUrl, amount: 1,
							specsId: specs.id, specsName: specs.name, price: specs.price, oriPrice: specs.oriPrice};
						that.$request.get("miniShoppingBasketService.add2Basket", obj).then((res)=> {
							// console.log(res);
							that.basketCount = that.basketCount + 1; //加入购物车
							uni.showToast({
								title:"添加成功", icon:"success",success() {
									that.showSpecs = false;
								}
							})
						});
					}
				}
				// console.log("=========>"+action, that.curSpecs);
			},
			onFavorite: () => {
				const product = that.product;
				that.$request.get("miniProductFavoriteRecordService.addOrDelete", {proId: product.id, proTitle: product.title, proImg: product.headImgUrl}).then((res) => {
					//console.log(res);
					if(res.action==='save') { that.hasFavorite = true;}
					else {that.hasFavorite = false;}
					uni.showToast({
						title:res.message, icon: 'none'
					})
				});
			},
			gotoBasket: () => {
				uni.switchTab({
					url: "../shoppingBasket/list"
				})
			}
		},
		components: {
			titleComponent,
			carouseComponent,
			detailTitleComponent,
			graceBottomDialog, specsComponent
		}
	}
</script>

<style>
.product-content {
	width:100%;
}

.price-content {
	margin: 8px;
}
.pro-price {
	color:#FF0000; font-size: 18px;
}
.pro-price .logo {
	font-size: 12px; margin-right: 3px;
}
.pro-ori-price {
	font-size: 12px; color:#999; text-decoration: line-through;
}
.pro-fund {
	color:#2e912c; font-size:18px; line-height: 40px; text-align: right; 
}
.fund-value {
	color:#888; font-size: 12px; padding-left: 4px; 
}


.title-content {
	margin: 4px 8px;
}
.sale-mode {
	border-radius: 10px; color:#FFF;
}
.current-product {
	background:#259B24; padding: 3px 6px;
}
.advance-product {
	background:#FD9704; padding: 3px 6px;
}

.advance-remark-view {
	padding: 8px; border-top: 1px #efefef solid; color:#999;
}

.product-title {font-size: 16px; margin-left: 5px; color:#333; line-height: 28px; padding: 3px 0px;}
.product-info {
	margin:8px 8px; color:#aaa;
}
.product-html {
	margin: 10px; line-height: 30px; color:#666; font-size: 16px; font-weight: normal; padding-bottom: 80rpx;
}
text.has-favorite {
	color:#E00101;
}


.choice-view {
	width: 100%; height: 30px; line-height: 100%; border:1px #efefef solid; border-width: 1px 0px 1px 0px;
}
.choice-view .label {
	line-height: 30px; margin-left: 8px; color:#aaa;
}
.choice-view .choice-icon {
	text-align: right; line-height: 30px; margin-right: 8px; color:#aaa;
}
.choice-view .choice-content {
	line-height: 30px; padding: 0px 8px; color:#444;
}

.onloading-view {
	padding-top: 60rpx; text-align: center; color:#AAAAAA; font-size: 14px; 
}
.onloading-view view.grace-icons { font-size: 20px; padding: 10px 0px;}






.grace-grids-items{width:150rpx;}
.grace-grids-icon{height:60rpx; line-height:60rpx; font-size:50rpx; color:#6B7375;}
.grace-grids-text{line-height:30rpx; font-size:20rpx; margin-top:2px; color:#6B7375;}
.grace-footer-active{color:#3688FF !important;}

.grace-grids-items2{padding:6rpx 0; width:120rpx;}
.grace-grids-icon2{height:50rpx; line-height:50rpx; font-size:40rpx; color:#6B7375;}
.grace-grids-text2{line-height:28rpx; font-size:24rpx; margin-top:2px; color:#6B7375;}

</style>
