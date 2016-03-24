import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { loginUserSuccess } from './actions';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

// 判断当前是否有token
let token = localStorage.getItem('token');
if (token !== null) {
	store.dispatch(loginUserSuccess(token));
}

render(
	<Root store={store} history={history} />,
	document.getElementById('react-content')
)