<template>
	<view class="grace-reload" ref="guiReload" :style="{backgroundColor:reloadBgColor[reloadStatus], width:width, marginLeft:marginLeft}">
		<text class="grace-reload-icon grace-icons" v-if="reloadStatus == 0" :style="{color:reloadColor[reloadStatus]}">&#xe633;</text>
		<view ref="loadingIcon" v-if="reloadStatus == 1"><text class="grace-reload-icon grace-icons" :style="{color:reloadColor[reloadStatus]}">&#xe9db;</text></view>
		<text class="grace-reload-icon grace-icons" v-if="reloadStatus == 2" :style="{color:reloadColor[reloadStatus]}">&#xe7f8;</text>
		<text class="grace-reload-text" :style="{color:reloadColor[reloadStatus]}">{{reloadTxt[reloadStatus]}}</text>
	</view>
</template>
<script>
var animation = null;
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
			startTime : 0,
			el:null
		}
	},
	watch:{
		reloadStatus : function (nval, oval) {
			if(nval == 1){
				setTimeout(()=>{this.rotate360();}, 300);
			}else if(nval == 0){
				var el = this.$refs.guiReload;
				animation = weex.requireModule('animation');
				animation.transition(el, {
					styles: {height:'50px', opacity:1},
					duration: 200,
					timingFunction: 'ease-in',
					needLayout:true,
					delay: 0
				});
			}else if(nval == 2){
				var el = this.$refs.guiReload;
				animation = weex.requireModule('animation');
				animation.transition(el, {
					styles: {height:'0', opacity:0},
					duration: 200,
					timingFunction: 'ease-in',
					needLayout:true,
					delay: 500
				});
			}
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
			if(timer < 300){return ;}
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
		},
		rotate360 : function(){
			this.el = this.$refs.loadingIcon;
			animation = weex.requireModule('animation');
			animation.transition(this.el, {
				styles: {transform: 'rotate(7200deg)'},
				duration: 20000,
				timingFunction: 'linear',
				needLayout:false,
				delay: 0
				}
			);
		}
	}
}
</script>
<style scoped>
.grace-reload{width:750rpx; height:0px; overflow:hidden; flex-direction:row; justify-content:center; align-items:center; opacity:0;}
.grace-reload-icon{width:50rpx; height:50rpx; text-align:center; line-height:50rpx; font-size:44rpx;}
.grace-reload-text{margin-left:16rpx; line-height:50rpx; font-size:26rpx;}
</style>