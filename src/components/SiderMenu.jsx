import React, {Component ,PropTypes} from 'react'
import { Menu, Icon } from 'antd';

import {VCAN_SYS, WIKI_SYS} from '../common/constants'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

/**
 * 检查菜单激活情况，根据当前的路由path
 * @param  {[type]} router [description]
 */
function checkActive(router) {
	const openKeys = [];
	let current = '';

	if(router.isActive('/')){
		current = 'overview';
		openKeys.push('overview');
	}

	const logsPagePrefix = 'logs';

	VCAN_SYS.forEach(menu=>{
		if(router.isActive(`/${logsPagePrefix}/${menu.key}`)){
			openKeys.push('vcan_sys');
			current = menu.key;
		}
	});

	WIKI_SYS.forEach(menu=>{
		if(router.isActive(`/${logsPagePrefix}/${menu.key}`)){
			openKeys.push('wiki_sys');
			current = menu.key;
		}
	});

	return {current, openKeys};
}

export default class SiderMenu extends Component{
	constructor(){
		super();

		this.state = {
			current: '',
			theme: 'light',
			openKeys: []
		};
	}

	componentWillReceiveProps(nextProp){
		if(nextProp.routing.path !== this.props.routing.pathname){
			//如果路径更新了，重新检查激活状态
			var {current, openKeys} = checkActive(this.context.router);
			this.setState({
				current: current,
				theme: 'light',
				openKeys: openKeys
			});
		}
	}

	componentDidMount(){
		var {current, openKeys} = checkActive(this.context.router);
		this.setState({
			current: current,
			theme: 'light',
			openKeys: openKeys
		});
	}

	handleClick(e) {
		this.setState({
			current: e.key,
			openKeys: e.keyPath.slice(1)
		});

		//var currentRouteName = this.context.router.getCurrentPathname();
		//https://github.com/reactjs/react-router-tutorial/blob/start/lessons%2F12-navigating.md
		//用这个判断是否激活！！！
		//console.log(this.context.router);
		//var isActive =this.context.router.isActive('/logs/crm');
		//console.log(isActive);

		//router api: https://github.com/reactjs/react-router/blob/master/docs/API.md#contextrouter
		let path = '/';
		if(e.key !== 'overview'){
			path = `/logs/${e.key}`;
		}
		this.context.router.push(path);
	}

	onToggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
    });
  }

	render() {
		return (
			<Menu onClick={(e)=>this.handleClick(e)}
				theme={this.state.theme}
				style={{ width: 200 }}
				openKeys={this.state.openKeys}
        onOpen={this.onToggle.bind(this)}
        onClose={this.onToggle.bind(this)}
				className = {'viewFramework-sidebar'}
				selectedKeys={[this.state.current]}
				mode="inline">
				<Menu.Item key="overview">{<span><Icon type="eye-o" /><span>概览</span></span>}</Menu.Item>

				<SubMenu key="vcan_sys" title={<span><Icon type="appstore" /><span>集团系统</span></span>}>
					{VCAN_SYS.map(sys=>{
						return <Menu.Item key={sys.key}>{sys.name}</Menu.Item>
					})}
				</SubMenu>

				<SubMenu key="wiki_sys" title={<span><Icon type="cloud-o" /><span>管万家</span></span>}>
					{WIKI_SYS.map(sys=>{
						return <Menu.Item key={sys.key}>{sys.name}</Menu.Item>
					})}
				</SubMenu>
			</Menu>
		);
	}
}

SiderMenu.contextTypes = {
  router: React.PropTypes.object
};
SiderMenu.defaultProps = {
	styleName: ''
};
SiderMenu.propTypes = {
	styleName: PropTypes.string
};