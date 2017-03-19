import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Location } from '@angular/common';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import { CompanyService } from '../../company/company.service';
import {
  IMyOptions,
  IMyDateModel
} from 'mydatepicker';
import { Item } from '../../item/item';
// import { Moment }                from 'moment';
import * as Moment from 'moment';
import { Shared } from '../../shared/shared';
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice';

@Component({
  selector: 'invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  dateFormat = require('dateformat');
  // private m = this.moment();

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
    this.x();
  }

  x() {
    this.invoice.valueChanges.subscribe(data => {
      console.log('data.beginDate' + data.endDate === undefined + 'data.endDate' + data.endDate.formatted)
      this.filterByDateRange(data.beginDate, data.endDate)
      this.output = data
    })

  }
  toggle = true;
  toggleIt() {
    this.toggle = !this.toggle;
    console.log(this.toggle);
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
      () => console.log('completed')
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
  goBack() {
    this._location.back();
  }
  setClasses() { }

  onSubmit() {
    this.submittedForm = this.invoice.value;
    let date1 = Moment(this.submittedForm.beginDate.date).format('YYYY-MM-DD');
    let date2 = Moment(this.submittedForm.endDate.date).format('YYYY-MM-DD');
    this.submittedForm.beginDate = date1;
    this.submittedForm.endDate = date2;
    this.submittedForm.companyId = this.coId;
    this.submittedForm.Items = this.itemIds;
    this._invoiceService.addInvoice(this.submittedForm);
  }

}
