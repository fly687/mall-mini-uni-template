<template>
	<view class="gui-segmented-Control" :style="{height:height, background:bgColor}">
		<view class="gui-segmented-Control-item" v-for="(item, index) in items" :key="index" 
		:style="{height:height, lineHeight:height, color:current == index ? '#FFFFFF' : color, background:current == index ? color : '', fontSize:fontSize}" 
		@tap.stop="changeSC" :data-index="index">{{item}}</view>
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
		bgColor : {
			type : String,
			default : '#F8F8F8'
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
.gui-segmented-Control{display:flex; flex-direction:row; flex-wrap:nowrap; background-color:#F5F6F8; border-radius:10rpx; padding:6rpx; width:100%;}
.gui-segmented-Control-item{width:700rpx; text-align:center; border-radius:8rpx;}
</style>
