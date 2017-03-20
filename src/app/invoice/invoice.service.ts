import { Injectable }       from '@angular/core';

import {
        Http,
        Response,
        Headers,
        RequestOptions
}                           from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';
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

        getInvoiceUrl() {
                return this._url + "/invoices";
        }

}