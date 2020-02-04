<template>
	<view class="grace-select-menu-wrap">
		<view class="grace-select-menu-title" @click.stop="showMenu" id="menuMain">
			<text>{{items[currentIndex]}}</text>
			<text class="grace-select-menu-icon icon-allow-b" v-if="!show"></text>
			<text class="grace-select-menu-icon icon-allow-t" v-if="show"></text>
		</view>
		<view class="grace-select-menu" :style="{top : top +'px'}" @click.stop="close" @touchmove.stop="" v-if="show">
			<view style="height:92rpx; width:100%;"></view>
			<scroll-view scroll-y class="grace-select-menus" :style="{height:height+'rpx'}">
				<view :class="['grace-select-item', index == currentIndex ? 'grace-selected' : '']" 
				v-for="(item, index) in items" :style="{color : index == currentIndex ? activeColor : color}"
				:key="index" :data-index="index" @click.stop="select">
					<text class="grace-selected-icon" v-if="index == currentIndex"></text>
					<text>{{item}}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script scoped>
export default {
	props:{
		items : {
			type : Array,
			default : function () {
				return []
			}
		},
		show : {
			type : Boolean,
			default : false
		},
		height : {
			type : Number,
			default : 300
		},
		color : {
			type : String,
			default : "#333333"
		},
		activeColor : {
			type : String,
			default : "#3688FF"
		},
		selectIndex : {
			type : Number,
			default : 0
		},
		isH5header : {
			type : Boolean,
			default : true
		}
	},
	data() {
		return {
			currentIndex : 0,
			top : 0
		}
	},
	watch:{
		selectIndex : function () {
			this.currentIndex = this.selectIndex;
		}
	},
	created : function () {
		this.currentIndex = this.selectIndex;
	},
	methods:{
		showMenu:function () {
			uni.createSelectorQuery().in(this).select('#menuMain').fields(
				{rect: true}, (res) => {
					this.top = res.top;
					// #ifdef H5
					if(this.isH5header){this.top += 44;}
					// #endif
				}
			).exec();
			this.$emit('showMenu');
		},
		close : function(){
			this.$emit('close');
		},
		select : function(e){
			var index = Number(e.currentTarget.dataset.index);
			this.currentIndex = index;
			this.$emit('select', index);
			this.close();
		}
	}
}
</script>
<style>
.grace-select-menu-wrap{width:100%; position:relative;}
.grace-select-menu-title{height:90rpx; line-height:90rpx; font-size:28rpx; color:#333333; width:100%; text-align:center; overflow:hidden;}
.grace-select-menu-icon{font-family:"grace-iconfont"; margin-left:10rpx; font-size:22rpx;}
.icon-allow-b:after{content:"\e603";}
.icon-allow-t:after{content:"\e654";}
.grace-select-menu{position:fixed; width:750rpx; left:0; top:0; bottom:0; background-color:rgba(255, 255, 255, 0); z-index:99999; overflow:hidden;}
.grace-select-menus{height:260rpx; background:#FFFFFF; padding:0;}
.grace-select-item{line-height:100rpx; height:100rpx; width:700rpx; padding:0 25rpx; font-size:28rpx; color:#333333; border-bottom:1px solid #F8F8F8;}
.grace-select-item:last-child{border:0;}
.grace-selected{font-weight:bold;}
.grace-selected-icon{margin-right:15rpx; font-family:"grace-iconfont";}
.grace-selected-icon:after{content:"\e7f8";}
</style>