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

		this.context.router.push({
			pathname: `/logs/${subSystem}`,
			state: { fromDetail: true } //使用此属性标识是来自详情的返回，保留日志列表的页码
		});
	}

	render() {
		const { log, isFetching, actions, userName } = this.props;
		return (
			<LogDetail isFetching={isFetching} 
				log={log}
				userName = {userName}
				handleAddComment ={actions.startAddLogComment}
				handleStatusChange={actions.startSetLogStatus}
				backToList={this.handleBackToList}></LogDetail>
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
	const { log, isFetching } = state.logDetail;
	return {
		log: log,
		isFetching: isFetching,
		userName: state.auth.userName
	}
}

//这里还可以细分
function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogDetailPage);