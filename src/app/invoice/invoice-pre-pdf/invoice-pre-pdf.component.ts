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

@Component({
  selector: 'app-invoice-pre-pdf',
  templateUrl: './invoice-pre-pdf.component.html',
  styleUrls: ['./invoice-pre-pdf.component.css']
})
export class InvoicePrePdfComponent implements OnInit {
  coId: number;
  date = new Date("2017-2-11");
  date2 = new Date("2017-1-1");
  errorMessage: string;
  item: ItemDetailComponent;
  items: Item[] = [];

  constructor(
               private _location:Location,
               private _companyService:CompanyService,
               private _itemService:ItemService,
               private _route:ActivatedRoute ) { }

  ngOnInit() {
      
      this._route.params.subscribe(params => {this.coId = params['id']; });
       let coDetails = this.getItemsByCompany(this.coId);
      // this._itemService.getItemsByCompany(this.coId)
      //                               //  .subscribe( data =>this.itemss = data);
      //                                .subscribe( data => console.log("hi there"));
    //  console.log( "yyyyyyyyyyyyyyyyyy " +this.itemss);
  //  this.itemss =  this.getItemsByDateRange(this.coId, this.date);
   

  
  }

  getItemsByDateRange(id, date): Object{
   let itemz;
   return itemz = this._itemService.getItemsByDateRange(id, date)
                              .subscribe(data => { this.items = data;
                                        });
                            
  }
   getItemsByCompany(coId) {
        // let stark =
        this._companyService
            .getItemsByCompany(coId)
            .subscribe(items => this.items = items,
            error => this.errorMessage = <any>error);
        // return stark;
    }
   
  goNowhere() {};

  goBack(): void {
        this._location.back();
    }

}
