<template>
	<view>
		<view class="grace-drawer-shade" v-if="show" @click.stop="closeDrawer" @touchmove.stop="" :style="{backgroundColor:background}"></view>
		<view ref="graceDrawerMenu" v-if="show" class="grace-drawer-nav" @tap.stop="stopFun" 
		:style="{width:width+'rpx', left : direction == 'left' ? (width*-1)+'rpx' : 'none', right : direction == 'right' ? (width*-1)+'rpx' : 'none'}">
			<view class="grace-drawer-main"><slot name="links"></slot></view>
		</view>
	</view>
</template>
<script>
export default {
	name: "graceDrawer",
	props: {
		width : {
			type : Number,
			default : 500
		},
		show : {
			type : Boolean,
			default : true
		},
		direction : {
			type : String,
			default : 'left'
		},
		background:{
			type : String,
			default : 'rgba(0, 0, 0, 0.5)'
		}
	},
	updated:function(){
		if(this.show){
			setTimeout(()=>{
				var moveX = this.direction == 'left' ? uni.upx2px(this.width) + 'px' : (uni.upx2px(this.width) * -1) + 'px';
				var animation = weex.requireModule('animation');
				animation.transition(this.$refs.graceDrawerMenu, {
					styles: {transform:'translate('+moveX+', 0)'},
					duration:200, 
					timingFunction: 'linear',
					needLayout:false,
					delay: 0 
					}, function (){}
				);
			}, 100);
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
<style scoped>
.grace-drawer-shade{position:fixed; width:750rpx; bottom:0; top:0; left:0; background-color:rgba(0, 0, 0, 0.5);}
.grace-drawer-nav{background-color:#FFFFFF; position:fixed; bottom:0; top:0;}
.grace-drawer-main{padding:30rpx;}
</style>