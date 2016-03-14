/**
 * Action Creators
 */

import fetch from 'isomorphic-fetch'

export const REQUEST_LOGS = 'REQUEST_LOGS';
export const RECEIVE_LOGS = 'RECEIVE_LOGS';
export const SELECT_LOG = 'SELECT_LOG';

const API_BASE = 'http://42.96.171.42:9001/api';

/**
 *  选中一个日志
 * @param  {[type]} logId [description]
 * @return {[type]}       [description]
 */
export function selectLog(logId) {
	return {
		type: SELECT_LOG,
		logId
	}
}

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

/**
 * 一个异步的action creator
 */
export function fetchLogs(filter) {
	console.log("start action, fetchLogs", filter);

	return dispatch => {
		//开始请求
		dispatch(requestLogs(filter));

		const { subSystem, page } = filter;
		return fetch(`${API_BASE}/logs/${subSystem}/${page}`)
			.then(response => response.json())
			.then(json => receiveLogs(filter, json))
	};
}