import { inject, Injectable } from "@angular/core"
import { APP_CONFIG } from "@pe-giphy/app-config";
import { HttpClient } from "@angular/common/http"
import { SearchOptions, TrendingOptions, SuggestionTagResponse, UploadGifOptions } from "@pe-giphy/models";
import { MultiResponse, SingleResponse } from 'giphy-api';
import { DefaultParams } from "@pe-giphy/pe-decorator"
import { forkJoin, Observable, of } from "rxjs";
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

    uploadGif(payload: UploadGifOptions): Observable<any> {

        if (payload.files && payload.files.length > 0) {
            const uploadRequests = payload.files.map((file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('api_key', this.appConfig.apiKey);
                formData.append('username', payload.username);
                formData.append('tags', payload.tags);
                formData.append('is_hidden', '0');
                return this.httpClient.post<SingleResponse>(
                    `${this.appConfig.uploadUrl}${this.appConfig.apiVersion}/gifs`,
                    formData
                )
            });

            return forkJoin(uploadRequests);
        } else {
            const completedPayload: UploadGifOptions = {
                source_post_url: payload.source_post_url,
                source_image_url: payload.source_image_url,
                username: payload.username,
                tags: payload.tags,
                is_hidden: 0,
            };

            return this.httpClient.post<SingleResponse>(
                `${this.appConfig.uploadUrl}${this.appConfig.apiVersion}/gifs`,
                completedPayload
            );
        }
    }
}
