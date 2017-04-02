import Reducer from '../reducers/Reducer'
import TextItemReducer from '../reducers/TextItemReducer'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

let reducers = combineReducers({
    Reducer, TextItemReducer
});
const Store = createStore(reducers, applyMiddleware(thunk));

export default Store

