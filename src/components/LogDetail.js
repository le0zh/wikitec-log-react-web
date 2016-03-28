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
import { Form, Input, Affix, Alert, Button, Icon, Spin, Row, Col, Timeline, Select, Modal } from 'antd'

import { LOG_STATUS } from '../common/constants'

const FormItem = Form.Item;
const Option = Select.Option;

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

class LogDetail extends Component {
	constructor() {
		super();

		this.state = {
			commentModalVisible: false
		};

		this.showCommentModal = this.showCommentModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.onStatusChanged = this.onStatusChanged.bind(this);
		this.handleAddComment = this.handleAddComment.bind(this);
	}

	showCommentModal() {
		this.props.form.resetFields();
		this.setState({
			commentModalVisible: true
		})
	}

	handleAddComment() {
		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				console.log('Errors in form!!!');
				return;
			}
			console.log('Submit!!!');
			console.log(values);
			const { log, handleAddComment, userName } = this.props;
			handleAddComment(log._id, values.comment, userName);
			this.setState({
				commentModalVisible: false
			});
		});
	}

	handleCancel() {
		this.setState({
			commentModalVisible: false
		})
	}

	onStatusChanged(value, label) {
		const { log, handleStatusChange, userName } = this.props;
		handleStatusChange(log._id, value, userName);
	}

	render() {
		const { log, isFetching, form } = this.props;

		let logMessage = {};

		if (log.message) {
			logMessage = JSON.stringify(log.message);
		}

		const valueRenderer = raw => {
			if (typeof raw === 'object') {
				return raw;
			}

			const logMessages = raw.split('\r\n');
			return logMessages.map((item, index) => <span style={{lineHeight: 1.8, display:'block'}} key={index}>{item}</span>);
		};

		const commentProps = form.getFieldProps('comment', {
			rules: [
				{ required: true, message: '请填写内容' }
			]
		});

		// 为了兼容旧的字符串类型日志信息
		if (typeof(log.message) === 'string') {
			log.message = { Exception: log.message }
		}

		return (
			<div>
				<h2 className="page-title">日志详情
					<Button size="small" type="primary" onClick={this.props.backToList} style={{marginLeft:10}}>
						<Icon type="rollback" />返回列表
					</Button>

					<Button size="small" type="primary" style={{ marginLeft:10 }} onClick={this.showCommentModal}>
						<Icon type="message" /> 添加评论
					</Button>

					<Select value={log.status || 'init'} style={{ width: 120, marginLeft:10 }} onChange={this.onStatusChanged}>
						{LOG_STATUS.map(item=> <Option key={item.key} value={item.key}>{item.name}</Option>)}
					</Select>
				</h2>
				<Spin spining={isFetching}>
					<Row type="flex" justify="start">
						<Col span="4"><h3 className="item-title">系统: {log.systemAlias}</h3></Col>
						<Col span="8"><h3 className="item-title">时间: {log.time} </h3></Col>
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

					<h3 className="item-title" style={{marginTop:15}}>处理记录:</h3>
					{log.history 
						?
							<Timeline>
								{
									log.history.map((item, index)=> 
										<Timeline.Item key={index} color={item.comment ? 'blue' : 'green'}>
											{item.time}@{item.user} {item.message}
											{item.comment ?  <Alert message={item.comment} type="info" /> : null}
										</Timeline.Item>)
								}
							</Timeline>
						:
							<p style={{marginLeft: 10}}>没有记录</p>}
				</Spin>

				<Modal width={600} title="添加评论" visible={this.state.commentModalVisible}
					maskClosable={false}
					okText={'提交'}
					onOk ={this.handleAddComment}
          onCancel={this.handleCancel}>
          <Form form={this.props.form}>
						<FormItem
							hasFeedback
							>
							<Input {...commentProps} type="textarea" rows="3" />
						</FormItem>
          </Form>
        </Modal>
			</div>
		)
	}
}

LogDetail.propTypes = {
	backToList: PropTypes.func.isRequired,
	log: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	handleStatusChange: PropTypes.func.isRequired,
	handleAddComment: PropTypes.func.isRequired
}

module.exports = Form.create()(LogDetail);