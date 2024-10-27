import { PeSearchType } from "./pe-search.enum"

export type PeSearchData = {
    type: PeSearchType,
    keyword: string
}


export type SuggestionItem = {
    name: string,
    avatarUrl: string
}