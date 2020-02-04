<template>
    <view>
		<graceHeader>
			<view class="grace-body" style="margin-top:20rpx;">
				<graceNav activeLineBg="linear-gradient(to right, #FF0000, #FF0036)" :items="tabs" :currentIndex="swiperCurrentIndex" @change="navChange" fontSize="24rpx" :size="100"></graceNav>
			</view>
		</graceHeader>
        <swiper 
		:current="swiperCurrentIndex" 
		@change="swiperChange" 
		:style="{height:tabHeight+'px'}">
            <!-- 循环新闻项目 -->
            <swiper-item v-for="(news, newsIndex) in newsAll" :key="newsIndex">
                <scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-body grace-margin-top">
						<!-- 空数据 -->
						<view style="margin-top:150rpx;" v-if="loadingTypes[newsIndex] == 5">
							<graceEmpty text="此分类下暂无新闻" :iconSize="80" :iconType="4" iconColor="#999999"></graceEmpty>
						</view>
						<block v-for="(item, index) in news" :key="index">
							<navigator url="../artInfo/artInfo" class="grace-news-list grace-border-b" v-if="item.imgs.length < 3">
								<view class="item">
									<view class="img img-l">
										<image :src="item.imgs[0]" mode="widthFix"></image>
									</view>
									<view class="body">
										<view class="title">{{item.title}}</view>
										<view class="desc">{{item.desc}}</view>
									</view>
								</view>
								<view class="desc">
									<text class="grace-icons icon-eye"></text> {{item.viewnum}}
									<text class="grace-icons icon-write" style="margin-left:10px;"></text> {{item.author}} - [ {{item.catename}} ]
									<text style="float:right;">{{item.like}}</text>
									<text class="grace-icons icon-zan" style="float:right; margin-right:6px;"></text>
								</view>
							</navigator>
							<navigator url="../artInfo/artInfo" class="grace-news-list grace-border-b" v-if="item.imgs.length >= 3">
								<view class="title">{{item.title}}</view>
								<view class="imgs">
									<view class="imageIn" v-for="(img,imgIndex) in item.imgs" :key="imgIndex"><image :src="img" mode="widthFix"></image></view>
								</view>
								<view class="desc">
									<text class="grace-icons icon-eye"></text> {{item.viewnum}}
									<text class="grace-icons icon-write" style="margin-left:10px;"></text> {{item.author}} - [ {{item.catename}} ]
									<text style="float:right;">{{item.like}}</text>
									<text class="grace-icons icon-zan" style="float:right; margin-right:6px;"></text>
								</view>
							</navigator>
						</block>
						<graceLoading :loadingType="loadingTypes[newsIndex]"></graceLoading>
					</view>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>
<script>
import graceNav from "../../graceUI/components/graceNavBar.vue";
import graceLoading from "../../graceUI/components/graceLoading.vue";
import graceEmpty from '../../graceUI/components/graceEmpty.vue';
import graceHeader from '../../graceUI/components/graceHeader.vue';
var systemInfo = require('../../graceUI/jsTools/systemInfo.js');
export default {
    data() {
        return {
            swiperCurrentIndex: 0,
            tabHeight : 300,
			//分类数据
			tabsAll : [],
            tabs : [],
			// 新闻信息保存数组
			newsAll : [],
			// 每个选项卡对应的分页
			pages : [],
			// 加载状态
			loadingTypes : []
        }
    },
    onLoad:function(){
		//获取屏幕高度及比例
		var system = systemInfo.info();
		this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
		
		uni.request({
			// 此处可以获取分类 根据分类自己拼接请求地址
			// 格式请参考 接口 [ 浏览器运行直接查看 ]
			url     : 'http://grace.hcoder.net/api/tabs',
			method  : 'GET',
			data    : {},
			success : res => {
				// 初始化新闻列表数组 元素数量与分类匹配
				this.tabsAll = res.data.data;
				for(var i = 0; i < this.tabsAll.length; i++){
					this.newsAll.push([]);
					this.tabs.push(this.tabsAll[i].txt);
					this.pages.push(1);
					this.loadingTypes.push(0);
				}
				this.getNews();
			}
		});
    },
	// 下拉刷新事件
    onPullDownRefresh: function (){
		// 页码重置 
		this.pages[this.swiperCurrentIndex] = 1;
		this.loadingTypes[this.swiperCurrentIndex] = 0;
		this.getNews();
    },
    methods:{
        navChange: function (e) {
            this.swiperCurrentIndex = e;
        },
        swiperChange: function(e){
            var index = e.detail.current;
            this.swiperCurrentIndex = index;
			// 如果切换时尚未读取数据则读取
			if(this.newsAll[this.swiperCurrentIndex].length < 1 && this.loadingTypes[this.swiperCurrentIndex] != 5){ this.getNews(); }
        },
        //每个选项滚动到底部
        scrollend:function(e){
			console.log('loadmore.....');
			// 判断加载状态避免多次滚动时有加载尚未完成
			if(this.loadingTypes[this.swiperCurrentIndex] == 1 || this.loadingTypes[this.swiperCurrentIndex] == 2){return ;}
			this.getNews();
        },
		// 加载新闻
		getNews : function(){
			// 当前正在展示的 选项index 为 this.swiperCurrentIndex
			// 那么分类 id 应该为 this.tabsAll[this.swiperCurrentIndex].id
			console.log('类型 : ' + this.tabs[this.swiperCurrentIndex] + ' 第'+ this.pages[this.swiperCurrentIndex] +'页');
			this.loadingTypes.splice(this.swiperCurrentIndex, 1, 1);
			console.log('http://grace.hcoder.net/api/news/index/'+this.tabsAll[this.swiperCurrentIndex].id+'/'+this.pages[this.swiperCurrentIndex]);
			uni.request({
				// 此处可以获取分类 根据分类自己拼接请求地址
				// 分类 id 、页码 都已经获取到了
				url      : 'http://grace.hcoder.net/api/news/index/'+this.tabsAll[this.swiperCurrentIndex].id+'/'+this.pages[this.swiperCurrentIndex],
				method   : 'GET',
				data     : {},
				success  : res => {
					if(res.data.status == 'ok'){
						// 第一页
						if(this.pages[this.swiperCurrentIndex] == 1){
							this.newsAll.splice(this.swiperCurrentIndex, 1 , res.data.data);
						}
						// 之后的加载页
						else{
							this.newsAll[this.swiperCurrentIndex] = this.newsAll[this.swiperCurrentIndex].concat(res.data.data);
						}
						// 页码增加
						this.pages[this.swiperCurrentIndex]++;
						this.loadingTypes.splice(this.swiperCurrentIndex, 1, 6);
					}else if(res.data.status == 'empty'){
						console.log('empty');
						this.loadingTypes.splice(this.swiperCurrentIndex, 1, 5);
					}else if(res.data.status == 'nomore'){
						console.log('nomore');
						this.loadingTypes.splice(this.swiperCurrentIndex, 1, 2);
					}
				},
				complete: () => {
					uni.stopPullDownRefresh();
				}
			});
		}
    },
    components:{
        graceLoading,
		graceNav,
		graceEmpty,
		graceHeader
    }
}
</script>
<style>
page{background:#FFFFFF;}
</style>