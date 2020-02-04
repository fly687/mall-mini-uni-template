<script>
	import tools from "@/common/tools.js";
export default {
	onLaunch: function(options) {
		console.log('App Launch')
		/* uni.showModal({
			title: '系统提示',
			content: JSON.stringify(options)
		}) */
		tools.checkLogin();
		
		//#ifdef APP-PLUS
		//tools.upgrade(false);
		//#endif
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	},
	onUnload: function() {
		console.log("-- onUnload --")
	}
}
</script>
<style>
@import "./graceUI/graceIcons.css";
@import "./graceUI/graceUI.css";
@import './common.css';
@import "./style/myIcons.css";
@import './style/public.css';
</style>