import { Injectable } from '@angular/core';
import {
        Http,
        Response,
        Headers,
        RequestOptions
} from '@angular/http';
import { MyGlobals } from '../shared/myglobals';
import { Invoice } from './invoice';
import { Item } from '../item/item';
import { ItemService } from '../item/item.service';
import { Shared } from '../shared/shared';
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
                // console.log ("this.myglobals.url " + this.myglobals.url);
                // this._url = "http://192.168.1.3:3000";
                this._url = this.myglobals.url;
        }
        // ngInit() {
        // }

        addInvoice(payload) {
                console.log("INOIVCESERVICE this._url + 'invoices'" + this._url + "/invoices")
                console.log("JSON.stringify({ 'invoice': payload } " + JSON.stringify({ "invoice": payload }) )
                return this._http.post(this.getInvoiceUrl(), JSON.stringify({ "invoice": payload }))
                        .map(res => res.json())
                        .catch(this.shared.handleError);
        }
        

        getInvoiceUrl() {
                return this._url + "/invoices";
        }

}