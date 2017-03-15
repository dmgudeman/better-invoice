import { Component, OnInit }     from '@angular/core';
import { FormBuilder, 
         FormControl, 
         FormGroup,
         FormsModule, 
         ReactiveFormsModule, 
         Validators }            from '@angular/forms';
import { Location }              from '@angular/common';
import { Router, 
         ActivatedRoute, 
         Params }                from '@angular/router';

import { IMyOptions, 
         IMyDateModel }          from 'mydatepicker';
import 'rxjs/add/operator/switchMap';
import { Shared }                from '../../shared/shared';
import { InvoiceService }        from '../invoice.service';
import { Invoice }               from '../invoice';

@Component({
  selector: 'invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
   dateFormat = require('dateformat');
   private myDatePickerOptions: IMyOptions = {
        dateFormat: 'mm/dd/yyyy',
        
        inline: false,
        selectionTxtFontSize: '15px',
        
    };
  // private newDate = new Date();
  // private newYear = this.newDate.getFullYear();
  // private newDay = this.newDate.getUTCDate();
  // private newMonth = this.newDate.getMonth() + 1;

  // private model: Object = {beginDate: {year: this.newYear, month: this.newMonth, day: this.newDay},
  //                            endDate: {year: this.newYear, month: this.newMonth, day: this.newDay }};
  title: string;
  coId: number;
  shared: Shared;

  invoice: FormGroup;
    beginDate   = new FormControl(new Date());
    endDate     = new FormControl();
    description = new FormControl('');
    amount      = new FormControl(0);
    discount    = new FormControl(0);
    companyId   = new FormControl(0);
    
    

  constructor( private _fb: FormBuilder,
               private _invoiceService: InvoiceService,
               private _location: Location,
               private _route: ActivatedRoute,
               private _router: Router) { 
               this.shared = new Shared();
               }

  ngOnInit() {
     this.invoice = this._fb.group({
            "beginDate":this.beginDate,
            "endDate": this.endDate,
            "description": this.description,
            "amount":this.amount,
            "discount":this.discount,
            "companyId": this.companyId
        });

        this.beginDate.setValue(this.shared.setDate2());
        this.endDate.setValue(this.shared.setDate2());

        this._route.params.subscribe(params => {
                                     this.coId = params['id'];
                                     })
     console.log("this.beginDate " + this.beginDate.value);
  }
  // dateRangeChanged callback function called when the user apply the date range. This is
    // mandatory callback in this option. There are also optional inputFieldChanged and
    // calendarViewChanged callbacks.
  onDateRangeChanged(event: IMyDateModel) {
        // event properties are: event.beginDate, event.endDate, event.formatted,
        // event.beginEpoc and event.endEpoc
    }
  
  // updateDiscountAmount(newDiscountAmount: number) {
  //   this.discountAmount = newDiscountAmount;
  // }
  // updateDiscountPercent(){

  // }
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
    // this._route.params
    //   .switchMap((params: Params) => this._invoiceService.getInvoiceById(+params['id']))
    //   .subscribe(invoice => {
    //     // this.invoice = invoice;
    //     // this.title = this.invoice.ivTitle;
    //     this.beginDate = this.beginDate;
    //     this.endDate = this.endDate;
    //     this.amount = this.amount;
    //     this.discount = this.discount;
    //     this.description = this.description;
    //     return this.invoice;
    //   });
  }
  goToPrePdf() {
    let id = this.coId;
    this._router.navigate(['/invoice-pre-pdf', id]);

  }

  goBack() {
      this._location.back();
  }
  setClasses() {

    // console.log("this.invoice.ivTitle " + this.invoice.ivTitle);
  }
}
