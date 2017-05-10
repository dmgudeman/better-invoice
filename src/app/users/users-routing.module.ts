import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { LoginComponent }           from '../users/login/login.component';
import { UserComponent }            from '../users/user/user.component';

const usersRoutes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserComponent }
];

@NgModule({
  imports:[
    RouterModule.forChild(usersRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class UsersRoutingModule{}