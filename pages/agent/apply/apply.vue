<template>
	<view>
	<view class="grace-body" v-if="!applyObj">
		<agentApplyForm/>
	</view>
	<view class="grace-body" v-if="applyObj">
		<agentApplyDetail v-if="(applyObj.status=='1' || applyObj.status=='0')" :applyObj="applyObj" :verifyList="verifyList" :paperList="paperList"/>
		<agentApplyForm v-if="applyObj.status=='2'" :curObj="applyObj" :verifyList="verifyList" :paperList="paperList"/>
	</view>
	</view>
</template>

<script>
	/* import agentApplyDetail from "@/pages/agent/apply/detail.vue"; */
	import agentApplyDetail from "./agentApplyDetail.vue";
	import agentApplyForm from "./agentApplyForm.vue";
	let _self = this;
	
	export default {
		data() {
			return {
				applyObj: null,
				verifyList:[],
				paperList:[],
			}
		},
		onLoad: function() {
			_self = this;
			_self.loadData();
		},
		methods: {
			
			loadData: function() {
				_self.$request.get("miniAgentService.loadOne", {}).then((res)=> {
					//console.log(res);
					_self.applyObj = res.obj; //表示已经申请过
					_self.verifyList = res.verifyList;
					_self.paperList = res.paperList;
				})
			},
			
		},
		components: {
			agentApplyDetail,
			agentApplyForm
		}
	}
</script>

<style>
.grace-idcard-desc{background:#FFFFFF; color:#666666; line-height:1.8em; padding:20rpx; border-radius:10rpx;}
.grace-idcard-text{line-height:1.8em; margin-top:30rpx; color:#666666;}
.grace-idcard-items{background:#FFFFFF; padding:30rpx 50rpx; margin-top:25rpx; border-radius:10rpx;}
.grace-idcard-items .img image{width:100%;}
</style>
