<template>
	<view class="grace-alert" v-if="showIn">
		<view class="grace-alert-body" :style="{'background-color':background}"  ref="gracealert">
			<slot></slot>
		</view>
	</view>
</template>
<script>
var animation = weex.requireModule('animation');
export default {
	name: "graceHeaderAlert",
	props: {
		show    : {
			type : Boolean,
			default : false
		},
		background : {
			type : String,
			default : '#F1F2F3'
		}
	},
	data() {
		return {
			showIn : false
		}
	},
	watch: {
		show : function(n , o){
			this.showIn = true;
			setTimeout(() => {
				animation.transition(this.$refs.gracealert, {
					styles         : {opacity:1},
					duration       : 50, 
					timingFunction : 'linear',
					needLayout     : false,
					delay          : 0 
				});
			}, 100);
			setTimeout(function(){this.showIn = false;}.bind(this), 3000);
		}
	}
}
</script>
<style scoped>
.grace-alert{width:750rpx; flex-direction:row; flex-wrap:nowrap; justify-content:center; align-items:center;  position:fixed; left:0rpx; top:20rpx;}
.grace-alert-body{width:600rpx; padding:20rpx 25rpx; border-radius:10rpx; background-color:#FFFFFF; flex-direction:row; flex-wrap:nowrap; justify-content:center; align-items:center; opacity:0.1;}
</style>