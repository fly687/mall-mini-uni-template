<template>
	<view class="mainBody">
		<!-- 标题 -->
		<view :class="['grace-article-title', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">{{article.title}}</view>
		<!-- 作者信息 -->
		<view class="grace-article-author-line">
			<view :class="['grace-article-author', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">
				<image :src="article.authorFace" mode="widthFix"></image>
				<view class="author-name">{{article.authorName}}</view>
			</view>
			<view class="btn"> + 关注 </view>
		</view>
		<!-- 其他基本信息 -->
		<view :class="['grace-article-info-line', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">
			<view class="grace-icons icon-eye">{{article.viewNumber}}</view>
			<view>发布于 : {{article.date}}</view>
		</view>
		<!-- 文章内容 -->
		<view class="grace-article-contents">
			<block v-for="(item, index) in article.contents" :key="index">
			<view :class="['img-item', graceSkeleton == 'ing' ? 'grace-skeleton' : '']" v-if="item.type == 'img'">
				<image :src="item.content" mode="widthFix" :data-imgurl="item.content" @click="prevImg"></image>
			</view>
			<view :class="['text-item', graceSkeleton == 'ing' ? 'grace-skeleton' : '']" v-if="item.type == 'text'">{{item.content}}</view>
			</block>
		</view>
		<!-- 评论区 start -->
		<view class="grace-body">
			<view class="grace-title grace-margin-top">相关评论</view>
			<view class="grace-comments">
				<view class="items" v-for="(item, index) in commentContents" :key="index">
					<view class="face">
						<image :src="item.face" mode="widthFix"></image>
					</view>
					<view class="body">
						<view class="header">
							<text>{{item.name}}</text><text class="grace-icons icon-zan"></text>
						</view>
						<view class="info">
							<text>{{item.date}}</text><text>{{item.zan}}</text>
						</view>
						<view class="imgs" v-if="item.imgs">
							<view v-for="(img, indexImg) in item.imgs" :key="indexImg"><image :src="img" mode="widthFix" @click.stop="showImgs(index, indexImg)"></image></view>
						</view>
						<view class="replay" v-if="item.Reply">
							<text v-for="(itemRe, indexRe) in item.Reply" :key="indexRe">{{itemRe.name}} : {{itemRe.content}}\n</text>
						</view>
						<view class="content">{{item.content}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论区 end -->
		<view style="height:50px;"></view>
		<!-- 底部回复 -->
		<view class="grace-footer">
			<view class="submit-commnets">
				<view class="icons grace-icons icon-write"></view>
				<input type="text" placeholder="说点什么吧 ..." v-model="commentContent" />
			</view>
			<view class="submit-btn" @tap="submitCommnets">发表</view>
		</view>
	</view>
</template>
<script>
var _self;
export default {
	data() {
		return {
			graceSkeleton : 'ing',
			//文章对象格式
			//{
			//	title : "标题",
			//	authorFcae : "作者头像",
			//	authorName : "作者姓名",
			//	viewNumber : "浏览次数",
			//	date       : "日期",
			//	contents   : [
			//		{type : "text", content : "文本内容"},
			//		{type : "img", content : "图片路径"},
			//		//.....
			//	]
			//}
			article : {
				contents : []
			},
			// 评论数据
			commentContents : [],
			// 评论框数据
			commentContent : ''
		}
	},
	onLoad() {
		// 加载文章详情
		uni.showLoading({});
		uni.request({
			url: 'http://grace.hcoder.net/api/news/info',
			method: 'GET',
			data: {},
			success: res => {
				console.log(res);
				var news = res.data.data;
				uni.setNavigationBarTitle({title:news.title});
				// 此处先规划骨架
				var art = {contents : []};
				for(var i = 0; i < news.contents.length; i++){
					art.contents.push({'type': news.contents[i].type});
				}
				this.article =  art;
				// 骨架屏规划后延长 500 毫秒进行数据替换
				setTimeout(() => {
					this.article = news;
					this.graceSkeleton = 'end';
				}, 500);
			},
			fail: () => {},
			complete: () => {
				uni.hideLoading();
			}
		});
		// 加载评论数据
		uni.request({
			url:'http://grace.hcoder.net/api/comments',
			success: (res) => {
				this.commentContents = res.data.data;
			}
		})
	},
	methods: {
		// 点击图片进行大图预览
		prevImg : function(e){
			var imgs = [];
			var currentUrl = e.currentTarget.dataset.imgurl;
			for(let i = 0; i < this.article.contents.length; i++){
				if(this.article.contents[i].type == 'img'){
					imgs.push(this.article.contents[i].content);
				}
			}
			uni.previewImage({
				urls    : imgs,
				current : currentUrl
			})
		},
		// 评论图片预览
		showImgs : function(commentsIndex, imgIndex){
			uni.previewImage({
				urls    : this.commentContents[commentsIndex].imgs,
				current : this.commentContents[commentsIndex].imgs[imgIndex]
			})
		},
		// 提交按钮 
		submitCommnets : function () {
			uni.showToast({
				title:"评论内容 : " + this.commentContent,
				icon:"none"
			})
		}
	}
}
</script>
<style>
.mainBody{display:flex; flex-direction:column; flex:1;}
.grace-footer{height:36px; padding:5px 0; display:flex; flex-wrap:nowrap;}
.grace-footer .submit-commnets{display:flex; width:100%; margin-left:16px; margin-right:6px; flex-wrap:nowrap; align-items:center; background:#F8F8F8; border-radius:36px; padding:0 15px;}
.grace-footer .submit-commnets .icons{width:36px; height:36px; font-size:16px; line-height:36px; text-align:center; flex-shrink:0;}
.grace-footer .submit-commnets input{width:100%; height:20px; line-height:20px; background:none; font-size:12px; margin:0 5px;}
.grace-footer .submit-btn{display:inline-block; padding:0 12px; line-height:36px; color:#3688FF; flex-shrink:0; margin-right:5px;}
.grace-article-contents image{width:700rpx !important; margin:20rpx 25rpx;}
</style>