import { inject, Injectable } from "@angular/core";
import { DefaultParams } from "@pe-giphy/pe-decorator";
import { APP_CONFIG } from "@pe-giphy/app-config";
import { HttpClient } from "@angular/common/http"
import { MultiResponse, SearchOptions } from "giphy-api";
import { MultipleChannelResponse } from "@pe-giphy/models";
@Injectable({
    providedIn: 'root'
})
export class ChannelApiService {
    private readonly appConfig = inject(APP_CONFIG);
    private readonly httpClient = inject(HttpClient);

    @DefaultParams({ rating: 'g' })
    search(params: Partial<SearchOptions>) {
        return this.httpClient.get<MultipleChannelResponse>(this.appConfig.apiUrl + this.appConfig.apiVersion + "/channels/search", {
            params: { ...params }
        })
    }
    searchSuggestion() { }
}