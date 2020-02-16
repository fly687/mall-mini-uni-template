<template>
	<view>
		<view>
			<button @tap="startRecord">开始录音</button>
			<button @tap="endRecord">停止录音</button>
			<button @tap="playVoice">播放录音</button>
			<view style="padding:10px">
			<button @touchstart="myStart" @touchend="myEnd">按住录音</button>
			<button @tap="myPlay">播放</button>
			</view>
			<button @tap="getAddress">获取收货地址</button>
			<button @tap="getInvoice">获取发票信息</button>
			<button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">getPhoneNumber</button>
			
			<view style="padding: 10px">
			<button @tap="setData(10)">缓存10秒</button>
			<button @tap="getData()">获取缓存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import common from "@/common/common.js";
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	
	innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				voicePath: ''
			}
		},
		onLoad() {
			/* this.$request.get("miniConfigService.loadOne", {}).then((res)=> {
				console.log(res);
			}) */
			let self = this;
			recorderManager.onStop(function (res) {
				console.log('recorder stop' + JSON.stringify(res));
				self.voicePath = res.tempFilePath;
				self.$request.upload(res.tempFilePath, {ticket: '123243sdf', objClassName: "phonograph"})
				if (self.voicePath) {
					innerAudioContext.src = self.voicePath;
					innerAudioContext.play();
				}
			});
			const pages = getCurrentPages();
			const curPage = pages[pages.length-1];
			const url = curPage.route;
			const options = curPage.options;
			console.log("-------------------------------")
			console.log(curPage);
			console.log(url, options);
			console.log("-------------------------------")
			console.log(common.getCurrentPage());
		},
		methods: {
			setData: function(timeout) {
				common.setStorageTime("test-data1", "123456", timeout);
				common.setStorageTime("test-data2", {key: 'name', value:"123456", name: "张三11"}, timeout);
			},
			getData: function() {
				const data1 = common.getStorageTime("test-data1");
				console.log("data1", data1);
				
				const data2 = common.getStorageTime("test-data2");
				console.log("data2", data2);
			},
			myStart() {
				console.log('开始录音');
				
				recorderManager.start();
			},
			myEnd() {
				console.log('录音结束');
				recorderManager.stop();
			},
			myPlay() {
				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			},
			
			
			startRecord() {
				console.log('开始录音');
				recorderManager.start();
			},
			endRecord() {
				console.log('录音结束');
				recorderManager.stop();
			},
			playVoice() {
				console.log('播放录音');
	
				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			},
			getAddress() {
				uni.chooseAddress({
					success(res) {
						console.log(res);
					}
				})
			},
			getInvoice() {
				uni.chooseInvoiceTitle({
					success(res) {
						console.log(res)
					}
				})
			},
			onGetPhoneNumber(e) {  
				console.log("onGetPhoneNumber", e);  
				console.log(e.detail.errMsg);  
				console.log(e.detail.iv);  
				console.log(e.detail.encryptedData);  
				uni.showModal({  
					title: "onGetPhoneNumber",  
					content: e.detail.errMsg  
				})  
			}  
		}
	}
</script>

<style>

</style>
