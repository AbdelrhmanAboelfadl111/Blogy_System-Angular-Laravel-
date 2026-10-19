import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetAllPostsWithTrashed {

    private http = inject(HttpClient);

    private ApiUrl = 'https://blogy.abdelrhmanabofadlqassim111.workers.dev/api/post/getAllWithTrashed';

    public getAllWithTrashed(page: number = 1) {
        return this.http.get<any>(`${this.ApiUrl}?page=${page}`);
    }
}
