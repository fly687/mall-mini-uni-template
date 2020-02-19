import Base64 from "@/common/Base64Utils.js";
import config from "@/common/config.js";
import tools from "@/common/tools.js";
import common from "@/common/common.js";

const request = {};

request.upload = (filePath, params) => {
	uni.showLoading({
		mask: true,
		title: '努力上传中...'
	});
	
	params = tools.processParams(params);
	return uni.uploadFile({
		url: config.uploadUrl,
		filePath: filePath,
		name: 'files',
		formData: {
			'extra': params
		}
	}).then(res => {
		uni.hideLoading();
		//console.log(res);
		if(res.length<=1) {
			uni.showToast({
				title: '出错：'+res[0].errMsg, icon:"none"
			});
		} else {
			let data = res[1].data;
			const dataType = Object.prototype.toString.call(data);
			if(dataType !== '[object Object]') {
				// params = JSON.stringify(params); //如果是对象则转换成字符串
				data = JSON.parse(data);
			}
			//console.log(data);
			if(data.errno!==0) {
				//console.log("----------------------")
				uni.showModal({
					title: '出错啦~',
					content: "上传失败了!!!",
					success() {
						//return {}
					}
				});
				//return false; //如果出现错误就返回空对象
			} else {
				//console.log("+++++++++++++++++++++++++++++")
				return data.data;
			}
		}
	});
}

request.get = (apiCode, params, options) => {
	
	const curCustom = uni.getStorageSync(config.CUR_CUSTOM);
	
	//const launch = wx.getLaunchOptionsSync();
	//console.log("--->", launch)
	
	//console.log(curCustom);
	if(!curCustom && common.needUserCheck(apiCode)) { //如果没有用户信息,则跳转到获取用户基本信息页面
		common.gotoUserPage();
		return new Promise((resove, reject)=> {reject("请先登陆")});
	}
	
	let headers = {
		'content-type':'application/x-www-form-urlencoded;charset=utf-8',
		'authToken': "test-token", //后期使用有效Token
		'openid': curCustom.openid, //用户openid
		'unionid': curCustom.unionid, //用户unionid
		'customId': curCustom.id, //用户id
		'nickname': tools.password(curCustom.nickname), //无法传中文,先转码
		'apiCode': apiCode //请求接口,如:miniAuthService.getUserInfo
	}
	
	params = tools.processParams(params);
	
	uni.showLoading({
		mask: true,
		title: '拼命加载中...'
	});
	
	return uni.request({
		url: config.reqUrl,
		header: headers,
		method: 'GET',
		data: {params: params}
	}).then(res => {
		uni.hideLoading();
		//console.log(res);
		if(res.length<=1) {
			/* uni.showToast({
				title: '出错：'+res[0].errMsg, icon:"none"
			}); */
			console.error(res[0].errMsg);
		} else {
			const data = res[1].data;
			if(data.errCode!='0') {
				/* uni.showModal({
					title: '出错啦~',
					content: data.reason,
					success() {
						//return {}
					}
				}); */
				console.error(data.reason);
				//return false; //如果出现错误就返回空对象
			} else if(data.result.needLogin=="1") { //如果需要登陆
				uni.showModal({
					title: "权限异常",
					content: data.result.message,
					success() {
						//return {}
					}
				})
				//return false
			} else {
				return data.result;
			}
		}
	}).catch((e) => {
		//console.error("请求出错", e);
		uni.showToast({
			title: '请求出错：'+e, icon:"none"
		});
		uni.hideLoading();
	});
}

export default request;