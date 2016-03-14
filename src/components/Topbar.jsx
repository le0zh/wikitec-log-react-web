import React, {Component ,PropTypes} from 'react'
import { Icon } from 'antd';
import DropDownMenu from './TopBarDropDownMenu'

export default class Topbar extends Component{
	constructor(){
		super();
	}

	handleChangePassword(e){
		alert('修改密码');
		console.log('修改密码');
	}

	handleSignOut(e){
		console.log('退出');
	}

	render(){
		return(
			<div className={'viewFramework-topbar'}>
				<div className={'topbar-head topbar-left'}>
					<a href="#" className={'topbar-logo topbar-left'}><Icon type="book" /></a>
				</div>

				<div className={'topbar-nav topbar-left'}>
					<a href="#" className={'topbar-home-link topbar-btn topbar-left border-right'}>系统日志</a>
				</div>

				<div className={'topbar-info topbar-right topbar-clearfix'}>
					<div className={'topbar-btn topbar-left border-left'}>
						<Icon type="search" /> 搜索
					</div>
					<div className={'topbar-btn topbar-left border-left'}>
						<Icon type="mobile" /> 手机版
					</div>
					<div className={'topbar-btn topbar-left border-left'}>
						<DropDownMenu title={<span><Icon type="question-circle-o" /> 帮助与文档</span>}>
							<DropDownMenu.Item title={'帮助与文档'} url={'http://www.baidu.com'}/>
							<DropDownMenu.Item title={'论坛'} url={'http://www.baidu.com'} />
							<DropDownMenu.Item title={'博客'} url={'http://www.baidu.com'} />
						</DropDownMenu>
					</div>
					<div className={'topbar-btn topbar-left border-left'}>
						<DropDownMenu title={<span>admin@wikitec.com</span>}>
							<DropDownMenu.Item title={'修改密码'} onClick={(e)=>this.handleChangePassword(e)} />
							<DropDownMenu.Item title={'退出'} onClick={(e)=>this.handleSignOut(e)} />
						</DropDownMenu>
					</div>
				</div>
			</div>
		);
	}
}