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

import LogList from '../components/LogList'
import * as actionCreators from '../actions'

function loadData(props) {
	const { actions } = props;
	const sysFilter = props.params.subSystem || 'all';
	actions.fetchLogs({ subSystem: sysFilter, page: 1 });
}

class LogListPage extends Component {
	constructor(props) {
		super(props);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	componentWillMount() {
		loadData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.subSystem !== this.props.params.subSystem) {
			loadData(nextProps);
		}
	}

	handlePageChange(nextPage) {
		const { logs, actions } = this.props;
		actions.fetchLogs({ subSystem: logs.subSystem, page: nextPage });
	}

	render() {
		const { logs } = this.props;
		return (
			<LogList logs={logs} handlePageChange={this.handlePageChange}></LogList>
		)
	}
}

LogListPage.propType = {
	logs: PropTypes.LogListPage
}

function mapStateToProps(state) {
	const { logs } = state;
	return {
		logs
	};
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) };
}

//注入全局 state并把所有 action creator 作为 actions 属性也注入组件中
//BUT:
//不要这样做！这会导致每次 action 都触发整个 TodoApp 重新渲染，你做的所有性能优化都将付之东流。
//最好在多个组件上使用 connect()，每个组件只监听它所关联的部分 state。
export default connect(mapStateToProps, mapDispatchToProps)(LogListPage);