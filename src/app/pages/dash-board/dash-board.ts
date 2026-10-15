import { Component, inject, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  NavigationEnd
} from '@angular/router';

import { filter } from 'rxjs';

import { GetAllPostsWithTrashed } from '../../services/getAllWithTrashed.service';
import { GetAllOnlyTrashed } from '../../services/getAllOnlyTrashed.service';
import { GetAllPosts } from '../../services/getAllPosts.service';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-dash-board',
  styleUrl: './dash-board.scss',
  templateUrl: './dash-board.html',
})
export class DashBoard {

  public countOfCurrentPosts = signal<number>(0);

  public router = inject(Router);

  public postsWithTrashedHttp = inject(GetAllPostsWithTrashed);
  public onlyTrashedHttp = inject(GetAllOnlyTrashed);
  public postsHttp = inject(GetAllPosts);

  ngOnInit() {

    // Check the current route on initialization
    this.updatePostsCount();

    // Listen for route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.updatePostsCount();
      });

  }

  public updatePostsCount() {

    const currentUrl = this.router.url.split('?')[0];

    if (currentUrl === '/dashboard/posts') {
      this.getPostsWithTrashed();
    }
    else if (currentUrl === '/dashboard/trashed') {
      this.getOnlyTrashed();
    }
    else if (currentUrl === '/dashboard/published') {
      this.getPublishedPosts();
    }

  }

  public getPostsWithTrashed(page: number = 1) {
    this.postsWithTrashedHttp.getAllWithTrashed(page).subscribe({
      next: (response) => {
        this.countOfCurrentPosts.set(response.postsCount);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public getOnlyTrashed(page: number = 1) {
    this.onlyTrashedHttp.getAllOnlyTrashed(page).subscribe({
      next: (response) => {
        this.countOfCurrentPosts.set(response.postsCount);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public getPublishedPosts(page: number = 1) {
    this.postsHttp.getAllPosts(page).subscribe({
      next: (response) => {
        this.countOfCurrentPosts.set(response.postsCount);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
