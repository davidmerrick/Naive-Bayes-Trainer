import Reducer from '../reducers/Reducer'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const Store = createStore(Reducer, applyMiddleware(thunk));

export default Store

