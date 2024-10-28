import { TrendingOptions } from "@pe-giphy/models";
import { PeGIFObject } from "@pe-giphy/models";

export type HomeState = {
    loading: boolean,
    trendingKeywords: string[],
    suggestionTags: Array<{ name: string, avatarUrl: string, username: string }>,
    detailGif: null | PeGIFObject,
    filterModel: TrendingOptions,
    trendingGifs: PeGIFObject[],
}