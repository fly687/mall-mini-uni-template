<template>
	<view class="grace-btdialog-shade" v-if="show" @tap.stop="closeDialog" @touchmove.stop="stopFun" :style="{backgroundColor:background}">
		<view class="grace-btdialog-shade-dialog" @tap.stop="stopFun">
			<view class="title"><slot name="btns"></slot></view>
			<view class="content" @tap.stop="stopFun"><slot name="content"></slot></view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		show : {
			type : Boolean,
			default : false
		},
		background:{
			type : String,
			default : 'rgba(0, 0, 0, 0.5)'
		}
	},
	data() {
		return {}
	},
	methods:{
		closeDialog : function(){
			this.$emit('closeDialog');
		},
		stopFun : function(){}
	}
}
</script>
<style scoped>
.grace-btdialog-shade{position:fixed; width:750rpx; left:0; top:0; bottom:0; background-color:rgba(0, 0, 0, 0.5);}
.grace-btdialog-shade-dialog{width:750rpx; background-color:#FFFFFF; position:absolute; bottom:0; left:0;}
.grace-btdialog-shade-title{flex-direction:row; flex-wrap:nowrap; justify-content:space-between;}
.grace-btdialog-shade-content{}
</style>