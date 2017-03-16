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
import { CompanyService }        from '../../company/company.service';
import { IMyOptions, 
         IMyDateModel }          from 'mydatepicker';
import { Item }                  from '../../item/item';
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
   moment = require('moment');

   myDatePickerOptions: IMyOptions = {dateFormat: 'mm/dd/yyyy', inline: false, selectionTxtFontSize: '15px' };
   title: string;
   coId: number;
   errorMessage: string;
   item
   output
   shared: Shared;
   items: Item[] = [];
   submittedForm
   tempItems: Item[] = [];
   

   invoice: FormGroup;
       beginDate   = new FormControl(new Date());
       endDate     = new FormControl();
       description = new FormControl('');
       amount      = new FormControl(0);
       discount    = new FormControl(0);
       companyId   = new FormControl(0);

  constructor( private _fb: FormBuilder,
               private _companyService: CompanyService,
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
        this.getItemsByCompany(this.coId);
        this.invoice.valueChanges.subscribe(data => {
                                             console.log('data.beginDate', data.beginDate)
                                             this.filterByStartDate(data.beginDate)
                                             this.output = data})
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
  getItemsByCompany(coId) {
     let date = new Date ('2017-10-07');
        this._companyService
            .getItemsByCompany2(coId)
            .subscribe(items => this.items = items,
                       error => this.errorMessage = <any>error,
                       ()=>console.log('completed')
                       );
    }
  filterByStartDate(date) {
       console.log("date " + date.epoc)
     let  mDate = this.moment.utc(date.epoc); 
      
      for (let i=0;i<this.items.length; i++){
        let imDate = this.moment.utc(this.items[i].date)
        console.log("imDate " + imDate)
        console.log("mDate " + mDate)

        if (mDate.isBefore(imDate)) {
          console.log("hi there");
          this.tempItems.push(this.items[i]);
        }
      console.log("THIS TEMPITEMS"  + this.tempItems);
    }
      return this.tempItems
    
  }
  beginUpdate (date) {
    console.log("DATEEEEE " + this.shared.prepareDate(date));
    this.filterByStartDate(date);

  }
  goBack() {
      this._location.back();
  }
  setClasses() { }
 
 onSubmit() {
    this.submittedForm = this.invoice.value
  }
  
}
