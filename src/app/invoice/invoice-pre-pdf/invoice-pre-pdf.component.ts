import { Component, OnInit }              from '@angular/core';
import { Router, 
         ActivatedRoute, 
         Params }                         from '@angular/router';
import { Location }                       from '@angular/common';
import { Observable }                     from 'rxjs/Observable';

import { CompanyService }                 from '../../company/company.service';
import { Company }                        from '../../company/company';
import { Item }                           from '../../item/item';
import { ItemDetailOneComponent }         from '../../item/item-detail-one/item-detail-one.component';
import { ItemService }                    from '../../item/item.service';
import { Invoice }                        from '../invoice'; 
import { InvoiceService }                 from '../invoice.service';
import { Shared }                         from '../../shared/shared';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-invoice-pre-pdf',
  templateUrl: './invoice-pre-pdf.component.html',
  styleUrls: ['./invoice-pre-pdf.component.css']
})
export class InvoicePrePdfComponent implements OnInit {
  // existing list
  coId: number;
  color:string = '';
  company:Company;
  coName: string = '';
  date = new Date("2017-2-11");
  date2 = new Date("2017-2-12");
  errorMessage: string;
  item: ItemDetailOneComponent;
  items: Item[];
  items2: Item[] =[]
  coDetails
  shared: Shared;

  invoiceId: number = 0;
  invoice: Invoice;
  invoices: Invoice[];

  constructor(
               private _location:Location,
               private _companyService:CompanyService,
               private _itemService:ItemService,
               private _invoiceService:InvoiceService,
               private _route:ActivatedRoute,
               private _router:Router) {
                 this.shared = new Shared();
                }

  ngOnInit() {
      // let datee = new Date('2017-10-07')
      // let datee = new Date()
      this._route.params.subscribe(params => {this.invoiceId = params['id']; });
      this.invoice = this.getInvoice(this.invoiceId);
      this.items = this.getItems(this.invoiceId);
      // this.setColor(this.color);
      // this.company = this._invoiceService.getCompanyFromInvoice(this.invoice);

      
  }
   

  printItems () {
    console.log(this.invoice.Items)
  }
  getInvoice(invoiceId): Invoice {
       this._invoiceService.getInvoiceById(invoiceId)
                           .subscribe(
                                      invoice => {this.invoice = invoice;
                                        this.company = this._invoiceService.getCompanyFromInvoice(this.invoice);
                                        this.coName = this.company.name;
                                        this.color = this.company.color;
                                      console.log("COMPANY  " + JSON.stringify(this.company))
                                      console.log("coName " + JSON.stringify(this.company.name))
                                      console.log("colorrrrrrrrrrrr " + this.color);
                               return invoice}
                           )
       return this.invoice;
  }

  getItems(invoiceId):Item[]{
    let tempItems:Item[];
  this._invoiceService.getItemsByInvoiceId(invoiceId)
                        .map(item => tempItems =item)
                        .subscribe(
                                    result => {
                                           this.items = result;
                                            return this.items;
                                    },
                                    error => this.errorMessage = <any>error) ;
                                    return this.items;
  
  }


    
  // getItemsByDateRange(id, date): Object{
  //  let itemz;
  //  return itemz = this._itemService.getItemsByDateRange(id, date)
  //                             .subscribe(data => { this.items = data;
  //                                       });
  // }
   
  goNowhere() {};

  goBack(): void {
        this._location.back();
    }
  setColor(color) {
        console.log("COLOR " + this.color);
        return color
    }

}
