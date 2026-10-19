import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AddPostService {

    private http = inject(HttpClient);

    private ApiUrl = 'http://blopy.atwebpages.com/api/post/addPost';

    public AddPost(postData:any) {
        return this.http.post<any>(`${this.ApiUrl}`,postData);
    }
}
