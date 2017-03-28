import { Component, 
         OnInit,
         HostBinding }          from '@angular/core';
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
import { customTransition } from '../../shared/custom-transition.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  animations: [customTransition]
})
export class CompaniesComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

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
          setTimeout(()=>this._router.navigate(['/edit-company/' + coId, {id:coId, name:coName, color:color}]));
          return false;
      } else {
          setTimeout(()=>this._router.navigate(['/edit-company']));
          return false;
     }
  }

  goToNowhere () {
    
  }
}