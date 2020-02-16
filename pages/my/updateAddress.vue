<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="grace-body">
			<addressFormComponent ref="addressFormComponent" @deleteAddress="deleteAddress" @save="onSave"></addressFormComponent>
		</view>
	</gracePage>
</template>
<script>
var that;
import addressFormComponent from "./addressFormComponent.vue";	

import gracePage from "../../graceUI/components/gracePage.vue";
import graceAddressPicker from '../../graceUI/components/graceAddressPicker.vue';
var  graceChecker = require("../../graceUI/jsTools/graceChecker.js");
export default {
    data() {
    	return {
			address: {},
			id: 0
		};
    },
	onLoad(options) {
		console.log(options);
		that = this;
		that.id = options.id;
		that.loadData();
	},
	methods:{
		loadData: function() {
			const id = that.id;
			if(id && id>0) {
				that.$request.get("miniCustomAddressService.loadOne", {id:id}).then((res)=> {
					//console.log(res);
					that.address = res.address;
					that.$refs.addressFormComponent.initData(res.address);
				});
			}
		},
		// 表单提交
		onSave : function(formData){
			//console.log(formData);
			that.$request.get("miniCustomAddressService.add", formData).then((res)=> {
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
	components:{gracePage, graceAddressPicker,addressFormComponent}
}
</script>
<style>
</style>