import keyMirror from 'keymirror'

const ActionType = keyMirror({
    GET_NEXT_TEXT_FULFILLED: null,
    STORE_IS_LOADING: null,
    STORE_IS_READY: null,
    UPDATED_COUNT: null,
    GET_TEST_RESULT_FULFILLED: null,
    POSTED_CLASSIFICATION_FULFILLED: null,
    TEST_STORE_IS_READY: null,
    SAVE_APP_STATE_FULFILLED: null,
    SAVE_APP_STATE_FAILED: null,
    DISMISS_ALERT: null
});

export default ActionType