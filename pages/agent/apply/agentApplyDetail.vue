<template>
	<view class="main-body">
		<view class="grace-gtbg-green grace-shadow title-name grace-white">
			<!-- <text class="name">{{applyObj.name}}</text> -->
			<view class="status">
				<text v-if="applyObj.status==='0'" class="color-dark">等待审核</text>
				<text v-if="applyObj.status==='1'" class="color-green">{{applyObj.levelId?applyObj.levelName:"未分配级别"}}</text>
				<text v-if="applyObj.status==='2'" class="color-red">申请被驳回</text>
			</view>
		</view>
		<view class="zsl-card">
			<view class="zsl-card-header"><span>已申请[<view class="name">{{applyObj.name}}</view>]</span>
				<view class="zsl-card-header-extra">
					<b v-if="applyObj.status==='0'" class="color-dark">等待审核</b>
					<b v-if="applyObj.status==='1'" class="color-green">审核通过</b>
					<b v-if="applyObj.status==='2'" class="color-red">申请被驳回</b>
				</view>
			</view>
			<view class="zsl-card-body">已申请，等待审核</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		applyObj: {
			type: Object,
			default: function() {return {};}
		}
	},
	data() {
		return {
		}
	},
	created: function(){
		var _self = this;
  },
  methods: {
	}
}
</script>
<style scoped>
	.main-body {
		width:100%;
	}
	.name {
		display: inline-block; font-weight: bold; font-size:14px;
	}
	.title-name {
		width:100%; text-align: center; height:40px; line-height: 40px; font-size: 22px; margin-top: 10px;
	}
	.title-name .name {
		letter-spacing: 0.3em;
	}
	.title-name .status {
		display: inline-block; color:#FFF;
	}
	.title-name .status text {
		color:#FFF; font-size:14px;
	}
</style>