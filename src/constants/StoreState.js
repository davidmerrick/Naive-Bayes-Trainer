import keyMirror from 'keymirror'

const StoreState = keyMirror({
    EMPTY: null,
    LOADING: null,
    READY: null,
    ERROR: null
});

export default StoreState