<template>
	<view class="grace-body">
		<graceImmersedStatusbar bgColor="#F5F6F7"></graceImmersedStatusbar>
		<view class="grace-line-title" style="margin-top:40rpx;">
		</view>
		<!-- 购物车为空 -->
		<view v-if="shoppingCard.length < 1" style="margin-top:100px;">
			<emptyCompent optMsg="去购物" message="你的购物车空空如也~" @onClick="gotoIndex"></emptyCompent>
		</view>
		<!-- 购物车为空 -->
		
		<!-- 购物车主结构  -->
		<view class="grace-shoppingcard" v-for="(item, index) in shoppingCard" :key="index">
			<view style="height:25rpx;"></view>
			<view class="grace-shoppingcard-goods" >
				<view class="grace-shoppingcard-goods-checkbtn">
					<graceCheckBtn :checked="checkSelected(item)" @change="itemChange" 
					:parameter="[item]"></graceCheckBtn>
				</view>
				<image :src="item.proImg" @tap="showProduct(item.proId)" class="grace-shoppingcard-goods-image" mode="widthFix"></image>
				<view class="grace-shoppingcard-goods-body">
					<view class="grace-shoppingcard-goods-title"><text class="specs-name">[{{item.specsName}}]</text>{{item.proTitle}}</view>
					<view class="grace-space-between">
						<view class="grace-shoppingcard-goods-price">
							<text class="price">￥{{item.price}}</text>
							<text class="ori-price">￥{{item.oriPrice}}</text>
						</view>
						<view class="grace-shoppingcard-goods-number">
							<graceNumberBox :disabled="true" :index="index" :datas="item.id" inputPadding="5rpx" 
							:value="item.amount" :maxNum="100" :minNum="1" v-on:change="numberChange"></graceNumberBox>
						</view>
					</view>
					<text class="grace-shoppingcard-remove grace-icons icon-remove" 
					@tap="removeGoods([item.id])" :id="'removeIndex_' + index">删除</text>
				</view>
			</view>
		</view>
		
		<view style="height:120rpx;"></view>
		<!-- 底部  -->
		<view slot="gFooter" class="footer-main grace-nowrap grace-flex-vcenter grace-border-t" style="background-color:#FFFFFF;">
			<view class="grace-shoppingcard-checkbtn grace-nowrap grace-flex-vcenter">
				<graceCheckBtn  @change="itemChangeAll">
					<text class="grace-text">{{selectText}}</text>
				</graceCheckBtn>
			</view>
			<view class="grace-shoppingcard-count grace-nowrap grace-flex-vcenter">
				<text class="grace-text">合计 :</text>
				<text style="font-size:32rpx; color:#F00;">￥{{totalprice}}</text>
			</view>
			<view class="grace-shoppingcard-checkout grace-bg-red" @tap="checkout">结算</view>
			<view class="grace-shoppingcard-checkout" style="background:#eee; color:#666;" @tap="deleteBatchBasket">删除</view>
		</view>
	</view>
</template>
<script>
var that;
import gracePage from "../../graceUI/components/gracePage.vue";
import graceCheckBtn from '../../graceUI/components/graceCheckBtn.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';

