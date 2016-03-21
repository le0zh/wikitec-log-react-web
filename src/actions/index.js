/**
 * 这里保存了action creators和constants
 * 还有一种方案是，将constants单独抽出来一个文件
 */

//isomorphic-fetch存在中文乱码的问题
//import fetch from 'isomorphic-fetch'

import 'fetch-detector'
import 'fetch-ie8'

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
 * api跟路径
 */
const API_BASE = 'http://42.96.171.42:9001/api';
//const API_BASE = 'http://127.0.0.1:3001/api';

//overview api:
//http://42.96.171.42:9001/api/log/summary/wiki
//top10logs api:
//http://42.96.171.42:9001/api/logs/top10

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