import React, {Component ,PropTypes} from 'react'
import { Icon } from 'antd';

class DropDownMenuItem extends Component{
	render(){
		return(
			<li className={'topbar-info-btn'} onClick={this.props.onClick}> 
				{ this.props.url?
					<a href={this.props.url} target="_blank">{this.props.title}</a> :
					<a href="javascript:void(0);">{this.props.title}</a>
				}
			</li>
		);
	}
}
DropDownMenuItem.propTypes = {
	title: PropTypes.string
};

class DropDownMenu extends Component{
	constructor(){
		super();

		this._onToggleDropdown = (e)=>this.toggleDropdown(e);
		this._onHideDropDown = (e)=>this.hideDropdown(e);
	}

	toggleDropdown(e){
		//here event is native browser event

		//如果提供了事件对象，则这是一个非IE浏览器 
		if ( e && e.stopPropagation ) 
			//因此它支持W3C的stopPropagation()方法 
			e.stopPropagation();
		else{
			//否则，我们需要使用IE的方式来取消事件冒泡 
			window.event.cancelBubble = true; 
		}
		
		var containerDom = this.refs.dropdownContainer;
		if(containerDom){
			if(containerDom.className.indexOf('open') >= 0){
				//关闭
				containerDom.className = containerDom.className.replace('open', '').trim();
			}
			else{
				//打开
				containerDom.className += " open";
			}
		}
	}

	hideDropdown(e){
		var containerDom = this.refs.dropdownContainer;

		if(containerDom){
			if(containerDom.className.indexOf('open') >= 0){
				//关闭
				containerDom.className = containerDom.className.replace('open', '').trim();
			}
		}
	}

	componentDidMount(){
		document.addEventListener('click', this._onHideDropDown);

		//手动绑定点击事件, 否则没办法阻止事件冒泡
		//参考: 
		//https://medium.com/@ericclemmons/react-event-preventdefault-78c28c950e46#.fv2h9z238
		//https://github.com/erikras/react-native-listener
		var togglerDom = this.refs.dropdownToggler;
		togglerDom.addEventListener('click', this._onToggleDropdown);
	}

	componentWillUnmount(){
		document.removeEventListener('click', this._onHideDropDown);
	}

	render(){
		return (
			<div ref="dropdownContainer" className={'dropdown'} style={{marginLeft: -10, marginRight: -10}}>
				<div ref="dropdownToggler" className={'topbar-btn'}>
					{this.props.title}
					<Icon type="down" style={{marginLeft: 5}} />
				</div>

				<ul className={'dropdown-menu'}>
					{this.props.children}
				</ul>
			</div>
		);
	}
}

DropDownMenu.defaultProps = {
	title: <span>菜单</span>
};

DropDownMenu.propTypes = {
	title: PropTypes.element.isRequired
};

DropDownMenu.Item = DropDownMenuItem;

export default DropDownMenu;