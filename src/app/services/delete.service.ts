import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeletePostService {

  private http = inject(HttpClient);

  public deletePost(id: number) {
    return this.http.delete(
      `http://blopy.atwebpages.com/api/post/deletePost/${id}`
    );
  }
}

