<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="grace-body">
			<addressFormComponent :address="address" @save="onSave"></addressFormComponent>
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
		};
    },
	onLoad(options) {
		console.log(options);
		that = this;
	},
	methods:{
		// 表单提交
		onSave : function(formData){
			console.log(formData);
			that.$request.get("miniCustomAddressService.add", formData).then((res)=> {
				console.log(res);
				uni.showToast({
					title: res.message, icon:"none", success() {
						uni.navigateTo({
							url:"./address"
						})
					}
				})
			});
		}
	},
	components:{gracePage, graceAddressPicker,addressFormComponent}
}
</script>
<style>
</style>