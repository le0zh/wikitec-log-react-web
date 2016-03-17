/**
 * 展示组件: 概况
 * 位置:	中间和子组件
 * 使用Redux:	否
 * 读取数据:	从 props 获取数据
 * 修改数据: 从 props 调用回调函数
 * 不直接使用redux
 */
import React, { Component, PropTypes } from 'react'
import { Alert, Button, Icon, Spin, Row, Col } from 'antd'


export default class Overview extends Component {
	render() {
		return (
			<div>
				<h2 className="page-title">概览</h2>
				<h3 className="item-title">集团系统:</h3>
				<div className="summary-block">
					<h4>综合管理系统</h4>
					<span className="summary-number">今日:10, 总数:1334</span>
				</div>
			</div>
		);
	}
}