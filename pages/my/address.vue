<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="grace-body">
			<view class="grace-list grace-margin-top" style="padding-bottom: 50px;">
				<view class="grace-list-items" v-for="(item, index) in forData" :key="index">
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="grace-list-title-text">姓名{{item}}</text>
							<text class="grace-list-title-desc">181****5688</text>
						</view>
						<view class="grace-list-body-desc">具体地址信息</view>
					</view>
					<text class="grace-list-arrow-right grace-icons icon-arrow-right" @tap="editAddress"></text>
				</view>
			</view>
			<view class="add-address-main">
				<view class="add-address-view grace-flex1" @tap="addAddress">
					+ 添加新地址
				</view>
			</view>
		</view>
	</gracePage>
</template>
<script>
import gracePage from "../../graceUI/components/gracePage.vue";
export default {
    data() {
    	return {
			forData : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] //模拟的循环数据
		};
    },
	methods:{
		editAddress : function(){
			uni.showToast({
				title:"请以新增页面为基础改进",
				icon:'none'
			})
		},
		addAddress : function(){
		    uni.navigateTo({
		    	url:"./updateAddress?id=0"
		    })
		}
	},
	components:{gracePage}
}
</script>
<style>
.add-address-main {position: fixed; left: 0px; bottom: 0px; width:100%; background: #FFF;}
.add-address-main .add-address-view {margin:20rpx; background:#FD9704; color:#FFF; text-align: center; height: 35px; line-height: 35px; border-radius: 3px;}
</style>