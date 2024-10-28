import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialSleftState } from "./state";
import { computed, inject } from "@angular/core";
import { ChannelApiService, GifApiService, LocalStorageApiService } from "@pe-giphy/pe-giphy-api";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { forkJoin, map, of, pipe, switchMap, tap } from "rxjs";
import { SearchOptions, UploadGifOptions } from "@pe-giphy/models";
import { AppStore } from "@pe-giphy/app-store";
import { TabActionEnum } from "./enum";
import { PeGIFObject } from "@pe-giphy/models";

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
            if (ids?.length == 0) {
                return of()
            }

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
        likeGifs$: (input: PeGIFObject) => {
            const currentGifs = store.favoriteGifs();
            const existingIndex = currentGifs.findIndex(gif => gif?.id === input?.id);
            let newGifs;
            if (existingIndex > -1) {
                if (input.liked) {
                    newGifs = currentGifs.filter((_, index) => index !== existingIndex);
                }
            } else {
                newGifs = [...currentGifs, input];
            }
            patchState(store, { favoriteGifs: newGifs });
            storageApi.set('favoriteGifs', newGifs);
            return of(existingIndex > -1)
        },
        setTab(tab: string) {
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
            patchState(store, { favoriteGifs: storageApi.get<PeGIFObject[]>('favoriteGifs') || [] });
            patchState(store, { uploadGifIds: storageApi.get<string[]>('uploadGifIds') || [] });
            store.loadGifByIds(getState(store).uploadGifIds).subscribe();
        },
    })
)