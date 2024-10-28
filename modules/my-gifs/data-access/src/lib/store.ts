import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialSleftState } from "./state";
import { computed, inject } from "@angular/core";
import { ChannelApiService, GifApiService, LocalStorageApiService } from "@pe-giphy/pe-giphy-api";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, forkJoin, map, of, pipe, switchMap, tap } from "rxjs";
import { SearchOptions, UploadGifOptions } from "@pe-giphy/models";
import { GIFObject } from "giphy-api";
import { AppStore } from "@pe-giphy/app-store";

export const SelfStore = signalStore(
    { providedIn: "root" },
    withState(initialSleftState),
    withMethods((store, gifApi = inject(GifApiService), channelApi = inject(ChannelApiService), appStore = inject(AppStore), storageApi = inject(LocalStorageApiService)) => ({
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
                }),
            )
        ),
        loadGifByIds: (ids: string[] = getState(store).uploadGifIds) => {
            patchState(store, { loading: true });
            return gifApi.getGifByIds({ ids: ids.join(",") }).pipe(
                tap((response) => {
                    const newRelatedGifs = getState(store).relatedGifs.concat(response.data)
                    patchState(store, { loading: false, relatedGifs: newRelatedGifs })
                })
            )
        },
        uploadGif: (input: UploadGifOptions) => {
            patchState(store, { loading: true });

            if (input.files.length) {
                return gifApi.uploadWithFormData(input).pipe(
                    map((response) => response.map((item) => item.data?.id)),
                    tap((response) => {
                        if (!response?.length) {
                            return
                        }
                        const uploadGifIds = [...getState(store).uploadGifIds, ...response];
                        patchState(store, { loading: false, uploadGifIds });
                        storageApi.set('uploadGifIds', uploadGifIds);
                    }),
                )
            }

            return gifApi.uploadNormal(input).pipe(
                tap((response) => {
                    if (!response?.data?.id) {
                        return;
                    }
                    const uploadGifIds = [...getState(store).uploadGifIds, response.data.id];
                    patchState(store, { loading: false, uploadGifIds });
                    storageApi.set('uploadGifIds', uploadGifIds);
                }),
                map((res) => ([res?.data?.id] as string[]))
            )
        },
        likeGifs: (input: GIFObject) => {
            const newGifs = [...store.favoriteGifs(), input];
            patchState(store, { favoriteGifs: newGifs });
            storageApi.set('favoriteGifs', newGifs);
        },
        setTab(tab: "COLLECTION" | "FAVORITE") {
            patchState(store, { currentTab: tab });
        },
        setLoading(value: boolean) { patchState(store, { loading: value }) }
    })),
    withComputed((store) => ({
        selectedList: computed(() => {
            return store.currentTab() == 'COLLECTION' ? store.relatedGifs() : store.favoriteGifs()
        })
    })),
    withHooks({
        onInit(store) {
            const storageApi = inject(LocalStorageApiService)
            patchState(store, { favoriteGifs: storageApi.get<GIFObject[]>('favoriteGifs') || [] });
            patchState(store, { uploadGifIds: storageApi.get<string[]>('uploadGifIds') || [] });
            store.loadGifByIds(getState(store).uploadGifIds).subscribe();
        },
    })
)