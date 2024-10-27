import { GIFObject, } from 'giphy-api';
import { TrendingOptions } from "@pe-giphy/models";




export type HomeState = {
    loading: boolean,
    trendingKeywords: string[],
    suggestionTags: Array<{ name: string, avatarUrl: string }>,
    detailGif: null | GIFObject,
    filterModel: TrendingOptions,
    trendingGifs: GIFObject[],
}