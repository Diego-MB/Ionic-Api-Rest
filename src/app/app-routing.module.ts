import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateAccountPage } from './create-account/create-account.page';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { UserListPage } from './user-list/user-list.page';
import { UserDetailPage } from './user-detail/user-detail.page';
import { UserEditPage } from './user-edit/user-edit.page';
import { HomePageModule } from './home/home.module';
import { CreateAccountPageModule } from './create-account/create-account.module';
import { LoginPageModule } from './login/login.module';
import { UserListPageModule } from './user-list/user-list.module';
import { UserDetailPageModule } from './user-detail/user-detail.module';
import { UserEditPageModule } from './user-edit/user-edit.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { 
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule) },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'user-detail',
    children: [
      {
        path: '',
        loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
      }
    ]
    // loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
  },
  {
    path: 'user-edit',
    children: [
      {
        path: '',
        loadChildren: () => import('./user-edit/user-edit.module').then( m => m.UserEditPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./user-edit/user-edit.module').then( m => m.UserEditPageModule)
      }
    ]
    // loadChildren: () => import('./user-edit/user-edit.module').then( m => m.UserEditPageModule)
  }
];

// const routes: Routes = [
//   { path: '', 
//     redirectTo: 'home',
//     pathMatch: 'full' 
//   },
//   { path: 'home', 
//     component: HomePageModule 
//   },
//   { path: 'create-account',
//     component: CreateAccountPageModule
//   },
//   {
//     path: 'login',
//     component: LoginPageModule
//   },
//   {
//     path: 'user-list',
//     component: UserListPageModule
//   },
//   {
//     path: 'user-detail',
//     component: UserDetailPageModule
//   },
//   {
//     path: 'user-edit',
//     component: UserEditPageModule
//   }
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
