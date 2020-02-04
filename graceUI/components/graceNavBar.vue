<template>
	<scroll-view 
	:class="['grace-nav-bar', isCenter ? 'grace-nav-center' : '']" :scroll-x="true" :show-scrollbar="false" 
	:scroll-into-view="'tab-'+currentIndex">
		<view class="nav-item" :id="'tab-'+index" 
		:style="{width:size < 1 ? 'auto' : size+'rpx', marginRight:margin+'rpx', padding:'0rpx '+padding}" 
		v-for="(item, index) in items" :key="index" @click="navchang" :data-index="index">
			<view :class="['nav-item-title', currentIndex == index ? 'nav-active' : '']"
			:style="{color:currentIndex == index ? activeColor : color, textAlign : textAlign, lineHeight:lineHeight, fontSize:currentIndex == index ? activeFontSize : fontSize}">{{item}}</view>
			<view class="nav-active-line-wrap" :style="{justifyContent:activeDirection}">
				<view class="nav-active-line" 
				:style="{background:activeLineBg, width:activeLineWidth, height:activeLineHeight}" 
				v-if="currentIndex == index"></view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
export default {
	props:{
		isCenter : {type : Boolean, default : false},
		currentIndex : {type : Number,default : 0},
		size : {type : Number, default : 120},
		fontSize : {type : String,default : '28rpx'},
		activeFontSize : {type : String, default : '28rpx'},
		items : {type : Array,default : function () {return []}},
		activeLineBg : {type : String,default : "linear-gradient(to right, #66BFFF,#3388FF)"},
		color : {type : String, default : "#333333"},
		activeColor:{type : String,	default : "#333333"},
		activeLineHeight : {type : String, default : '6rpx'},
		activeLineWidth : {type : String, default : "36rpx"},
		activeDirection : {type : String, default : ""},
		margin : {type : Number, default : 0},
		textAlign : {type : String, default : ''},
		lineHeight :{type : String, default : '50rpx'},
		padding : {type : String, default : '0rpx'}
	},
	methods:{
		navchang : function (e){
			this.$emit('change', Number(e.currentTarget.dataset.index))
		}
	}
}
</script>
<style scoped>
.grace-nav-bar{width:100%; display:flex; white-space:nowrap;}
.nav-item{width:100rpx; display:inline-flex; flex-direction:column;}
.nav-item-title{width:100%; color:#333333;}
.nav-active{font-weight:bold;}
.nav-active-line-wrap{display:flex;}
.nav-active-line{margin-top:5rpx;}
.grace-nav-center{justify-content:center; text-align:center;}
</style>