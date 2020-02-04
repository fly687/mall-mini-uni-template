<template name="gracePopupMenu">
	<view>
		<view 
		class="grace-popup-mask" v-if="show" @tap.stop="hideMenu" @touchmove.stop="" 
		:style="{backgroundColor:background}">
			<view class="grace-popup-menu" v-if="show"
			:style="{top:top+'px', right:right, backgroundColor:bgColor, width:menuWidth, borderRadius:borderRadius}">
				<slot></slot>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "gracePopupMenu",
		props: {
			show:{
				type : Boolean,
				default : false
			},
			top:{
				type : Number,
				default : 0
			},
			bgColor:{
				type : String,
				default :'#FFFFFF'
			},
			menuWidth :{
				type : String,
				default : '258rpx'
			},
			background : {
				type : String,
				default : 'rgba(0,0,0, 0.3)'
			},
			right:{
				type : String,
				default:'0rpx'
			},
			borderRadius:{
				type : String,
				default:'0rpx'
			}
		},
		methods: {
			hideMenu : function() {
				this.$emit('hideMenu');
			}
		},
	}
</script>
<style scoped>
.grace-popup-menu{background-color:#FFFFFF; width:258rpx; padding:10rpx; right:0px; top:0px; position:absolute;}
.grace-popup-mask{background-color:rgba(0,0,0, 0.3); width:750rpx; position:fixed; left:0; top:0; bottom:0;}
</style>