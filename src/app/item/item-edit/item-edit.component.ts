import { Component, 
         OnInit,
         HostBinding }                    from '@angular/core';
import { FormBuilder, 
         FormControl, 
         FormGroup,
         FormsModule, 
         ReactiveFormsModule, 
         Validators }                     from '@angular/forms';
import { Location }                       from '@angular/common';
import { MaterialModule }                 from '@angular/material';
import { Router,
         ActivatedRoute, 
         Params }                         from '@angular/router';
import { Observable }                     from 'rxjs/Observable';

import { IMyOptions, IMyDateModel }       from 'mydatepicker';
import { Moment }                         from 'moment';

import { Item }                           from '../item';
import { ItemService }                    from '../item.service';
import { Tab }                            from '../../shared/tab';
import { Tabs }                           from '../../shared/tabs';
import { customTransitionRight }          from '../../shared/custom-transition-right.component';


@Component({
    selector: 'app-item-edit',
    templateUrl: './item-edit.component.html',
    styleUrls: ['./item-edit.component.css'],
    animations: [customTransitionRight]
})
export class ItemEditComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
    moment = require('moment');
    dateFormat = require('dateformat');
   
    private hoursArrayLimit = 25;
    private hoursArray:number[] = [];
    private coId: number;
    private coName: string;
    private date:Date;
    private id:number;
    private item = new Item();
    private m = this.moment();
    private myDatePickerOptions: IMyOptions = { dateFormat: 'yyyy-mm-dd'};
    private title: string;
    private type: string = 'placeholder';
    private uId: number;


    myform : FormGroup;
    fcId        = new FormControl(0);
    fcHours     = new FormControl(0);
    fcAmount    = new FormControl(0);
    fcDate      = new FormControl({date: {year: 2018, month: 10, day: 9}}, Validators.required);
    fcNotes     = new FormControl('');
    fcType      = new FormControl('');
    fcCompanyId = new FormControl();

    constructor(private _itemService: ItemService,
                private _location: Location,
                private _router:Router,
                private _route:ActivatedRoute,
                private _fb:FormBuilder) { }

    ngOnInit() {
        this.myform = this._fb.group({
            "id":this.fcId,
            "date": this.fcDate,
            "description": this.fcNotes,
            "amount":this.fcAmount,
            "hours":this.fcHours,
            "type":this.fcType,
            "companyId": this.fcCompanyId
        });
     
        this._route.params.subscribe(params => {
            this.id = params['id'];
            this.coId = +params['coId'];
            this.coName = params['coName'];
            this.makeTitle(this.coName, this.id);
            this.fcCompanyId.setValue(this.coId);
            this.fcId.setValue(this.id);
        });
          if(this.id) {
                this._itemService.getItem(this.id)
                       .subscribe(item => {this.item = item;
                                    let date = this.item.date;
                                    this.fcId.setValue(this.id);
                                    this.fcDate.setValue(this.item.date);
                                    this.setDate(date);
                                    this.fcNotes.setValue(this.item.description);
                                    this.fcAmount.setValue(this.item.amount);
                                    this.fcHours.setValue(this.item.hours);
                                    this.fcType.setValue(this.item.type);
                                    this.fcCompanyId.setValue(this.item.companyId);
                                    return this.item;
                },
                response => {
                    if (response.status === 404){
                        this._router.navigate(['NotFound']);
                }
            });
         } else {
             let date = new Date();
             this.setDate(date); 
             
         }
        this.makeHoursArray(41);
    }

    makeTitle(coName:string, itemId?:number){
        this.title = (itemId) ? " Edit Item" : " New Item for " + this.coName;
    }

    makeHoursArray(hoursArrayLimit):number[]{
        for (let i =0; i < hoursArrayLimit; i++){
            let x = 0.25 * i;
            this.hoursArray.push(x);
        }
        return this.hoursArray;
    }
    // getItem(itemId:number, companyId){

    // }
    onSubmit() {
        let id      = this.id;
        let date       = this.myform.value.date;
        this.prepareDate(this.date);
      
        let result;
        // console.log (`x     ${x}`);
        // console.log(`payload ${payload}`);
        
        // console.log(`HIIIIIIIIIII TTTTTTTTTTTTTT `)
        // console.log(`this.fcType.value ${this.fcType.value}`);
        let x = this.myform.value;
        let payload = {item:x};
        // console.log(`IE date  ${JSON.stringify(date)}`);
        // console.log (`IE payload     ${JSON.stringify(payload)}`);
        // console.log (`IE x     ${JSON.stringify(x)}`);
        
        if (id) {
           result = this._itemService.updateItem(payload, id);

        } else {    
           result = this._itemService.addItem(payload);
        //    console.log(`result on onSubmit in item-edit ${JSON.stringify(result)}`);
        }
           result.subscribe(x => {
                    // Ideally, here we'd want:
                    // this.form.markAsPristine();
                this._router.navigate(['companies']);
           });
    }
    // from github.com/kekeh/mydatepicker
    setDate(beginDate?): void {
        let date;
        // date ? newDate = new Date(date) : newDate = new Date();
        if (!beginDate) {date= new Date();} else {date = new Date(beginDate)};
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        this.date = date;
        this.fcDate.setValue({date: {year: year, month: month, day: day}});
    }

    prepareDate(date){
        this.m= this.moment(date);
        let year = this.m.year;
        let month = this.m.month;
        let day = this.m.day;
        let fdate = this.m.format('YYYY-MM-DD');
        this.fcDate.setValue(fdate);
    }
    // preparePayload(payload){


    // }
     // from github.com/kekeh/mydatepicker
    clearDate(): void {
        // Clear the date using the setValue function
        this.myform.setValue({fcDate: ''});
    }
    
    goToCompanyDetails() {
        this._router.navigate(['/company-details']);
    } 
    
    goToCompanies() {
        this._router.navigate(['/companies']);
    }

    goBack(): void {
        this._location.back();
    }
}
    

