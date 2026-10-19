import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {

  private http = inject(HttpClient);

  private ApiUrl = 'https://blogy1.abdelrhmanabofadlqassim111.workers.dev/api/post/getPostEdit';

  // Get post data
  public EditPostServiceMethod(postId: { id: number }) {
    return this.http.post<any>(this.ApiUrl, postId);
  }

  // Update post data
  public submitEditPost(
    id: number,
    postData: {
      Title: string;
      author_name: string;
      description: string;
    }
  ) {
    return this.http.put(
      `https://blogy1.abdelrhmanabofadlqassim111.workers.dev/api/post/editPost/${id}`,
      postData
    );
  }
}
