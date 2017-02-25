import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { InvoiceService } from 'app/invoice/invoice.service';
import { Invoice } from '../../invoice/invoice';
import { Item } from '../../item/item';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'RXJS/Observable';

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
  coId: number;
  coName: string;
  coColor: string;
  hourly: number;
  items: Item[] = [];
  xsClassBool =false;
  mdClassBool =true;
  errorMessage: string;

  constructor(
    private _companyService: CompanyService,
    private _invoiceService: InvoiceService,
    private _router: Router,
    private _route: ActivatedRoute) { };
    
  ngOnInit() {
        
        this._route.params
                   .subscribe(params => { 
                                          this.coId = +params['coId'];
                                          this.coName = params['coName'];
                                          this.coColor = params['coColor'];
                                        });
   console.log("coId " + this.coId)
    // this.company = this.getCompany();
     let yunky = this.getItemsByCompany(this.coId);
     console.log("YUNKY " + yunky);
  }
  // getCompanies(): Company[] {
  //   return this._companyService.getCompanies();
  // }
  getCompanies(){
   this._companyService.getCompanies()
      .subscribe(companies => {
        this.companies = companies;
        return this.companies;
      });
  }

  setColor(color) {
    return color
  }

   getItemsByCompany(coId){
       let stark =   this._companyService.getItemsByCompany(coId)
          .subscribe( (items) => 
           this.items = items,
           error=> this.errorMessage = <any>error );
           return stark;
   }
  // getItemsByInvoices() {
  //   let coId = this.coId;
  //   let items: Item[];
  //   let invoices = this._invoiceService.getInvoices();

  //   for (let i = 0, len = invoices.length; i < len; i++){
  //        this.getItemsByInvoiceHelper(invoices[i]);

  //   }
  //   return this.items;
  // }

 
  // getItemsByInvoiceHelper(invoice:Invoice) {
  //   let newItems = invoice.ivItems;
  
  //   for( let i = 0; i < newItems.length ; i++){
  //     if (newItems[i]){
  //       console.log("newItems[i] " + JSON.stringify(newItems[i]));
  //       this.items.push(newItems[i]);
  //     }
  //   }
  
 
  goToInvoice(company: Company) {
    let uId = 1;
    let coId = company.id;
    this.invoice = this._invoiceService.makeInvoice(uId, coId);
    this._router.navigate(['/invoice', this.invoice.id]);
  }

  goToEditItem( itemId?: number, companyId?: number  ) {
    if(itemId){
       this._router.navigate(['/new-item', {id:itemId, companyId: companyId} ]);
    }
    // let title= "Edit Item"
    // let hourly = company.hourly;
    // let companyName = company.name;
    // let uId = 4
    // if (!item){
    //           this._router.navigate(['/new-item', { hourly: hourly, 
    //                                                companyName: companyName, 
    //                                                uId: uId, 
    //                                              title: title}
    //                                 ]);
    // }else{
      
    // }           
  }
  getCompany() {
   var stark = this._companyService.getCompany(this.coId)
                    .do(data =>{ console.log("this.coId " + this.coId)})
                    .subscribe(company => this.company = company)


  return stark;
  //  = this._route.params
  //     .switchMap((params: Params) => this._companyService.getCompany(params['coId']))
  //     .subscribe(company => this.company = company)
           
      
  }
  // getCompany(id){
  //  var stark = this._companyService.getCompany(id)
  //       .subscribe(company=>this.company = company)

        
  // }
 
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
