import { Component, input, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-post-box',
  styleUrl: './post-box.scss',
  templateUrl: './post-box.html',
})
export class PostBox {
  public postData = input<any>();



}
