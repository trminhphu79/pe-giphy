import { HomeState } from "./model";

export const initialHomeState: HomeState = {
    loading: false,
    trendingGifs: [],
    detailGif: null,
    trendingKeywords: [],
    suggestionTags: [],
    filterModel: {
        offset: 0,
        limit: 30,
        rating: 'g',
        bundle: 'messaging_non_clips'
    }
}