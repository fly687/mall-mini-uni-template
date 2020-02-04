<template>
	<view>
		<view class="zsl-remark" v-if="!applyObj">
			共享经济就是把身边的有限资源进行无限扩大并实现变现的一种生活方式。
		</view>
		<view class="zsl-alter zsl-alter-error" v-if="(applyObj && applyObj.status==='2')">
			驳回原因：{{verifyList[0].content}}
			<p>请修改后重新提交审核</p>
		</view>
		<form @submit="formSubmit" class="grace-form grace-margin-top" >
			<view class="grace-items">
				<view class="grace-label">联系姓名</view>
				<input type="text" class="input" name="name" v-model="applyObj.name" placeholder="请填写联系姓名"></input>
			</view>
			<view class="grace-form-item grace-border-b">
				<text class="grace-form-label">性别</text>
				<view class="grace-form-body">
					<picker class="grace-form-picker" @change="sexChange" :value="sexIndex" :range="sex" range-key="name" name="sex">
						<text class="grace-text">{{sex[sexIndex].name}}</text>
						<text class="grace-icons icon-arrow-down" style="margin-left:5px;"></text>
					</picker>
				</view>
			</view>
			<view class="grace-form-item grace-border-b">
				<text class="grace-form-label">有无经验</text>
				<view class="grace-form-body">
					<picker class="grace-form-picker" @change="experienceChange" :value="expIndex" :range="experience" range-key="name" name="hasExperience">
						<text class="grace-text">{{experience[expIndex].name}}</text>
						<text class="grace-icons icon-arrow-down" style="margin-left:5px;"></text>
					</picker>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">联系电话</view>
				<input type="text" class="input" v-model="applyObj.phone" name="phone" placeholder="请填写联系电话"></input>
			</view>
			<view class="grace-items">
				<view class="grace-label">身份证号</view>
				<input type="text" class="input" v-model="applyObj.identity" name="identity" maxlength="18" placeholder="请填写身份证号"></input>
			</view>
			<view class="grace-items">
				<view class="grace-label">所在地区</view>
				<view @click="cityPicker1" class="other">
					{{cityText1}}
					<text class="grace-icons icon-arrow-right"></text>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">详细地址</view>
				<input type="text" class="input" name="street" v-model="applyObj.street" placeholder="请填写详细地址"></input>
			</view>
			
			<view class="grace-idcard-main">
				<view class="grace-idcard-text">
					身份证照片 ( 个人信息面 )
				</view>
				<view class="grace-idcard-items">
					<view class="img">
						<image :src="idFront"  @tap="selectImg1" @longtap="previewImg1" mode="widthFix"></image>
					</view>
				</view>
				<view class="grace-idcard-text">
					身份证照片 ( 国徽图案面 )
				</view>
				<view class="grace-idcard-items">
					<view class="img">
						<image :src="idBack"  @tap="selectImg2" @longtap="previewImg2" mode="widthFix"></image>
					</view>
				</view>
			</view>
			
			<view style="padding:30rpx 0;">
				<button formType="submit" type="primary" class="grace-button grace-border-radius">提交申请</button>
			</view>
		</form>
		<mpvue-city-picker 
			:themeColor="themeColor" ref="mpvueCityPicker1" 
			:pickerValueDefault="cityPickerValueDefault1" 
			@onConfirm="onConfirm1">
		</mpvue-city-picker>
	</view>
