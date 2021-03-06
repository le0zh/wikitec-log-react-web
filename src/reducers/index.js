import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import auth from './auth'

import {
	REQUEST_LOGS,
	RECEIVE_LOGS,
	REQUEST_LOG_DETAIL,
	RECEIVE_LOG_DETAIL,
	SET_LOG_STATUS,
	ADD_LOG_COMMENT,
	REQUEST_SUMMARY_WIKI,
	RECEIVE_SUMMARY_WIKI,
	REQUEST_SUMMARY_VCAN,
	RECEIVE_SUMMARY_VCAN,
	REQUEST_TOP10_LOGS,
	RECEIVE_TOP10_LOGS
} from '../actions'

function top10Logs(state = { isFetching: false, logs: [] }, action) {
	switch (action.type) {
		case REQUEST_TOP10_LOGS:
			return Object.assign({}, state, {
				isFetching: true,
				logs: []
			});
		case RECEIVE_TOP10_LOGS:
			return Object.assign({}, state, {
				isFetching: false,
				logs: action.json
			});
		default:
			return state;
	}
}

function vcanSummary(state = { key: 'vcan', isFetching: true, summary: [] }, action) {
	switch (action.type) {
		case REQUEST_SUMMARY_VCAN:
			return Object.assign({}, state, {
				isFetching: true,
				key: action.key
			});
		case RECEIVE_SUMMARY_VCAN:
			return Object.assign({}, state, {
				isFetching: false,
				summary: action.json
			});
		default:
			return state
	}
}

function wikiSummary(state = { key: 'wiki', isFetching: true, summary: [] }, action) {
	switch (action.type) {
		case REQUEST_SUMMARY_WIKI:
			return Object.assign({}, state, {
				isFetching: true,
				key: action.key
			});
		case RECEIVE_SUMMARY_WIKI:
			return Object.assign({}, state, {
				isFetching: false,
				summary: action.json
			});
		default:
			return state
	}
}

function logDetail(state = { id: '', isFetching: false, log: {} }, action) {
	switch (action.type) {
		case REQUEST_LOG_DETAIL:
			return Object.assign({}, state, {
				isFetching: true,
				id: action.logId
			});
		case RECEIVE_LOG_DETAIL:
			return Object.assign({}, state, {
				isFetching: false,
				log: action.logDetail
			});
		case SET_LOG_STATUS:
			return Object.assign({}, state, {
				log: Object.assign({}, state.log, {
					status: action.newStatus,
					history: action.history
				})
			});
		case ADD_LOG_COMMENT:
			return Object.assign({}, state, {
				log: Object.assign({}, state.log, {
					history: action.history
				})
			});
		default:
			return state;
	}
}

function logs(state = { subSystem: 'all', page: 1, isFetching: false, pagedResult: {} }, action) {
	switch (action.type) {
		case REQUEST_LOGS:
			return Object.assign({}, state, {
				subSystem: action.filter.subSystem,
				page: action.filter.page,
				isFetching: true
			});
		case RECEIVE_LOGS:
			return Object.assign({}, state, {
				isFetching: false,
				pagedResult: action.json,
				lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	logs,
	logDetail,
	vcanSummary,
	wikiSummary,
	top10Logs,
	auth,
	routing
});

export default rootReducer;