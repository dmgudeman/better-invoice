import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { InvoiceService } from "../../invoice/invoice.service";
import { Invoice } from "../../invoice/invoice";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css'],
})
  
  
export class CompanyCardComponent implements OnInit {
  shared:Shared = new Shared();
  coId: number;
  @Input() company:Company;
  name:string;
  color:string;
  invoice: Invoice;

  constructor(private _companyService: CompanyService,
              private _invoiceService: InvoiceService,
              private _router: Router,
              private _route: ActivatedRoute,
              ) { }

  ngOnInit() {
      this.name = this.company.name;
      this.color = this.company.color;
  }
  
  getCompany(id) {
     return this._companyService
                .getCompany(id)
                .subscribe(
                    company => {this.company = company,
                                this.name = this.company.name;
                                this.color = this.company.color;},
                    response => { if (response.status = 404) {
                                        this._router.navigate(['not-found']);}
                                }
                );
  }
  setClassColor() {
      return this.shared.setClassColor(null, this.color);
  }
  goToCompanyDetails(company:Company){
    let coId = company.id;
    let coName = company.name;
    let coHourly = company.hourly;
    let coColor= company.color
    let uId = 1
    this._router.navigate(['/company-details', {
                                               coId:coId,
                                               coColor:coColor,
                                               coHourly:coHourly, 
                                               coName:coName, 
                                               uId:uId,
                                               }]);
  }

  goToInvoice(company:Company) {
    let uId = 1;
    let coId = company.id;

    
    // company.id;
    // this.invoice = this._invoiceService.makeInvoice(uId,coId);
    this._router.navigate(['/invoice-edit', {id:coId}]);

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
  goToEditItem(company){
      let coName = company.name;
      let coId = company.id;
      this._router.navigate(['/item-edit', {coName: coName, coId:coId }]);
  }
}
