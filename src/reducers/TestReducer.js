import ActionType from "../constants/ActionType";
import TestStoreState from '../constants/TestStoreState'

const initialState = {
    testResult: null,
    storeState: TestStoreState.READY
};

const Reducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case ActionType.GET_TEST_RESULT_FULFILLED:
            console.log("Got test result");
            let testResult = action.payload.testResult;
            newState.testResult = testResult;
            newState.storeState = TestStoreState.GOT_RESULT;
            return newState;
            break;
        case ActionType.POSTED_CLASSIFICATION_FULFILLED:
            console.log("Posted data");
            newState.storeState = TestStoreState.POSTED_ITEM;
            return newState;
            break;
        case ActionType.TEST_STORE_IS_READY:
            newState.storeState = TestStoreState.READY;
            return newState;
            break;
        default:
            return newState;
            break;
    }
}

export default Reducer