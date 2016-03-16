/**
 * 路由配置文件
 * 路由里面都应该是容器组件
 */
import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import App from './containers/App'
import OverviewPage from './containers/OverviewPage'
import LoglistPage from './containers/LogListPage'

export default (
	<Route path="/" component={App}>
    <IndexRoute component={OverviewPage}/>
    <Route path="/logs/:subSystem" component={LoglistPage}></Route>
  </Route>
)