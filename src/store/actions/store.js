import * as TYPES from '../action-type';
import api from '../../api/index'

const storeAction = {
    async queryStoreList() {
        const { code, data: list } = await api.storeList();
        if (+code !== 0) {
            list = [];
        }
        return {
            type: TYPES.STORE_LIST,
            list
        }
    },

    clearStoreList() {
        return {
            type: TYPES.STORE_LIST,
            list: null
        }
    },

    removeStoreListById(id) {
        return {
            type: TYPES.STORE_REMOVE,
            id
        }
    }
}

export default storeAction;