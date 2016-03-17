/**
 * 展示组件: 日志详情
 * 位置:	中间和子组件
 * 使用Redux:	否
 * 读取数据:	从 props 获取数据
 * 修改数据: 从 props 调用回调函数
 * 不直接使用redux
 */

import React, { Component, PropTypes } from 'react'
import { Alert, Button, Icon, Spin, Row, Col } from 'antd'

export default class LogDetail extends Component {
	constructor() {
		super();
	}

	render() {
		const { log, isFetching } = this.props;

		let logMessages = [];
		if (log.message) {
			logMessages = log.message.split('\r\n')
		}

		return (
			<div>
				<h2 className="page-title">日志详情
					<Button size="small" type="primary" onClick={this.props.backToList} style={{marginLeft:10}}>
						<Icon type="rollback" />返回列表
					</Button>
				</h2>
				<Spin spining={isFetching}>
					<Row type="flex" justify="start">
						<Col span="4"><h3 className="item-title">系统: {log.systemAlias}</h3></Col>
						<Col span="8"><h3 className="item-title">时间: {log.time}</h3></Col>
					</Row>
					<div className="log-detail-message">
						{logMessages.map( (message,index) => <p key={index}>{message}</p>)}
					</div>
				</Spin>
			</div>
		)
	}
}

LogDetail.propTypes = {
	backToList: PropTypes.func.isRequired,
	log: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired
}