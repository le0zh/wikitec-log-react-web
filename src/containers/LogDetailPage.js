/**
 * 容器组件: 日志详情页面
 * 位置:	最顶层，路由处理
 * 使用: Redux	是
 * 读取数据:	从 Redux 获取 state
 * 修改数据:	向 Redux 发起 actions
 * 容器组件使用 connect() 方法连接 Redux
 */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LogDetail from '../components/LogDetail'
import * as actionCreators from '../actions'

class LogDetailPage extends Component {
	constructor(props) {
		super(props);

		this.handleBackToList = this.handleBackToList.bind(this);
	}

	componentWillMount() {
		const { actions, params } = this.props;
		actions.fetchLogDetail(params.logId);
	}

	handleBackToList() {
		const { subSystem } = this.props.params;
		this.context.router.push(`/logs/${subSystem}`);
	}

	render() {
		const { log, isFetching } = this.props;
		console.log(log);
		return (
			<LogDetail isFetching={isFetching} log={log} backToList={this.handleBackToList}></LogDetail>
		);
	}
}

LogDetailPage.contextTypes = {
	router: PropTypes.object
};

LogDetailPage.propTypes = {
	log: PropTypes.object.isRequired,
	isFetching: PropTypes.bool
}

//将State中关于日志详情的部分注入到LogDetailPage的props
function mapStateToProps(state) {
	console.log('state', state);

	const { log, isFetching } = state.logDetail;
	return {
		log: log,
		isFetching: isFetching
	}
}

//这里还可以细分
function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogDetailPage);