import { Routes } from '@angular/router'

const loadAdminPage = () => import('./pages/admin.page/admin.page').then((m) => m.AdminPage)

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '',
    loadComponent: () => import('./pages/home.page/home.page').then((m) => m.HomePage),
  },
  {
    path: 'admin',
    loadComponent: loadAdminPage,
  },
  {
    path: 'study/:slug',
    loadComponent: () => import('./pages/study-flash.page/study-flash.page').then((m) => m.StudyFlashPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
]
