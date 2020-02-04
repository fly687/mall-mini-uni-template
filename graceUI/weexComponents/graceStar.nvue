<template name="graceStart">
	<view class="grace-stars" :style="{height:(size+2)+'rpx', width:(size*totalstars + 2)+'rpx'}">
		<block v-for="(item, index) in totalstars" :key="index">
			<image v-if="index < starnum"
			src="../../static/starta.png" 
			:style="{width:size+'rpx', height:size+'rpx'}"  
			@click="changnum(index + 1)"></image>
			<image v-else
			src="../../static/start.png" 
			:style="{width:size+'rpx', height:size+'rpx'}"  
			@click="changnum(index + 1)"></image>
		</block>
	  </view>
</template>
<script>
export default {
	name: "graceStart",
	props:{
		size : {
			type : Number,
			default : 50
		},
		totalstars : {
		  type : Number,
		  default : 5
		},
		starnum : {
		  type : Number,
		  default : 0
		},
		cantap : {
		  type : Boolean,
		  default : true
		}
	},
	methods: {
		changnum : function(val){
			if (!this.cantap){return ;}
			this.$emit("starchange", Number(val));
		}
	}
}
</script>
<style scoped>
.grace-stars{flex-direction:row; flex-wrap:nowrap;}
</style>