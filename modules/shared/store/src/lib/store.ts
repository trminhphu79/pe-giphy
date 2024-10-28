import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { APP_STATE_TOKEN } from "./state";
import { AppState } from "./model";

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(APP_STATE_TOKEN)),
    withMethods((store, initialAppState = inject(APP_STATE_TOKEN)) => ({
        setState(newState: Partial<AppState>) {
            patchState(store, newState);
        },
        updateState(newState: Partial<AppState>) {
            patchState(store, (state) => ({ ...state, ...newState }))
        },
        resetState(state: Partial<AppState> = initialAppState) {
            patchState(store, state)
        }
    }))
)