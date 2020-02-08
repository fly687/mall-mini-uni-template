<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<graceHeader background="#34CD6D">
				<!-- 搜索组件宽度自适应于外层 -->
				<view class="grace-header-body grace-nowrap">
					<!-- 返回按钮 -->
					<view class="icons grace-icons icon-arrow-left grace-white" @tap="gotoBack" style="font-size:44rpx;"></view>
					<view class="zsl-search grace-flex1">
						<view class="zsl-search-in grace-nowrap">
							<view class="grace-icons icon-search zsl-search-icon"></view>
							<view class="input grace-flex1"><input type="search" @input="onInput" placeholder="关键字" :value="searchKey"/></view>
							<view class="zsl-search-btn" @tap="onSearch">搜索</view>
						</view>
					</view>
				</view>
			</graceHeader>
			<view class="grace-body" v-if="!hasResult">
				<view v-if="ownList.length > 0">
					<view class="grace-title" style="margin-top:15rpx;">
						<text class="grace-title-text grace-black">搜索历史</text>
						<text class="grace-text-small grace-gray grace-icons icon-remove" @tap="removeAll">清空</text>
					</view>
					<view class="grace-search-tags grace-wrap">
						<view v-for="(item, index) in ownList" :key="index" :data-key="item.keyword" class="grace-search-tags-items" @tap="setKey">{{item.keyword}}</view>
					</view>
				</view>
				<view class="grace-title" style="margin-top:15rpx;">
					<text class="grace-title-text grace-black">热门搜索</text>
				</view>
				<view class="grace-search-tags grace-wrap">
					<view v-for="(item, index) in tagList" :key="index" :data-key="item.name" class="grace-search-tags-items" @tap="setKey">{{item.name}}</view>
				</view>
			</view>
			<view v-if="hasResult">
				<searchResultComponent :productList="productList" @onTypeChange="onTypeChange"></searchResultComponent>
			</view>
		</view>
	</gracePage>
</template>
<script>
var that;
import gracePage from "../../graceUI/components/gracePage.vue";
import searchResultComponent from "./searchResultComponent.vue";
import graceSearch from "../../graceUI/components/graceSearch.vue";
import graceHeader from '@/graceUI/components/graceHeader.vue';
export default {
	data() {
		return {
			searchKey : "",
			ownList : [],
			tagList : [],
			productList: [[],[]],
			hasResult: false,
			pageSize: 20,
			searchType: 0, //0-产品；1-资讯
		}
	},
	onLoad:function(){
		that = this;
		that.loadData();
	},
	methods:{
		loadData: function() {
			this.$request.get("miniSearchService.onSearch", {}).then((res)=> {
				//console.log(res);
				that.ownList = res.ownList;
				that.tagList = res.tagList;
			})
		},
		gotoBack: function() {
			uni.navigateBack();
		},
		setKey : function(e){
			var key = e.currentTarget.dataset.key;
			/* uni.showToast({
				title : '开始搜索 ' + key,
				icon  : "none"
			}); */
			this.searchKey = key;
			this.onSearch();
		},
		onInput: function(e) {
			//console.log(e);
			this.searchKey = e.detail.value;
		},
		onTypeChange: function(type) {
			//console.log(type);
			this.searchType = type;
			this.onSearch();
		},
		onSearch: function() {
			const key = this.searchKey;
			if(!key || key==='关键字') {
				uni.showToast({
					title: "输入关键字", icon: "none"
				})
			} else {
				that.$request.get("miniSearchService.search", {searchType: that.searchType, keyword: key,size: that.pageSize}).then((res)=> {
					//console.log(res);
					const tag = res.tag;
					const productList = res.productList?res.productList:[];
					//console.log(productList);
					if(tag && tag.proId) {
						uni.navigateTo({
							url: "../product/show?id="+tag.proId
						})
					} else {
						that.rebuildData(productList);
					}
				});
				that.rebuildOwn(key);
			}
		},
		rebuildData: function(data) {
			const oldData = [[],[]];
			let lArr = oldData[0]; let rArr = oldData[1];
			data.map((item, index) => {
				if(index%2===0) {lArr.push(item);}
				else {rArr.push(item);}
			});
			that.productList = [lArr, rArr];
			that.hasResult = true;
		},
		rebuildOwn: function(keyword) {
			const ownList = that.ownList;
			let newList = [{keyword: keyword}];
			ownList.map((item)=> {
				if(item.keyword!==keyword) {newList.push(item);}
			})
			that.ownList = newList;
		},
		removeAll : function(){
			uni.showModal({
				title:"提示", content: "是否清空记录", success(res) {
					if(res.confirm) {
						that.$request.get("miniSearchService.cleanAll",{}).then((res)=> {
							uni.showToast({
								title: res.message, icon: "none"
							})
							that.ownList = [];
						})
					}
				}
			})
		}
	},
	components:{
		gracePage, graceSearch,graceHeader,
		searchResultComponent
	}
}
</script>
<style>
.grace-search-tags{padding:10rpx 0;}
.grace-search-tags-items{padding:5rpx 20rpx; border-radius:30rpx; margin-right:15rpx; margin-bottom:15rpx; font-size:24rpx; line-height:40rpx; border-width:1px; border-style:solid; border-color:#F1F1F1; color:#A5A7B2; font-size:26rpx;}

.zsl-search {
		background:#FFF; border-radius: 15px;
	}
	.zsl-search-in {
	}
	.zsl-search-icon {width: 18px; height: 20px; line-height: 24px; padding-left: 18rpx;}
	.zsl-search-btn {width: 35px; text-align:center; height: 24px; border-left: 1px #e8e8e8 solid; color:#888; line-height: 24px;}
</style>