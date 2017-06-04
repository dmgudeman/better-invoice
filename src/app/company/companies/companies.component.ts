import { Component, 
         OnInit,
         HostBinding }             from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule }        from '@angular/flex-layout';
import { Router, 
         ActivatedRoute, 
         Params,
         CanActivate }             from '@angular/router';
import { Observable }              from 'RXJS/Observable';

// my components and services
import { Company }                 from '../company';
import { CompanyCardComponent }    from '../company-card/company-card.component';
import { CompanyService }          from '../company.service';
import { InputComponent }          from '../../shared/input/input.component';
import { InvoiceService }          from '../../invoice/invoice.service';
import { Invoice }                 from '../../invoice/invoice';
import { customTransitionLeft }    from '../../shared/custom-transition-left.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  animations: [customTransitionLeft]
})
export class CompaniesComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  class: any;
  companies: Observable<Company[]>;
  companiesArray:Company[]
  invoice: Invoice;
  errorMessage: string;
  name:string;
  color:string;
  hourly:number;
  paymentTerms:number;
  active:boolean;
  editing:boolean = false;
  userId:number
  
  constructor(
              private _companyService: CompanyService,
              private _invoiceService: InvoiceService,
              private _route:ActivatedRoute,
              private _router:Router) { 
              };

  ngOnInit() { 
     
    this.getCompanies();
  }
  
  getCompanies(){
   this._companyService.getCompanies()
        .subscribe(companies => {
          // console.log(`in companies.Component getCompanies companies ${JSON.stringify(companies)}`);
          if (companies ===[]){
            this._router.navigate(['/login'])
          } else {
          this.companiesArray = companies
          }
        });
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

  logout() {
     let result = this._companyService.logout();   
            result.subscribe(x => {
                // Ideally, here we'd want:
                // this.form.markAsPristine();
                console.log(`Im in companies component logout`);
  
                this._router.navigate(['/login']);
            });
  }
  goToNowhere () {
    
  }
}