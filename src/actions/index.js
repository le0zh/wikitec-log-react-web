/**
 * 这里保存了action creators和constants
 * 还有一种方案是，将constants单独抽出来一个文件
 */

//isomorphic-fetch存在中文乱码的问题
import fetch from 'isomorphic-fetch'

// import 'fetch-detector'
// import 'fetch-ie8'
import { browserHistory } from 'react-router'

import { checkHttpStatus, parseJSON } from '../utils';

/**
 * 日志列表相关action 
 */
export const REQUEST_LOGS = 'REQUEST_LOGS';
export const RECEIVE_LOGS = 'RECEIVE_LOGS';

/**
 * 日志详情相关action
 */
export const REQUEST_LOG_DETAIL = 'REQUEST_LOG_DETAIL';
export const RECEIVE_LOG_DETAIL = 'RECEIVE_LOG_DETAIL';

/**
 * 概况相关action
 */
export const REQUEST_SUMMARY_WIKI = 'REQUEST_SUMMARY_WIKI';
export const RECEIVE_SUMMARY_WIKI = 'RECEIVE_SUMMARY_WIKI';
export const REQUEST_SUMMARY_VCAN = 'REQUEST_SUMMARY_VCAN';
export const RECEIVE_SUMMARY_VCAN = 'RECEIVE_SUMMARY_VCAN';
export const REQUEST_TOP10_LOGS = 'REQUEST_TOP10_LOGS';
export const RECEIVE_TOP10_LOGS = 'RECEIVE_TOP10_LOGS';

/**
 * 用户相关 
 */

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';

/**
 * api跟路径
 */
//const API_BASE = 'http://42.96.171.42:9001/api';
const API_BASE = 'http://127.0.0.1:3001/api';

//overview api:
//http://42.96.171.42:9001/api/log/summary/wiki
//top10logs api:
//http://42.96.171.42:9001/api/logs/top10

/**
 * 用户相关
 */
function loginUserSuccess(token) {
	localStorage.setItem('token', token);
	return {
		type: LOGIN_USER_SUCCESS,
		token: token
	}
}

function loginUserFailure(error) {
	localStorage.removeItem('token');
	return {
		type: LOGIN_USER_FAILURE,
		message: error
	}
}

function loginUserRequest() {
	return {
		type: LOGIN_USER_REQUEST
	}
}

function logout() {
	localStorage.removeItem('token');
	return {
		type: LOGOUT_USER
	}
}

export function loginUser(email, password, redirect = '/') {
	return dispatch => {
		dispatch(loginUserRequest());

		return fetch(`${API_BASE}/auth/token`, {
				method: 'post',
				mode: 'cors',
				headers: {
					//'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: email, password: password })
					//body: { "email": "xinliang.zhu@wikitec.com.cn", "password": "aaa" }
			})
			.then(checkHttpStatus)
			.then(parseJSON)
			.then(json => {
				//todo 检查token是否正确
				dispatch(loginUserSuccess(json.token));

				//页面跳转
				browserHistory.push(redirect);
			})
			.catch(error => {
				console.log(error);
				dispatch(loginUserFailure(error));
			});
	}
}

export function logoutAndRedirect() {
	return dispatch => {
		dispatch(logout());

		//退出后跳转到登录页面
		browserHistory.push('/login');
	}
}

/**
 * top10日志
 */
function requestTop10Logs() {
	return {
		type: REQUEST_TOP10_LOGS
	}
}

function receiveTop10Logs(json) {
	return {
		type: RECEIVE_TOP10_LOGS,
		json
	}
}

export function fetchTop10Logs() {
	return dispatch => {
		dispatch(requestTop10Logs());

		return fetch(`${API_BASE}/logs/top10`)
			.then(response => response.json())
			.then(json => dispatch(receiveTop10Logs(json)))
	}
}

/**
 * 概览相关
 */
function requestSummary(key) {
	return {
		type: key === 'vcan' ? REQUEST_SUMMARY_VCAN : REQUEST_SUMMARY_WIKI,
		key
	}
}

function receiveSummary(key, json) {
	return {
		type: key === 'vcan' ? RECEIVE_SUMMARY_VCAN : RECEIVE_SUMMARY_WIKI,
		json
	}
}

export function fetchSummary(key) {
	return dispatch => {
		dispatch(requestSummary(key));

		return fetch(`${API_BASE}/log/summary/${key}`)
			.then(response => response.json())
			.then(json => dispatch(receiveSummary(key, json)))
	}
}

/**
 * 日志详情相关
 */
function requestLogDetail(logId) {
	return {
		type: REQUEST_LOG_DETAIL,
		logId
	}
}

function receiveLogDetail(logDetail) {
	return {
		type: RECEIVE_LOG_DETAIL,
		logDetail
	}
}

export function fetchLogDetail(logId) {
	return dispatch => {
		//开始请求
		dispatch(requestLogDetail(logId));

		return fetch(`${API_BASE}/log/detail/${logId}`)
			.then(response => response.json())
			.then(json => dispatch(receiveLogDetail(json)))
	}
}

/**
 * 日志列表相关
 */
function requestLogs(filter) {
	return {
		type: REQUEST_LOGS,
		filter
	}
}

function receiveLogs(filter, json) {
	return {
		type: RECEIVE_LOGS,
		receivedAt: Date.now(),
		filter,
		json
	}
}

export function fetchLogs(filter) {
	return dispatch => {
		//开始请求
		dispatch(requestLogs(filter));

		const { subSystem, page } = filter;
		return fetch(`${API_BASE}/logs/${subSystem}/${page}`)
			.then(response => response.json())
			.then(json => dispatch(receiveLogs(filter, json)))
	};
}