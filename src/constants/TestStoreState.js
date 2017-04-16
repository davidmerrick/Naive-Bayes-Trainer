import keyMirror from 'keymirror'

const TestStoreState = keyMirror({
    POSTED_ITEM: null,
    GOT_RESULT: null,
    LOADING: null,
    READY: null,
    ERROR: null
});

export default TestStoreState