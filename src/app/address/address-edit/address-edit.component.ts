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
import { Address }                     from '../address';
import { AddressService }              from '../address.service';
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
    // @Input() private address:Address;
            address:Address;
    private addressId:number;
    private company:Company;
    private errorMessage: string;

    myform : FormGroup;
    street1 = new FormControl();
    street2 = new FormControl();
    city = new FormControl();
    state = new FormControl();
    postalCode = new FormControl();
    country = new FormControl();
    invalid = new FormControl;
    longitude = new FormControl;
    latitude = new FormControl;
    CompanyId = new FormControl;

  constructor( 
        private _addressService:AddressService,
        private _companyService:CompanyService,
        private _location:Location,
        private _router:Router,
        private _route:ActivatedRoute,
        private _fb:FormBuilder) { }

  ngOnInit() {
    this.invalid.setValue(false);
    console.log(`address-edit ngOnInt this.coId ${this.coId}`)
    console.log(`address-edit ngOnInt this.coId ${this.coId}`)
    console.log(`address-edit ngOnInt this.coId ${this.coId}`)
   

    
    this.myform = this._fb.group({
            "city": this.city,
            "country": this.country,
            "invalid": this.invalid,
            "latitude": this.latitude,
            "longitude": this.longitude,
            "postalCode": this.postalCode,
            "street1":this.street1,
            "street2":this.street2,
            "state": this.state,
            "CompanyId": this.CompanyId
        });
   this.CompanyId.setValue(this.coId);
   this.setAddress(this.coId);
  }

   setAddress(coId) { 
         this._companyService
            .getCompany(coId)
            .subscribe(company => {this.company= company;
                this.address = company.Address;
               
                   console.log(`address-edit setAddress company ${JSON.stringify(this.address)}`)
                   this.street1.setValue(this.address.street1);
                   this.street2.setValue(this.address.street2);
                   this.city.setValue(this.address.city);
                   this.state.setValue(this.address.state);
                   this.postalCode.setValue(this.address.postalCode);
                   this.country.setValue(this.address.country);
                  //  console.log("Address getCompany this.coId ", this.coId);
                  response => {
                    if (response.status === 404){
                        this._router.navigate(['NotFound']);
                 //  console.log("Address getCompany this.company" + JSON.stringify(this.company));
                    }
                }
            });
    }

  onSubmit() {
        let  id = this.address.id;
        var payload = this.myform.value;
        console.log(`address-edit onSubmit payload ${payload}`)

        var result;
            if (!id) {
                result = this._addressService.addAddress(payload);
            } else {
                let ID = (id) ? id : "ID NOT HERE";
                result = this._addressService.addAddress(payload);
            }   
            result.subscribe(x => {
                // Ideally, here we'd want:
                // this.form.markAsPristine();
                this._router.navigate(['companies']);
            });
    }

    goBack(): void {
        this._location.back();
    }
}
