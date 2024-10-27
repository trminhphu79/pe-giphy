import { GIFObject } from 'giphy-api';
import { TrendingOptions } from "@pe-giphy/models";




export type HomeState = {
    loading: boolean,
    detailGif: null|GIFObject,
    filterModel: TrendingOptions,
    trendingGifs: GIFObject[],
}