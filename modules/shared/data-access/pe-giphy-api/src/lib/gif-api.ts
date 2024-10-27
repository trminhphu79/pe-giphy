import { inject, Injectable } from "@angular/core"
import { APP_CONFIG } from "@pe-giphy/app-config";
import { HttpClient } from "@angular/common/http"
import { SearchOptions, TrendingOptions, SuggestionTagResponse } from "@pe-giphy/models";
import { MultiResponse, SingleResponse } from 'giphy-api';
import { DefaultParams } from "@pe-giphy/pe-decorator"
@Injectable({
    providedIn: 'root'
})
export class GifApiService {
    private readonly appConfig = inject(APP_CONFIG);
    private readonly httpClient = inject(HttpClient);

    @DefaultParams({ bundle: 'messaging_non_clips', rating: 'g' })
    searchTrending(params: Partial<TrendingOptions>) {
        return this.httpClient.get<MultiResponse>(this.appConfig.apiUrl + this.appConfig.apiVersion + "/gifs/trending", {
            params: { ...params }
        })
    }

    @DefaultParams({ bundle: 'messaging_non_clips', rating: 'g', lang: 'en' })
    search(params: Partial<SearchOptions>) {
        return this.httpClient.get<MultiResponse>(this.appConfig.apiUrl + this.appConfig.apiVersion + "/gifs/search", {
            params: { ...params }
        })
    }

    @DefaultParams({ rating: 'g' })
    searchSuggestionTags(params: Partial<SearchOptions>) {
        return this.httpClient.get<SuggestionTagResponse>(this.appConfig.apiUrl + this.appConfig.apiVersion + "/gifs/search/tags", {
            params: { ...params }
        })
    }

    getDetailGif(id: string) {
        return this.httpClient.get<SingleResponse>(this.appConfig.apiUrl + this.appConfig.apiVersion + `/gifs/${id}`)
    }
}