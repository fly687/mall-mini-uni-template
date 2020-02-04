<template>
	<view class="grace-shade" :style="{zIndex:zIndex, background:background}" v-if="show" @tap.stop="" @touchmove.stop="">
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
.grace-shade{position:fixed; width:100%; height:100%; left:0; top:0; bottom:0; z-index:1; background:rgba(255, 255, 255, 1); display:flex; justify-content:center; align-items:center;}
</style>