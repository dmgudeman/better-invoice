import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { LoginComponent }           from '../users/login/login.component';

const usersRoutes = [
  { path: 'login', component: LoginComponent },
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