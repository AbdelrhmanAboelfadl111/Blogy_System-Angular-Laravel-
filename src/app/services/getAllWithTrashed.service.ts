import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetAllPostsWithTrashed {

    private http = inject(HttpClient);

    private ApiUrl = 'http://blopy.atwebpages.com/api/post/getAllWithTrashed';

    public getAllWithTrashed(page: number = 1) {
        return this.http.get<any>(`${this.ApiUrl}?page=${page}`);
    }
}
