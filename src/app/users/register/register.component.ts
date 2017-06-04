import { Component, OnInit }      from '@angular/core';
import { FormBuilder, 
         FormControl, 
         FormGroup,
         FormsModule, 
         ReactiveFormsModule, 
         Validators }             from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService }           from '../services/alert.service';
import { AuthenticationService }  from '../services/authentication.service';
import { UserService }           from '../services/user.service';
import { validateUsername }     from '../services/user-validators/validate-username';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    myform : FormGroup;
    firstname;
    lastname;
    username;
    password;
    password_confirm; 
   
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _alertService: AlertService,
        private _fb:FormBuilder,
        private _userService:UserService
        ) { }

    ngOnInit() {
        // reset login status
        this._authenticationService.logout();
        this.firstname= new FormControl('', Validators.required);
        this.lastname = new FormControl('', Validators.required);
        this.username = new FormControl('', Validators.required),
        this.password= new FormControl('', [Validators.required,
                                              Validators.minLength(1)]);
        this.password_confirm = new FormControl('', Validators.required);  
        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

        this.myform = this._fb.group({
            "firstname": this.firstname,
            "lastname": this.lastname,
            "username": this.username,
            "password": this.password,
            "password_confirm": this.password_confirm,
        });
    }

    signup() {
        // var results = authService.login(this.form.value)

        this.myform.controls['username'].setErrors({
            invalidLogin: false
        });

        console.log(`in signup register.component ${this.myform.value}`);
        

    }
    onSubmit() {
      
        let result;
        let firstname = this.firstname.value;
        let lastname = this.lastname.value;
        let username = this.username.value;
        let password = this.password.value;
        let password_confirmation = this.password_confirm.value;
        let payload = { firstname, lastname, username, password };

        console.log (`R payload ${JSON.stringify(payload)}`);
        
        result = this._userService.addUser(payload);
    
        result.subscribe(x => {
                // Ideally, here we'd want:
                // this.form.markAsPristine();
            this._router.navigate(['login']);
        });
    }

}

