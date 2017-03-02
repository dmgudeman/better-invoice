import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IMyOptions, IMyDateRangeModel }  from 'mydaterangepicker';
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
   private myDateRangePickerOptions: IMyOptions = {
        dateFormat: 'mm/dd/yyyy',
        
        inline: false,
        selectionTxtFontSize: '15px',
        
    };
  private newDate = new Date();
  
  private newYear = this.newDate.getFullYear();
  private newDay = this.newDate.getUTCDate();
  private newMonth = this.newDate.getMonth() + 1;

private model: Object = {beginDate: {year: this.newYear, month: this.newMonth, day: this.newDay},
                             endDate: {year: this.newYear, month: this.newMonth, day: this.newDay }};
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
    
  }
  // dateRangeChanged callback function called when the user apply the date range. This is
    // mandatory callback in this option. There are also optional inputFieldChanged and
    // calendarViewChanged callbacks.
  onDateRangeChanged(event: IMyDateRangeModel) {
        // event properties are: event.beginDate, event.endDate, event.formatted,
        // event.beginEpoc and event.endEpoc
    }
  
  updateDiscountAmount(newDiscountAmount: number) {
    this.discountAmount = newDiscountAmount;
  }
  updateDiscountPercent(){

  }
  toggle = true;
  toggleIt(){
    this.toggle = !this.toggle;
    console.log(this.toggle);
    return this.toggle;
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
