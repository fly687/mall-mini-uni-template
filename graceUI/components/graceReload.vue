<template>
	<view class="grace-reload" 
	:class="[reloadStatus == 0 ? 'gload-show' : '', reloadStatus == 2 ? 'gload-hide' : '']" 
	:style="{background:reloadBgColor[reloadStatus], height:height+'rpx', width:width, marginLeft:marginLeft}">
		<text class="grace-reload-icon icon-pulldown" v-if="reloadStatus == 0" :style="{color:reloadColor[reloadStatus]}"></text>
		<text class="grace-reload-icon icon-loading grace-rotate360" v-if="reloadStatus == 1" :style="{color:reloadColor[reloadStatus]}"></text>
		<text class="grace-reload-icon icon-ok" v-if="reloadStatus == 2" :style="{color:reloadColor[reloadStatus]}"></text>
		<text class="grace-reload-text" :style="{color:reloadColor[reloadStatus]}">{{reloadTxt[reloadStatus]}}</text>
	</view>
</template>
<script>
export default{
	props:{
		reloadTxt    : {
			type : Array,
			default : function(){
				return ['松开手指开始刷新', '数据刷新中', '数据已经刷新']
			}
		},
		reloadBgColor : {
			type : Array,
			default : function(){
				return ['', '', '#63D2BC']
			}
		},
		reloadColor : {
			type : Array,
			default : function(){
				return ['#999999', '#63D2BC', '#FFFFFF']
			}
		},
		width : {
			type : String,
			default:'750rpx'
		},
		marginLeft : {
			type : String,
			default:'0rpx'
		}
	},
	data() {
		return {
			reloadStatus : 5,
			height : 0,
			startY : 0,
			startTime : 0
		}
	},
	methods:{
		touchstart:function (e) {
			this.startY = e.moveY;
			this.startTime = new Date().getTime();
		},
		touchmove:function (e) {
			if(this.scrollTop > 0){return ;}
			if(this.height > 0){return;}
			// 检查时间
			var timer = new Date().getTime() - this.startTime;
			if(timer < 200){return ;}
			var moveY = e.moveY - this.startY;
			if(moveY > 100){this.reloadStatus = 0; this.height = 100;}
		},
		touchend:function (e) {
			if(this.height > 80){
				this.reloadStatus = 1;
				this.$emit('reload');
			}else{
				this.reloadStatus = 5;
				this.height = 0;
			}
		},
		endReload : function(){
			this.reloadStatus = 2;
			setTimeout(()=>{
				this.height = 0;
				this.reloadStatus = 5;
			},1000)
		}
	}
}
</script>
<style scoped>
.grace-reload{width:100%; height:0px; overflow:hidden; display:flex; flex-direction:row; justify-content:center; align-items:center;}
.grace-reload-icon{width:50rpx; height:50rpx; text-align:center; line-height:50rpx; display:block; font-family:"grace-iconfont"; font-size:44rpx;}
.icon-pulldown:before{content:"\e633";}
.icon-loading:before{content:"\e9db";}
.icon-ok:before{content:"\e7f8";}
.grace-reload-text{margin-left:16rpx; line-height:50rpx; font-size:26rpx;}
@keyframes gload-show{0%{opacity:0; height:0;} 100%{opacity:1; height:100rpx;}}
.gload-show{animation:gload-show 300ms linear;}
@keyframes gload-hide{0%{opacity:1; height:100rpx;} 65%{opacity:1; height:100rpx;} 100%{opacity:0; height:0rpx;}}
.gload-hide{animation:gload-hide 1000ms linear;}
@keyframes grace-rotate360{0%{transform:rotate(0deg);} 50%{transform:rotate(180deg);} 100%{transform:rotate(360deg);}}
.grace-rotate360{animation:grace-rotate360 1200ms infinite linear;}
</style>
