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
    private addressId:number;
    private company:Company;
    private errorMessage: string;

    myform : FormGroup;
    street1 = new FormControl;
    street2 = new FormControl;
    city = new FormControl;
    state = new FormControl;
    postalCode = new FormControl;
    country = new FormControl;
    invalid = new FormControl;
    longitude = new FormControl;
    latitude = new FormControl;

  constructor( 
        private _addressService:AddressService,
        private _companyService:CompanyService,
        private _location:Location,
        private _router:Router,
        private _route:ActivatedRoute,
        private _fb:FormBuilder) { }

  ngOnInit() {
    this.invalid.setValue(false);
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
            });
  
  }

  onSubmit() {
        let  id = null;
        var payload = this.myform.value;

        var result;
            if (id) {
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
