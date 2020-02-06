<template>
	<view>
		<view v-if="data.length<=0">
			<emptyCompent message="一点东西都没留下" optMsg="去逛逛" @onClick="gotoIndex"></emptyCompent>
		</view>
		<view class="single-data grace-nowrap" v-for="(item, index) in data" :key="index">
			<view class="data-image" @tap="onOpt('show', item.proId)"><image :src="item.proImg" mode="widthFix"></image></view>
			<view class="grace-flex1 data-content">
				<view class="data-title">{{item.proTitle}}</view>
				<view class="data-createTime">{{item.createTime}}</view>
			</view>
			<view class="data-opt" @tap="onOpt('delete', item.id)">删除</view>
		</view>
		<view class="grace-margin-top grace-text-center">
			<text class="grace-text zsl-loadmore-text">{{bottomMsg}}</text>
		</view>
		<graceLoading :loadingType="loadingType"></graceLoading>
	</view>
</template>

<script>
var that;
import graceLoading from '@/graceUI/components/graceLoading.vue';
import emptyCompent from "@/components/emptyComponent.vue"
	export default {
		data() {
			return {
				page: 0,
				canPage: true,
				data: [],
				pageSize: 15,
				bottomMsg: '上划加载更多 ^_^',
				loadingType: '3'
			}
		},
		onLoad() {
			that = this;
			that.loadData();
		},
		onReachBottom: function() {
			//避免多次触发
			//console.log("----->", this.loadingType)
			if (this.loadingType == 1 || this.loadingType == 2){return ;}
			this.loadMoreFunc();
		},
		methods: {
			reload: function() {
				let page = getCurrentPages().pop();  //跳转页面成功之后
				if (!page) return;  
				page.onLoad(); //如果页面存在，则重新刷新页面
			},
			loadData: function() {
				if(that.canPage) {
					that.$request.get("miniProductFavoriteRecordService.list", {page: that.page, sort: "createLong_d"}).then((res)=> {
						//console.log(res);
						const data = res.data;
						that.data = that.data.concat(data);
						if(data.length>=that.pageSize) {that.canPage = true;}
						else {that.canPage = false; that.bottomMsg = "我也是有底线的";}
						that.page = that.page + 1;
					});
				} else {
					
				}
			},
			loadMoreFunc: function(e) {
				//console.log(e);
				that.loadData();
			},
			removeData: function(id) {
				let data = that.data;
				data.splice(data.findIndex(item => item.id === id), 1);
				that.data = data;
			},
			onOpt: function(action, id) {
				if(action==='delete') {
					uni.showModal({
						title: '提示',
						content: "确定删除该收藏吗？",
						success(res) {
							if(res.confirm) {
								that.$request.get("miniProductFavoriteRecordService.delete", {id: id}).then((res)=> {
									uni.showToast({
										title: res.message, icon: "none"
									});
									that.removeData(id);
								})
							}
						}
					})
				} else if(action==='show') {
					//console.log(id)
					uni.navigateTo({
						url: "../product/show?id="+id
					})
				}
			},
			gotoIndex: function() {
				uni.switchTab({
					url: "../index/index"
				})
			}
		},
		components: {
			emptyCompent,graceLoading
		}
	}
</script>

<style>
.single-data {
	border-bottom:1px #e8e8e8 solid; margin: 20rpx; padding-bottom: 15rpx; padding-left: 12rpx; padding-top: 15rpx;
}
.data-image {
	margin-right: 10px;
}
.data-image image {
	width:60px; height: 60px; border:1px #eee solid; padding: 4px; border-radius: 5px;
}
.data-content {
	height: 60px; position: relative;
}
.data-title {
	font-size: 14px; color:#333; line-height: 24px; margin-top: 4px;
}
.data-createTime {
	color:#999; margin-top: 15rpx; position: absolute; bottom: 20rpx;
}
.data-opt {
	line-height: 60px; color:#999; padding:0px 12rpx;
}
</style>
