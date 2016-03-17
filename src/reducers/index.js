import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { REQUEST_LOGS, RECEIVE_LOGS, REQUEST_LOG_DETAIL, RECEIVE_LOG_DETAIL } from '../actions'

function logDetail(state = { id: '', isFetching: false, log: {} }, action) {
	switch (action.type) {
		case REQUEST_LOG_DETAIL:
			return Object.assign({}, state, {
				isFetching: true,
				id: action.logId
			});
		case RECEIVE_LOG_DETAIL:
			console.log('RECEIVE_LOG_DETAIL', action.logDetail);
			return Object.assign({}, state, {
				isFetching: false,
				log: action.logDetail
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
	routing
});

export default rootReducer;