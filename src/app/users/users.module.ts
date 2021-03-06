import { NgModule }                from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { RouterModule, Routes }    from '@angular/router';
import { FormsModule, 
         ReactiveFormsModule }     from '@angular/forms';
import { HttpModule }              from '@angular/http';
import { LoginComponent }          from './login/login.component';
import { AlertService }            from './services/alert.service';
import { AuthenticationService }   from './services/authentication.service';
import { UsersRoutingModule }      from './users-routing.module';
import { UserComponent }           from './user/user.component';
import { UserService }             from './services/user.service';
import { RegisterComponent }       from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService
  ]
})
export class UsersModule { }
