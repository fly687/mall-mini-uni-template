<template>
	<view class="grace-select-tags">
		<text class="grace-select-tag" 
		:style="{width : itemWidth, 'background-color' : item.checked ? selectedColor : '#F6F7F8', fontSize:fontSize}" 
		@tap.stop="graceSelectChange(index)" v-for="(item, index) in tagsData" :key="index" 
		:class="[item.checked ? 'grace-checked' : '']">{{item.name}}</text>
	</view>
</template>
<script>
Array.prototype.indexOf = function (val) {
	for (var i = 0; i < this.length; i++) {if (this[i] == val) return i;}
	return -1;
};
export default {
	props: {
		type : { type: String, default: "radio"},
		items : { type: Array, default : function(){return []}},
		itemWidth : {type: String, default:"220rpx"},
		selectedColor:{type: String, default:"#3688FF"},
		fontSize : { type: String, default: "26rpx"}
	},
	created : function(){
		this.tagsData = this.items;
	},
	data() {
		return {
			tagsData : []
		}
	},
	methods:{
		graceSelectChange : function(index){
			if(this.type == 'radio'){
				for (var i = 0; i < this.tagsData.length; i++){this.tagsData[i].checked = false;}
				this.tagsData[index].checked = true;
				this.$emit("change", this.tagsData[index].value);
			}else{
				if(this.tagsData[index].checked){
					this.tagsData[index].checked = false;
				}else{
					this.tagsData[index].checked = true;
				}
				var sedRes = [];
				for (var i = 0; i < this.tagsData.length; i++){
					if(this.tagsData[i].checked){
						sedRes.push(this.tagsData[i].value);
					}
				}
				this.$emit("change", sedRes);
			}
		}
	}
}
</script>
<style scoped>
.grace-select-tags{padding:0; flex-direction:row; flex-wrap:wrap;}
.grace-select-tag{height:70rpx; line-height:70rpx; text-align:center; margin:10rpx; font-size:24rpx; border-radius:8rpx;}
.grace-checked{color:#FFFFFF;}
</style>