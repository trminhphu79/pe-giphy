// image.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root', 
})
export class ImageLoaderService {
    private readonly http = inject(HttpClient)
    loadImage(src: string): Observable<string> {
        return this.http
            .get(src, {
                responseType: 'blob',
                reportProgress: true,
                observe: 'events',
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            })
            .pipe(
                map((event) => {
                    if (event.type === HttpEventType.Response) {
                        return window.URL.createObjectURL(event.body as Blob);
                    }
                    return ''; // Return an empty string while loading
                })
            );
    }
}
