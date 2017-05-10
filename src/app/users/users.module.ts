import { NgModule }                from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { RouterModule, Routes }    from '@angular/router';
import { FormsModule, 
         ReactiveFormsModule }     from '@angular/forms';
import { HttpModule }              from '@angular/http';
import { LoginComponent }          from './login/login.component';
import { AlertService }            from './alert.service';
import { AuthenticationService }   from './authentication.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule
  ],
  providers: [
    AlertService,
    AuthenticationService
  ]
})
export class UsersModule { }
