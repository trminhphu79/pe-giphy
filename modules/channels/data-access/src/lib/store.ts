import { patchState, signalStore, withHooks, withMethods, withState, getState } from "@ngrx/signals";
import { ChannelApiService, GifApiService } from "@pe-giphy/pe-giphy-api";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { GIFObject } from "giphy-api";
import { initialChannelState } from "./state";
import { map, of, pipe, switchMap, tap } from "rxjs";
import { SearchOptions } from "@pe-giphy/models";
import { TuiAlertService } from '@taiga-ui/core';
import { TranslocoService } from "@jsverse/transloco";


export const ChannelStore = signalStore(
    { providedIn: "root" },
    withState(initialChannelState),
    withMethods((store, channelApi = inject(ChannelApiService), transloco = inject(TranslocoService), alert = inject(TuiAlertService), gifApi = inject(GifApiService)) => ({
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
                        limit: 50,
                    }
                    return gifApi.search(payload)
                }),
                tap((response) => {
                    patchState(store, {
                        loading: false,
                        relatedGifs: response.data
                    })
                })
            )
        ),
        loadReltedCollections$: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((username: string) => {
                    const payload: Partial<SearchOptions> = {
                        ...store.filterModel(),
                    };
                    if (username) {
                        payload.q = '@' + username;
                    }
                    return gifApi.search(payload)
                }),
                tap((response) => {
                    patchState(store, {
                        loading: false,
                        relatedGifs: response.data
                    });
                })
            )
        ),
        clearSuggestionChannels: () => {
            patchState(store, { suggestionChannels: [], loading: false })
        },
        clearRelatedChannels: () => {
            patchState(store, { relatedGifs: [], loading: false })
        },
        clearDetailChannel: () => {
            patchState(store, { detailChannel: null, loading: false })
        }
    })),
    withHooks({
        onInit(store) {
            // store.loadChannels$(null)
        }
    })
)