import { 
    Component, 
    OnInit,
    HostBinding }                from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
}                                from '@angular/forms';
import { Location }              from '@angular/common';
import {
    Router,
    ActivatedRoute,
    Params
}                                from '@angular/router';
import {
    IMyOptions,
    IMyDateModel
}                                from 'mydatepicker';
import * as Moment               from 'moment';

import { CompanyService }        from '../../company/company.service';
import { Item }                  from '../../item/item';
import { Shared }                from '../../shared/shared';
import { InvoiceService }        from '../invoice.service';
import { Invoice }               from '../invoice';
import { customTransitionRight } from '../../shared/custom-transition-right.component';

@Component({
    selector: 'invoice-edit',
    templateUrl: './invoice-edit.component.html',
    styleUrls: ['./invoice-edit.component.css'],
    animations: [ customTransitionRight ]
})
export class InvoiceEditComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display')   display = 'block';
    @HostBinding('style.position')  position = 'absolute';
    dateFormat = require('dateformat');

    myDatePickerOptions: IMyOptions = { dateFormat: 'mm/dd/yyyy', inline: false, selectionTxtFontSize: '15px' };
    title: string;
    coId: number;
    errorMessage: string;
    item
    output
    shared: Shared;
    items: Item[] = [];
    itemIds: number[] = [];
    submittedForm
    invoiceRes
    invoices: Invoice[] = [];

    // Form
    invoice: FormGroup;
    beginDate = new FormControl(new Date());
    endDate = new FormControl();
    description = new FormControl('');
    amount = new FormControl(0);
    discount = new FormControl(0);
    companyId = new FormControl(0);

    constructor(private _fb: FormBuilder,
        private _companyService: CompanyService,
        private _invoiceService: InvoiceService,
        private _location: Location,
        private _route: ActivatedRoute,
        private _router: Router) {
        this.shared = new Shared();
    }

    ngOnInit() {
        this.invoice = this._fb.group({
            "beginDate": this.beginDate,
            "endDate": this.endDate,
            "description": this.description,
            "amount": this.amount,
            "discount": this.discount,
            "companyId": this.companyId
        });
        this.beginDate.setValue(this.shared.setDate2());
        this.endDate.setValue(this.shared.setDate2());
        this._route.params.subscribe(params => {
            this.coId = params['id'];
        })
        this.getItemsByCompany(this.coId);
        this.onFormChange();
    }

    onFormChange() {
        this.invoice.valueChanges.subscribe(data => {
            this.filterByDateRange(data.beginDate, data.endDate)
            this.output = data
        })
    }

    toggle = true;
    toggleIt() {
        this.toggle = !this.toggle;
        console.log("TOGGLE = " + this.toggle)
        return this.toggle;
    }

    canSave = true;
    onClickCanSave() {
        this.canSave = !this.canSave;
    }

    goToPrePdf() {
        let id = this.coId;
        this._router.navigate(['/invoice-pre-pdf', id]);
    }
    
    getItemsByCompany(coId) {
        let date = new Date('2017-10-07');
        this._companyService
            .getItemsByCompany2(coId)
            .subscribe(items => this.items = items,
            error => this.errorMessage = <any>error,
            // () => console.log('completed')
            );
    }
    
    filterByDateRange(beginDate?, endDate?) {
        let bmDate = Moment(beginDate.formatted);
        let emDate = Moment(endDate.formatted);

        for (let i = 0; i < this.items.length; i++) {
            let imDate = Moment(this.items[i].date)
            if (imDate.isAfter(bmDate) && imDate.isBefore(emDate)) {
                  this.itemIds.push(this.items[i].id);
                }
            }
        return this.itemIds;
    }

    goBack() { this._location.back(); }

    onSubmit() {
        this.submittedForm = this.invoice.value;
        let date1 = Moment(this.submittedForm.beginDate.date).add(-1, 'month').format('YYYY-MM-DD')
        let date2 = Moment(this.submittedForm.endDate.date).add(-1, 'month').format('YYYY-MM-DD');
        this.submittedForm.beginDate = date1;
        this.submittedForm.endDate = date2;
        this.submittedForm.companyId = this.coId;
        this.submittedForm.Items = this.itemIds;
        this._invoiceService.addInvoice(this.submittedForm)
               .subscribe(
                    x => {
                        //   console.log("Success!");
                        //   console.log("ID " , x.createdInvoice.id);
                          let id = x.createdInvoice.id;
                        //   console.log( 'invoice-pre-pdf/' + id);
                          this._router.navigate(['invoice-pre-pdf/' + id]);
                    }
                    , 
                    response => { if (response.status = 404) {
                                        this._router.navigate(['not-found']);}
                                }
                    );
    }

    getInvoices() {
        this._invoiceService.getInvoices()
            .subscribe(
                    invoices => {this.invoices = invoices,
                    response => { if (response.status = 404) {
                                        this._router.navigate(['not-found']);}
                                }
                    });
    }
}
