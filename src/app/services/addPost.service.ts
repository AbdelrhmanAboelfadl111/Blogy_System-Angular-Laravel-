import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AddPostService {

    private http = inject(HttpClient);

    private ApiUrl = 'https://127.0.0.1:8000/api/post/addPost';

    public AddPost(postData:any) {
        return this.http.post<any>(`${this.ApiUrl}`,postData);
    }
}
