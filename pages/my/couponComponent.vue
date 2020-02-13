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
</style>