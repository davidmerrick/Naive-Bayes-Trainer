import ActionType from "../constants/ActionType";
import undoable, {distinctState, includeAction} from "redux-undo";

const initialState = {
    textItem: null
};

const TextItemReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case ActionType.GET_NEXT_TEXT_FULFILLED:
            console.log("Got next text item");
            let textItem = action.payload.textItem;
            newState.textItem = textItem;
            return newState;
            break;
        default:
            return newState;
            break;
    }
}

const undoableReducer = undoable(TextItemReducer, {
    filter: distinctState(),
    filter: includeAction([ActionType.GET_NEXT_TEXT_FULFILLED])
});

export default undoableReducer