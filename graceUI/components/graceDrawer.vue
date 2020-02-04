<template>
	<view class="grace-drawer-shade" v-if="show" @tap.stop="closeDrawer" @touchmove.stop="" :style="{background:background}">
		<view  :class="['nav', direction == 'left' ? 'gdSlideLeft' : 'gdSlideRight']" :style="{width:width}" @tap.stop="stopFun">
			<view class="navMain"><slot name="links"></slot></view>
		</view>
	</view>
</template>
<script>
export default {
	name: "graceDrawer",
	props: {
		show : {
			type : Boolean,
			default : false
		},
		direction : {
			type : String,
			default : 'left'
		},
		width : {
			type : String,
			default : '60%'
		},
		background:{
			type : String,
			default : 'rgba(0, 0, 0, 0.5)'
		}
	},
	methods:{
		closeDrawer : function(){
			this.$emit('closeDrawer');
		},
		stopFun : function(){}
	}
}
</script>
<style>
@keyframes gdSlideLeft{ from {left:-300px; } 100% { left:0px; }}
.gdSlideLeft {animation:gdSlideLeft 200ms linear; left:0;}
@keyframes gdSlideRight{ from {right:-300px; } 100% { right:0px; }}
.gdSlideRight {animation:gdSlideRight 200ms linear; right:0;}
.grace-drawer-shade{position:fixed; width:100%; height:100%; top:0; left:0; z-index:9991; background:rgba(0, 0, 0, 0.5);}
.grace-drawer-shade .nav{width:60%; height:100%; background:#FFFFFF; position:absolute; top:0; z-index:9992;}
.grace-drawer-shade .navMain{padding:30upx;}
</style>