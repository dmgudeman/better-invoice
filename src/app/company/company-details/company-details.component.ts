import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { InvoiceService } from 'app/invoice/invoice.service';
import { Invoice } from '../../invoice/invoice';
import { Item } from '../../item/item';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  class: any;
  companies: Company[];
  invoice: Invoice;
  company;
  id: number;
  name: string;
  color: string;
  hourly: number;
  items: Item[] = [];
  xsClassBool =false;
  mdClassBool =true;

  constructor(
    private _companyService: CompanyService,
    private _invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute) { };
    
  ngOnInit() {
    this.company = this.getCompany();
    this.items = this.getItemsByInvoices(); 
  }
  getCompanies(): Company[] {
    return this._companyService.getCompanies();
  }

  setColor(color) {
    return color
  }
  getItemsByInvoices() {
    let coId = this.id;
    let items: Item[];
    let invoices = this._invoiceService.getInvoices();

    for (let i = 0, len = invoices.length; i < len; i++){
         this.getItemsByInvoiceHelper(invoices[i]);

    }
    return this.items;
  }
  getItemsByInvoiceHelper(invoice:Invoice) {
    let newItems = invoice.ivItems;
  
    for( let i = 0; i < newItems.length ; i++){
      if (newItems[i]){
       
        this.items.push(newItems[i]);
      }
    }
  }
 
  goToInvoice(company: Company) {
    let uId = 1;
    let coId = company.id;
    this.invoice = this._invoiceService.makeInvoice(uId, coId);
    this.router.navigate(['/invoice', this.invoice.id]);
  }

  goToNewItem(company: Company) {
    let title= "Edit Item"
    let hourly = company.hourly;
    let companyName = company.name;
    let uId = 4
    this.router.navigate(['/new-item', { hourly: hourly, companyName: companyName, uId: uId, title: title}]);
  }
  getCompany() {
    this.route.params
      .switchMap((params: Params) => this._companyService.getCompanyById(+params['id']))
      .subscribe(company => {
        this.company = company;
        this.id = this.company.id;
        this.name = this.company.name;
        this.color = this.company.color;
        this.hourly = this.company.hourly;
        return this.company;
      });
  }
 
  myClasses = {xs:false, md:false}
  setClassesMd() {
    this.myClasses.md =true;
  }
  setClassesXs() {
    this.myClasses.xs =true;
  }
  getNothing() {

  }
  deleteUser(){}
}
