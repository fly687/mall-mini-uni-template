<template>
	<view class="grace-add-list">
		<view class="grace-add-list-items" v-for="(item, index) in imgLists" :key="index">
			<image :src="item" :data-imgurl="item" @tap="showImgs"></image>
			<text class="grace-add-list-remove grace-icons" @tap="removeImg" :id="'grace-items-img-'+index" :style="{color:closeBtnColor}">&#xe632;</text>
		</view>
		<view class="grace-add-list-items grace-add-list-btn" @tap="addImg" v-if="imgLists.length < maxFileNumber">
			<text class="grace-add-list-btn-icon">+</text>
			<text class="grace-add-list-btn-text">{{btnName}}</text>
		</view>
	</view>
</template>
<script>
export default {
	props:{
		maxFileNumber : {
			type : Number,
			default : 9
		},
		btnName : {
			type : String,
			default : "添加照片"
		},
		items : {
			type : Array,
			default : function () {
				return [];
			}
		},
		closeBtnColor : {
			type : String,
			default : "#666666"
		}
	},
	data() {
		return {
			imgLists : []
		}
	},
	created:function () {
		this.imgLists = this.items;
	},
	watch:{
		imgLists : function(newVal, oldVal){
			this.$emit('change', newVal);
		}
	},
    methods:{
        addImg : function(){
            var num = this.maxFileNumber - this.imgLists.length;
            if(num < 1){return false;}
            uni.showLoading({title:""});
            uni.chooseImage({
                count: num,
                sizeType: ['compressed'],
                success:(res) => {
                    this.imgLists = this.imgLists.concat(res.tempFilePaths);
                    uni.hideLoading();
                },
				fail:function(){
					uni.hideLoading();
				}
            });
        },
        removeImg : function(e){
            var index = e.currentTarget.id.replace('grace-items-img-', '');
            this.imgLists.splice(index, 1);
        },
        showImgs : function(e){
            var currentImg = e.currentTarget.dataset.imgurl;
            uni.previewImage({
              urls: this.imgLists,
              current : currentImg
            })
        },
		setItems : function(items){
			this.imgLists = items;
		}
    }
}
</script>
<style scoped>
.grace-add-list{flex-wrap:wrap; flex-direction:row;}
.grace-add-list-btn{flex-direction:column; align-items:center; justify-content:center;}
.grace-add-list-btn-text{font-size:26rpx; line-height:36rpx; text-align:center; color:#999999;}
.grace-add-list-btn-icon{font-size:70rpx; height:80rpx; line-height:80rpx; color:#999999;}
.grace-add-list-items{width:222rpx; height:222rpx; overflow:hidden; margin-bottom:12rpx; margin-right:11rpx; background-color:#F6F7F8; font-size:0; border-radius:10rpx;}
.grace-add-list-image{width:222rpx; height:222rpx;}
.grace-add-list-remove{width:50rpx; height:50rpx; line-height:50rpx; text-align:center; font-size:40rpx; position:absolute; right:0; bottom:0; color:#888888;}
</style>