import { Component, OnInit }    from '@angular/core';
import { FlexLayoutModule }     from '@angular/flex-layout';
import { Router, 
         ActivatedRoute, 
         Params }               from '@angular/router';
import { Observable }           from 'RXJS/Observable';
import { Company }              from '../company';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { CompanyService }       from '../company.service';
import { InputComponent }       from '../../shared/input/input.component';
import { InvoiceService }       from '../../invoice/invoice.service';
import { Invoice }              from '../../invoice/invoice';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  class: any;
  companies: Observable<Company[]>;
  invoice: Invoice;
  errorMessage: string;
  name:string;
  color:string;
  hourly:number;
  paymentTerms:number;
  active:boolean;
  editing:boolean = false;
  
  constructor(
              private _companyService: CompanyService,
              private _invoiceService: InvoiceService,
              private _router:Router) { 
              };

  ngOnInit() { 
    this.getCompanies();
    
  }
  
  getCompanies(){
    this.companies = this._companyService.getCompanies();
  }
  
  goToEditCompany(company?:Company){
      if (company){
          let coId = company.id;
          let coName = company.name;
          let color = company.color;
          let hourly = company.hourly;
          let paymentTerms = company.paymentTerms;
          let active = company.active;
          this._router.navigate(['/edit-company/' + coId, {id:coId, name:coName, color:color}]);
      } else {
          this._router.navigate(['/edit-company']);
     }
  }

  goToNowhere () {
    
  }
}