import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { initialHomeState } from "./state";
import { GifApiService } from "@pe-giphy/pe-giphy-api";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { GIFObject } from "giphy-api";
import { pipe, switchMap, tap } from "rxjs";

const HomeStore = signalStore(
    {
        providedIn: 'root',
    },
    withState(initialHomeState),
    withMethods((store, gifApi: GifApiService = inject(GifApiService)) => ({
        loadTrending$: rxMethod<GIFObject[]>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap(() => {
                    return gifApi.searchTrending(store.filterModel())
                }),
                tap((response) => patchState(store, { loading: true, trendingGifs: response.data })),
            )
        )
    })
    )
)
export default HomeStore