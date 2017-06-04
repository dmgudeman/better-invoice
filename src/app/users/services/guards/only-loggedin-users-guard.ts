
import { Injectable } from '@angular/core';
import { Router, 
         ActivatedRoute, 
         Params,
         CanActivate }             from '@angular/router';
import { AuthenticationService }   from '../authentication.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
    
    constructor (private _authenticationService: AuthenticationService) {

    }
    canActivate () {
       console.log(`OnlyLoggedInUsersGuard`);
       if ( this._authenticationService.loggedIn()) {
           return true;
       } else {
           window.alert("You do not have permission to view this page");
           return true;
       }
    }
}