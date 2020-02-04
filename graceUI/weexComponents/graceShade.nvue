<template>
	<view class="grace-shade" :style="{backgroundColor:background}" v-if="show" @tap.stop="" @touchmove.stop="">
		<slot></slot>
	</view>
</template>
<script>
export default{
	props:{
		background : {type:String, default:"rgba(0, 0, 0, 0.1)"},
		zIndex : {type:Number, default:1},
		show : {type:Boolean, default:true}
	},
	methods:{}
}
</script>
<style scoped>
.grace-shade{position:fixed; width:750rpx; left:0; top:0; bottom:0; z-index:1; justify-content:center; align-items:center;}
</style>