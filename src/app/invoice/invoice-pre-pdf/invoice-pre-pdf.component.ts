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
import { Shared }                         from '../../shared/shared';

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
  items2: Item[] =[]
  coDetails
  shared: Shared;

  constructor(
               private _location:Location,
               private _companyService:CompanyService,
               private _itemService:ItemService,
               private _route:ActivatedRoute ) {
                 this.shared = new Shared();
                }

  ngOnInit() {
      
      this._route.params.subscribe(params => {this.coId = params['id']; });
       this.coDetails = this.getItemsByCompany(this.coId);
      console.log('TESTTTT ' + this.shared.setDate2().date.month + " ")
      console.log('TESTTTT ' + this.shared.setDate2().date.day + " ,")
      console.log('TESTTTT ' + this.shared.setDate2().date.year)
       
  }

   getItemsByCompany(coId) {
     let date = new Date ('2017-10-07');
     date =  this.shared.prepareDate(date)
     console.log ( "DATE " + date);
        this._companyService
            .getItemsByCompany2(coId)
            // .filter(e => e[0].date === '2017-10-07')
            .do(e=>console.log("GGGGGGGGGGG " + ((this.shared.prepareDate(e[0].date) === date))))
          //  .map( x => x.date)
            .subscribe(items => this.items = items,
                       error => this.errorMessage = <any>error,
                       ()=>console.log('completed')
                       );
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
