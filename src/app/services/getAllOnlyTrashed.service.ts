import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetAllOnlyTrashed {

    private http = inject(HttpClient);

    private ApiUrl = 'http://127.0.0.1:8000/api/post/getAllOnlyTrashed';

    public getAllOnlyTrashed(page: number = 1) {
        return this.http.get<any>(`${this.ApiUrl}?page=${page}`);
    }
}
