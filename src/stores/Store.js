import Reducer from '../reducers/Reducer'
import TestReducer from '../reducers/TestReducer'
import TextItemReducer from '../reducers/TextItemReducer'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

let reducers = combineReducers({
    Reducer, TextItemReducer, TestReducer
});
const Store = createStore(reducers, applyMiddleware(thunk));

export default Store

