import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

// 这里配置需要使用的中间件
const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware
)(createStore);

// 暴露store出去
export default function configureStore(initalState) {
	return createStoreWithMiddleware(rootReducer, initalState);
}