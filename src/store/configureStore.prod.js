import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const enhancer = compose(
	// 这里配置需要使用的中间件
	applyMiddleware(thunkMiddleware)
);

// 暴露store出去
export default function configureStore(initialState) {
	// Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
	// See https://github.com/rackt/redux/releases/tag/v3.1.0
	const store = createStore(rootReducer, initialState, enhancer);

	return store;
}