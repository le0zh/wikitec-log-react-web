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
 * api跟路径
 */
const API_BASE = 'http://42.96.171.42:9001/api';

//overview api:
//http://42.96.171.42:9001/api/log/summary/wiki

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
	console.log('start fetch log detail:', logId);
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