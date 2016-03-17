/**
 * 展示组件: summaryblock
 * 位置:	中间和子组件
 * 使用Redux:	否
 * 读取数据:	从 props 获取数据
 * 修改数据: 从 props 调用回调函数
 * 不直接使用redux
 */

import React, { Component, PropTypes } from 'react'

export default class SummaryBlock extends Component {
	render() {
		const { summary } = this.props;

		return (
			<div className="summary-block">
				<h4>{summary.title}</h4>
				<span className="summary-number">{`今日:${summary.todayCount}, 总数:${summary.totalCount}`}</span>
			</div>
		);
	}
}

SummaryBlock.propTypes = {
	summary: PropTypes.object.isRequired
}