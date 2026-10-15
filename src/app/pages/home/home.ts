import { Component, inject, signal } from '@angular/core';
import { PostBox } from '../../components/post-box/post-box';
import { GetAllPosts } from '../../services/getAllPosts.service';

@Component({
  imports: [PostBox],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {

  public postsHttp = inject(GetAllPosts);

  public postsData = signal<any[]>([]);
  public postsCount = signal<number>(0);

  public currentPage = signal<number>(1);
  public lastPage = signal<number>(1);

  public getPosts(page: number = 1) {
    this.postsHttp.getAllPosts(page).subscribe({
      next: (response) => {
        this.postsData.set(response.posts);
        this.postsCount.set(response.postsCount);

        this.currentPage.set(response.currentPage);
        this.lastPage.set(response.lastPage);
      },

      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.getPosts();
  }


}
