import { 
    Component, 
    ChangeDetectionStrategy,
    HostBinding,
    Input,
    OnInit, 
    ViewChild }                        from '@angular/core';
import { 
    FormBuilder, 
    FormControl, 
    FormGroup, 
    FormsModule, 
    ReactiveFormsModule }              from '@angular/forms';
import { Location }                    from '@angular/common';
import { 
    Router, 
    ActivatedRoute, 
    Params }                           from '@angular/router';
import { Observable }                  from 'rxjs/Observable';

import { CompanyService }              from 'app/company/company.service';
import { Company }                     from '../../company/company';
import { customTransitionRight }       from '../../shared/custom-transition-right.component';
import { InputComponent }              from '../../shared/input/input.component';
import { ItemDetailComponent }         from 'app/item/item-detail/item-detail.component';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {
  @Input() coId: number;
 private company:Company;
    private errorMessage: string;
    private coName:string;
    private title:string;
    private itemId: number;

    myform : FormGroup;
    street1 = new FormControl;
    street2 = new FormControl;
    city = new FormControl;
    state = new FormControl;
    postalCode = new FormControl;
    country = new FormControl;
    invalid = new FormControl;

  constructor( private _companyService: CompanyService,
        private _location:Location,
        private _router:Router,
        private _route:ActivatedRoute,
        private _fb:FormBuilder) { }

  ngOnInit() {
    this.getCompany(this.coId);
    this.myform = this._fb.group({
            // "id":this.id,
            "street1":this.street1,
            "street2":this.street2,
            "city": this.city,
            "state": this.state,
            "postalCode": this.postalCode,
            "country": this.country
            });
        this._route.params
            .subscribe(params => { 
                                    this.coId = params['id']
                                    this.title = params['name']
                                });
        this.title = this.coId ? " Edit "+ this.title + " Details" : " New Business";
                                  
  //       if(this.coId){
  //           this._companyService.getCompany(this.coId)
  //               .subscribe(company => {this.company= company;
  //                   // this.id.setValue(this.company.id);
  //                   this.name.setValue(this.company.name);
  //                   this.color.setValue(this.company.color);
  //                   this.hourly.setValue(this.company.hourly);
  //                   this.paymentTerms.setValue(this.company.paymentTerms);
  //                   this.active.setValue(this.company.active);
  //                   return this.company;
  //               },
  //               response => {
  //                   if (response.status === 404){
  //                       this._router.navigate(['NotFound']);
  //               }
  //           });


  // }
  }

  getCompany(coId) {
    this._companyService
      .getCompany(coId)
      .subscribe(company => {
      this.company = company;
        console.log("this.coId in address", this.coId);
        console.log("THIS COMPANY in address" + JSON.stringify(this.company));
      })
  }
}
