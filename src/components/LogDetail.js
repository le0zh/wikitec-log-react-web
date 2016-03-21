/**
 * 展示组件: 日志详情
 * 位置:	中间和子组件
 * 使用Redux:	否
 * 读取数据:	从 props 获取数据
 * 修改数据: 从 props 调用回调函数
 * 不直接使用redux
 */

import React, { Component, PropTypes } from 'react'
import JSONTree from 'react-json-tree'
import { Alert, Button, Icon, Spin, Row, Col } from 'antd'

// json-tree的显示样式
const theme = {
	scheme: 'monokai',
	author: 'wimer hazenberg (http://www.monokai.nl)',
	base00: '#272822',
	base01: '#383830',
	base02: '#49483e',
	base03: '#75715e',
	base04: '#a59f85',
	base05: '#f8f8f2',
	base06: '#f5f4f1',
	base07: '#f9f8f5',
	base08: '#f92672',
	base09: '#fd971f',
	base0A: '#f4bf75',
	base0B: '#a6e22e',
	base0C: '#a1efe4',
	base0D: '#66d9ef',
	base0E: '#ae81ff',
	base0F: '#cc6633'
};

export default class LogDetail extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			log,
			isFetching
		} = this.props;

		let logMessage = {};
		if (log.message) {
			//
			logMessage = JSON.stringify(log.message);
		}

		const valueRenderer = raw => {
			if (typeof raw === 'object') {
				return raw;
			}

			const logMessages = raw.split('\r\n');
			return logMessages.map((item, index) => <span style={{lineHeight: 1.8, display:'block'}} key={index}>{item}</span>);
		};

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

					<h3 className="item-title" style={{marginTop:15}}>异常信息:</h3>
					<div style={{ paddingRight:5, fontSize:15 }}>
						<JSONTree hideRoot={true} 
							data={log.message || {}} 
							valueRenderer={valueRenderer} />
					</div>

					<h3 className="item-title" style={{marginTop:15}}>表单信息:</h3>
					<div style={{ fontSize:15 }}>
						<JSONTree hideRoot={true} data={log.forms || {'message': '没有表单信息'}} />
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