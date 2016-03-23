/**
 * 容器组件: 登录界面
 * 位置:	最顶层，路由处理
 * 使用: Redux	是
 * 读取数据:	从 Redux 获取 state
 * 修改数据:	向 Redux 发起 actions
 * 容器组件使用 connect() 方法连接 Redux
 */
import React, { Component } from 'react'
import { Alert, Form, Input, Button, Checkbox } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions'

const FormItem = Form.Item;

class LoginPage extends Component {
	constructor() {
		super();

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const { form, actions, routing } = this.props;

		const redirect = routing.locationBeforeTransitions.query.next || '/';

		form.validateFields((errors, values) => {
			if (!!errors) {
				console.log('Errors in form!!!');
				return;
			}

			actions.loginUser(values.email, values.password, redirect);
		});
	}

	render() {
		const { getFieldProps } = this.props.form;

		// 表单验证条件
		const emailProps = getFieldProps('email', {
			validate: [{
				rules: [
					{ required: true, message: '请输入公司邮箱' },
				],
				trigger: ['onChange'],
			}, {
				rules: [
					{ type: 'email', message: '请输入正确的邮箱地址' },
				],
				trigger: ['onBlur', 'onChange'],
			}]
		});

		const passwdProps = getFieldProps('password', {
			rules: [
				{ required: true, whitespace: true, message: '请填写密码' },
			],
		});

		return (
			<div className="login-container">
				<h1>天益明康 日志系统</h1>
				<Form inline form={this.props.form} onSubmit={this.handleSubmit} style={{marginTop:20}}>
	        <FormItem
	        	hasFeedback
	          label="账户："
	     			>
	          <Input type="email" placeholder="公司电子邮箱地址"
	          	{...emailProps}
	          	/>
	        </FormItem>
	        <FormItem
	        	hasFeedback
	          label="密码："
	          >
	          <Input type="password" placeholder="默认为123456"
	            {...passwdProps} />
	        </FormItem>
	        <Button type="primary" htmlType="submit">登录</Button>
      	</Form>

      	{this.props.statusText 
      			? <div style={{marginTop: 20, width:'90%'}}><Alert message={this.props.statusText} type="error" /></div>
      			: null}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {
		token,
		userName,
		isAuthenticated,
		isAuthenticating,
		statusText
	} = state.auth;

	return {
		token,
		userName,
		isAuthenticated,
		isAuthenticating,
		statusText,
		routing: state.routing
	}
}

//这里还可以细分
function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) };
}

const LoginPageForm = Form.create()(LoginPage);
module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginPageForm)