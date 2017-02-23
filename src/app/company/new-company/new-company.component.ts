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
  // private newCompany:Company;
  private company:Company;
  private errorMessage: string;
  private coId: number;
  private coName:string;
  private title:string;
  myform : FormGroup;
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
            // this.myform = this._fb.group({
            //         "name":this.name,
            //         "color":this.color,
            //         "hourly": this.hourly,
            //         "paymentTerms": this.paymentTerms,
            //         "active": this.active,
            //     });
            this._companyService.getCompany(this.coId)
              .subscribe(company => this.company= company,
              response => {
                  if (response.status === 404){
                    this._router.navigate(['NotFound']);
              }
          });
      
          this._route.params.subscribe(params => {
              this.myform = this._fb.group({
                    "name":this.name = params['name'],
                    "color":this.color = params['color'],
                    "hourly": this.hourly = params['hourly'],
                    "paymentTerms": this.paymentTerms = params['paymentTerms'],
                    "active": this.active = params['active'],
                });
          
          this.title = this.coId ? " Edit "+this.coName+ " Details" : " New Business";
          
          // if (!this.coId) {
          //   return
          
          
      });

      

      this.myform.valueChanges
                  .subscribe( data => console.log(JSON.stringify(data)));
    //   this._route.params.subscribe(params => {
    //       this.coId =params['id'];
    //       this.coName = params['name'];
    //       this.title = this.coId ? " Edit "+this.coName+ " Details" : " New Business";
          
    //       // if (!this.coId) {
    //       //   return
          
    //       this._companyService.getCompany(this.coId)
    //           .subscribe(company => this.company= company[0],
    //           response => {
    //               if (response.status === 404){
    //                 this._router.navigate(['NotFound']);
    //           }
    //       });
    //   });
  }
 
  onSubmit() {
    var payload = this.myform.value; 
    console.log(JSON.stringify(this.myform.value));
    let company;
    this._companyService.addCompany(payload)
        .subscribe(x => {company = x;
        this._router.navigate(['home-app']);
        });
	}
    
}
