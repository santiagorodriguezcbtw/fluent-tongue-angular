import { Routes } from '@angular/router';

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

  // TODO: enable when topics pages are implemented
  // {
  //   path: 'topics',
  //   loadComponent: () =>
  //     import('./features/topics/pages/topic-list-page/topic-list-page.component').then(
  //       (m) => m.TopicListPageComponent,
  //     ),
  // },
  // {
  //   path: 'topics/new',
  //   loadComponent: () =>
  //     import('./features/topics/pages/topic-form-page/topic-form-page.component').then(
  //       (m) => m.TopicFormPageComponent,
  //     ),
  // },
  // {
  //   path: 'topics/:id',
  //   loadComponent: () =>
  //     import('./features/topics/pages/topic-detail-page/topic-detail-page.component').then(
  //       (m) => m.TopicDetailPageComponent,
  //     ),
  // },
  // {
  //   path: 'topics/:id/edit',
  //   loadComponent: () =>
  //     import('./features/topics/pages/topic-form-page/topic-form-page.component').then(
  //       (m) => m.TopicFormPageComponent,
  //     ),
  // },
  // {
  //   path: 'topics/:id/vocabulary',
  //   loadComponent: () =>
  //     import('./features/vocabulary/pages/vocabulary-list-page/vocabulary-list-page.component').then(
  //       (m) => m.VocabularyListPageComponent,
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
