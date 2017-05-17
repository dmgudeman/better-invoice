import { Component, OnInit }      from '@angular/core';
import { FormsModule }            from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService }           from '../services/alert.service';
import { UserService }            from '../services/user.service';
import { User }                   from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    users: User[];
   model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _userService: UserService,
        private alertService: AlertService
        ) { }

    ngOnInit() {
        this.getUsers();
        console.log(`Hi there`);
        
    }

    getUsers(){
   this._userService.getAllUsers()
                     .subscribe(users=> {
                       this.users = users;
                        console.log(this.users)})
                     ;
  

}
}