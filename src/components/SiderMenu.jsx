import React, {Component ,PropTypes} from 'react'
import { Menu, Icon } from 'antd';
import { Link, browserHistory  } from 'react-router'

import {VCAN_SYS, WIKI_SYS} from '../common/constants'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class SiderMenu extends Component{
	constructor(){
		super();
		this.state = {
			current: 'crm',
			theme: 'light',
			openKeys: []
		};
	}

	handleClick(e) {
		console.log(e.keyPath);
		this.setState({
			current: e.key,
			openKeys: e.keyPath.slice(1)
		});

		//var currentRouteName = this.context.router.getCurrentPathname();
		//https://github.com/reactjs/react-router-tutorial/blob/start/lessons%2F12-navigating.md
		//用这个判断是否激活！！！
		console.log(this.context.router);
		var isActive =this.context.router.isActive('/logs/crm');
		console.log(isActive);

		if(e.key !== 'overview'){
			const path = `/logs/${e.key}`;
    	//browserHistory.push(path);
		}
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
				<Menu.Item key="overview">
					<Link to="/">{<span><Icon type="eye-o" /><span>概览</span></span>}</Link>
				</Menu.Item>

				<SubMenu key="vcan_sys" title={<span><Icon type="appstore" /><span>集团系统</span></span>}>
					{VCAN_SYS.map(sys=>{
						return (
							<Menu.Item key={sys.key}>
								<Link to={`/logs/${sys.key}`}>{sys.name}</Link>
							</Menu.Item>
						) 
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