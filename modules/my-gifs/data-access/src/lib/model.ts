import { Meta, Pagination, UserChannel, BaseOptions } from "@pe-giphy/models";
import { GIFObject } from "giphy-api";

export type SelfState = {
    meta: Meta,
    loading: boolean,
    pagination: Pagination,
    filterModel: BaseOptions,
    relatedGifs: GIFObject[],
    detailChannel: UserChannel | null,
}