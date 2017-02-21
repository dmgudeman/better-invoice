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
    var payload = this.myform.value; 
    this._companyService.addCompany(payload)
                        .then(newCompany=> {
                          console.log(newCompany);
                        });
  }
}
