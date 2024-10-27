export type Rating = 'y' | 'g' | 'pg' | 'pg-13' | 'r';
export type Format = 'html' | 'json';
export type Bundle = 'messaging_non_clips' | 'sticker_layering' | 'low_bandwidth' | 'clips_grid_picker'

export interface BaseOptions {
    limit: number;
    offset: number;
    rating: Rating;
}

export interface SearchOptions extends BaseOptions {
    q: string;
}

export type TrendingOptions = {
    bundle: Bundle
} & BaseOptions;