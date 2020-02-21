<template>
	<view class="main-container">
		<addressComponent :address="address" @selectAddress="selectAddress"></addressComponent>
		
		<productComponent ref="proComponent" @changeAmount="changeAmount"></productComponent>
		
		<view class="bottom-opts">
			<text class="total-count">共{{totalCount}}件，</text>
			<text class="total-money">合计：￥{{totalMoney}}元</text>
			<text class="pay-submit-btn" @tap="submitOrders">提交订单</text>
		</view>
		
		<view class="coupon-view">
			<view class="single-other-view grace-nowrap" @tap="onShowCoupon">
				<view class="other-title">优惠</view>
				<view class="grace-flex1 other-content">{{curCoupon.couponName}}</view>
				<view class="other-opt">
					<view class="other-opt-value" v-if="curCoupon.worth">-￥{{curCoupon.worth}}元</view>
					<view class="grace-icons icon-arrow-right right-logo"></view>
				</view>
			</view>
			
			<view class="single-other-view grace-nowrap">
				<view class="other-title">备注</view>
				<view class="grace-flex1 other-content">
					<input placeholder="选填,可输入一些备注信息" @input="onChangeRemark"/>
				</view>
			</view>
		</view>
		
		<graceBottomDialog :show="showCoupon" v-on:closeDialog="closeShow">
			<view slot="content">
				<view class="grace-select-tags">
					<view class="select-header">
						优惠详情
					</view>
					<view class="grace-select-tag" 
					@tap.stop="couponSelectChange(item)" v-for="(item, index) in couponList" :key="index" 
					:class="[item.id===curCoupon.id? 'selected-item':'']">
						<view><text class="select-name">{{item.couponName}}</text>
						<text v-if="item.worth" class="select-ori-price">满{{item.reachMoney}}减</text><text v-if="item.worth" class="select-price">￥ {{item.worth}} 元</text></view>
						<view><text class="select-remark">{{item.remark}}</text></view>
					</view>
					<view class="coupon-bottom-opts grace-nowrap">
						<view class="single-opt join-shop grace-flex1" @tap="closeShow">完成</view>
					</view>
				</view>
			</view>
		</graceBottomDialog>
	</view>
</template>

<script>
var that;
import addressComponent from "./addressComponent.vue";
import productComponent from "./productComponent.vue";
import graceBottomDialog from '@/graceUI/components/graceBottomDialog.vue';
import common from "@/common/common.js";
export default {
	data() {
		return {
			ids: "", //购物车ID数据
			address: {}, //默认地址
			basketList: [], //购物车列表，如果是购物车购买则此数组不为空
			specsList: [], //产品列表
			couponList: [], //优惠券列表
			productList: [], //产品列表，如果是直接购买则此数组不为空
			query: {}, //参数
			totalCount: 0, //总数量
			totalMoney: 0, //总金额
			
			ordersKey: '', //订单密钥
			curCoupon: {}, //当前选择的优惠券
			showCoupon: false, //是否打开优惠券
			
			remark: '', //提交订单时的参数
			// couponMoney: '', //优惠金额
			// couponId: 0, //优惠券ID
			// couponName: '无优惠', //优惠券名称
		}
	},
	onLoad(options) {
		console.log(options)
		that = this;
		that.query = options;
		that.loadData();
		that.tempSaveData(options.ids);
		that.curCoupon = that.buildDefaultCoupon();
		that.ordersKey = common.getRandomKey();
	},
	onUnload() {
		//console.log("on Pay unloaded");
		uni.removeStorageSync("zsl-onPayData");
	},
	methods: {
		tempSaveData: function(ids) { //暂存订单数据，用于当修改地址后能正确返回
			uni.setStorageSync("zsl-onPayData", JSON.stringify(that.query));
		},
		loadData: function() {
			this.$request.get("miniOrdersService.onPay", this.query).then((res)=> {
				console.log(res);
				that.basketList = res.basketList;
				that.specsList = res.specsList;
				that.address = res.address;
				that.productList = res.productList;
				that.$refs.proComponent.initData(res.productList);
				//that.buildCount(); //先
				that.rebuidCouponList(res.couponList);
			});
		},
		gotoBack: function() {
			uni.navigateBack();
		},
		submitOrders: function() { //提交订单
			const address = that.address;
			const remark = that.remark;
			const coupon = that.curCoupon;
			const productList = that.productList;
			if(!address || !address.id) {
				uni.showToast({
					title:"请先选择收货地址", icon:"none"
				})
			} else if(productList.length<=0) {
				uni.showToast({
					title:"没有任何产品", icon:"none"
				})
			} else {
				let basketData = "_";
				productList.map((item)=> {
					//console.log(item)
					basketData += (item.proId+"-"+item.specsId+"-"+item.amount+"_");
				});
				
				const data = {
					addressId: address.id,
					remark: remark,
					couponId: coupon.id,
					productData: basketData,
					ordersKey: that.ordersKey, //订单密钥
					agentId: 0, //对应代理ID
				}
				console.log("submitData:::", data);
				that.$request.get("miniOrdersService.submitOrders", data).then((res)=> {
					console.log(res);
				});
			}
		},
		buildDefaultCoupon: function() {
			const c = {id:0, couponName: "不使用", remark: '本次不使用任何优惠券', worth: ''};
			return c;
		},
		rebuidCouponList: function(data) { //增加一项-不使用
			let couponList = [that.buildDefaultCoupon()];
			that.couponList = couponList.concat(data);
			if(data.length>0) { //如果有优惠券，默认使用第一个
				that.curCoupon = data[0];
			}
			that.rebuildMoney(); //设置优惠券后，需要重新统计总金额
			//console.log(that.couponList);
		},
		selectAddress: function() { //重新选择地址
			uni.navigateTo({
				url: "../my/address"
			})
		},
		buildCount: function() { //统计数量
			let totalCount = 0, totalMoney=0;
			that.productList.map((item)=> {
				//console.log(item)
				totalCount += (item.amount);
				totalMoney += (item.amount * item.price);
			});
			that.totalCount = totalCount;
			if(totalMoney<0) {totalMoney = 0;} //如果小于0 则归零
			that.totalMoney = totalMoney;
			
			if(that.totalCount<0) { //如果没有任何数量则返回
				that.gotoBack();
			}
		},
		onChangeRemark: function(e) { //输入备注
			const val = e.detail.value;
			that.remark = val;
		},
		onShowCoupon: function() { //打开优惠券
			that.showCoupon = true;
		},
		closeShow: function() {
			that.showCoupon = false;
		},
		couponSelectChange: function(obj) {
			that.curCoupon = obj;
			that.rebuildMoney();
		},
		rebuildMoney: function() { //重新计算总金额
			that.buildCount(); //重新统计数量和金额
			const curCoupon = that.curCoupon;
			//console.log(curCoupon)
			let totalMoney = that.totalMoney;
			//console.log(totalMoney)
			totalMoney -= curCoupon.worth;
			that.totalMoney = totalMoney;
			//console.log(that.totalMoney)
		},
		changeAmount: function(obj) {
			let data = [];
			this.productList.map((item)=> {
				if(item.key===obj.key) {
					item.amount = obj.amount;
				}
				data.push(item);
			});
			this.productLisst = data;
			this.rebuildMoney();  //重新计算金额
		},
	},
	components: {
		addressComponent,
		productComponent,
		graceBottomDialog
	}
}
</script>

