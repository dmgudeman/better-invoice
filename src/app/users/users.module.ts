import { NgModule }                from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { RouterModule, Routes }    from '@angular/router';
import { FormsModule, 
         ReactiveFormsModule }     from '@angular/forms';
import { HttpModule }              from '@angular/http';
import { LoginComponent }          from './login/login.component';
import { AlertService }            from './services/alert.service';
import { AuthenticationService }   from './authentication.service';
import { UsersRoutingModule }      from './users-routing.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    UsersRoutingModule
  ],
  providers: [
    AlertService,
    AuthenticationService
  ]
})
export class UsersModule { }