import emptyCompent from "@/components/emptyComponent.vue"
export default {
	data() {
		return {
			// 总价
			totalprice : '0',
			// 选择文本
			selectText : '全不选',
			// 购物车数据 可以来自 api 请求或本地数据
			shoppingCard : [],
			selectedBasket: [], //选择的数据
		}
	},
	onLoad : function(){
		that = this;
		// 初始化时候计算总价，如果使用api 获取购物车项目在 api 请求完成后执行此函数
		this.countTotoal();
		this.loadData();
	},
	onShow:function(){
		this.loadData();
	},
	methods:{
		loadData: function() {
			this.$request.get("miniShoppingBasketService.listBasket", {}).then((res)=> {
				//console.log(res);
				that.shoppingCard = res.basketList;
			});
		},
		showProduct: function(id) {
			uni.navigateTo({
				url: '../product/show?id='+parseInt(id)
			});
		},
		//计算总计函数
		countTotoal:function(){
			const selectedBasket = that.selectedBasket;
			let total = 0;
			selectedBasket.map((item)=> {
				total += (item.amount*item.price);
			});
			this.totalprice = total;
		},
		numberChange:function(data){ //修改数量
			// console.log(data);
			const amount = data[0]; const id = Number(data[2]);
			
			that.$request.get("miniShoppingBasketService.updateAmount", {id: id, amount: amount}).then((res)=> {
				// console.log(res)
				if(res.isOut) {uni.showToast({
					title: "库存不足", icon:"none"
				})}
				const resAmount = res.amount;
				let newBasketList = [];
				that.shoppingCard.map((item)=> {if(item.id===id) {item.amount = resAmount;} newBasketList.push(item);});
				that.shoppingCard = newBasketList;
				
				// console.log(that.shoppingCard)
				
				let newSelect = [];
				that.selectedBasket.map((item)=> {if(item.id===id) {item.amount = resAmount;} newSelect.push(item);});
				that.selectedBasket = newSelect;
				
				//计算总价
				this.countTotoal();
			});
			// this.shoppingCard[data[2]].items[data[1]].count = data[0];
		},
		
		deleteBatchBasket: function() {
			let ids = [];
			that.selectedBasket.map((obj)=>{
				ids.push(obj.id);
			});
			if(ids.length>0) {
				this.removeGoods(ids);	
			} else {
				uni.showToast({ title: "请先选择", icon:'none' })
			}
		},
		checkSelected: function(item) {
			let res = false;
			that.selectedBasket.map((obj)=>{
				if(obj.id===item.id) {res = true;}
			});
			//console.log(item.specsName, res)
			return res;
		},
		removeGoods : function(ids){
			//console.log(ids);
			wx.showModal({
				title: '确认提醒',
				content: '您确定要移除此商品吗？',
				success:function(e){
					if (e.confirm) {
						that.$request.get("miniShoppingBasketService.deleteBasket", {ids: ids}).then((res)=> {
							// console.log(res);
							uni.showToast({
								title: res.message, icon:'none'
							});
							let basketList = that.shoppingCard;
							ids.map((id)=> {basketList.splice(basketList.findIndex(item => item.id === id), 1)})
							// console.log(basketList);
							that.shoppingCard = basketList;
							
							that.countTotoal();
						})
						//计算总价
						// that.countTotoal();
					}
				}
			})
		},
		checkout:function(){
			const selectedBasket = that.selectedBasket;
			console.log(selectedBasket);
			if(selectedBasket.length<=0) {
				uni.showToast({
					title: '请先选择要结算的产品',
					icon : "none"
				})
			} else {
				let idStr = "_";
				selectedBasket.map((item)=> {idStr += (item.id+"_");});
				uni.navigateTo({
					url: "../orders/onPay?ids="+idStr+"&type=basket"
				})
			}
		},
		// 商品选中
		itemChange : function (data) {
			// console.log(data);
			const selected = data[0];
			const obj = data[1][0];
			// console.log(selected, obj);
			let selectedBasket = that.selectedBasket;
			if(selected) {
				selectedBasket.push(obj);
			} else {
				selectedBasket.splice(selectedBasket.findIndex(item => item.id === obj.id), 1);
			}
			that.selectedBasket = selectedBasket;
			
			this.countTotoal();
		},
		itemChangeAll : function (e) {
			const selected = e[0];
			this.selectText = selected ? '全不选' : '全选';
			if(selected) {
				that.selectedBasket = that.shoppingCard;
			} else {that.selectedBasket = [];}
			this.countTotoal();
		},
		
		gotoIndex: function() {
			/* uni.switchTab({
				url: '../index/index'
			}); */
			uni.navigateTo({
				url:"../product/listProduct"
			})
		},
	},
	components:{
		gracePage,
		graceNumberBox,
		graceCheckBtn,
		emptyCompent
	}
}
</script>
<style>
.footer-main {
	position: fixed; bottom: 0rpx; left:0; width:100%; z-index: 10;
}
.ori-price {font-size: 24rpx; color:#AAAAAA; text-decoration: line-through; padding-left: 10rpx; padding-top: 10rpx;}
.specs-name {color:#AAAAAA}	

	
page{background:#F8F8F8;}
.empty-view{width:280rpx; height:280rpx; border-radius:280rpx; background-color:#F6F7F8; margin-top:30rpx;}
.empty-img{width:220rpx; height:200rpx; margin:40rpx; border-radius:200rpx;}
.grace-shoppingcard{background:#FFFFFF; border-radius:8rpx; padding:20rpx; margin-bottom:20rpx;}
.grace-shopp-name{width:500rpx;}
.grace-shopp-go{width:120rpx;}
.grace-shoppingcard-goods{margin:10rpx 0; display:flex; flex-wrap:nowrap;}
.grace-shoppingcard-goods-checkbtn{width:60rpx; flex-shrink:0;}
.grace-shoppingcard-goods-image{width:120rpx; margin-right:20rpx; flex-shrink:0;}
.grace-shoppingcard-goods-body{width:100%;}
.grace-shoppingcard-goods-title{line-height:1.4em;}
.grace-shoppingcard-goods-price{color:#F00; font-size:32rpx; display:flex; flex-wrap:nowrap; justify-content:space-between; margin-top: 15rpx;}
.grace-shoppingcard-goods-number{padding:2px 0;}
.grace-shoppingcard-remove{display:block; text-align:right; line-height:50rpx; margin-top:30rpx; color:#CCCCCC; font-size:24rpx;}
.grace-shoppingcard-checkbtn{width:200rpx; margin-left:50rpx; flex-shrink:0;}
.grace-shoppingcard-count{width:600rpx;}
.grace-shoppingcard-checkout{width:140rpx; height:100rpx; line-height:100rpx; font-size:28rpx; text-align:center; flex-shrink:0;}
</style>