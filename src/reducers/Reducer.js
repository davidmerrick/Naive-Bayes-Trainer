import StoreState from '../constants/StoreState'
import ActionType from '../constants/ActionType'

const initialState = {
    textItem: null,
    storeState: StoreState.EMPTY,
    error: null
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
        default:
            return newState;
            break;
    }
}

export default Reducer