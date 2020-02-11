<template>
	<view>
		<searchComponent/>
		
		<carouseComponent :swiperItems="swiperItems"/>
		<noticeComponent :dataSource="speakerMsgs" v-if="speakerMsgs.length>0"/>
		<view class="common-line"></view>
		
		<!-- 推荐图标 start -->
		<view class="index-module">
			<moduleComponent :classes="classes"/>
		</view>
		<!-- 推荐图标 end -->
		<view class="common-line"></view>
		<ProductListComponent @onClick="onClick" titleIcon="icon-shuiguopingguo" titleName="当季爆品" :proList="productCurrentList"/>
		<view class="common-line"></view>
		
		<graceToTop :top="top" color="#FF0036"></graceToTop>
		<view class="zsl-bottom" >&copy;版权所有</view>
	</view>
</template>
<script>
var that;
import graceToTop from '@/graceUI/components/graceToTop.vue';

import searchComponent from './searchComponent.vue';
import carouseComponent from "./carouseComponent.vue";
import noticeComponent from "./noticeComponent.vue";
import moduleComponent from './moduleComponent.vue';
import ProductListComponent from './ProductListComponent.vue';

export default {
	data() {
		return {
			swiperItems : [],
			indexCate : [],
			youlikes:[],
			indexCateAndProducts : [],
			top: 0,
			menu1Show : false,
            menu1Top  : 0,
			speakerMsgs : [],
			classes : [],
			productCurrentList: [], //当季
			coupon:null
		}
	},
	onPageScroll:function(e){
		this.top = e.scrollTop;
	},
	onLoad() {
		that = this;
		that.loadData();
	},
	methods: {
		loadData: function() {
			that.$request.get("miniIndexService.index", {}).then((res)=> {
				console.log(res);
				that.swiperItems = res.carouseList; //轮播图
				that.speakerMsgs = res.noticeList; //通知公告
				that.classes = res.moduleList; //功能模块
				that.coupon = res.coupon; //优惠券
				that.productCurrentList = res.productList; //当季
			});
		},
		onClick: function() {
			uni.navigateTo({
				url: "../product/listProduct?type=1"
			})
		}
	},
	components : {
		graceToTop,
		
		searchComponent,
		carouseComponent,
		noticeComponent,
		moduleComponent,
		ProductListComponent,
    }
}
</script>
<style>
/* 九宫格个性修饰 */
.grace-grids .items{width:20%; padding:25rpx 0; box-sizing:border-box;}
.grace-grids .items .text{font-size:20rpx;}
.grace-grids .icon image{width:80rpx; height:80rpx;}
/* 商品图片固定宽高 防止抖动 */
.grace-img-card > .item > .img{width:340rpx; height:340rpx;}
.grace-img-card > .item > .title{overflow:hidden;}

.index-module {
	/* padding: 10px; */
	padding: 0px 10px;
}

.zsl-bottom {
	width:100%; min-height: 50px; text-align:center; line-height: 50px; color:#ccc;
}
</style>