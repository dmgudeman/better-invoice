import { Injectable }       from '@angular/core';

import {
        Http,
        Response,
        Headers,
        RequestOptions
}                           from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Company }          from '../company/company';
import { MyGlobals }        from '../shared/myglobals';
import { Invoice }          from './invoice';
import { Item }             from '../item/item';
import { ItemService }      from '../item/item.service';
import { Shared }           from '../shared/shared';

@Injectable()
export class InvoiceService {

        invoice: Invoice;
        items: Item[];
        shared: Shared;
        myglobals: MyGlobals;
        errorMessage: string;

        private _url;

        constructor(private _http: Http) {
                this.shared = new Shared();
                this.myglobals = new MyGlobals();
                this._url = this.myglobals.url;
        }
        head = `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>A simple, clean, and responsive HTML invoice template</title>
    <style>
    .invoice-box{
        max-width:800px;
        margin:auto;
        padding:30px;
        /* border:1px solid #eee;
        box-shadow:0 0 10px rgba(0, 0, 0, .15); */
        font-size:16px;
        line-height:24px;
        font-family:'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color:#555;
    }
    
    .invoice-box table{
        width:100%;
        line-height:inherit;
        text-align:left;
    }
    
    .invoice-box table td{
        padding:5px;
        vertical-align:top;
    }
    
    .invoice-box table tr td:nth-child(2){
        text-align:right;
    }
    
    .invoice-box table tr.top table td{
        padding-bottom:20px;
    }
    
    .invoice-box table tr.top table td.title{
        font-size:45px;
        line-height:45px;
        color:#333;
    }
    
    .invoice-box table tr.information table td{
        padding-bottom:40px;
    }
    
    .invoice-box table tr.heading td{
        background:#eee;
        border-bottom:1px solid #ddd;
        font-weight:bold;
    }
    
    .invoice-box table tr.details td{
        padding-bottom:20px;
    }
    
    .invoice-box table tr.item td{
        border-bottom:1px solid #eee;
    }
    
    .invoice-box table tr.item.last td{
        border-bottom:none;
    }
    
    .invoice-box table tr.total td:nth-child(2){
        border-top:2px solid #eee;
        font-weight:bold;
    }
    
    /*@media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td{
            width:100%;
            display:block;
            text-align:center;
        }
        
        .invoice-box table tr.information table td{
            width:100%;
            display:block;
            text-align:center;
        }
    }*/
    </style>
    </head>
    <body>`
           
    tail = `  </body>
              </html>          
          `
        // ngInit() {
        // }

        addInvoice(payload) {
                // console.log("INVOICESERVICE this._url + '/invoices' = " + this.getInvoiceUrl())
                // console.log("JSON.stringify({ 'invoice': payload } " + JSON.stringify({ invoice: payload }) )
                return this._http
                        .post(this.getInvoiceUrl(), { "invoice": payload })
                        .map((res)  => { 
                                // console.log(res.json());
                                // console.log(res.json().createdInvoice.id);
                                return res.json();
                        }).catch(this.shared.handleError);
        }

        addPdf(payload) {
             let   augmented  = this.head + payload + this.tail;
             console.log("AUGMENTED " + augmented);
            alert(typeof augmented);
        //      console.log("PAYLOAD " + payload);
                return this._http
                        .post(this.getInvoiceUrl() + '/pdf', { augmented })
                        .map((res)  => { 
                                // console.log("RES.JSON ",  res);
                                // console.log("this.getInvoiceUrl() + '/pdf' " + this.getInvoiceUrl() + '/pdf');
                                // console.log(res.json().createdInvoice.id);
                                return res.json();
                        }).catch(this.shared.handleError);
        }

        

        getInvoices(): Observable<Invoice[]> {
                return this._http.get(this.getInvoiceUrl())
                           .map(response => {
                                //    console.log("GET RESPONSE ", response.json())
                                return response.json()
                        });
        }
        
        getInvoiceById(invoiceId: number): Observable<Invoice> {
                let body;
                return this._http.get(this.getInvoiceByIdUrl(invoiceId))
                            .map ((res:Response) => {body = res.json().invoice;
                                        // console.log("INVOICESERVICE Body " + JSON.stringify(body))
                                             return body;})
        }

        getCompanyFromInvoice(invoice:Invoice){
                // console.log(JSON.stringify(invoice.Company));
                return invoice.Company;
        }
        
        getItemsByInvoiceId( invoiceId ): Observable<Item[]> {
	   let items$;	
	  return this.getInvoiceById(invoiceId)
                   .map(invoice => items$ = invoice.Items)
	}


        getInvoiceUrl() {
                return this._url + "/invoices";
        }
        getInvoiceByIdUrl(invoiceId){
		return this._url + "/invoices/" + invoiceId;
	}

}