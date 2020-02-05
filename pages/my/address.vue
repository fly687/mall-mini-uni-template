<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="grace-body">
			<view class="grace-list grace-margin-top" style="padding-bottom: 50px;">
				<view class="single-address-view" :class="[item.isDefault==='1'?'default-address-view':'']" v-for="(item, index) in addressList" :key="index">
					<view class="default-logo" v-if="item.isDefault==='1'"></view>
					<view class="address-body">
						<view class="address-body-title grace-nowrap">
							<text class="address-name grace-flex1">{{item.name}}</text>
							<text class="address-phone grace-flex1">{{item.phone}}</text>
						</view>
						<view class="address-content">{{item.provinceName}}{{item.cityName}}{{item.countyName}}{{item.street}}</view>
					</view>
					<view class="grace-nowrap address-opts">
						<view class="grace-flex1 delete-opt" @tap="opt('delete', item.id)">删除</view>
						<view class="grace-flex1 update-opt" @tap="opt('update', item.id)">修改</view>
					</view>
				</view>
			</view>
			<view class="add-address-main">
				<view class="add-address-view grace-flex1" @tap="addAddress">
					+ 添加新地址
				</view>
			</view>
		</view>
	</gracePage>
</template>
<script>
var that;
import gracePage from "../../graceUI/components/gracePage.vue";
export default {
    data() {
    	return {
			addressList: [],
		};
    },
	onLoad() {
		that = this;
		that.loadData();
	},
	methods:{
		loadData: function() {
			this.$request.get("miniCustomAddressService.list", {}).then((res)=> {
				console.log(res);
				that.addressList = res.addressList;
			});
		},
		addAddress : function(){
		    uni.navigateTo({
		    	url:"./updateAddress?id=0"
		    })
		},
		opt: function(action, id) {
			console.log(action, id)
			if(action==='update') {
				uni.navigateTo({
					url:"./updateAddress?id="+id
				})
			} else if(action==='delete') {
				uni.showModal({
					title:"提示", content: "是否删除此地址", success(res) {
						if(res.confirm) {
							//console.log("删除")
							that.deleteAddress(id);
						}
					}
				})
			}
		},
		deleteAddress: function(id) {
			that.$request.get("miniCustomAddressService.delete", {id: id}).then((res)=> {
				//console.log(res);
				uni.showToast({
					title: res.message, icon:"none", success() {
						uni.redirectTo({
							url:"./address"
						})
					}
				})
			});
		},
	},
	components:{gracePage}
}
</script>
<style>
.add-address-main {position: fixed; left: 0px; bottom: 0px; width:100%; background: #FFF;}
.add-address-main .add-address-view {margin:20rpx; background:#FD9704; color:#FFF; text-align: center; height: 35px; line-height: 35px; border-radius: 3px;}


.single-address-view {
	background:#f6f6f6; border-top: 4px #e0e0e0 solid; margin-bottom: 12px;
}
.default-address-view {
	border-top: 4px #fff7ec solid;background: #fff7ec; position: relative;
}
.address-body {
	margin: 10px;
}
.address-body .address-name {
	font-size: 16px;
}
.address-body .address-phone {
	font-size: 16px;
}
.address-body .address-content {
	font-size: 12px; margin-top: 10px; color:#555;
}
.default-logo {
	position: absolute; right: 0px; top: -4px;
	
	width: 0;
	height: 50px;
	border-top: 20px solid #fd9704;
	border-left: 20px solid transparent;
}

.single-address-view .address-opts {
	height: 35px; line-height: 35px; border-top: 1px #ddd solid; background: #f0f0f0;
}
.address-opts .delete-opt {
	text-align: center; 
}
.address-opts .update-opt {
	text-align: center; border-left: 1px #ddd solid;
}

.default-address-view .address-opts {
	background: #e5e5e5;
}

</style>