<gracePage :customHeader="false">
		<!-- 使用自定义底部导航时为主体增加底部 padding 避免遮盖 -->
		<view slot="gBody" class="grace-body" style="padding-bottom:150rpx;">
			<!-- 购物车为空 -->
			<view v-if="shoppingCard.length < 1" style="margin-top:150px;">
				<graceEmpty>
					<view slot="img" class="empty-view">
						<!-- 请根据您的项目要求制作并更换为空图片 -->
						<image class="empty-img" mode="widthFix" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/empty.png"></image>
					</view>
					<text slot="text" class="grace-text-small grace-gray">您的购物车空空如也~</text>
				</graceEmpty>
			</view>
			<!-- 购物车主结构  -->
			<view class="grace-shoppingcard" v-for="(item, index) in shoppingCard" :key="index">
				<view class="grace-space-between grace-flex-vcenter">
					<view class="grace-shopp-name">
						<graceCheckBtn @change="shopChange" :parameter="[index]" :checked="item.checked">
							<text class="grace-h5 grace-bold">{{item.shopName}}</text>
						</graceCheckBtn>
					</view>
					<view class="grace-shopp-go grace-nowrap grace-flex-end">
						<text class="grace-text-small">进店》</text>
						<text class="grace-text-small grace-icons icon-arrow-right"></text>
					</view>
				</view>
				<view style="height:25rpx;"></view>
				<view class="grace-shoppingcard-goods" v-for="(goods, indexItem) in item.items" :key="indexItem">
					<view class="grace-shoppingcard-goods-checkbtn">
						<graceCheckBtn :checked="goods.checked" @change="itemChange" 
						:parameter="[index+'-'+indexItem]"></graceCheckBtn>
					</view>
					<image :src="goods.img" class="grace-shoppingcard-goods-image" mode="widthFix"></image>
					<view class="grace-shoppingcard-goods-body">
						<view class="grace-shoppingcard-goods-title">{{goods.goodsName}}</view>
						<view class="grace-space-between">
							<text class="grace-shoppingcard-goods-price">￥{{goods.price}}</text>
							<view class="grace-shoppingcard-goods-number">
								<graceNumberBox :disabled="true" :index="indexItem" :datas="index+''" inputPadding="5rpx" 
								:value="goods.count" :maxNum="100" :minNum="1" v-on:change="numberChange"></graceNumberBox>
							</view>
						</view>
						<text class="grace-shoppingcard-remove grace-icons icon-remove" 
						@tap="removeGoods" :id="'removeIndex_' + index + '_' + indexItem">删除</text>
					</view>
				</view>
			</view>
		</view>
		<view slot="gFooter" class="grace-nowrap grace-flex-vcenter grace-border-t" style="background-color:#FFFFFF;">
			<view class="grace-shoppingcard-checkbtn grace-nowrap grace-flex-vcenter">
				<graceCheckBtn :checked="true" @change="itemChangeAll">
					<text class="grace-text">{{selectText}}</text>
				</graceCheckBtn>
			</view>
			<view class="grace-shoppingcard-count grace-nowrap grace-flex-vcenter">
				<text class="grace-text">合计 :</text>
				<text style="font-size:32rpx; color:#F00;">￥{{totalprice}}</text>
			</view>
			<view class="grace-shoppingcard-checkout grace-bg-red" @tap="checkout">立即结算</view>
		</view>
	</gracePage>
