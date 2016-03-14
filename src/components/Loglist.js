import React from 'react'
import { Table, Icon } from 'antd'

const columns = [{
	title: '姓名',
	dataIndex: 'name',
	render(text) {
		return <a href="#">{text}</a>;
	}
}, {
	title: '年龄',
	dataIndex: 'age'
}, {
	title: '住址',
	dataIndex: 'address'
}, {
	title: '操作',
	key: 'operation',
	render(text, record) {
		return (
			<span>
					<a href="#">操作一{record.name}</a>
					<span className="ant-divider"></span>
					<a href="#">操作二</a>
					<span className="ant-divider"></span>
					<a href="#" className="ant-dropdown-link">
						更多 <Icon type="down" />
					</a>
				</span>
		);
	}
}];

const data = [];
for (let i = 0; i < 46; i++) {
	data.push({
		key: i,
		name: `李大嘴${i}`,
		age: 32,
		address: `西湖区湖底公园${i}号`
	});
}

const pagination = {
	total: data.length,
	current: 1,
	showSizeChanger: true,
	onShowSizeChange(current, pageSize) {
		console.log('Current: ', current, '; PageSize: ', pageSize);
	},
	onChange(current) {
		console.log('Current: ', current);
	}
};

export default class Loglist extends React.Component {

	componentDidMount() {
		let { actions } = this.props;
		console.log(actions);
		actions.fetchLogs({ subSystem: 'all', page: 1 });
	}

	render() {
		return (
			<Table columns={columns} dataSource={data} pagination={pagination} />
		);
	}
}