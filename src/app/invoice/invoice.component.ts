import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice';

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  title: string;
  fromDate: string;
  toDate: string;
  discountAmount: number;
  description: string;
  dateFormat = require('dateformat');
  invoice: Invoice;

  constructor(private _invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getInvoice();
    this.updateFromDate();
    this.updateToDate();
  }
  updateFromDate() {
    this.fromDate = this.dateFormat(this.fromDate, "mm/dd/yyyy");
  }

  updateToDate() {
    this.toDate = this.dateFormat(this.toDate, "mm/dd/yyyy");
  }
  updateDiscountAmount(newDiscountAmount: number) {
    this.discountAmount = newDiscountAmount;
  }
  canSave = true;
  onClickCanSave() {
    this.canSave = !this.canSave;
  }

  getInvoice() {
    this.route.params
      .switchMap((params: Params) => this._invoiceService.getInvoiceById(+params['id']))
      .subscribe(invoice => {
        this.invoice = invoice;
        this.title = this.invoice.ivTitle;
        this.fromDate = this.invoice.ivFromDate;
        this.toDate = this.invoice.ivToDate;
        this.discountAmount = this.invoice.ivDiscountAmount;
        this.description = this.invoice.ivDescription;
        return this.invoice;
      });
  }
  setClasses() {

    console.log("this.invoice.ivTitle " + this.invoice.ivTitle);
  }
}
