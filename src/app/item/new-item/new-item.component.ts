import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { Tab } from '../../shared/tab';
import { Tabs } from '../../shared/tabs';
import { MaterialModule } from '@angular/material';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { ReactiveFormsModule, FormGroup, FormsModule, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
    moment = require('moment');
    dateFormat = require('dateformat');
   
    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'yyyy-mm-dd',
    };
    date:Date;
    coName: string;
    coId: number;
    uId: number;
    title: string;

    hoursArrayLimit = 25;
    hoursArray:number[] = [];

    item = new Item();
    id:number;
    myform : FormGroup;
    fcId = new FormControl(0);
    fcHours = new FormControl(0);
    fcAmount = new FormControl(0);
    fcDate = new FormControl({date: {year: 2018, month: 10, day: 9}}, Validators.required);
    fcNotes = new FormControl('');
    fcCompanyId = new FormControl();

    constructor(private _itemService: ItemService,
                private _location: Location,
                private _router:Router,
                private _route:ActivatedRoute,
                private _fb:FormBuilder) { }

    ngOnInit() {
        // myDate: [{date: {year: 2018, month: 10, day: 9}}, Validators.required]
       
        this.myform = this._fb.group({
            "id":this.fcId,
            "date": this.fcDate,
            "description": this.fcNotes,
            "amount":this.fcAmount,
            "hours":this.fcHours,
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
                                    console.log("this.item.date " + this.item.date)
                                    this.fcDate.setValue(this.item.date);
                                    this.fcNotes.setValue(this.item.description);
                                    this.fcAmount.setValue(this.item.amount);
                                    this.fcHours.setValue(this.item.hours);
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
             
            this.fcDate.setValue(date);
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
    getItem(itemId:number, companyId){

    }
    onSubmit() {
        let y = new Date();
        console.log("y  =   " + y);
        let  id = this.id;
        let x = this.myform.value.date.jsdate;
        console.log("this.myform.value.date.date" + JSON.stringify(this.myform.value.date));
        console.log("x" + JSON.stringify(x));
       
        var payload = this.myform.value;

        var result;
        if (id) {
           result = this._itemService.updateItem(payload, id);

        } else {    
             result = this._itemService.addItem(payload);
            
        }
            result.subscribe(x => {
                    // Ideally, here we'd want:
                    // this.form.markAsPristine();
                    this._router.navigate(['companies']);
            });
    }
    // from github.com/kekeh/mydatepicker
    setDate(date?): void {
        console.log (date);
        let newDate;
        date ? newDate = new Date(date) : newDate = new Date();

        let yearr = newDate.getFullYear();
        let monthh = newDate.getMonth() + 1;
        let datee = newDate.getDate() + 1;
        console.log("date" + date);
        
        this.fcDate.setValue({date:{year: yearr, month: monthh, day: datee}, jsdate:date, formatted:date});
        
       
    }
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
    

