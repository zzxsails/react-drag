//applyMiddleware调用中间件的函数,combineReducers组合起所有的reducers状态
import {legacy_createStore as createStore,applyMiddleware,combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
//安装异步action的中间件
import thunk from 'redux-thunk'
import Complists from './reducers/comps'
import BaseAttr from './reducers/base'
const allReducers=combineReducers({
    comps:Complists,
    base:BaseAttr
})
export default createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)))