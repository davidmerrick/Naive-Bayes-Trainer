const initialState = {
    error: null
};

const Reducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        default:
            return newState;
            break;
    }
}

export default Reducer