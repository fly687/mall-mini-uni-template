<template>
	<view>
		<view class="grace-mask" @tap.stop="done" @touchmove.stop="" v-if="show"></view>
		<view class="grace-keyboard" v-if="show">
			<view class="grace-keyboard-left">
				<text class="grace-keyboard-keys" data-keynumber="1" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">1</text>
				<text class="grace-keyboard-keys" data-keynumber="2" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">2</text>
				<text class="grace-keyboard-keys" data-keynumber="3" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">3</text>
				<text class="grace-keyboard-keys" data-keynumber="4" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">4</text>
				<text class="grace-keyboard-keys" data-keynumber="5" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">5</text>
				<text class="grace-keyboard-keys" data-keynumber="6" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">6</text>
				<text class="grace-keyboard-keys" data-keynumber="7" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">7</text>
				<text class="grace-keyboard-keys" data-keynumber="8" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">8</text>
				<text class="grace-keyboard-keys" data-keynumber="9" hover-class="keydown" :hover-stay-time="100" @tap.stop="inputNow">9</text>
				<text class="grace-keyboard-keys" 
				:style="{width: isPoint ? '259rpx':'538rpx'}" hover-class="keydown" :hover-stay-time="100" data-keynumber="0" @tap.stop="inputNow">0</text>
				<text v-if="isPoint" class="grace-keyboard-keys" style="width:259rpx;" hover-class="keydown" :hover-stay-time="100" data-keynumber="." @tap.stop="inputNow">.</text>
			</view>
			<view class="grace-keyboard-right">
				<text class="grace-keyboard-keys grace-icons" @tap.stop="deleteNow">&#xe623;</text>
				<text class="grace-keyboard-keys grace-keyboard-done" @tap.stop="done">{{doneBtnName}}</text>
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
.grace-mask{background-color:rgba(255, 255, 255, 0); position:fixed; width:750rpx; flex:1; left:0; top:0; bottom:0;}
.grace-keyboard{background-color:#F4F5F6; position:fixed; width:750rpx; left:0; bottom:0; padding:10px 0; flex-direction:row; justify-content:space-between;}
.grace-keyboard-left{width:560rpx; flex-direction:row; flex-wrap:wrap; justify-content:space-between;}
.grace-keyboard-right{width:188rpx; flex-direction:column; justify-content:space-between;}
.grace-keyboard-keys{width:166rpx; height:100rpx; margin:10rpx; background-color:#FFFFFF; text-align:center; line-height:100rpx; border-radius:8rpx; font-weight:700; font-size:50rpx;}
.grace-keyboard-done{height:340rpx; line-height:340rpx; font-size:36rpx; font-weight:400; background-color:#00C777; color:#FFFFFF;}
.keydown{background-color:#00C777; color:#FFFFFF;}
</style>