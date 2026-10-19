import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetAllPosts {

    private http = inject(HttpClient);

    private ApiUrl = 'https://blogy1.abdelrhmanabofadlqassim111.workers.dev/api/post/getAllWithoutTrashed';

    public getAllPosts(page: number = 1) {
        return this.http.get<any>(`${this.ApiUrl}?page=${page}`);
    }
}
