import { 
    Component, 
    ChangeDetectionStrategy,
    HostBinding,
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

import { Address }                     from '../../address/address';
import { CompanyService }              from 'app/company/company.service';
import { Company }                     from '../company';
import { customTransitionRight }       from '../../shared/custom-transition-right.component';
import { InputComponent }              from '../../shared/input/input.component';
import { ItemDetailComponent }         from 'app/item/item-detail/item-detail.component';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
  animations: [customTransitionRight ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCompanyComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display')   display = 'block';
    @HostBinding('style.position')  position = 'absolute';
            address:Address;
    private company:Company;
    private errorMessage: string;
    private coId: number;
    private coName:string;
    private title:string;
    private itemId: number;

    myform : FormGroup;
    name = new FormControl;
    color = new FormControl;
    hourly= new FormControl;
    paymentTerms = new FormControl;
    active= new FormControl
    
    constructor(
        private _companyService: CompanyService,
        private _location:Location,
        private _router:Router,
        private _route:ActivatedRoute,
        private _fb:FormBuilder) { }
    
    ngOnInit(){
        this.myform = this._fb.group({
            // "id":this.id,
            "name":this.name,
            "color":this.color,
            "hourly": this.hourly,
            "paymentTerms": this.paymentTerms,
            "active": this.active,
            });
        this._route.params
            .subscribe(params => { 
                                    this.coId = params['id']
                                    this.coName = params['coName']
                                    console.log(`name ${this.coName}`);
                                });
        this.title = this.coId ? " Edit "+ this.coName + " Details" : " New Business";
                                  
        if(this.coId){
            this._companyService.getCompany(this.coId)
                .subscribe(company => {this.company= company;
        console.log(`Company-details ngOnInit this.company ${JSON.stringify(company)}`)
                    
                    this.name.setValue(this.company.name);
                    this.color.setValue(this.company.color);
                    this.hourly.setValue(this.company.hourly);
                    this.paymentTerms.setValue(this.company.paymentTerms);
                    this.active.setValue(this.company.active)
                    return this.company;
                },
                response => {
                    if (response.status === 404){
                        this._router.navigate(['NotFound']);
                }
            });
        }
    }
 
    onSubmit() {
        let  id = this.coId;
        var payload = this.myform.value;
        
        var result;
            if (id) {
                result = this._companyService.updateCompany(payload, id);
            } else {
                let ID = (id) ? id : "ID NOT HERE";
                console.log(`edit-company onSubmit payload ${JSON.stringify(payload)}`);
                
                result = this._companyService.addCompany(payload);
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
