<template>
	<view>
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-form-item grace-border-b">
				<text class="grace-form-label">您的姓名</text>
				<view class="grace-form-body">
					<input type="text" class="grace-form-input" name="name" placeholder="请填写联系姓名"></input>
				</view>
			</view>
			<view class="grace-form-item grace-border-b">
				<text class="grace-form-label">联系电话</text>
				<view class="grace-form-body">
					<input type="number" maxlength="11" class="grace-form-input" name="phone" placeholder="请填写联系电话"></input>
				</view>
			</view>
			<view class="grace-form-item grace-border-b">
				<text class="grace-form-label">所在地区</text>
				<view class="grace-form-body" @tap="openPicker">
					<input type="text" class="grace-form-input" name="area" :value="area" disabled placeholder="请选择所在地区"></input>
				</view>
			</view>
			<view class="grace-form-item grace-border-b">
				<text class="grace-form-label">详细地址</text>
				<view class="grace-form-body">
					<input type="text" class="grace-form-input" name="street" placeholder="请填写详细地址"></input>
				</view>
			</view>
			<view class="grace-form-item grace-border-b">
				<text class="grace-form-label">设置默认</text>
				<view class="grace-form-body grace-nowrap grace-flex-end">
					<switch name="isDefault" />
				</view>
			</view>
			<view style="padding:30rpx 0;">
				<button formType="submit" type="primary" :disabled="canSubmit" class="grace-button submit-button">提交保存</button>
			</view>
			<graceAddressPicker :show="graceAddressPickerShow" @confirm="pickerConfirm" @close="closePicker" cancelTColor="关闭"></graceAddressPicker>
		</form>
	</view>
</template>
<script>
let that ;
import gracePage from "../../graceUI/components/gracePage.vue";
import graceAddressPicker from '../../graceUI/components/graceAddressPicker.vue';
const  graceChecker = require("@/graceUI/jsTools/graceChecker.js");
export default {
	props: {
		address: {
			type: Object,
			default: function() {return {};}
		},
	},
	data() {
		return {
			graceAddressPickerShow : false,
			area:'',
			addressArea: {},
			canSubmit: false,
		}
	},
	created: function(){
		that = this;
		this.initData();
    },
	methods: {
		reload: function() {
			let page = getCurrentPages().pop();  //跳转页面成功之后
			if (!page) return;  
			page.onLoad(); //如果页面存在，则重新刷新页面
		},
		initData: function() { //初始化
			//console.log(that.paperList);
			const obj = that.applyObj;
			//console.log(obj);
			if(obj && obj.id) {
				//that.initAddress();
			}
		},
		initAddress: function() {
			const obj = that.applyObj;
			const array = obj.addressIndex.split("-");
			if(array) {
				let vals = [];
				array.map((item,index)=>vals[index]=parseInt(item));
				that.cityPickerValueDefault1 = vals;
				///console.log(that.cityPickerValueDefault1);
			}
			if(obj) {
				const cityText = obj.provinceName+"-"+obj.cityName+"-"+obj.countyName;
				that.cityText1 = cityText;
				
				let address = {};
				address.addressIndex = obj.addressIndex;
				address.provinceCode = obj.provinceCode;
				address.provinceName = obj.provinceName;
				address.cityCode = obj.cityCode;
				address.cityName = obj.cityName;
				address.countyCode = obj.countyCode;
				address.countyName = obj.countyName;
				
				that.address = address;
			}
		},
		openPicker : function () {
			this.graceAddressPickerShow = true;
		},
		pickerConfirm : function(e){
			console.log(e);
			const codes = e.codes;
			const indexs = e.indexs;
			const names = e.names;
			const countyCode = codes[2];
			
			const addressArea = {addressIndex: indexs[0]+"-"+indexs[1]+"-"+indexs[2], 
			countyCode: countyCode, countyName: names[2],
			provinceCode: countyCode.substring(0, 2)+"0000", provinceName: names[0],
			cityCode: countyCode.substring(0,4)+"00", cityName: names[1]
			};
			// console.log(addressArea)
			this.addressArea = addressArea;
			this.area = e.names[0]+' '+e.names[1]+' '+e.names[2];
			this.closePicker();
		},
		closePicker : function () {
			this.graceAddressPickerShow = false;
		},
		// 表单提交
		formSubmit : function(e){
			const rule = [
				{ name: "name", checkType: "string", checkRule: "1,10", errorMsg: "联系人应为1-20个字符" },
				{ name: "phone", checkType: "phoneno", checkRule: "", errorMsg: "请正确填写手机号" },
				{ name: "area", checkType: "string", checkRule: "1,100", errorMsg: "请选择所在地区" },
				{ name: "street", checkType: "string", checkRule: "4,100", errorMsg: "请正确填写详细地址" }
			];
			let formData = e.detail.value;
			const checkRes = graceChecker.check(formData, rule);
			if(checkRes){
				that.canSubmit = true;
				Object.assign(formData, that.addressArea);
				formData.isDefault = formData.isDefault?"1":"0";
				//console.log(formData);
				that.$emit("save", formData);
			}else{
				uni.showToast({ title: graceChecker.error, icon: "none" });
			}
		}
	},
	components: {
		gracePage,graceAddressPicker
	}
}
</script>
<style scoped>
	.main-body {
		width:100%;
	}
	.name {
		display: inline-block; font-weight: bold; font-size:14px;
	}
	.title-name {
		width:100%; text-align: center; height:40px; line-height: 40px; font-size: 22px; margin-top: 10px;
	}
	.title-name .name {
		letter-spacing: 0.3em;
	}
	.title-name .status {
		display: inline-block; color:#FFF;
	}
	.title-name .status text {
		color:#FFF; font-size:14px;
	}
	.submit-button {
		background:#FD9704; height: 35px; line-height:35px; letter-spacing: 10rpx; border-radius: 1px; font-size: 14px;
	}
</style>