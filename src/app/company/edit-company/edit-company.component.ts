import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { CompanyService } from 'app/company/company.service';
import { Company } from '../company';
import { InputComponent } from '../../shared/input/input.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule, FormGroup, FormsModule, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCompanyComponent implements OnInit {
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
  paymentTerms= new FormControl;
  active= new FormControl;
  
  
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
                                          this.title = params['name']
                                        });
                                                  
        this.title = this.coId ? " Edit "+ this.title + " Details" : " New Business";
                                  
        if(this.coId){
            this._companyService.getCompany(this.coId)
                .subscribe(company => {this.company= company;
                    // this.id.setValue(this.company.id);
                    this.name.setValue(this.company.name);
                    this.color.setValue(this.company.color);
                    this.hourly.setValue(this.company.hourly);
                    this.paymentTerms.setValue(this.company.paymentTerms);
                    this.active.setValue(this.company.active);
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
    
    console.log("PAYL " + payload);
    var result;
        if (id) {
            result = this._companyService.updateCompany(payload, id);
        } else {
            let ID = (id) ? id : "ID NOT HERE";
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
