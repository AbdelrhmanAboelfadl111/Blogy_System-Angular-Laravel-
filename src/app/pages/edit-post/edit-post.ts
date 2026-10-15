import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { EditPostService } from '../../services/submitEditPost.service';
import Swal from 'sweetalert2';
import { DeletePostService } from '../../services/delete.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-edit-post',
  styleUrl: './edit-post.scss',
  templateUrl: './edit-post.html',
})
export class EditPost implements OnInit {

  private route = inject(ActivatedRoute);

  public editPostHttp = inject(EditPostService);

  public postId = 0;

  public isLoading = signal<boolean>(true);
  public isSaving = signal<boolean>(false);

  public postData = signal<any>(null);

  public postDataToSubmit = {
    Title: '',
    author_name: '',
    description: '',
  };

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

  ngOnInit() {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(this.postId) || this.postId < 1) {
      this.isLoading.set(false);

      Swal.fire({
        icon: 'error',
        title: 'Invalid Post ID',
        text: 'The requested post ID is invalid.',
      });

      return;
    }

    // Get post data
    this.editPostHttp.EditPostServiceMethod({ id: this.postId }).subscribe({
      next: (response) => {
        this.postData.set(response);

        this.postDataToSubmit = {
          Title: response.title ?? '',
          author_name: response.author_name ?? '',
          description: response.full_body ?? '',


        };

        this.isLoading.set(false);
      },

      error: (error) => {
        console.log(error);

        this.isLoading.set(false);

        Swal.fire({
          icon: 'error',
          title: "Couldn't Load Post",
          text: error.error?.message ?? 'Failed to load post data.',
        });
      },
    });
  }

  // Submit edited post
  public submitEditPost(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();

      Swal.fire({
        icon: 'error',
        title: "Couldn't Edit Post",
        text: 'Please check your post data.',
      });

      return;
    }

    this.isSaving.set(true);

    this.editPostHttp
      .submitEditPost(this.postId, this.postDataToSubmit)
      .subscribe({
        next: (response) => {
          this.isSaving.set(false);

          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          }).fire({
            icon: 'success',
            title: typeof response === 'string'
              ? response
              : 'Post Has Been Successfully Edited',
          });
        },

        error: (error) => {
          this.isSaving.set(false);

          console.log(error);

          const validationErrors = error.error?.errors;

          const firstValidationError = validationErrors
            ? Object.values(validationErrors).flat()[0]
            : null;

          Swal.fire({
            icon: 'error',
            title: "Couldn't Edit Post",
            text: String(
              firstValidationError ??
              error.error?.message ??
              'Please check your post data.'
            ),
          });
        },
      });
  }
}

