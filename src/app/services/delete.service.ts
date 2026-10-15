import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeletePostService {

  private http = inject(HttpClient);

  public deletePost(id: number) {
    return this.http.delete(
      `http://127.0.0.1:8000/api/post/deletePost/${id}`
    );
  }
}

