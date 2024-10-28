import { inject, Injectable } from "@angular/core"
import { APP_CONFIG } from "@pe-giphy/app-config";
import { HttpClient } from "@angular/common/http"
import { SearchOptions, TrendingOptions, SuggestionTagResponse, UploadGifOptions, UploadGifResponse, PeMultiResponse, PeSingleResponse } from "@pe-giphy/models";
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
        return this.httpClient.get<PeMultiResponse>(this.appConfig.apiUrl + this.appConfig.apiVersion + "/gifs/trending", {
            params: { ...params }
        })
    }

    @DefaultParams({ bundle: 'messaging_non_clips', rating: 'g', lang: 'en' })
    search(params: Partial<SearchOptions>) {
        return this.httpClient.get<PeMultiResponse>(this.appConfig.apiUrl + this.appConfig.apiVersion + "/gifs/search", {
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
        return this.httpClient.get<PeSingleResponse>(this.appConfig.apiUrl + this.appConfig.apiVersion + `/gifs/${id}`)
    }

    @DefaultParams({ rating: 'g' })
    getGifByIds(params: { ids: string }) {
        return this.httpClient.get<PeMultiResponse>(this.appConfig.apiUrl + this.appConfig.apiVersion + "/gifs", {
            params: { ...params }
        })
    }

    uploadWithFormData(payload: UploadGifOptions) {
        const uploadRequests = payload.files.map((file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', this.appConfig.apiKey);
            formData.append('username', payload.username);
            formData.append('tags', payload.tags);
            formData.append('is_hidden', '0');
            formData.append('title', 'Hello im a cat cute');
            return this.httpClient.post<UploadGifResponse>(
                `${this.appConfig.uploadUrl}${this.appConfig.apiVersion}/gifs`,
                formData
            )
        });

        return forkJoin(uploadRequests);
    }

    uploadNormal(payload: UploadGifOptions) {
        const completedPayload: Omit<UploadGifOptions, 'files'> = {
            source_post_url: payload.source_post_url,
            source_image_url: payload.source_image_url,
            username: payload.username,
            tags: payload.tags,
            is_hidden: 0
        };

        return this.httpClient.post<UploadGifResponse>(
            `${this.appConfig.uploadUrl}${this.appConfig.apiVersion}/gifs`,
            completedPayload
        );
    }
}
