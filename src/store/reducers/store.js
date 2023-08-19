import * as TYPES from '../action-type';
const initial = {
    list: null
}

const storeReducer = function(state = initial, action) {
    state = {...state };

    switch (action.type) {
        case TYPES.STORE_LIST:
            state.list = action.list;
            break;
        case TYPES.STORE_REMOVE:
            if (Array.isArray(state.list)) {
                state.list = state.list.filter(item => {
                    return +item.id !== +action.id;
                })
            };
            break;
        default:
            break;
    }

    return state;
}

export default storeReducer;