import { Component, inject, signal } from '@angular/core';
import { GetAllPostsWithTrashed } from '../../services/getAllWithTrashed.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EditPostService } from '../../services/editPost.service';
import Swal from 'sweetalert2';
import { DeletePostService } from '../../services/delete.service';
import { RestoreForceDeleteService } from '../../services/restoreForceDelete.service';

@Component({
  imports: [RouterLink,RouterLinkActive],
  selector: 'app-dash-board-posts-box-all',
  styleUrl: './dash-board-posts-box-all.scss',
  templateUrl: './dash-board-posts-box-all.html',
})
export class DashBoardPostsBoxAll {

  public postsHttp = inject(GetAllPostsWithTrashed);

  public editPostHttp = inject(EditPostService);

  public isLoading = signal<boolean>(false);


  public postId = {
    'id': 0
  };

  public postsData = signal<any>([]);
  public postsCount = signal<number>(0);

  public currentPage = signal<number>(1);
  public lastPage = signal<number>(1);

  public getPosts(page: number = 1) {
    this.isLoading.set(true);
    this.postsHttp.getAllWithTrashed(page).subscribe({
      next: (response) => {
        this.postsData.set(response.posts);
        this.postsCount.set(response.postsCount);


        this.currentPage.set(response.currentPage);
        this.lastPage.set(response.lastPage);
        this.isLoading.set(false);
      },

      error: (error) => {
        console.log(error);
        this.isLoading.set(false);
      }
    });
  }

  private deletePostHttp = inject(DeletePostService);

  public submitDeletePost(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this post directly!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePostHttp.deletePost(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Post has been successfully deleted.',
              timer: 2000,
              showConfirmButton: false,
            });
            this.getPosts(this.currentPage());
          },
          error: (error) => {
            console.error(error);

            Swal.fire({
              icon: 'error',
              title: 'Delete Failed',
              text: error.error?.message ?? 'Failed to delete post.',
            });
          },
        });
      }
    });
  }

  private restoreForceDeleteHttp = inject(RestoreForceDeleteService);

// Restore post
public submitRestorePost(id: number) {
  Swal.fire({
    title: 'Restore this post?',
    text: 'The post will be restored from the trash.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, restore it!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      this.restoreForceDeleteHttp.restorePost(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Restored!',
            text: 'Post has been successfully restored.',
            timer: 2000,
            showConfirmButton: false,
          });

          this.getPosts(this.currentPage());
        },

        error: (error) => {
          console.error(error);

          Swal.fire({
            icon: 'error',
            title: 'Restore Failed',
            text: error.error?.message ?? 'Failed to restore post.',
          });
        },
      });
    }
  });
}

// Permanently delete post
public submitForceDelete(id: number) {
  Swal.fire({
    title: 'Permanently delete this post?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete permanently!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      this.restoreForceDeleteHttp.forceDelete(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Permanently Deleted!',
            text: 'Post has been permanently deleted.',
            timer: 2000,
            showConfirmButton: false,
          });

          this.getPosts(this.currentPage());
        },

        error: (error) => {
          console.error(error);

          Swal.fire({
            icon: 'error',
            title: 'Force Delete Failed',
            text: error.error?.message ?? 'Failed to permanently delete post.',
          });
        },
      });
    }
  });
}

  ngOnInit() {
    this.getPosts();
  }


}








