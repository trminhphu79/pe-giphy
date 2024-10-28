import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialSleftState } from "./state";
import { inject } from "@angular/core";
import { ChannelApiService, GifApiService } from "@pe-giphy/pe-giphy-api";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { forkJoin, pipe, switchMap, tap } from "rxjs";
import { SearchOptions, UploadGifOptions } from "@pe-giphy/models";

export const SelfStore = signalStore(
    { providedIn: "root" },
    withState(initialSleftState),
    withMethods((store, gifApi = inject(GifApiService), channelApi = inject(ChannelApiService)) => ({
        loadMe$: rxMethod(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((response) => {
                    const payload: any = {
                        q: '@joecappa',
                    }

                    const userPayload: Partial<SearchOptions> = {
                        ...store.filterModel(),
                    };
                    userPayload.q = '@joecappa';

                    return forkJoin([
                        gifApi.search(payload),
                        channelApi.search(userPayload)
                    ])
                }),
                tap(([gifRes, channelRes]) => {
                    console.log("Channel: ", channelRes)
                    patchState(store, { loading: false, relatedGifs: gifRes.data, detailChannel: channelRes.data?.[0] })
                }),
            )
        ),
        uploadGif$: rxMethod<UploadGifOptions>(
            pipe(
                tap(),
                switchMap((payload) => {
                    return gifApi.uploadGif(payload)
                })
            )
        )
    })),
    withHooks({
        onInit() {
        },
        onDestroy() { }
    })
)