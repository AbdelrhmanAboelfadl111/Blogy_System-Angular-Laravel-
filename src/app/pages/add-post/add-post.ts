import { Component, inject, signal } from '@angular/core';
import { AddPostService } from '../../services/addPost.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  imports: [FormsModule],
  selector: 'app-add-post',
  styleUrl: './add-post.scss',
  templateUrl: './add-post.html',
})
export class AddPost {
  private addPostService = inject(AddPostService);

  public isValid = signal<Boolean>(false);



  public postData = {
    Title: '',
    author_name: '',
    description: ''
  };

  public checkIsValid() {
    if (this.postData.Title == "" || this.postData.author_name == "" || this.postData.description == "") {
      this.isValid.set(false);
      return

    } else {
      this.isValid.set(true);
    }
  }

  public submitAddPost(form: NgForm) {
    this.checkIsValid();
    if (this.isValid()) {
        this.addPostService.AddPost(this.postData).subscribe({
        next: (response) => {
            console.log(response);
            Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
          }).fire({
            icon: "success",
            title: `${response}`
          });
        },
        error: (error) => {
          console.log(error.error.message);
          Swal.fire({
            icon: "error",
            title: "Couldn't Add New Post",
            text: `${error.error.message}`,
          });
        }
      });
    } else {
        Swal.fire({
          icon: "error",
          title: "Couldn't Add New Post",
          text: "Please Check Your Post Data",
        });
    }
  }
}
