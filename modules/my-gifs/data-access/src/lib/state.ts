import { SelfState } from "./model";

export const initialSleftState: SelfState = {
    loading: false,
    detailChannel: null,
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