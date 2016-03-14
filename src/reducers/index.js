import { combineReducers } from 'redux'
import { REQUEST_LOGS, RECEIVE_LOGS, SELECT_LOG } from '../actions'

function selectedLog(state = { subSystem: 'all', page: 1 }, action) {
	switch (action.type) {
		case SELECT_LOG:
			return action.log;
		default:
			return state;
	}
}

function logs(state = { isFetching: false, pagedResult: {} }, action) {
	switch (action.type) {
		case REQUEST_LOGS:
			return Object.assign({}, state, {
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
	selectedLog
});

export default rootReducer;