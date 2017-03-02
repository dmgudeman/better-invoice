import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'app/company/company.service';
import { Company } from '../company';
import { InvoiceService } from 'app/invoice/invoice.service';
import { Invoice } from 'app/invoice/invoice';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'RXJS/Observable';
import { CompanyCardComponent } from '../company-card/company-card.component';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.css']
})
export class CompanysComponent implements OnInit {

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
              private router:Router) { 
             
              };

  ngOnInit() { 
    this.getCompanies();
      
  }
  
  getCompanies(){
    this.companies = this._companyService.getCompanies();
  }
   goToInvoice(company:Company) {
    let uId = 1;
    let coId = company.id;
    this.invoice = this._invoiceService.makeInvoice(uId,coId);
    this.router.navigate(['/invoice', this.invoice.id ]);
  }
  
  goToCompanyDetails(company:Company){
    let coId = company.id;
    let coName = company.name;
    let coHourly = company.hourly;
    let coColor= company.color
    let uId = 4

    this.router.navigate(['/company-details', {
                                               coId:coId,
                                               coColor:coColor,
                                               coHourly:coHourly, 
                                               coName:coName, 
                                               uId:uId,
                                               }]);
  }
  
  goToEditCompany(company?:Company){
      if (company){
          let coId = company.id;
          let coName = company.name;
          let color = company.color;
          let hourly = company.hourly;
          let paymentTerms = company.paymentTerms;
          let active = company.active;
          this.router.navigate(['/new-company/' + coId, {id:coId, name:coName, color:color}]);
      } else {
          this.router.navigate(['/new-company']);
     }
  }

  goToNewItem(company){
      let coName = company.name;
      let coId = company.id;
      this.router.navigate(['/new-item', {coName: coName, coId:coId }]);
  }
}
