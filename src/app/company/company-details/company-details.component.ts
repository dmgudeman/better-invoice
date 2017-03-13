import { Component, OnInit }   from '@angular/core';
import { Location }            from '@angular/common';
import {
    Router,
    ActivatedRoute,
    Params
}                              from '@angular/router';
import { FlexLayoutModule }    from '@angular/flex-layout';
import { Observable }          from 'RXJS/Observable';
import { CompanyService }      from '../company.service';
import { Company }             from '../company';
import { InvoiceService }      from '../../invoice/invoice.service';
import { Invoice }             from '../../invoice/invoice';
import { Item }                from '../../item/item';
import { ItemDetailComponent } from 'app/item/item-detail/item-detail.component';
import { NewItemComponent }    from '../../item/new-item/new-item.component';
import { Shared }              from '../../shared/shared';

@Component({
    selector: 'app-company-details',
    templateUrl: './company-details.component.html',
    styleUrls: ['./company-details.component.css'],

})
export class CompanyDetailsComponent implements OnInit {
    companies: Company[];
    company;
    coId: number;
    coName: string;
    coColor: string;
    errorMessage: string;
    hourly: number;
    id: number;
    item: ItemDetailComponent;
    items: Item[] = [];
    invoice: Invoice;
    shared: Shared = new Shared();

    constructor(
        private _companyService: CompanyService,
        private _invoiceService: InvoiceService,
        private _location: Location,
        private _router: Router,
        private _route: ActivatedRoute) { };

    ngOnInit() {
        this._route.params
            .subscribe(params => {
                this.coId = +params['coId'];
                this.coName = params['coName'];
                this.coColor = params['coColor'];
            });
        let coDetails = this.getItemsByCompany(this.coId);

        this.getCompany();
    }

    getCompanies() {
        this._companyService
            .getCompanies()
            .subscribe(companies => {
                this.companies = companies;
                return this.companies;
            });
    }

    setColor(color) {
        return color
    }

    getItemsByCompany(coId) {
        let stark = this._companyService
            .getItemsByCompany(coId)
            .subscribe(items => this.items = items,
            error => this.errorMessage = <any>error);
        return stark;
    }

    goToInvoice(company: Company) {
        let uId = 1;
        let coId = company.id;
        this.invoice = this._invoiceService.makeInvoice(uId, coId);
        this._router.navigate(['/invoice', this.invoice.id]);
    }

    goToEditItem(item?: Item, company?: Company) {
        let id = item.id;
        let coId = item.companyId;

        this._router.navigate(['/new-item/' + id, { id: id, coId: coId }]);
    }
    goToNewItem() {
        let coId = this.coId;
        let coName = this.coName;

        this._router.navigate(['/new-item/', { coId: coId, coName: coName }]);
    }
    goToItemDetail(item) {
        this.item = item;
        this._router.navigate(['/item-detail']);
    }
    goToEditCompany() {
        if (this.coName) {
            let coId = this.company.id;
            let coName = this.company.name;
            let color = this.company.color;
            let hourly = this.company.hourly;
            let paymentTerms = this.company.paymentTerms;
            let active = this.company.active;
            this._router.navigate(['/edit-company/' + coId, { id: coId, name: coName, color: color }]);
        } else {
            this._router.navigate(['/edit-company']);
        }
    }

    getCompany() {
        var stark = this._companyService
            .getCompany(this.coId)
            .subscribe(company => this.company = company)
        return stark;
    }

    goBack() {
        this._location.back();
    }

    getNothing() {

    }
}
