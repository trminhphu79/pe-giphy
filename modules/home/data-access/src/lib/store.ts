import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialHomeState } from "./state";
import { GifApiService } from "@pe-giphy/pe-giphy-api";
import { computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { delay, pipe, switchMap, tap } from "rxjs";
import { SelfStore } from "@pe-giphy/my-gifs/data-access";
import { PeGIFObject } from "@pe-giphy/models";

export const HomeStore = signalStore(
    {
        providedIn: 'root',
    },
    withState(initialHomeState),
    withComputed((store, selfStore = inject(SelfStore)) => ({
        trendingListMaped: computed(() => {
            return store.trendingGifs().map((gif) => {
                const isExistingFavorited = selfStore.favoriteGifs().findIndex((item) => item.id == gif.id) > -1;
                return {
                    ...gif,
                    liked: isExistingFavorited
                }
            })
        })
    })),
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
                        offset: store.filterModel().offset + store.filterModel().limit
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
                    patchState(store, { loading: false, suggestionTags: response.data.map((item) => ({ avatarUrl: '', name: item.name, username: '' })) });
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
        updateItem(item: PeGIFObject) {
            const newList = store.trendingGifs().map((ite) => {
                if (ite.id == item.id) {
                    ite = item;
                }
                return ite
            })
            patchState(store, { trendingGifs: newList })
        },
        clearSuggestionTags() {
            patchState(store, { loading: false, suggestionTags: [] })
        },
        clearTrendingData() {
            patchState(store, { loading: false, trendingGifs: [] })
        },
        clearFilterModel() {
            patchState(store, { loading: false, filterModel: initialHomeState.filterModel })
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
