import React, { Component, PropTypes } from 'react'
import '../components/layout.style.css'

export default class App extends React.Component {
	componentDidMount() {}

	render() {
		const { routing } = this.props;

		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	// Injected by React Router
	children: PropTypes.node
}