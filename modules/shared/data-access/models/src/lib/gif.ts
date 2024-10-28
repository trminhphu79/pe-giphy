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
    bundle: Bundle
}

export type TrendingOptions = {
    bundle: Bundle
} & BaseOptions;


export type SuggestionTagResponse = {
    data: Array<{ name: string, analytics_response_payload: string }>
}

export type UploadGifOptions = {
    username: string,
    files?: Array<File>,
    source_image_url?: string,
    tags: string,
    source_post_url: string,
    is_hidden?: number
    channel_id?: string,
}