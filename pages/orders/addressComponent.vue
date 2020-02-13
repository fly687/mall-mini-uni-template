<template>
	<view>
		<view class="default-address-view grace-nowrap" @tap="onClick">
			<view class="grace-icons icon-address address-logo"></view>
			<view class="grace-flex1" v-if="address && address.id">
				<view class="address-name">
					<text class="name">{{address.name}}</text>
					<text class="phone">{{address.phone}}</text>
				</view>
				<view class="address-con">
					{{address.provinceName}}{{address.cityName}}{{address.countyName}}{{address.street}}
				</view>
			</view>
			<view class="grace-flex1 no-address" v-if="!address || !address.id">
				选择收货地址
			</view>
			<view class="grace-icons icon-arrow-right right-logo"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		address: {
			type: Object,
			default: function() {return {};}
		}
	},
	data() {
		return {
			
		}
	},
	methods: {
		onClick: function() {
			this.$emit("selectAddress")
		}
	}
}
</script>

<style>
.default-address-view {
	background:#FFF; border-radius: 10px; padding: 8px 10px;
}
.address-logo {
	width: 60px; justify-content: center; text-align: center; font-size: 30px; color:#F37B1D;
	flex-shrink:0; display:flex; align-items:center; 
}
.right-logo {
	flex-shrink:0; display:flex; align-items:center; padding: 0px 5px;
}
.address-name .name {
	font-size: 14px; font-weight: bold; color:#555;
}
.address-name .phone {
	font-size: 12px; font-weight: normal; color:#aaa; padding-left: 8px;
}
.address-con {
	font-size: 12px; line-height: 22px; color:#999;
}
.no-address {
	line-height: 50px; color:#888;
}
</style>
