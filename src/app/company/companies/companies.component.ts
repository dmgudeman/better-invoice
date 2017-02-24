import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'app/company/company.service';
import { Company } from '../company';
import { InvoiceService } from 'app/invoice/invoice.service';
import { Invoice } from 'app/invoice/invoice';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'RXJS/Observable';

@Component({
  selector: 'companies',
  templateUrl: 'companies.component.html',
  styleUrls: ['companies.component.css']
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
              private router:Router) { };

  ngOnInit() { 
    this.getCompanies();
  }
  
  getCompanies(){
    this.companies = this._companyService.getCompanies();
  //  this._companyService.getCompanies()
  //      .subscribe( (companies):Company[] => 
  //          this.companies = companies,
  //          error=> this.errorMessage = <any>error 
  //     );
  
  }

  setClasses(company: Company) {
    let red: boolean = (company.color === 'red');
    let green = (company.color === 'green');
    let blue = (company.color === 'blue');
    let brown = (company.color === 'brown');
    let yellow = (company.color === 'yellow');
    let purple = (company.color === 'purple');

    let classes = {
      red: red,
      green: green,
      blue: blue,
      brown: brown,
      yellow: yellow,
      purple: purple
    };
    return classes
  }
  
  goToInvoice(company:Company) {
    let uId = 1;
    let coId = company.id;
    this.invoice = this._invoiceService.makeInvoice(uId,coId);
    this.router.navigate(['/invoice', this.invoice.id ]);

  }

  
  goToCompanyDetails(company:Company){
    let hourly = company.hourly;
    let companyName = company.name;
    let coId = company.id;
    let uId =4
    this.router.navigate(['/company-details', {hourly: hourly, 
                                               name:companyName, 
                                               uId:uId,
                                               id:coId}]);
  }
  goToNewCompany(){
    this.router.navigate['new-company'];
  }
  
  goToEditCompany(company?:Company){
     console.log("goToEditCompany fired")
     if (company){
        let coId = company.id;
        let coName = company.name;
        let color = company.color;
        let hourly = company.hourly;
        let paymentTerms = company.paymentTerms;
        let active = company.active;
        this.router.navigate(['/new-company', {id:coId, name: coName, color: color, hourly: hourly, paymentTerms:paymentTerms, active: active} ]);
     } else {
        this.router.navigate(['/new-company']);
     }

  }
}