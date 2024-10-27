import { Meta, MultipleChannelResponse, Pagination, TrendingOptions, UserChannel, BaseOptions } from "@pe-giphy/models";
import { GIFObject } from "giphy-api";

export type ChannelState = {
    meta: Meta,
    channels: UserChannel[],
    loading: boolean,
    pagination: Pagination,
    filterModel: BaseOptions,
    relatedGifs: GIFObject[],
    detailChannel: UserChannel | null,
    suggestionChannels: Array<{ name: string, avatarUrl: string } & UserChannel>,
}