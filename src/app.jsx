import React from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router'

import './components/layout.style.css'
import SiderMenu from './components/SiderMenu'
import Topbar from './components/Topbar'

export default class App extends React.Component{
	render(){
		return (
			<div>
				<Topbar />
				<div className={'viewFramework-body'}>
					<SiderMenu styleName={'viewFramework-sidebar'} />
					<div className={'viewFramework-product'}>
						<div className={'viewFramework-product-body'}>
							<div className={'console-container'}>
								{this.props.children}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}