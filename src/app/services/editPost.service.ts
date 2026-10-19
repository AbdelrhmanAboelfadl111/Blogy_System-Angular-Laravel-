import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EditPostService {

    private http = inject(HttpClient);

    private ApiUrl = 'http://blopy.atwebpages.com/api/post/getPostEdit';

    public EditPost(postId:any) {
        return this.http.post<any>(`${this.ApiUrl}`,postId);
    }
}
