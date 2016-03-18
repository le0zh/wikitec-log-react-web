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
	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		//暂时不用跳转，因为左侧菜单同步更新存在问题.
		this.context.router.push(`/logs/${this.props.summary.key}`)
	}

	render() {
		const { summary } = this.props;

		return (
			<div className="summary-block" onClick={this.handleClick}>
				<h4>{summary.name}</h4>
				<span className="summary-number">今日:
					<span className="today">{summary.todayCount}</span>
					{`, 总数:${summary.allCount}`}
				</span>
			</div>
		);
	}
}
SummaryBlock.contextTypes = {
	router: React.PropTypes.object
};

SummaryBlock.propTypes = {
	summary: PropTypes.object.isRequired
}