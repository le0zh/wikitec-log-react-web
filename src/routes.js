/**
 * 路由配置文件
 * 路由里面都应该是容器组件
 */
import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import { requireAuthentication } from './containers/AuthenticatedComponent'
import App from './containers/App'
import DashboardPage from './containers/DashboardPage'
import OverviewPage from './containers/OverviewPage'
import LoglistPage from './containers/LogListPage'
import LogDetailPage from './containers/LogDetailPage'
import LoginPage from './containers/LoginPage'

class Logs extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthentication(DashboardPage)}/>
    <Route path="logs" component={requireAuthentication(DashboardPage)}>
      <IndexRoute component={OverviewPage}/>
      <Route path=":subSystem" component={Logs}>
        <IndexRoute component={LoglistPage}/>
    	 <Route path=":logId" component={LogDetailPage} />
      </Route>
    </Route>
    <Route path="login" component = {LoginPage} />
  </Route>
)