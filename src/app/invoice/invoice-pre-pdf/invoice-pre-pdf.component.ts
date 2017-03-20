import { Component, OnInit }              from '@angular/core';
import { Router, 
         ActivatedRoute, 
         Params }                         from '@angular/router';
import { Location }                       from '@angular/common';
import { Observable }                     from 'rxjs/Observable';

import { CompanyService }                 from '../../company/company.service';
import { Item }                           from '../../item/item';
import { ItemDetailComponent }            from '../../item/item-detail/item-detail.component';
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
  date = new Date("2017-2-11");
  date2 = new Date("2017-1-1");
  errorMessage: string;
  item: ItemDetailComponent;
  items: Item[] = [];
  items2: Item[] =[]
  coDetails
  shared: Shared;

  invoiceId: number = 0;
  invoice: Invoice[];

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
      let datee = new Date('2017-10-07')
      // let datee = new Date()
      this._route.params.subscribe(params => {this.invoiceId = params['id']; });
      this.getInvoice(this.invoiceId);
                         
                         
  }
   
  getInvoice(invoiceId) {
    this._invoiceService.getInvoiceById(invoiceId)
                        .subscribe(
                          invoice => {this.invoice = invoice;
                                 console.log("INVOICE  " + this.invoice)
                                       return invoice}
                        )
  }
    
  getItemsByDateRange(id, date): Object{
   let itemz;
   return itemz = this._itemService.getItemsByDateRange(id, date)
                              .subscribe(data => { this.items = data;
                                        });
  }
   
  goNowhere() {};

  goBack(): void {
        this._location.back();
    }

}
