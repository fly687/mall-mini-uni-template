<template>
	<view class="coupon-main" @tap="onClick(coupon.status, coupon.proId)">
		<view class="left-part" :class="['left-part-'+coupon.status]">
			<view class="worth">￥{{coupon.worth}}</view>
			<view class="reach-money">满{{coupon.reachMoney}}可用</view>
		</view>
		<view class="right-part">
			<view class="body">
				<view class="coupon-name">{{coupon.couponName}}</view>
				<view class="coupon-remark">{{coupon.remark}}</view>
				<view class="coupon-day">{{coupon.endTime}}前有效</view>
			</view>
			<view class="status">
				<text :class="['coupon-status-'+coupon.status]">{{buildStatus(coupon.status)}}</text>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		coupon : {
			type : Object,
			default :  function  () {
				return {}
			}
		}
	},
	methods: {
		buildStatus: function(status) {
			let res = "已过期";
			if(status==='1') {res = "立即使用";}
			else if(status==='2') {res = "已过期";}
			else if(status==='3') {res = "已使用";}
			return res;
		},
		onClick: function(status, proId) {
			if(status==='1') {
				this.$emit("onClick", proId);
			}
		},
	},
}
</script>
<style scoped>
.coupon-main {
	width:100%; height: 90px;
	display:flex; flex-wrap:nowrap;
}
.left-part {
	width: 80px; height:90px; color:#FFF;
	background-size: 200px 12px; flex-wrap:wrap;
	background-position: 0 0, 200px 0;
	background-repeat-x: no-repeat;
	flex-shrink:0; display:flex; align-items:center; justify-content:center; color:#FFF;
}
.left-part-1 {
	background-image: radial-gradient(
	  circle at 1px 8px,
	  transparent 3px,
	  #fd9704 3px,
	  #fd9704 0px
	),
	radial-gradient(
	  circle at 199px 8px,
	  transparent 3px,
	  #fd9704 3px,
	  #fd9704 0px
	);
}
.left-part-2 {
	background-image: radial-gradient(
	  circle at 1px 8px,
	  transparent 3px,
	  #e8e8e8 3px,
	  #e8e8e8 0px
	),
	radial-gradient(
	  circle at 199px 8px,
	  transparent 3px,
	  #e8e8e8 3px,
	  #e8e8e8 0px
	);
	text-decoration: line-through;
	color:#999;
}
.left-part-3 {
	background-image: radial-gradient(
	  circle at 1px 8px,
	  transparent 3px,
	  #e8e8e8 3px,
	  #e8e8e8 0px
	),
	radial-gradient(
	  circle at 199px 8px,
	  transparent 3px,
	  #e8e8e8 3px,
	  #e8e8e8 0px
	);
}
.left-part .worth {
	font-weight: 700; font-size:28px; width:100%; text-align: center; line-height: 35px; margin-top: 10px;
}
.left-part .reach-money {
	font-size: 12px; width:100%; text-align: center; margin-top: -30px; 
}
.right-part {
	display:flex; justify-content:space-between; background: #FFF; height: 90px; width:100%;
	border-radius: 5px; margin-left: -5px;
}
.right-part .body {
	justify-content:space-between;
}
.right-part .status {
	width:50px; border-left:2px #eee dotted; height: 40px; margin-top: 25px;
	font-size:12px; display:flex; align-items:center; text-align: center; color:#ddd;
}
.right-part .status text {
	margin-left: 5px;
}
.coupon-status-1 { //可使用
	color:#fd9704;
}
.coupon-status-2 { //已过期
	color:#ddd; text-decoration: line-through;
}
.coupon-status-3 { //已使用
	color:#ddd;
}
.right-part .body {
	justify-content:space-between; padding: 10px 5px; position: relative; width:100%;
}
.right-part .body .coupon-name {
	font-size: 16px; color:#333; font-weight: bold; padding-bottom: 3px;
}
.right-part .body .coupon-remark {
	font-size: 12px; color:#999; line-height: 20px;
}
.right-part .body .coupon-day {
	font-size: 12px; color:#aaa; position: absolute;bottom: 3px;
}
	
	
	
.grace-coupons{display:flex; flex-wrap:nowrap; border-top-left-radius:10rpx; border-bottom-left-radius:10rpx; border:1px red solid;}
.grace-coupons .left{width:100%; height:150rpx; padding-right:10rpx; display:flex; justify-content:space-between; align-items:center; border-radius:8rpx; position:relative;}
.grace-coupons .left .number{width:32%; display:flex; flex-wrap:wrap; border-right:1px dashed #D2D2D2;}
.grace-coupons .left .number .show{font-size:50rpx; font-weight:700; line-height:66rpx; text-align:center; width:100%;}
.grace-coupons .left .number text{color:#828282; font-weight:400; font-size:50rpx;}
.grace-coupons .left .number .txt{line-height:26rpx; font-size:22rpx; text-align:center; width:100%;}
.grace-coupons .left .body{width:62%; margin-left:4%; display:flex; flex-wrap:wrap; position:relative;}
.grace-coupons .left .status{display:inline-block; color:#FFFFFF; padding:0 10px; height:36rpx; line-height:36rpx; font-size:20rpx; position:absolute; z-index:1; right:6px; top:8px; border-radius:36rpx;}
.grace-coupons .left .body .title{width:100%; font-size:30rpx; line-height:46rpx;}
.grace-coupons .left .body .desc{color:#999999; margin-top:3px; font-size:24rpx; line-height:36rpx;}
.grace-coupons .right{width:150rpx; height:150rpx; flex-shrink:0; font-size:30rpx; display:flex; align-items:center; justify-content:center; color:#FFF;}
.grace-coupons .sawtooth{width:8px; height:150rpx; overflow:hidden; position:relative; flex-shrink:0;}
.grace-coupons .sawtooth .circular{width:10px; margin:5px; height:10px; border-radius:10px; background:#F9F9F9;}
</style>