import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialSleftState } from "./state";
import { computed, inject } from "@angular/core";
import { ChannelApiService, GifApiService } from "@pe-giphy/pe-giphy-api";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, forkJoin, of, pipe, switchMap, tap } from "rxjs";
import { SearchOptions, UploadGifOptions } from "@pe-giphy/models";
import { GIFObject } from "giphy-api";
import { AppStore } from "@pe-giphy/app-store";

export const SelfStore = signalStore(
    { providedIn: "root" },
    withState(initialSleftState),
    withMethods((store, gifApi = inject(GifApiService), channelApi = inject(ChannelApiService), appStore = inject(AppStore)) => ({
        loadMe$: rxMethod(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((response) => {
                    const payload: any = {
                        q: "@" + appStore.user.username(),
                    }
                    const userPayload: Partial<SearchOptions> = {
                        ...store.filterModel(),
                    };
                    userPayload.q = appStore.user.username();

                    return forkJoin([
                        gifApi.search(payload),
                        channelApi.search(userPayload)
                    ])
                }),
                tap(([gifRes, channelRes]) => {
                    patchState(store, { loading: false, relatedGifs: gifRes.data, detailChannel: channelRes.data?.[0] })
                }),
            )
        ),
        uploadGif: (input: UploadGifOptions) => {
            patchState(store, { loading: true })
            return gifApi.uploadGif(input).pipe(
                tap(() => {
                    patchState(store, { loading: false })
                })
            )
        },
        likeGifs: (input: GIFObject) => {
            const newGifs = [...store.favoriteGifs(), input];
            patchState(store, { favoriteGifs: newGifs });
            localStorage.setItem('favoriteGifs', JSON.stringify(newGifs))
        },
        setTab(tab: "COLLECTION" | "FAVORITE") {
            patchState(store, { currentTab: tab });
        }
    })),
    withComputed((store) => ({
        selectedList: computed(() => {
            return store.currentTab() == 'COLLECTION' ? store.relatedGifs() : store.favoriteGifs()
        })
    })),
    withHooks({
        onInit(store) {
            const favoriteGifs = localStorage.getItem('favoriteGifs') ?? '';
            patchState(store, { favoriteGifs: favoriteGifs ? JSON.parse(favoriteGifs) : [] });
        },
    })
)