import { Meta, MultipleChannelResponse, Pagination, TrendingOptions, UserChannel, BaseOptions } from "@pe-giphy/models";

export type ChannelState = {
    meta: Meta,
    channels: UserChannel[],
    loading: boolean,
    pagination: Pagination,
    filterModel: BaseOptions,
    suggestionChannels: Array<{ name: string, avatarUrl: string } & UserChannel>,
}