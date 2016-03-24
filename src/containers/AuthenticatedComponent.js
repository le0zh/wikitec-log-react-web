import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

/**
 * 组装需要登录验证的子组件
 */
export function requireAuthentication(Component) {
	class AuthenticatedComponent extends React.Component {
		componentWillMount() {
			this.checkAuth(this.props.isAuthenticated);
		}

		componentWillReceiveProps(nextProps) {
			this.checkAuth(nextProps.isAuthenticated);
		}

		checkAuth(isAuthenticated) {
			if (!isAuthenticated) {
				// 记录当前的路径，当登陆之后跳转回来
				let redirectAfterLogin = this.props.location.pathname;

				browserHistory.push(`/login?next=${redirectAfterLogin}`);
			}
		}

		render() {
			return (
				<div>
					{this.props.isAuthenticated === true
						? <Component {...this.props} />
						: null 
					}
				</div>
			);
		}
	}

	const mapStateToProps = (state) => ({
		token: state.auth.token,
		userName: state.auth.userName,
		isAuthenticated: state.auth.isAuthenticated
	});

	// 将上面的state部分和dispatch注入到当前组件
	return connect(mapStateToProps)(AuthenticatedComponent);
}