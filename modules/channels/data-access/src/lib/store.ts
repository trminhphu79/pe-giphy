import { patchState, signalStore, withHooks, withMethods, withState, getState, withComputed } from "@ngrx/signals";
import { ChannelApiService, GifApiService } from "@pe-giphy/pe-giphy-api";
import { computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { initialChannelState } from "./state";
import { map, of, pipe, switchMap, tap } from "rxjs";
import { SearchOptions } from "@pe-giphy/models";
import { TuiAlertService } from '@taiga-ui/core';
import { TranslocoService } from "@jsverse/transloco";
import { PeGIFObject } from "@pe-giphy/models";
import { SelfStore } from "@pe-giphy/my-gifs/data-access";

export const ChannelStore = signalStore(
    { providedIn: "root" },
    withState(initialChannelState),
    withMethods((store, channelApi = inject(ChannelApiService), selfStore = inject(SelfStore), transloco = inject(TranslocoService), alert = inject(TuiAlertService), gifApi = inject(GifApiService)) => ({
        searchChannels$: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((username: string) => {
                    const payload: Partial<SearchOptions> = {
                        ...store.filterModel(),
                    };
                    if (username) {
                        payload.q = username
                    }
                    return channelApi.search(payload)
                }),
                tap((response) => {
                    patchState(store, {
                        loading: false,
                        suggestionChannels: response.data.map((item) => ({ ...item, username: item.user.username as string, name: item.display_name as string, avatarUrl: item.user.avatar_url as string }))
                    });
                })
            )
        ),
        loadDetail$: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((username: string) => {
                    const payload: Partial<SearchOptions> = {
                        ...store.filterModel(),
                    };
                    if (username) {
                        payload.q = username
                    }
                    return channelApi.search(payload)
                }),
                tap((response) => {
                    if (response.data.length == 0) {
                        alert.open(transloco.translate('COMMON.LABEL.CHANNEL_NOT_FOUND') + '...!', {
                            label: 'Oops!',
                            appearance: 'error'
                        }).subscribe()
                        patchState(store, { loading: false });
                        return;
                    }
                    patchState(store, {
                        loading: false,
                        detailChannel: response.data?.[0]
                    });
                }),
                switchMap((response) => {
                    if (!response?.data?.[0]?.user?.username) {
                        return of({ data: [] })
                    }
                    const payload = {
                        q: '@' + response.data?.[0].user.username,
                        limit: 200,
                    }
                    return gifApi.search(payload)
                }),
                tap((response) => {
                    const relatedGifs = response.data.map((gif) => {
                        const isExistingFavorited = selfStore.favoriteGifs().findIndex((item) => item.id == gif.id) > -1;
                        return {
                            ...gif,
                            liked: isExistingFavorited
                        }
                    })
                    patchState(store, {
                        loading: false,
                        relatedGifs: relatedGifs
                    })
                })
            )
        ),
        updateItem(item: PeGIFObject) {
            const newList = store.relatedGifs().map((ite) => {
                if (ite.id == item.id) {
                    ite = item;
                }
                return ite
            })
            patchState(store, { relatedGifs: newList })
        },
        clearSuggestionChannels: () => {
            patchState(store, { suggestionChannels: [], loading: false })
        },
        clearRelatedChannels: () => {
            patchState(store, { relatedGifs: [], loading: false })
        },
        clearDetailChannel: () => {
            patchState(store, { detailChannel: null, loading: false })
        }
    }))
)