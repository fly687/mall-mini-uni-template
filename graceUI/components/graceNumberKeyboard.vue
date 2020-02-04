<template>
	<view>
		<view class="grace-mask" @tap.stop="done" @touchmove.stop="" v-if="show"></view>
		<view class="grace-keyboard" v-if="show">
			<view class="grace-keyboard-left">
				<view class="grace-keyboard-keys" data-keynumber="1" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">1</view>
				<view class="grace-keyboard-keys" data-keynumber="2" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">2</view>
				<view class="grace-keyboard-keys" data-keynumber="3" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">3</view>
				<view class="grace-keyboard-keys" data-keynumber="4" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">4</view>
				<view class="grace-keyboard-keys" data-keynumber="5" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">5</view>
				<view class="grace-keyboard-keys" data-keynumber="6" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">6</view>
				<view class="grace-keyboard-keys" data-keynumber="7" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">7</view>
				<view class="grace-keyboard-keys" data-keynumber="8" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">8</view>
				<view class="grace-keyboard-keys" data-keynumber="9" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">9</view>
				<view class="grace-keyboard-keys" 
				:style="{width: isPoint ? '259rpx':'538rpx'}" hover-class="keydown" :hover-stay-time="100" data-keynumber="0" @tap.stop="inputNow">0</view>
				<view v-if="isPoint" class="grace-keyboard-keys" style="width:259rpx;" hover-class="keydown" :hover-stay-time="100" data-keynumber="." @tap.stop="inputNow">.</view>
			</view>
			<view class="grace-keyboard-right">
				<view class="grace-keyboard-keys grace-keyboard-delete grace-icons" hover-class="keydown" :hover-stay-time="100" @tap.stop="deleteNow"></view>
				<view class="grace-keyboard-keys grace-keyboard-done" @tap.stop="done">{{doneBtnName}}</view>
			</view>
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
		doneBtnName : {
			type : String,
			default : "完成"
		},
		isPoint : {
			type : Boolean,
			default : true
		}
	},
	methods: {
		inputNow : function (e){
			var k = e.currentTarget.dataset.keynumber;
			this.$emit('keyboardInput', k);
		},
		deleteNow : function (){
			this.$emit('keyboardDelete');
		},
		done : function(){
			this.$emit('keyboardDone');
		}
	},
}
</script>
<style scoped>
.grace-mask{background:rgba(255, 255, 255, 0); position:fixed; width:100%; height:100%; left:0; top:0; z-index:1;}
.grace-keyboard{background:#F4F5F6; position:fixed; width:100%; height:auto; left:0; bottom:0; z-index:99; padding:10px 0; display:flex; flex-direction:row; justify-content:space-between;}
.grace-keyboard-left{width:560rpx; display:flex; flex-direction:row; flex-wrap:wrap; justify-content:space-between;}
.grace-keyboard-right{width:188rpx; display:flex; flex-direction:column; justify-content:space-between;}
.grace-keyboard-keys{width:166rpx; height:100rpx; margin:10rpx; background:#FFFFFF; text-align:center; line-height:100rpx; border-radius:8rpx; font-weight:700; font-size:50rpx;}
.grace-keyboard-done{height:340rpx !important; line-height:340rpx !important; font-size:36rpx !important; font-weight:400 !important; background:#00C777 !important; color:#FFFFFF !important;}
.grace-keyboard-delete::before{content:"\e623";}
.keydown{background:#00C777 !important; color:#FFFFFF !important;}
</style>