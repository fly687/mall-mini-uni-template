<template>
	<view class="grace-number-box" :style="{width:width}">
		<view class="grace-number-box-doBtn" @tap.stop="reduce" 
		:style="{width:btnSize, height:btnSize, fontSize:btnFontSize, lineHeight:btnSize, color:btnColr}">-</view>
		<input class="grace-number-box-input" type="number" 
		:value="inputNumber" :disabled="disabled" @blur="blur" 
		:style="{background:inputBG, height:inputHeight, lineHeight:inputHeight, fontSize:inputFontSize, color:inputColor, padding:inputPadding, borderRadius:inputBorderRadius}"></input>
		<view class="grace-number-box-doBtn" @tap.stop="add" 
		:style="{width:btnSize, height:btnSize, fontSize:btnFontSize, lineHeight:btnSize, color:btnColr}">+</view>
	</view>
</template>
<script>
export default {
	name: "graceNumberBox",
	props: {
		disabled :{
			type : Boolean,
			default : false
		},
		value : {
			type : Number,
			default : 0 
		},
		index : {
			type : Number,
			default : 0
		},
		maxNum:{
			type: Number,
			default: 999999
		},
		minNum: {
			type: Number,
			default: 0
		},
		datas:{
			type: String,
			default: ''
		},
		btnSize : {
			type : String,
			default : '60rpx'
		},
		btnFontSize : {
			type : String,
			default : '36rpx'
		},
		btnColr : {
			type : String,
			default : '#666666'
		},
		inputHeight : {
			type : String,
			default : '30rpx'
		},
		inputFontSize : {
			type : String,
			default : '26rpx'
		},
		inputColor : {
			type : String,
			default : '#333333'
		},
		inputBG : {
			type : String,
			default : '#F6F7F8'
		},
		inputPadding : {
			type : String,
			default : '10rpx'
		},
		inputBorderRadius : {
			type : String,
			default : '8rpx'
		},
		width:{
			type : String,
			default : '200rpx'
		}
	},
	data() {
		return {
			inputNumber: this.value
		}
	},
	watch:{
		value (val){
			this.inputNumber = val;
		},
		inputNumber (val){
			val = Number(val);
			if(val > this.maxNum){val = this.maxNum; this.inputNumber = val;}
			if(val < this.minNum){val = this.minNum; this.inputNumber = val;}
			this.$emit('change', [val, this.index, this.datas]);
		}
	},
	methods: {
		add : function(){
			var newVal = this.inputNumber + 1;
			this.inputNumber = Number(newVal);
		},
		reduce: function () {
			var newVal = this.inputNumber - 1;
			this.inputNumber = newVal;
		},
		blur : function(e){
			this.inputNumber = Number(e.detail.value);
		}
  }
}
</script>
<style scoped>
.grace-number-box{display:flex; overflow:hidden; flex-wrap:nowrap; align-items:center;}
.grace-number-box-doBtn{text-align:center; color:#666666; flex-shrink:0;}
.grace-number-box-input{text-align:center; width:700rpx;}
</style>