<style>
.main-container {
	background: #F5F5f5; min-height: 100vh; padding: 10px; padding-bottom: 50px; position: relative;
}

.coupon-view {
	background:#FFFFFF; border-radius: 10px; padding: 8px 10px; margin-top:10px;
}

.bottom-opts {
	height: 40px; background:#ffffff; left: 0px; width:100vw; bottom: 0px; position: fixed; line-height: 40px; text-align: right;
}
.pay-submit-btn {
	margin-right: 12px; height: 30px; padding: 8px 10px; margin-left: 10px; border-radius: 15px;
	background: linear-gradient(to left,#ff8104,#fc5302); color:#FFF;
}
.total-count {
	color:#aaa;
}
.total-money {
	color:#de5a29; font-size: 13px;
}

.single-other-view {
	width:100%; padding-bottom: 12px; padding-top: 6px;
}
.single-other-view .other-title {
	font-size: 14px; color:#444; padding-right: 5px;
}
.single-other-view .other-content {
	color:#aaa; font-size: 14px;
}
.single-other-view .other-opt {
	display: flex;
}

.single-other-view .other-opt .other-opt-value {
	color:#F37B1D; font-size: 14px; font-weight: bold;
}
.single-other-view .other-opt .right-logo {
	padding-left: 6px; font-size: 16px;
}










.grace-select-tags{display:flex; flex-direction:row; flex-wrap:wrap;width:100%;font-size:26rpx;}
.grace-select-tag{width: 100%; padding: 8px; line-height:60rpx; margin:10rpx; font-size:24rpx; border-radius:8rpx; background:#F6F7F8;}
.grace-checked{color:#FFFFFF;}
.select-name {color:#333; font-size: 16px; }
.select-remark {color:#aaa; font-size: 12px;}
.select-price {color:#FF0036; font-size: 16px; padding-left: 5px;}
.select-ori-price {color:#aaa; font-size: 12px; padding-left: 5px; }

.select-header {
	width:100%; height: 50px; line-height: 50px; text-align: center; color:#444; font-size: 14px;
}
.coupon-bottom-opts {
	width:100%; height:40px; text-align: center; padding-bottom: 10rpx;
}
.single-opt {
	height: 40px; line-height: 40px; border-radius: 20px; text-align: center; font-size: 14px; font-weight: normal;
}
.join-shop {
	margin: 0px 5px 0px 10px; background:#F37B1D;color:#FFF;
}
.buy-now {
	margin: 0px 10px 0px 5px; background:#259B24;color:#FFF;
}

.selected-item {background:#e76b61;}
.selected-item .select-name {color:#FFF;}
.selected-item .select-remark {color:#ffb2ac;}
.selected-item .select-price {color:#FF0;}
.selected-item .select-ori-price {color:#ffb2ac;}

</style>
