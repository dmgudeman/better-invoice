import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from 'app/company/company.service';
import { Company } from '../company';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule, FormGroup, FormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {
  private newCompany:Company;
  private errorMessage: string;
  //@ViewChild('f')myform:any; //this is to access the ngForm on the template, used with @ViewChild
  // private businessName;
  // private hourlyPay;
  // private paymentTerms;
  // private active;
  myform : FormGroup;
  
  constructor(
           private _companyService: CompanyService,
           private _router:Router) { }

  ngOnInit() {
      this.myform = new FormGroup({
        name: new FormControl(),
        color: new FormControl(),
        hourly: new FormControl(),
        paymentTerms: new FormControl(),
        active: new FormControl(),
      })
  }
   
  
  onSubmit() {
    console.log("Form Submitted!");
    
    var payload = "{" + '"company": ' + JSON.stringify(this.myform.value) + "}";
    console.log("onSubmit:  " + payload );
    // this._companyService.doPOST(payload);
    this._companyService.addCompany(payload);
  }
}
