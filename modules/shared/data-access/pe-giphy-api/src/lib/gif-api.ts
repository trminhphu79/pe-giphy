import { inject, Injectable } from "@angular/core"
import { APP_CONFIG } from "@pe-giphy/app-config";
import { HttpClient } from "@angular/common/http"
import { SearchOptions, TrendingOptions } from "@pe-giphy/models";
import { MultiResponse, SingleResponse } from 'giphy-api';

@Injectable({
    providedIn: 'root'
})
export class GifApiService {
    private readonly appConfig = inject(APP_CONFIG);
    private readonly httpClient = inject(HttpClient);

    search(options: SearchOptions) {
        return this.httpClient.get<MultiResponse>(this.appConfig.apiUrl, {})
    }

    searchTrending(options: Partial<TrendingOptions>) {
        return this.httpClient.get<MultiResponse>(this.appConfig.apiUrl + this.appConfig.apiVersion + "/gifs/trending", {
            params: {
                ...options,
                api_key: this.appConfig.apiKey,
                bundle: 'messaging_non_clips',
                rating: 'g'
            }
        })
    }

    searchSuggestion() {
    }
}