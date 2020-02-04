<template>
	<view class="gui-search" :style="{height:height, backgroundColor:background}">
		<view class="gui-search-icon grace-icons icon-search" 
		:style="{color:iconColor, fontSize:iconFontSize, lineHeight:height, width:iconWidth}"></view>
		<input type="text" class="gui-search-input" value="" :placeholder="placeholder" v-model="inputVal" 
		:style="{height:inputHeight, lineHeight:inputHeight, fontSize:inputFontSize}" 
		@input="inputting" @confirm="confirm" confirm-type="search" />
		<view class="gui-search-icon grace-icons icon-close" v-if="inputVal.length > 0" @tap.stop="clearKwd" 
		:style="{color:iconColor, fontSize:iconFontSize, lineHeight:height, width:iconWidth}"></view>
	</view>
</template>
<script>
export default{
	props:{
		height:{type:String, default:'60rpx'},
		background:{type:String, default:'#FFFFFF'},
		fontSize:{type:String, default:'28rpx'},
		iconWidth:{type:String, default:'60rpx'},
		iconColor:{type:String, default:'#A5A7B2'},
		iconFontSize:{type:String, default:'30rpx'},
		inputHeight:{type:String, default:'30rpx'},
		inputFontSize:{type:String, default:'26rpx'},
		placeholder:{type:String, default:'关键字'},
		kwd:{type:String, default:''}
	},
	data() {
		return {
			inputVal : ''
		}
	},
	created: function (){
		this.inputVal = this.kwd;
	},
	watch:{
		kwd : function(val){
			this.inputVal = val;
		}
	},
	methods:{
		clearKwd : function () {
			this.inputVal = '';
			this.$emit('clear', '');
		},
		inputting : function(e){
			this.$emit('inputting', e.detail.value);
		},
		confirm : function (e) {
			this.$emit('confirm', e.detail.value);
		}
	}
}
</script>
<style scoped>
.gui-search{background:#FFFFFF; border-radius:66rpx; box-sizing:border-box; padding:0 10rpx; display:flex; flex-wrap:nowrap; align-items:center; overflow:hidden;}
.gui-search-icon{text-align:center; flex-shrink:0;}
.gui-search-input{width:600rpx; margin:0 10rpx; border:none; padding:0;}
</style>