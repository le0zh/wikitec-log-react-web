/**
 * 展示组件
 * 位置:	中间和子组件
 * 使用Redux:	否
 * 读取数据:	从 props 获取数据
 * 修改数据: 从 props 调用回调函数
 * 不直接使用redux
 */
import React, { Component, PropTypes } from 'react'
import { Table, Icon, Button, Tag } from 'antd'
import { Link } from 'react-router'
import { LOG_STATUS } from '../common/constants'

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
	title: '状态',
	render(text, record, index) {
		var statusItem;
		LOG_STATUS.forEach(item => {
			if (item.key === record.status) {
				statusItem = item;
			}
		});
		return <Tag color={statusItem.color}>{statusItem.name}</Tag>
	},
	key: 'status',
	width: 90
}, {
	title: '操作',
	render(text, record, index) {
		return <Link to={`/logs/${record.systemAlias}/${record.id}`}>详细信息</Link>;
	},
	key: 'operation',
	width: 80
}];

//分页信息
const pagination = {
	total: 0, //总的记录数
	current: 1, //当前页码
	showSizeChanger: false, //是否可以切换每页条数
	showTotal: () => "共1000条"
		// onShowSizeChange(current, pageSize) {
		// 	console.log('Current: ', current, '; PageSize: ', pageSize);
		// },
		// onChange(current) {
		// 	console.log('Current: ', current);
		// }
};

export default class Loglist extends Component {
	constructor() {
		super();

		this.state = {
			isLoading: true
		}
	}

	componentDidMount() {
		pagination.onChange = this.props.handlePageChange;
	}

	componentWillReceiveProps(nextProps) {
		//直接给table的loading赋值不行
		if (nextProps.logs.isFetching == false) {
			this.setState({
				isLoading: false
			});
		}
	}

	render() {
		const { logs } = this.props;
		const { pagedResult } = logs;
		const recordCount = pagedResult.recordCount;

		pagination.total = recordCount;
		pagination.current = pagedResult.pageIndex;

		pagination.showTotal = (recordCount) => {
			return `共 ${recordCount} 条`
		}

		return (
			<div>
				{/*<Tag color="red">今日异常: {pagedResult.todayCount}</Tag>
				<Tag color="yellow">今日权限认证错误: {pagedResult.todayCount}</Tag>*/}
				<Tag color="blue">今日: {pagedResult.todayCount}</Tag>
				<Tag color="green">总数: {pagedResult.recordCount}</Tag>

				<Table
					columns={columns}
					rowKey={record => record.id}
					loading={this.state.isLoading}
					pagination={pagination}
					dataSource={this.props.logs.pagedResult.list}
				/>
			</div>
		);
	}
}

Loglist.propTypes = {
	logs: PropTypes.object.isRequired,
	handlePageChange: PropTypes.func.isRequired
}