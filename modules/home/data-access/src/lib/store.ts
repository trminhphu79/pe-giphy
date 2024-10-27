import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialHomeState } from "./state";
import { GifApiService } from "@pe-giphy/pe-giphy-api";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { GIFObject } from "giphy-api";
import { delay, pipe, switchMap, tap } from "rxjs";

export const HomeStore = signalStore(
    {
        providedIn: 'root',
    },
    withState(initialHomeState),
    withMethods((store, gifApi: GifApiService = inject(GifApiService)) => ({
        loadTrending$: rxMethod(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap(() => {
                    return gifApi.searchTrending(store.filterModel())
                }),
                tap((response) => patchState(store, { loading: false, trendingGifs: response.data })),
            )
        ),
        loadMore$: rxMethod(
            pipe(
                tap(() => {
                    const newFilter = {
                        ...store.filterModel(),
                        offset: store.filterModel().offset + 20
                    };
                    patchState(store, { loading: true, filterModel: newFilter })
                }),
                switchMap(() => {
                    return gifApi.searchTrending(store.filterModel())
                }),
                tap((response) => {
                    patchState(store, { loading: false, trendingGifs: store.trendingGifs().concat(response.data) })
                }),
            )
        ),
        searchSuggestionTags$: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((keyword: string) => {
                    return gifApi.searchSuggestionTags({
                        ...store.filterModel(),
                        q: keyword
                    })
                }),
                tap((response) => {
                    patchState(store, { loading: false, suggestionTags: response.data.map((item) => ({ avatarUrl: '', name: item.name })) });
                })
            )
        ),
        loadDetail$: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((id) => {
                    return gifApi.getDetailGif(id)
                }),
                tap((response) => patchState(store, { loading: false, detailGif: response.data })),
            )
        ),
        searchGifs$: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((keyword: string) => {
                    return gifApi.search({
                        ...store.filterModel(),
                        q: keyword
                    })
                }),
                tap((response) => patchState(store, { loading: false, trendingGifs: response.data })),
            )
        ),
        clearSuggestionTags() {
            patchState(store, { loading: false, suggestionTags: [] })
        },
        clearTrendingData() {
            patchState(store, { loading: false, trendingGifs: [] })
        },
        resetDetail() {
            patchState(store, { loading: false, detailGif: null })
        }
    })),
    withHooks({
        onInit(store) {
            store.loadTrending$(null)
        },
        onDestroy(store) {
            patchState(store, { trendingGifs: [], detailGif: null })
        },
    })
)
