import StoreState from '../constants/StoreState'
import ActionType from '../constants/ActionType'

const initialState = {
    storeState: StoreState.EMPTY,
    error: null,
    count: 0,
    remaining: null,
    alert: null
};

const Reducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case ActionType.GET_NEXT_TEXT_FULFILLED:
            console.log("Got next text item");
            let textItem = action.payload.textItem;
            newState.textItem = textItem;
            newState.storeState = StoreState.READY;
            break;
        case ActionType.STORE_IS_LOADING:
            newState.storeState = StoreState.LOADING;
            break;
        case ActionType.STORE_IS_READY:
            newState.storeState = StoreState.READY;
            break;
        case ActionType.UPDATED_COUNT:
            let { count, remaining } = action.payload;
            newState.count = count;
            newState.remaining = remaining;
            break;
        case ActionType.SAVE_APP_STATE_FULFILLED:
            newState.alert = "App state saved.";
            break;
        case ActionType.DISMISS_ALERT:
            newState.alert = null;
            break;
    };
    return newState;
}

export default Reducer