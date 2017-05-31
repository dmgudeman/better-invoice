import { 
         Component, 
         OnInit,
         HostBinding }          from '@angular/core';
import { Location }             from '@angular/common';
import {
         Router,
         ActivatedRoute,
         Params }               from '@angular/router';
import { FlexLayoutModule }     from '@angular/flex-layout';
// 3rd party modules
import { Observable }           from 'RXJS/Observable';
// components
import { Address }              from '../../address/address';
import { AddressComponent }     from '../../address/address/address.component';
import { CompanyService }       from '../company.service';
import { Company }              from '../company';
import { customTransitionLeft } from '../../shared/custom-transition-left.component';
import { InvoiceService }       from '../../invoice/invoice.service';
import { Invoice }              from '../../invoice/invoice';
import { Item }                 from '../../item/item';
import { ItemDetailComponent }  from 'app/item/item-detail/item-detail.component';
import { Shared }               from '../../shared/shared';

@Component({
    selector: 'app-company-details',
    templateUrl: './company-details.component.html',
    styleUrls: ['./company-details.component.css'],
    animations: [customTransitionLeft]

})
export class CompanyDetailsComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display')   display = 'block';
    @HostBinding('style.position')  position = 'absolute';
    
    address: Address;
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
    userId: number;
    

    constructor(
        private _companyService: CompanyService,
        private _invoiceService: InvoiceService,
        private _location: Location,
        private _router: Router,
        private _route: ActivatedRoute) { };

    ngOnInit() {
        this._route.params
            .subscribe(params => {
                this.userId = params['userId'];
                this.coId = +params['coId'];
                this.coName = params['coName'];
                this.coColor = params['coColor'];
            });
        // console.log(`Company-details ngOnInit this.coId ${this.coId}`)
        
         this.getCompany(this.coId);
        this.getItemsByCompany(this.coId);

       
        
    }

    getCompanies(id) {
        this._companyService
            .getCompanies()
            .subscribe(companies => {
                this.companies = companies;
                return this.companies;
            });
    }

    getCompany(coId) {
         this._companyService
            .getCompany(coId)
            .subscribe(company => {this.company = company;

                this.address = company.Address;
                   console.log("Company-details getCompany this.coId", this.coId);
                   console.log(`Company-details getCompany Address ${JSON.stringify(company.Address)}`)
                //    console.log("THIS COMPANY " + JSON.stringify(this.company));
            })
    }

    setColor(color) {
        return color
    }

    getItemsByCompany(coId) {
        this._companyService
            .getItemsByCompany(coId)
            .subscribe(items => this.items = items,
            error => this.errorMessage = <any>error);
    }

    // goToInvoice(company: Company) {
    //     let uId = 1;
    //     let coId = company.id;
    //     this.invoice = this._invoiceService.makeInvoice(uId, coId);
    //     this._router.navigate(['/invoice', this.invoice.id]);
    // }

    goToEditItem(item?: Item, company?: Company) {
        let id = item.id;
        let coId = item.companyId;
        

        this._router.navigate(['/item-edit/' + id, { id: id, coId: coId }]);
    }
    // goToNewItem() {
    //     let coId = this.coId;
    //     let coName = this.coName;

    //     this._router.navigate(['/new-item/', { coId: coId, coName: coName }]);
    // }
    goToItemDetail(item) {
        this.item = item;
        this._router.navigate(['/item-detail']);
    }
    goToEditCompany() {
        if (this.coName) {
            // let coId = this.company.id;
            // let coName = this.company.name;
            // let color = this.company.color;
            // let hourly = this.company.hourly;
            // let paymentTerms = this.company.paymentTerms;
            // let active = this.company.active;
            // this._router.navigate(['/edit-company/' + this.coId, { id: this.coId, name: coName, color: color }]);
            this._router.navigate(['/edit-company/' + + this.coId, {id: this.coId, coName: this.coName}] );

        } else {
            this._router.navigate(['/edit-company']);
        }
    }

    

    goBack() {
        this._location.back();
    }

    getNothing() {

    }
}
