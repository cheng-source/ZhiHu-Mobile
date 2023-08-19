import _ from '../../assets/utils';
import * as TYPES from '../action-type';

const initial = {
    info: null
}

const baseReducer = function(state = initial, action) {
    state = _.clone(state);
    switch (action.type) {
        case TYPES.BASE_INFO:
            state.info = action.info;
            break;
        default:
            break;
    }
    return state;
}

export default baseReducer;