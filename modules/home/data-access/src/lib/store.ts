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
                    console.log("Store state; ", store.loading());
                    console.log("start time; ", new Date().getTime());
                }),
                switchMap(() => {
                    return gifApi.searchTrending(store.filterModel())
                }),
                tap((response) => {
                    console.log("end time; ", new Date().getTime());
                    patchState(store, { loading: false, trendingGifs: store.trendingGifs().concat(response.data) })
                }),
            )
        ),
        loadDetail$: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((id) => {
                    return gifApi.getDetailGif(id)
                }),
                delay(500),
                tap((response) => patchState(store, { loading: false, detailGif: response.data })),
            )
        ),
        resetDetail() {
            patchState(store, { detailGif: null })
        }
    })),
    withHooks({
        onInit(store) {
            console.log("onInit: ", store);
            store.loadTrending$(null)
        },
        onDestroy(store) {
            patchState(store, { trendingGifs: [], detailGif: null })
        },
    })
)
