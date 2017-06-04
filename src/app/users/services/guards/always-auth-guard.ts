
// https://www.udemy.com/angular-2-from-theory-to-practice/learn/v4/t/lecture/6039888?start=0

import { Router, 
         ActivatedRoute, 
         Params,
         CanActivate }             from '@angular/router';

export class AlwaysAuthGuard implements CanActivate {
    
    canActivate () {
       console.log(`AlwaysAuthGuard`);
       return true;


    }

}