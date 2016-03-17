/**
 * 容器组件
 * 位置:	最顶层，路由处理
 * 使用: Redux	是
 * 读取数据:	从 Redux 获取 state
 * 修改数据:	向 Redux 发起 actions
 * 容器组件使用 connect() 方法连接 Redux
 */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import OverView from '../components/Overview'

class OverivewPage extends Component {
	render() {
		return (
			<OverView></OverView>
		)
	}
}

module.exports = OverivewPage;