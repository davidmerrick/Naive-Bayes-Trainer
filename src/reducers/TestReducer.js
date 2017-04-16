import ActionType from "../constants/ActionType";
import {TestPageState as PageState} from '../constants/TestPageState'

const initialState = {
    testResult: null,
    storeState: PageState.READY
};

const Reducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case ActionType.GET_TEST_RESULT_FULFILLED:
            console.log("Got test result");
            let testResult = action.payload.testResult;
            newState.testResult = testResult;
            return newState;
            break;
        case ActionType.POSTED_CLASSIFICATION_FULFILLED:
            console.log("Posted data");
            return newState;
            break;
        default:
            return newState;
            break;
    }
}

export default Reducer