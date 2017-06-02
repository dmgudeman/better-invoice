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
import { UsernameValidators }     from '../services/username-validators';

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
    fcFirstname;
    fcLastname;
    fcUsername;
    fcPassword;
    fcPassword_confirm;  
   
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

        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

        this.myform = this._fb.group({
            "firstname": this.fcFirstname = new FormControl('', Validators.required),
            "lastname": this.fcLastname = new FormControl('', Validators.required),
            "username": this.fcUsername = new FormControl('', Validators.required),
            "password": this.fcPassword = new FormControl('', [Validators.required,
                                                               Validators.minLength(1)]),
            "password_confirm": this.fcPassword_confirm = new FormControl('', Validators.required),
        });
    }

    signup() {
        // var results = authService.login(this.form.value)

        this.myform.controls['username'].setErrors({
            invalidLogin: true
        });

        console.log(`in signup register.component ${this.myform.value}`);
        

    }
    onSubmit() {
      
        let result;
        let firstname = this.fcFirstname.value;
        let lastname = this.fcLastname.value;
        let username = this.fcUsername.value;
        let password = this.fcPassword.value;
        let password_confirmation = this.fcPassword_confirm.value;
        let payload = { firstname, lastname, username, password };

        console.log (`R payload ${JSON.stringify(payload)}`);
        
        result = this._userService.addUser(payload);
    
        result.subscribe(x => {
                // Ideally, here we'd want:
                // this.form.markAsPristine();
            this._router.navigate(['companies']);
        });
    }

}

