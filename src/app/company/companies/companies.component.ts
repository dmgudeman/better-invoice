import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'app/company/company.service';
import { Company } from '../company';
import { CompanysComponent } from '../companys/companys.component';
import { InvoiceService } from 'app/invoice/invoice.service';
import { Invoice } from 'app/invoice/invoice';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'RXJS/Observable';
import { CompanyCardComponent } from '../company-card/company-card.component';

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
    let coId = company.id;
    let coName = company.name;
    let coHourly = company.hourly;
    let coColor= company.color
    let uId = 4
    // console.log("coId:" + coId + " coColor:" + coColor  
    //                                           + " coHourly:" + coHourly 
    //                                           + " coName:" +coName 
    //                                           + " uId:" + uId)
    this.router.navigate(['/company-details', {
                                               coId:coId,
                                               coColor:coColor,
                                               coHourly:coHourly, 
                                               coName:coName, 
                                               uId:uId,
                                               }]);
  }
  goToCompanys(){
    console.log("goToCompanys fired");
      this.router.navigate(['/companys']);
  }
  goToCompanyCard(){
       this.router.navigate(['/company-card']);
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