import { Routes } from '@angular/router';

const loadTopicsPage = () => import('./pages/topics.page/topics.page').then((m) => m.TopicsPage);

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home.page/home.page').then((m) => m.HomePage),
  },

  {
    path: 'topics',
    loadComponent: loadTopicsPage,
  },
  {
    path: 'topics/new',
    loadComponent: loadTopicsPage,
  },
  {
    path: 'topics/:id',
    loadComponent: loadTopicsPage,
  },
  {
    path: 'topics/:id/edit',
    loadComponent: loadTopicsPage,
  },
  {
    path: 'topics/:id/vocabulary',
    loadComponent: loadTopicsPage,
  },

  // TODO: enable when auth pages are implemented
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./features/auth/pages/login-page/login-page.component').then(
  //       (m) => m.LoginPageComponent,
  //     ),
  // },
  // {
  //   path: 'register',
  //   loadComponent: () =>
  //     import('./features/auth/pages/register-page/register-page.component').then(
  //       (m) => m.RegisterPageComponent,
  //     ),
  // },

  // TODO: enable when study page is implemented
  // {
  //   path: 'study/:topicId',
  //   loadComponent: () =>
  //     import('./features/study/pages/study-session-page/study-session-page.component').then(
  //       (m) => m.StudySessionPageComponent,
  //     ),
  // },

  // TODO: enable when progress page is implemented
  // {
  //   path: 'progress',
  //   loadComponent: () =>
  //     import('./features/progress/pages/progress-page/progress-page.component').then(
  //       (m) => m.ProgressPageComponent,
  //     ),
  // },

  // TODO: enable when settings page is implemented
  // {
  //   path: 'settings',
  //   loadComponent: () =>
  //     import('./features/settings/pages/profile-page/profile-page.component').then(
  //       (m) => m.ProfilePageComponent,
  //     ),
  // },

  {
    path: '**',
    redirectTo: 'home',
  },
];