</template>
<script>
import gracePage from "../../graceUI/components/gracePage.vue";
import graceEmpty from "../../graceUI/components/graceEmptyNew.vue";
import graceCheckBtn from '../../graceUI/components/graceCheckBtn.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';
export default {
	data() {
		return {
			// 总价
			totalprice : '',
			// 选择文本
			selectText : '全选',
			// 购物车数据 可以来自 api 请求或本地数据
			shoppingCard : [
			{
				"checked" : true,
				"shopName": "hcoder 官方店",
				"shopId": "1",
				"items": [
					{
						"goodsId": 1,
						"goodsName": "hcoder 演示商品",
						"price": 10.00,
						"count": 1,
						"img": "https://m.360buyimg.com/babel/jfs/t1/3730/7/3438/394579/5b996f2eE1727c59e/373cf10d42a53b72.jpg",
						"checked" : true
					},
					{
						"goodsId": 2,
						"goodsName": "dcloud 演示商品",
						"price": 20.00,
						"count": 1,
						"img": "https://img14.360buyimg.com/n7/jfs/t1/1156/8/14017/123589/5bd9a4e8E7dbd4a15/70fbbccdf8811111.jpg",
						"checked" : true
					}
				]
			},
			{
				"checked" : true,
				"shopName": "grace 官方旗舰店",
				"shopId": "2",
				"items": [
					{
						"goodsId": 3,
						"goodsName": "uni-app 演示商品",
						"price": 30.00,
						"count": 2,
						"img": "https://img10.360buyimg.com/n7/jfs/t19690/263/1947634738/190301/ad172397/5adfe5eaN42591f8c.jpg",
						"checked" : true
					}
				]
			}
		]}
	},
	onLoad : function(){
		// 初始化时候计算总价，如果使用api 获取购物车项目在 api 请求完成后执行此函数
		this.countTotoal();
	},
	methods:{
		//计算总计函数
		countTotoal:function(){
			var total = 0;
			for (var i = 0; i < this.shoppingCard.length; i++){
				for (var ii = 0; ii < this.shoppingCard[i].items.length; ii++){
					if(this.shoppingCard[i].items[ii].checked){
						total += Number(this.shoppingCard[i].items[ii].price) * Number(this.shoppingCard[i].items[ii].count);
					}
				}
			}
			this.totalprice = total;
		},
		numberChange:function(data){
			this.shoppingCard[data[2]].items[data[1]].count = data[0];
			//计算总价
			this.countTotoal();
		},
		removeGoods : function(e){
			var index = e.currentTarget.id.replace('removeIndex_', '');
			index = index.split('_');
			var index1 = Number(index[0]);
			var index2 = Number(index[1]);
			uni.showModal({
				title: '确认提醒',
				content: '您确定要移除此商品吗？',
				success:(e)=>{
					if (e.confirm) {
						this.shoppingCard[index1].items.splice(index2, 1);
						// 是否全部删除包含商铺
						if(this.shoppingCard[index1].items.length < 1){
							this.shoppingCard.splice(index1, 1);
						}
						//计算总价
						this.countTotoal();
					}
				}
			})
		},
		checkout:function(){
			uni.showToast({
				title: '计算的数据保存在 shoppingCard 变量内 ^_^',
				icon : "none"
			})
		},
		// 店铺选中按钮状态切换
		shopChange : function (e) {
			var index = Number(e[1]);
			this.shoppingCard[index].checked = e[0];
			for(let i = 0; i < this.shoppingCard[index].items.length; i++){
				this.shoppingCard[index].items[i].checked = e[0];
			}
			this.shoppingCard.splice(index, this.shoppingCard[index]);
			this.countTotoal();
		},
		// 商品选中
		itemChange : function (e) {
			var indexs = e[1].toString();
			var index = indexs.split('-');
			index[0] = Number(index[0]);
			index[1] = Number(index[1]);
			this.shoppingCard[index[0]].items[index[1]].checked = e[0];
			this.shoppingCard.splice(index[0], this.shoppingCard[index[0]]);
			var checkedNum = 0;
			for(let i = 0; i < this.shoppingCard[index[0]].items.length; i++){
				if(!this.shoppingCard[index[0]].items[i].checked){checkedNum++;}
			}
			if(checkedNum < 1){
				this.shoppingCard[index[0]].checked = true;
			}else{
				this.shoppingCard[index[0]].checked = false;
			}
			this.shoppingCard = this.shoppingCard;
			this.countTotoal();
		},
		itemChangeAll : function (e) {
			this.selectText = e[0] ? '全选' : '全不选';
			for(var i = 0; i < this.shoppingCard.length; i++){
				this.shoppingCard[i].checked = e[0];
				for(var ii = 0; ii < this.shoppingCard[i].items.length; ii++){
					this.shoppingCard[i].items[ii].checked = e[0];
				}
			}
			this.countTotoal();
		}
	},
	components:{
		gracePage,
		graceNumberBox,
		graceEmpty,
		graceCheckBtn
	}
}
</script>
<style>
page{background:#F8F8F8;}
.empty-view{width:280rpx; height:280rpx; border-radius:280rpx; background-color:#F6F7F8; margin-top:30rpx;}
.empty-img{width:220rpx; height:200rpx; margin:40rpx; border-radius:200rpx;}
.grace-shoppingcard{background:#FFFFFF; border-radius:8rpx; padding:20rpx; margin-bottom:20rpx;}
.grace-shopp-name{width:500rpx;}
.grace-shopp-go{width:120rpx;}
.grace-shoppingcard-goods{margin:10rpx 0; display:flex; flex-wrap:nowrap;}
.grace-shoppingcard-goods-checkbtn{width:60rpx; flex-shrink:0;}
.grace-shoppingcard-goods-image{width:120rpx; margin-right:20rpx; flex-shrink:0;}
.grace-shoppingcard-goods-body{width:100%;}
.grace-shoppingcard-goods-title{line-height:1.4em;}
.grace-shoppingcard-goods-price{color:#F00; font-size:32rpx; display:flex; flex-wrap:nowrap; justify-content:space-between;}
.grace-shoppingcard-goods-number{padding:2px 0;}
.grace-shoppingcard-remove{display:block; text-align:right; line-height:50rpx; margin-top:30rpx; color:#CCCCCC; font-size:24rpx;}
.grace-shoppingcard-checkbtn{width:200rpx; margin-left:50rpx; flex-shrink:0;}
.grace-shoppingcard-count{width:600rpx;}
.grace-shoppingcard-checkout{width:280rpx; height:100rpx; line-height:100rpx; font-size:28rpx; text-align:center; flex-shrink:0;}
</style>