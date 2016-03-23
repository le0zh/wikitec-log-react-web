import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import '../components/layout.style.css'

import SiderMenu from '../components/SiderMenu'
import Topbar from '../components/Topbar'
import * as actionCreators from '../actions'
import OverviewPage from './OverviewPage'

class DashboardPage extends React.Component {

	componentDidMount() {}

	render() {
		const { routing } = this.props;

		return (
			<div>
				<Topbar />
				<div className={'viewFramework-body'}>
					<SiderMenu routing={routing.locationBeforeTransitions} styleName={'viewFramework-sidebar'} />
					
					<div className={'viewFramework-product'}>
						<div className={'viewFramework-product-body'}>
							<div className={'console-container'}>
								{this.props.children || <OverviewPage></OverviewPage>}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DashboardPage.propTypes = {
	// Injected by React Router
	children: PropTypes.node
}

function mapStateToProps(state) {
	return {
		routing: state.routing
	}
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) };
}

//注入全局 state并把所有 action creator 作为 actions 属性也注入组件中
//BUT:
//不要这样做！这会导致每次 action 都触发整个 TodoApp 重新渲染，你做的所有性能优化都将付之东流。
//最好在多个组件上使用 connect()，每个组件只监听它所关联的部分 state。
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);