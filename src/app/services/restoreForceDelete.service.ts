import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestoreForceDeleteService {

  private http = inject(HttpClient);

  private ApiUrl = 'http://127.0.0.1:8000/api/post';

  // Restore post
  public restorePost(id: number) {
    return this.http.patch(
      `${this.ApiUrl}/restorePost/${id}`,
      {}
    );
  }

  // Permanently delete post
  public forceDelete(id: number) {
    return this.http.delete(
      `${this.ApiUrl}/forceDelete/${id}`
    );
  }
}
