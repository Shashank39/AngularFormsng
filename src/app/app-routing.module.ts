import { UserDetailComponent } from './user-detail/user-detail.component';
import { ListUserComponent } from './list-user/list-user.component';

import { HomeComponent } from './homeComponent/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

 {
    path:'home',
    component:HomeComponent
  },
 {
    path:'userdetail',
    component:UserDetailComponent
  },
  {
    path:'list-user',
    component:ListUserComponent
  },
  {
    path:'', redirectTo: 'home', pathMatch:'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
