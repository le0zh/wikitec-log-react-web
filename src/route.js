import React from 'react'
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

import App from './app'
import LogList from './components/Loglist'

export default class RouterTest extends React.Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={LogList}/>
				</Route>
			</Router>
		);
	}
}