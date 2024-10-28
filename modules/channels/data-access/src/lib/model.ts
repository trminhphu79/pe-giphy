import { Meta, Pagination, TrendingOptions, UserChannel, BaseOptions, PeGIFObject } from "@pe-giphy/models";

export type ChannelState = {
    meta: Meta,
    tabs: Array<{ label: string, value: string }>,
    channels: UserChannel[],
    loading: boolean,
    pagination: Pagination,
    filterModel: BaseOptions,
    relatedGifs: PeGIFObject[],
    detailChannel: UserChannel | null,
    suggestionChannels: Array<{ name: string, avatarUrl: string, username: string } & UserChannel>,
}