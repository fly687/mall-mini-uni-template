<template>
	<view class="gui-segmented-Control">
		<text class="gui-segmented-Control-item" v-for="(item, index) in items" :key="index" 
		:style="{height:height, lineHeight:height, color:current == index ? '#FFFFFF' : color, backgroundColor:current == index ? color : '#F5F6F8', fontSize:fontSize}" @tap.stop="changeSC" :data-index="index">{{item}}</text>
	</view>
</template>
<script>
export default{
	props:{
		items : {
			type : Array,
			default : function () {
				return new Array()
			}
		},
		height : {
			type : String,
			default : '60rpx'
		},
		color : {
			type : String,
			default : '#3688FF'
		},
		fontSize : {
			type : String,
			default : '26rpx'
		},
		current : {
			type : Number,
			default : 0
		}
	},
	methods:{
		changeSC:function (e) {
			this.$emit('change', Number(e.currentTarget.dataset.index));
		}
	}
}
</script>
<style scoped>
.gui-segmented-Control{flex-direction:row; flex-wrap:nowrap; background-color:#F5F6F8; border-radius:10rpx; padding:6rpx; width:750rpx; flex:1;}
.gui-segmented-Control-item{width:700rpx; text-align:center; flex:1; border-radius:8rpx;}
</style>