</template>
<script>
let _self ;
const frontName = "身份证正面", backName = "身份证背面";
import mpvuePicker from '@/graceUI/threeComponents/mpvuePicker.vue';
import mpvueCityPicker from '@/graceUI/threeComponents/mpvueCityPicker.vue';
const  graceChecker = require("@/graceUI/jsTools/graceChecker.js");
export default {
	props: {
		curObj: {
			type: Object,
			default: function() {return {};}
		},
		verifyList: {
			type: Array,
			default: function() { return [];}
		},
		paperList: {
			type: Array,
			default: function(){return [];}
		}
	},
	data() {
		return {
			themeColor: '#007AFF', //颜色 
			cityText1 : "请选择所在地区", //文本
			cityPickerValueDefault1 : [0,0,1], //默认选项
			// city1 : null, //客户选择城市后保存的城市数据
			address: null,
			idFront : '../../../static/common/idcard1.png',
			idBack : '../../../static/common/idcard2.png',
			hasFront: false, //是否选择正面
			hasBack: false, //是否选择背面
			hasModifyFront: false, //是否已经修改正面
			hasModifyBack: false, //是否已修改背面
			
			sex : [{name: '男', key: "1"}, {name:'女',key:"2"}],
			sexIndex : -1,
			experience : [{name:'无经验',key:"0"}, {name:'做过微商或实体', key:"1"}],
			expIndex : -1,
			applyObj: {}
		}
	},
	created: function(){
		_self = this;
		this.applyObj = this.curObj;
		this.initData();
    },
	methods: {
		reload: function() {
			let page = getCurrentPages().pop();  //跳转页面成功之后
			if (!page) return;  
			page.onLoad(); //如果页面存在，则重新刷新页面
		},
		initData: function() { //初始化
			//console.log(_self.paperList);
			const obj = _self.applyObj;
			//console.log(obj);
			if(obj && obj.id) {
				_self.paperList.map((item)=> { //照片处理
					if(item.fileName===frontName) {_self.idFront = item.filePath; _self.hasFront = true;}
					if(item.fileName===backName) {_self.idBack = item.filePath; _self.hasBack = true;}
				});
				_self.sex.map((item, index)=> {if(obj.sex===item.key) {_self.sexIndex = index;}});
				_self.experience.map((item, index)=> {if(obj.hasExperience===item.key) {_self.expIndex = index;}});
				_self.initAddress();
			}
		},
		initAddress: function() {
			const obj = _self.applyObj;
			const array = obj.addressIndex.split("-");
			if(array) {
				let vals = [];
				array.map((item,index)=>vals[index]=parseInt(item));
				_self.cityPickerValueDefault1 = vals;
				///console.log(_self.cityPickerValueDefault1);
			}
			if(obj) {
				const cityText = obj.provinceName+"-"+obj.cityName+"-"+obj.countyName;
				_self.cityText1 = cityText;
				
				let address = {};
				address.addressIndex = obj.addressIndex;
				address.provinceCode = obj.provinceCode;
				address.provinceName = obj.provinceName;
				address.cityCode = obj.cityCode;
				address.cityName = obj.cityName;
				address.countyCode = obj.countyCode;
				address.countyName = obj.countyName;
				
				_self.address = address;
			}
		},
		// 表单提交
		formSubmit : function(e){
			let formData = e.detail.value;
			if(formData.sex===-1) {
				uni.showToast({title:"请选择性别", icon:"none"});
				return false;
			}
			if(formData.hasExperience===-1) {
				uni.showToast({title:"请选择经验", icon:"none"});
				return false;
			}
			
			formData.sex = _self.sex[formData.sex].key;
			formData.hasExperience = _self.experience[formData.hasExperience].key;
			//console.log(formData);
			if(this.address == null){
				uni.showToast({title:"请选择地区", icon:"none"});
				return false;
			}
			const rule = [
				{ name: "name", checkType: "string", checkRule: "1,10", errorMsg: "联系人应为1-20个字符" },
				{ name: "phone", checkType: "phoneno", checkRule: "", errorMsg: "请正确填写手机号" },
				{ name: "street", checkType: "string", checkRule: "5,100", errorMsg: "请正确填写详细地址" },
				{ name: "identity", checkType: "string", checkRule: "18,18", errorMsg: "请输入18位身份证号"}
			];
			
			Object.assign(formData, _self.address);
			//console.log(formData);
			//formData.city1 = _self.city1.cityCode; //此处以保存用户城市代码为例
			const checkRes = graceChecker.check(formData, rule);
			if(checkRes){
				if(_self.hasFront && _self.hasBack) {
					uni.showToast({title:"验证通过，正在提交", icon:"none"});
					formData.id = _self.applyObj.id;//如果是修改则有ID
					let uploadPaths = [];
					if(_self.hasModifyFront) {uploadPaths.push({name: frontName, url: _self.idFront});}
					if(_self.hasModifyBack) {uploadPaths.push({name: backName, url: _self.idBack});}
					
					_self.uploadImgs(uploadPaths).then((data) => {
						///console.log(data);
						formData.papers = data;
						const apiCode = (formData.id && formData.id>0)?"miniAgentService.updateAgent":"miniAgentService.addAgent"
						_self.$request.get(apiCode, formData).then((res)=> {
							//console.log(res);
							_self.reload();
						})
					})
				} else {
					uni.showToast({ title: "请上传身份证照片", icon: "none" });
				}
			}else{
				uni.showToast({ title: graceChecker.error, icon: "none" });
			}
		},
		uploadImgs: function(paths, callback) {
			if(paths && paths.length>0) {
				return _self.uploadSingle(paths, 0, []);
			} else {return new Promise((resolve,reject)=>{resolve([]);});}
		},
		uploadSingle: function(paths, index, result) {
			let obj = paths[index++];
			//console.log(obj);
			return _self.$request.upload(obj.url, {objClassName: "agent", "width":"500"}).then((res)=>{
				Object.assign(obj, res[0]);
				//console.log(obj);
				result.push(obj);
				if(index===paths.length) {return result;}
				else {
					return _self.uploadSingle(paths, index, result);
				}
			});
		},
		uploadImg: function(path, callback) {
			console.log(path)
			let p = new Promise((resolve, reject)=> {
				_self.$request.upload(path, {objClassName: "agent", "width":"500"}).then((res)=>{resolve(res)});
			});
			return p;
		},
		sexChange:function(e){
			//console.log(e);
			this.sexIndex = e.detail.value;
		},
		experienceChange: function(e) {
			//console.log(e)
			this.expIndex = e.detail.value;
		},
		cityPicker1 : function(){
			this.$refs.mpvueCityPicker1.show();
		},
		onConfirm1(e) {
			const code = e.cityCode;
			const labels = e.label.split("-");
			const addressIndex = e.value.join("-");
			//console.log(addressIndex);
			
			let address = {};
			address.addressIndex = addressIndex;
			address.provinceCode = code.substring(0,2)+"0000";
			address.provinceName = labels[0];
			address.cityCode = code.substring(0,4)+"00";
			address.cityName = labels[1];
			address.countyCode = code;
			address.countyName = labels[2];
			
			this.address = address;
			
			const cityText1  = e.label;
			const cityValue1 = e.value;
			// var cityCode1  = e.cityCode;
			//console.log(cityText1, cityValue1, cityCode1);
			this.cityText1 = cityText1;
			this.cityPickerValueDefault1 = cityValue1;
			//this.city1 = e;
		},
		
		selectImg1 : function() { //选择正面
			uni.chooseImage({
				count:1,
				success:function(res){
					_self.idFront = res.tempFilePaths[0];
					_self.hasFront = true;
					_self.hasModifyFront = true;
				}
			})
		},
		selectImg2 : function() { //选择背面
			uni.chooseImage({
				count:1,
				success:function(res){
					_self.idBack = res.tempFilePaths[0];
					_self.hasBack = true;
					_self.hasModifyBack = true;
				}
			})
		},
		previewImg1 : function(){
			if(_self.hasFront) {
				uni.previewImage({
					urls:[_self.idFront]
				});
			} else {
				_self.selectImg1();
			}
		},
		previewImg2 : function(){
			if(_self.hasBack) {
				uni.previewImage({
					urls:[_self.idBack]
				});
			} else {
				_self.selectImg2();
			}
		},
	},
	components: {
		mpvuePicker,
		mpvueCityPicker,
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
</style>