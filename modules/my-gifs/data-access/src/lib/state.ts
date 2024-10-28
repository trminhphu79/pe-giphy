import { TabActionEnum } from "./enum";
import { SelfState } from "./model";

export const TabAction = [{ label: 'COMMON.LABEL.COLLECTIONS', value: 'COLLECTION' }, { value: 'FAVORITE', label: 'COMMON.LABEL.FAVORITES' }];

export const initialSleftState: SelfState = {
    loading: false,
    detailChannel: {
        display_name: 'PeGiphy Admin',
        user: {
            username: 'tmp79',
            avatar_url: 'https://img.freepik.com/premium-vector/man-empty-avatar-casual-business-style-vector-photo-placeholder-social-networks-resumes_885953-434.jpg',
            banner_image: 'https://wallpapercave.com/wp/wp5126188.jpg',
            banner_url: 'https://wallpapercave.com/wp/wp5126188.jpg',
            website_url: 'https://www.phutran.info.vn/',
            instagram_url: 'https://www.linkedin.com/in/tmp-dev79/',
            description: "Shoot for the moon. Even if you miss, you'll land among the stars."
        }
    },
    tabActions: TabAction,
    currentTab: TabActionEnum.COLLECTION,
    relatedGifs: [],
    uploadGifIds: [],
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