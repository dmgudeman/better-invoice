import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { Tab } from '../../shared/tab';
import { Tabs } from '../../shared/tabs';
import { MaterialModule } from '@angular/material';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { ReactiveFormsModule, FormGroup, FormsModule, FormControl, FormBuilder } from '@angular/forms';

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
    date = new Date();
  
  
    
    coName: string;
    coId: number;
    uId: number;
    title: string;

    hoursArrayLimit = 25;
    hoursArray:number[] = [];

    item = new Item();
    id:number;
    myform : FormGroup;
    fcHours = new FormControl(0);
    fcAmount = new FormControl(0);
    fcDate = new FormControl;
    fcNotes = new FormControl;
    fcCompanyId = new FormControl;

    constructor(private _itemService: ItemService,
                private _router:Router,
                private _route:ActivatedRoute,
                private _fb:FormBuilder) { }

    ngOnInit() {
this.date = this.moment().format('YYYY-MM-DD');
        console.log("DATTTTTTTTTTT " + this.date);
       
        this.myform = this._fb.group({
            // "id":this.id,
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
        });
            console.log("iddddddd " + this.id);
            // if(this.id){ 
                this._itemService.getItem(this.id)
                       .subscribe(item => {this.item = item;
                                 
                                    console.log("this.item.date " + this.item.date);
                                   
                                    this.fcDate.setValue(this.item.date);
                                    console.log("this.fcDate.value " + this.fcDate.value);
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
        //  }
        
       
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
        let  id = this.id;
        this.fcDate.setValue(this.myform.value.date.formatted);
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
    
}
    /*
    onSubmit() {
    let  id = this.coId;
    var payload = this.myform.value;
    
    console.log("PAYL " + payload);
    var result;
        if (id) {
            result = this._companyService.updateCompany(payload, id);
        } else {
            let ID = (id) ? id : "ID NOT HERE";
            result = this._companyService.addCompany(payload);
        }   
		result.subscribe(x => {
            // Ideally, here we'd want:
            // this.form.markAsPristine();
            this._router.navigate(['companies']);
        });
	}
    */

