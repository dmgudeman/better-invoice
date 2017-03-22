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
        // ngInit() {
        // }

        addInvoice(payload) {
                console.log("INVOICESERVICE this._url + '/invoices' = " + this.getInvoiceUrl())
                console.log("JSON.stringify({ 'invoice': payload } " + JSON.stringify({ invoice: payload }) )
                return this._http
                        .post(this.getInvoiceUrl(), { "invoice": payload })
                        .map((res)  => { 
                                console.log(res.json());
                                console.log(res.json().createdInvoice.id);
                                console.log("in here");
                                return res.json();
                        }).catch(this.shared.handleError);
        }

        getInvoices(): Observable<Invoice[]> {
                return this._http.get(this.getInvoiceUrl())
                           .map(response => {
                                   console.log("GET RESPONSE ", response.json())
                                return response.json()
                        });
        }
        
        getInvoiceById(invoiceId: number): Observable<Invoice> {
                let body;
                return this._http.get(this.getInvoiceByIdUrl(invoiceId))
                            .map ((res:Response) => {body = res.json().invoice;
                                        console.log("INVOICESERVICE Body " + JSON.stringify(body))
                                             return body;})
        }

        getCompanyFromInvoice(invoice:Invoice){
                console.log(JSON.stringify(invoice.Company));
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