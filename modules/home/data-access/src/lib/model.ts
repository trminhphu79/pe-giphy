import { GIFObject } from 'giphy-api';
import { TrendingOptions } from "@pe-giphy/models";




export type HomeState = {
    trendingGifs: GIFObject[],
    loading: boolean,
    filterModel: TrendingOptions
}