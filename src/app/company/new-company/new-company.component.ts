import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CompanyService } from 'app/company/company.service';
import { Company } from '../company';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule, FormGroup, FormsModule, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCompanyComponent implements OnInit {
  private company:Company;
  private errorMessage: string;
  private coId: number;
  private coName:string;
  private title:string;
  myform : FormGroup;
  id= new FormControl;
  name = new FormControl;
  color = new FormControl;
  hourly= new FormControl;
  paymentTerms= new FormControl;
  active= new FormControl;
  
  
  constructor(
           private _companyService: CompanyService,
           private _router:Router,
           private _route:ActivatedRoute,
           private _fb:FormBuilder) { }
  ngOnInit(){
            this.myform = this._fb.group({
                    "id":this.id,
                    "name":this.name,
                    "color":this.color,
                    "hourly": this.hourly,
                    "paymentTerms": this.paymentTerms,
                    "active": this.active,
                });
         this._route.params.subscribe(params => { this.coId = params['id'];
                                 });
         this._companyService.getCompany(this.coId)
              .subscribe(company => {this.company= company;
                this.id.setValue(this.company.id);
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
      
          // this._route.params.subscribe(params => {
          
          //     this.myform = this._fb.group({
          //           "name":this.name = params['name'],
          //           "color":this.color = params['color'],
          //           "hourly": this.hourly = params['hourly'],
          //           "paymentTerms": this.paymentTerms = params['paymentTerms'],
          //           "active": this.active = params['active'],
          //       });
          
          // console.log(this.myform.value.name + "this.myform.value.name") 
          this.title = this.coId ? " Edit "+ this.coName + " Details" : " New Business";
          
          // if (!this.coId) {
          //   return
          
          
      // });

  }
 
  onSubmit() {
   
    var id = this.myform.value.id;
    var payload = this.myform.value;
    
    // let company;
    // this._companyService.addCompany(payload)
    //     .subscribe(x => {company = x;
    //     this._router.navigate(['home-app']);
    //     });
	
  var result;
        
        if (this.id) 
            result = this._companyService.updateCompany(payload);
        else
            result = this._companyService.addCompany(payload);
            
		result.subscribe(x => {
            // Ideally, here we'd want:
            // this.form.markAsPristine();
            this._router.navigate(['companies']);
        });
	}
    
}
