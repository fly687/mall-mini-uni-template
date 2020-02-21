import config from './config.js';
import tools from "./tools.js";

/**
 * 生成随机密钥
 */
function getRandomKey() {
	const user = getLoginUser();
	const seconds = Date.parse(new Date())/1000;
	const res = user.id+"_"+parseInt(Math.random()*seconds);
	return res;
}

function getLoginUser() {
	const user = uni.getStorageSync(config.CUR_CUSTOM);
	return user;
}

/**
 * 缓存数据,带到期时间
 * @param {Object} key
 * @param {Object} value
 * @param {Object} seconds
 */
function setStorageTime(key, value, seconds) {
	var timestamp = parseInt(Date.parse(new Date())/1000); //当前时间的秒数
	const dataType = Object.prototype.toString.call(value);
	let isObj = false;
	if(dataType === '[object Object]') { //如果value是一个对象
		isObj = true;
	}
	let newData = {
		isObj: isObj,
		timeout: timestamp+seconds,
		value: value
	};
	uni.setStorageSync(key, JSON.stringify(newData));
}

/**
 * 获取缓存数据,带到期时间
 * @param {Object} key
 */
function getStorageTime(key) {
	var timestamp = parseInt(Date.parse(new Date())/1000); //当前时间的秒数
	const dataStr = uni.getStorageSync(key);
	if(dataStr) {
		const data = JSON.parse(dataStr);
		//console.log(data);
		if(timestamp>data.timeout) { //表示过期
			uni.removeStorageSync(key);
			return null;
		} else {
			/* if(data.isObj) {
				return JSON.parse(data.value);
			} else {
				return data.value;
			} */
			return data.value;
		}
	} else {
		return null;
	}
}

/**
 * 将参数对象转换成参数形式
 * @param {Object} obj
 */
function obj2Query(obj) {
	let query = "?";
	for(let key in obj) {
		query += (key+"="+obj[key]+"&");
	}
	// console.log(query)
	return query;
}

/**
 * 获取当前页面
 */
function getCurrentPage() {
	const pages = getCurrentPages();
	// console.log(pages)
	const curPage = pages[pages.length-1];
	const route = curPage.route;
	const options = curPage.options;
	const url = "/"+route + obj2Query(options);
	
	//console.log(url);
	return url;
}

function gotoUserPage() {
	const curPage = getCurrentPage();
	const pwd = escape(curPage);
	// console.log(curPage, pwd);
	uni.showToast({
		title: '为获取优质服务,请先授权', 
		icon:"none",
		success() {
			//跳转到登陆页面
			uni.redirectTo({
				url: '/pages/login/wx?url='+pwd
			});
		}
	});
	//console.log(tools.unPassword(pwd));
}

function gotoTargetPage(urlPwd) {
	const url = unescape(urlPwd);
	// console.log(url);
	try { //URL可能是民航也可能是内页,所以执行两个不同的方法,但只能成功一个
		uni.redirectTo({
			url: url
		});
		uni.switchTab({
			url: url
		});
		//console.log("-----------")
	} catch(e) {
	}
}

function needUserCheck(apiCode) {
	const ignore = [".getUserInfo", "miniIndexService.index", "miniProductService.list"]; //这些请求不需要用户验证
	let needCheck = true;
	ignore.map((str)=> {
		if(apiCode.indexOf(str)>=0) {needCheck = false;}
	})
	return needCheck;
}

export default {
	getLoginUser: getLoginUser,
	setStorageTime: setStorageTime,
	getStorageTime: getStorageTime,
	obj2Query: obj2Query,
	getCurrentPage: getCurrentPage,
	gotoUserPage: gotoUserPage,
	gotoTargetPage: gotoTargetPage,
	needUserCheck: needUserCheck,
	getRandomKey: getRandomKey,
}