import api from '../../api';
import * as TYPES from '../action-type';

const baseAction = {
    async queryUserInfoAsync() {
        let info = null;
        try {
            let { code, data } = await api.queryUserInfo();
            if (+code === 0) {
                info = data;
            }
        } catch (error) {}
        return {
            type: TYPES.BASE_INFO,
            info
        }
    },

    clearUserInfo() {
        return {
            type: TYPES.BASE_INFO,
            info: null
        }
    }

}

export default baseAction;