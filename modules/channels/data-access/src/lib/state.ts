import { ChannelState } from "./model";

export const ActionTab = [{ label: 'COMMON.LABEL.COLLECTIONS', value: 'COLLECTION' }, { label: 'COMMON.LABEL.FOLLOWERS', value: 'FOLLOWER' }];
export const initialChannelState: ChannelState = {
    loading: false,
    detailChannel: null,
    tabs: ActionTab,
    relatedGifs: [],
    filterModel: {
        offset: 0,
        limit: 30,
        rating: 'g',
    },
    channels: [],
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
    suggestionChannels: []
}