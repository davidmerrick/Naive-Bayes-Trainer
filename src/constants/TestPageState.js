import keyMirror from 'keymirror'

const StoreState = keyMirror({
    POSTED_ITEM: null,
    LOADING: null,
    READY: null,
    ERROR: null
});

export default StoreState