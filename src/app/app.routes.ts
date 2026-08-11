import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'study/:slug',
    loadComponent: () => import('./pages/study-flash-page/study-flash-page').then((m) => m.StudyFlashPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
]
