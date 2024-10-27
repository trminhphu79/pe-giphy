import { patchState, signalStore, withHooks, withMethods, withState, getState } from "@ngrx/signals";
import { ChannelApiService, GifApiService } from "@pe-giphy/pe-giphy-api";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { GIFObject } from "giphy-api";
import { initialChannelState } from "./state";
import { pipe, switchMap, tap } from "rxjs";
import { SearchOptions } from "@pe-giphy/models";

export const ChannelStore = signalStore(
    { providedIn: "root" },
    withState(initialChannelState),
    withMethods((store, channelApi = inject(ChannelApiService)) => ({
        loadChannels$: rxMethod<unknown>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap(() => {
                    return channelApi.search({
                        ...store.filterModel()
                    })
                }),
                // tap((response) => patchState(store, { loading: true, suggestionChannels: response })),
            )
        ),
        searchChannels$: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((keyword: string) => {
                    const payload: Partial<SearchOptions> = {
                        ...store.filterModel(),
                    };
                    if (keyword) {
                        payload.q = keyword
                    }
                    return channelApi.search(payload)
                }),
                tap((response) => {
                    console.log("Channels response: ", response);
                    patchState(store, {
                        loading: false,
                        suggestionChannels: response.data.map((item) => ({ ...item, name: item.display_name, avatarUrl: item.user.avatar_url }))
                    });
                })
            )
        ),
        clearSuggestionChannels: () => {
            patchState(store, { suggestionChannels: [], loading: false })
        }
    })),
    withHooks({

    })
)