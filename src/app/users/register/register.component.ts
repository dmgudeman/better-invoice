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
    fcUsername       = new FormControl();
    fcPassword       = new FormControl();
    fcPassword2      = new FormControl();


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
            "username":this.fcUsername,
            "password": this.fcPassword,
            "password2": this.fcPassword2,
        });
    }
onSubmit() {
      
        let result;
        // console.log (`x     ${x}`);
        // console.log(`payload ${payload}`);
        
        // console.log(`HIIIIIIIIIII TTTTTTTTTTTTTT `)
        // console.log(`this.fcType.value ${this.fcType.value}`);
        let payload = this.myform.value;
        console.log (`R payload     ${JSON.stringify(payload)}`);
        // console.log (`IE x     ${JSON.stringify(x)}`);
        
           result = this._userService.addUser(payload);
        //    console.log(`result on onSubmit in item-edit ${JSON.stringify(result)}`);
        }
        //    result.subscribe(x => {
        //             // Ideally, here we'd want:
        //             // this.form.markAsPristine();
        //         this._router.navigate(['companies']);
        //    });
    }



