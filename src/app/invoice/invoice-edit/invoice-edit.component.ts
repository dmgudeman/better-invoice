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
// import { Moment }                from 'moment';
import * as Moment from 'moment';
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
    // private m = this.moment();
   
   myDatePickerOptions: IMyOptions = {dateFormat: 'mm/dd/yyyy', inline: false, selectionTxtFontSize: '15px' };
   title: string;
   coId: number;
   errorMessage: string;
   item
   output
   shared: Shared;
   items: Item[] = [];
   itemIds: number[] = [];
   submittedForm
   

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
        this.x();
  }  
    
  // updateDiscountAmount(newDiscountAmount: number) {
  //   this.discountAmount = newDiscountAmount;
  // }
  // updateDiscountPercent(){

  // }
  x(){
        this.invoice.valueChanges.subscribe(data => {
                                             console.log('data.beginDate' + data.endDate===undefined + 'data.endDate' + data.endDate.formatted)
                                             this.filterByDateRange(data.beginDate, data.endDate)
                                             this.output = data})

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
  filterByDateRange(beginDate?, endDate?) {
       console.log("date " + beginDate.epoc)
    // let tempItems: Item[] = [];
     let  bmDate = Moment(beginDate.formatted); 
     let  emDate = Moment(endDate.formatted); 
      
      for (let i=0;i<this.items.length; i++){
        let imDate = Moment(this.items[i].date)
        console.log("imDate " + imDate.format('YYYY-MM-DD'))

        console.log("bmDate " + bmDate.format('YYYY-MM-DD'))
        console.log("emDate " + emDate.format('YYYY-MM-DD'))

        if (imDate.isAfter(bmDate) && imDate.isBefore(emDate)) {
          console.log(imDate.isAfter(bmDate) && imDate.isBefore(emDate));
          this.itemIds.push(this.items[i].id);
        }
      //   for(let temp of tempItems){
      //      console.log("DATE " + temp.date)
      //   }
      // console.log("THIS TEMPITEMS"  +  );
    }
    // this.items = tempItems;
    return this.itemIds;
  }
  // beginUpdate (date) {
  //   console.log("DATEEEEE " + this.shared.prepareDate(date));
  //   this.filterByStartDate(date);

  // }
  goBack() {
      this._location.back();
  }
  setClasses() { }
 
 onSubmit() {
    console.log("comapnyId " + this.coId + " " + this.companyId)
    
    this.submittedForm = this.invoice.value;
    let date1= Moment(this.submittedForm.beginDate.date).format('YYYY-MM-DD');
    console.log("DATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE 1 " + date1);
    let date2= Moment(this.submittedForm.endDate.date).format('YYYY-MM-DD');
    this.submittedForm.beginDate = date1;
    this.submittedForm.endDate = date2;
    this.submittedForm.companyId = this.coId;
    // console.log("this.submittedForm.beginDate.date " + this.shared.prepareDate(this.submittedForm.beginDate.date));
    this.submittedForm.Items = this.itemIds;
    console.log("this.submittedForm " + JSON.stringify(this.submittedForm))
    this._invoiceService.addInvoice(this.submittedForm);
  }
  
}
