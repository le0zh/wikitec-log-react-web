/**
 * 路由配置文件
 */
import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import App from './containers/App'
import LogList from './components/Loglist'

export default (
	<Route path="/" component={App}>
    <IndexRoute component={LogList}/>
  </Route>
)