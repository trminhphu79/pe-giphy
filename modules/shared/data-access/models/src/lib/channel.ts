// Main structure representing the overall JSON object
export type UserChannel = {
    id: number;
    url: string;
    display_name: string;
    slug: string;
    type: string;
    content_type: string;
    has_children: boolean;
    num_children: number;
    is_visible: boolean;
    is_private: boolean;
    is_live: boolean;
    featured_gif: GifDetails;
    user: User;
    ancestors: any[]; // Adjust type if needed
    tags: any[];       // Adjust type if needed
    syncable_tags: any[]; // Adjust type if needed
    analytics_response_payload: string;
};

// Representing the gif details
export type GifDetails = {
    type: string;
    id: string;
    url: string;
    slug: string;
    bitly_gif_url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    title: string;
    rating: string;
    content_url: string;
    source_tld: string;
    source_post_url: string;
    is_sticker: number;
    import_datetime: string;
    trending_datetime: string;
    images: GifImages;
    user: User;
    analytics_response_payload: string;
    analytics: Analytics;
    alt_text: string;
};

// Representing the images in different formats and sizes
export type GifImages = {
    original: ImageFormat;
    downsized: ImageFormat;
    downsized_large: ImageFormat;
    downsized_medium: ImageFormat;
    downsized_small: ImageFormatSmall;
    downsized_still: ImageFormat;
    fixed_height: ImageFormat;
    fixed_height_downsampled: ImageFormat;
    fixed_height_small: ImageFormat;
    fixed_height_small_still: ImageFormat;
    fixed_height_still: ImageFormat;
    fixed_width: ImageFormat;
    fixed_width_downsampled: ImageFormat;
    fixed_width_small: ImageFormat;
    fixed_width_small_still: ImageFormat;
    fixed_width_still: ImageFormat;
    looping: Looping;
    original_still: ImageFormat;
    original_mp4: ImageFormat;
    preview: ImageFormatSmall;
    preview_gif: ImageFormat;
    preview_webp: ImageFormat;
    "480w_still": ImageFormat;
};

// Representing an individual image format
export type ImageFormat = {
    height: string;
    width: string;
    size: string;
    url: string;
    mp4_size?: string;
    mp4?: string;
    webp_size?: string;
    webp?: string;
    frames?: string;
    hash?: string;
};

// Representing a smaller image format with fewer properties
export type ImageFormatSmall = {
    height: string;
    width: string;
    mp4_size: string;
    mp4: string;
};

// Representing the looping version of the gif
export type Looping = {
    mp4_size: string;
    mp4: string;
};

// Representing user details associated with the GIF
export type User = {
    avatar_url: string;
    banner_image: string;
    banner_url: string;
    profile_url: string;
    username: string;
    display_name: string;
    description: string;
    instagram_url: string;
    website_url: string;
    is_verified: boolean;
};

// Representing analytics information
export type Analytics = {
    onload: AnalyticsEvent;
    onclick: AnalyticsEvent;
    onsent: AnalyticsEvent;
};

// Representing an individual analytics event
export type AnalyticsEvent = {
    url: string;
};


export type MultipleChannelResponse = {
    data: UserChannel[],
    meta: Meta,
    pagination: Pagination
}

export type Meta = {
    status: number,
    msg: string,
    response_id: string
}

export type Pagination = {
    total_count: number,
    count: number,
    offset: number
}