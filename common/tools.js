/** App更新 */
import request from "./request.js";
import config from './config.js';
import Base64 from "./Base64Utils.js";
import common from "./common.js";

function showMsg(msg) {
	plus.nativeUI.alert(msg);
}

const checkLogin = function() {
	var user = uni.getStorageSync(config.CUR_CUSTOM);
	//console.log(user);
	if(!user) {
		//#ifdef MP-WEIXIN
		uni.showToast({
			title: '为获取优质服务,请先授权', 
			icon:"none",
			success() {
				//跳转到登陆页面
				uni.redirectTo({
					url: '/pages/login/wx'
				});
			}
		});
		//#endif
		
	} else {
		// user = JSON.parse(user); //转换成JSON对象
		uni.redirectTo({
			url: '/pages/index/index'
		});
	}
}

/**
 * 加密字符串
 */
function password(str) {
	const res = Base64.encodeBase64(encodeURI(str));
	return res;
}

function unPassword(str) {
	const res = Base64.decodeBase64(decodeURI(str));
	return res;
}

/**
 * 加密请求参数
 * @param {Object} params
 */
function processParams(params) {
	const paramsType = Object.prototype.toString.call(params);
	if(paramsType === '[object Object]') {
		params = JSON.stringify(params); //如果是对象则转换成字符串
	}
	
	params = encodeURI(params);
	params = Base64.encodeBase64(params);
	return params;
}

export default {
	checkLogin: checkLogin,
	password: password,
	unPassword: unPassword,
	processParams: processParams
};