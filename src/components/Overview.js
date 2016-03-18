/**
 * 展示组件: 概况
 * 位置:	中间和子组件
 * 使用Redux:	否
 * 读取数据:	从 props 获取数据
 * 修改数据: 从 props 调用回调函数
 * 不直接使用redux
 */
import React, { Component, PropTypes } from 'react'
import { Alert, Button, Icon, Spin, Row, Col, Table } from 'antd'
import { Link } from 'react-router'

import SummaryBlock from './SummaryBlock'

const columns = [{
	title: '系统key',
	dataIndex: 'systemAlias',
	key: 'systemAlias',
	width: 90
}, {
	title: '消息',
	dataIndex: 'message',
	key: 'message'
}, {
	title: '时间',
	dataIndex: 'time',
	key: 'time',
	width: 80
}, {
	title: '操作',
	render(text, record, index) {
		return <Link to={`/logs/${record.systemAlias}/${record.id}`}>详细信息</Link>;
	},
	key: 'operation',
	width: 80
}];

const data = [];

export default class Overview extends Component {
	render() {
		const { wiki, vcan, top10Logs } = this.props;
		return (
			<div>
				<h2 className="page-title">概览</h2>

				<h3 className="item-title">集团系统:</h3>
				<Spin spining={vcan.isFetching}>
					{vcan.summary.map( (summaryInfo,index) => <SummaryBlock key={index} summary={summaryInfo} />)}
				</Spin>

				<div className="clearfix"></div>
				<h3 className="item-title" style={{marginTop:30}}>管万家:</h3>
				<Spin spining={wiki.isFetching}>
					{wiki.summary.map( (summaryInfo,index) => <SummaryBlock key={index} summary={summaryInfo} />)}
				</Spin>

				<div className="clearfix"></div>
				<h3 className="item-title" style={{marginTop:30}}>最新10条日志:</h3>
				<Table columns={columns} 
					rowKey={record => record.id}
					loading={top10Logs.isFetching} 
					pagination ={false}
					dataSource={top10Logs.logs}
					size="middle" />
			</div>
		);
	}
}

Overview.propTypes = {
	wiki: PropTypes.object.isRequired,
	vcan: PropTypes.object.isRequired,
	top10Logs: PropTypes.object.isRequired
}