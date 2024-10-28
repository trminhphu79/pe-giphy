import { SelfState } from "./model";

export const TabAction = [{ label: 'COMMON.LABEL.COLLECTIONS', value: 'COLLECTION' }, { value: 'FAVORITE', label: 'COMMON.LABEL.FAVORITES' }];

export const initialSleftState: SelfState = {
    loading: false,
    detailChannel: null,
    tabActions: TabAction,
    currentTab: 'COLLECTION',
    relatedGifs: [],
    favoriteGifs: [],
    filterModel: {
        offset: 0,
        limit: 30,
        rating: 'g',
    },
    meta: {
        status: -1,
        msg: '',
        response_id: '',
    },
    pagination: {
        count: 0,
        offset: 30,
        total_count: 0
    },
}