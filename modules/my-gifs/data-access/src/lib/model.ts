import { Meta, Pagination, UserChannel, BaseOptions } from "@pe-giphy/models";
import { GIFObject } from "giphy-api";

export type SelfState = {
    meta: Meta,
    loading: boolean,
    pagination: Pagination,
    currentTab: 'COLLECTION' | 'FAVORITE',
    filterModel: BaseOptions,
    relatedGifs: GIFObject[],
    uploadGifIds: string[],
    detailChannel: Partial<UserChannel> | null,
    tabActions: { value: string, label: string }[],
    favoriteGifs: Array<GIFObject>
}