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
import * as actionCreators from '../actions'

class OverivewPage extends Component {
	componentWillMount() {
		const { actions } = this.props;

		actions.fetchSummary('wiki');
		actions.fetchSummary('vcan');
		actions.fetchTop10Logs();
	}

	render() {
		const { wikiSummary, vcanSummary, top10Logs } = this.props;

		return (
			<OverView wiki={wikiSummary} vcan={vcanSummary} top10Logs={top10Logs}></OverView>
		)
	}
}

OverivewPage.propTypes = {
	actions: PropTypes.object.isRequired,
	wikiSummary: PropTypes.object.isRequired,
	vcanSummary: PropTypes.object.isRequired,
	top10Logs: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	const { vcanSummary, wikiSummary, top10Logs } = state;
	return {
		vcanSummary,
		wikiSummary,
		top10Logs
	}
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverivewPage);