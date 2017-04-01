import StoreState from '../constants/StoreState'
import ActionType from '../constants/ActionType'
import undoable, {distinctState} from 'redux-undo'

const initialState = {
    textItem: null,
    storeState: StoreState.EMPTY,
    error: null,
    count: 0,
    remaining: null
};

const Reducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case ActionType.GET_NEXT_TEXT_FULFILLED:
            console.log("Got next text item");
            let textItem = action.payload.textItem;
            newState.textItem = textItem;
            newState.storeState = StoreState.READY;
            return newState;
            break;
        case ActionType.STORE_IS_LOADING:
            newState.storeState = StoreState.LOADING;
            return newState;
            break;
        case ActionType.UPDATED_COUNT:
            let { count, remaining } = action.payload;
            newState.count = count;
            newState.remaining = remaining;
            return newState;
            break;
        default:
            return newState;
            break;
    }
}

const undoableReducer = undoable(Reducer, {
    filter: distinctState()
});

export default undoableReducer