import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/home/home').then(m => m.Home)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../app/pages/dash-board/dash-board').then(m => m.DashBoard),

    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('../app/components/dash-board-posts-box-all/dash-board-posts-box-all')
            .then(m => m.DashBoardPostsBoxAll)
      },
      {
        path: 'trashed',
        loadComponent: () =>
          import('../app/components/dash-board-posts-box-trashed/dash-board-posts-box-trashed')
            .then(m => m.DashBoardPostsBoxTrashed)
      },
      {
        path: 'published',
        loadComponent: () =>
          import('../app/components/dash-board-posts-box-published/dash-board-posts-box-published')
            .then(m => m.DashBoardPostsBoxPublished)
      },
      // Add trashed and published routes here
    ]
  },
  {
    path: 'dashboard/addPost',
    loadComponent: () =>
      import('../app/pages/add-post/add-post').then(m => m.AddPost)
  },
  {
    path: 'dashboard/editPost/:id',
    loadComponent: () =>
      import('../app/pages/edit-post/edit-post').then(m => m.EditPost)
  },
];
