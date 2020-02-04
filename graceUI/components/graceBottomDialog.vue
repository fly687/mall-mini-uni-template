<template>
	<view class="grace-btdialog-shade" v-if="show" @tap.stop="closeDialog" @touchmove.stop="stopFun" :style="{backgroundColor:background}">
		<view :class="['dialog', 'gdIn', isIpx ? 'grace-ipx-bottom' : '']" @tap.stop="stopFun">
			<view><slot name="btns"></slot></view>
			<view @tap.stop="stopFun"><slot name="content"></slot></view>
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
		return {
			isIpx:false
		}
	},
	// #ifdef MP
	created : function(){
		var _self = this;
		uni.getSystemInfo({
			success: function(res) {
				var model = res.model
				if (model.search('iPhone X') != -1){
				   _self.isIpx = true;
				}
			}
		})
	},
	// #endif
	methods:{
		closeDialog : function(){
			this.$emit('closeDialog');
		},
		stopFun : function(){}
	}
}
</script>
<style scoped>
@keyframes gdIn{ from {bottom:-100px; } 100% { bottom: 0px; }}
.gdIn {animation:gdIn 200ms linear;}
.grace-btdialog-shade{position:fixed; width:100%; height:100%; left:0; top:0; z-index:9991; background:rgba(0, 0, 0, 0.5);}
.grace-btdialog-shade .dialog{width:100%; height:auto; background:#FFFFFF; position:absolute; bottom:0; left:0;}
.grace-ipx-bottom{padding-bottom:68rpx !important;}
</style>