import { Component, OnInit }      from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService }           from '../services/alert.service';
import { AuthenticationService }  from '../services/authentication.service';
import { UserService }            from '../services/user.service';

@Component({
    // moduleId: module.id.toString(),
    selector: 'login',
    templateUrl: 'login.component.html'

})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    myform: FormGroup;
    fcUsername = new FormControl();
    fcPassword = new FormControl();

    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private _fb: FormBuilder,
        private _userService: UserService
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.myform = this._fb.group({
            "username": this.fcUsername,
            "password": this.fcPassword,
        });
    }
    onSubmit() {

        let result;
        let username = this.fcUsername.value;
        let password = this.fcPassword.value;
        let payload = { username, password };

        console.log(`login.component onSubmit payload ${JSON.stringify(payload)}`);

        result = this.authenticationService.login(username, password);

        result.subscribe(x => {
            console.log(`It  fired`);
            
            // Ideally, here we'd want:
            // this.form.markAsPristine();
            this._router.navigate(['companies']);
        });
    }

}