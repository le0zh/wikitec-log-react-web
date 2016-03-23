import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from '../actions';
import jwtDecode from 'jwt-decode';

//初始state
const initialState = {
	token: null,
	userName: null,
	isAuthenticated: false,
	isAuthenticating: false,
	statusText: null
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER_REQUEST:
			return Object.assign({}, state, {
				isAuthenticating: true,
				statusText: null
			});
		case LOGIN_USER_SUCCESS:
			return Object.assign({}, state, {
				token: action.token,
				userName: jwtDecode(action.token.name),
				isAuthenticated: true,
				isAuthenticating: false,
				statusText: '登录成功'
			});
		case LOGIN_USER_FAILURE:
			return Object.assign({}, state, {
				token: null,
				userName: null,
				isAuthenticated: false,
				isAuthenticating: false,
				statusText: `${action.message}`
			});
		case LOGOUT_USER:
			return Object.assign({}, state, {
				token: null,
				userName: null,
				isAuthenticated: false,
				isAuthenticating: false,
				statusText: '退出成功'
			});
		default:
			return state;
	}
}