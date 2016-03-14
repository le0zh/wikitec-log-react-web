import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

//这里注入provider
//日志app
import App from './route'

const store = configureStore();

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('react-content')
);