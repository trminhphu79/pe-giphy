import { Meta, Pagination, UserChannel, BaseOptions } from "@pe-giphy/models";
import { PeGIFObject } from "@pe-giphy/models";

export type SelfState = {
    meta: Meta,
    loading: boolean,
    pagination: Pagination,
    currentTab: string,
    filterModel: BaseOptions,
    relatedGifs: PeGIFObject[],
    uploadGifIds: string[],
    detailChannel: Partial<UserChannel> | null,
    tabActions: { value: string, label: string }[],
    favoriteGifs: Array<PeGIFObject>
}