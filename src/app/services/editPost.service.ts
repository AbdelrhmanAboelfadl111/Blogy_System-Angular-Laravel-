import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EditPostService {

    private http = inject(HttpClient);

    private ApiUrl = 'https://blogy1.abdelrhmanabofadlqassim111.workers.dev/api/post/getPostEdit';

    public EditPost(postId:any) {
        return this.http.post<any>(`${this.ApiUrl}`,postId);
    }
}
