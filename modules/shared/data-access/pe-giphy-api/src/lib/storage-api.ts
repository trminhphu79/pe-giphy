import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageApiService {

    set<T>(key: string, value: T): void {
        const jsonString = JSON.stringify(value);
        localStorage.setItem(key, jsonString);
    }

    get<T>(key: string): T | null {
        const jsonString = localStorage.getItem(key);
        if (jsonString) {
            try {
                return JSON.parse(jsonString) as T;
            } catch (error) {
                console.error(`Error parsing data for key "${key}":`, error);
                return null;
            }
        }
        return null;
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}
