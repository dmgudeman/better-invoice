import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'app/company/company.service';
import { Company } from '../company';
import { InvoiceService } from 'app/invoice/invoice.service';
import { Invoice } from 'app/invoice/invoice';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'companies',
  templateUrl: 'companies.component.html',
  styleUrls: ['companies.component.css']
})
export class CompaniesComponent implements OnInit {
  class: any;
  companies: Company[];
  invoice: Invoice;

  constructor(
              private _companyService: CompanyService,
              private _invoiceService: InvoiceService,
              private router:Router) { };

  ngOnInit() {
    this.companies = this.getCompanies();
  }
  getCompanies(): Company[] {
    return this._companyService.getCompanies();
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

  goToNewItem(company:Company){
    let title = "New Item";
    let hourly = company.hourly;
    let companyName = company.name;
    let uId =4;
    let coId = company.id;
    this.router.navigate(['/new-item', {hourly: hourly, companyName:companyName, coId: coId, uId:uId , title: title}]);
  }
  goToNewCompany(company:Company){
    let hourly = company.hourly;
    let companyName = company.name;
    let coId = company.id;
    let uId =4
    this.router.navigate(['/company-details', {hourly: hourly, 
                                           name:companyName, 
                                           uId:uId,
                                           id:coId}]);
  }
}


