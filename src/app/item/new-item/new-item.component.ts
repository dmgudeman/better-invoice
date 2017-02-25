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
    
   
    today = new Date();
    day = this.moment(this.today).toJSON();;
    private myDatePickerOptions: IMyOptions = {
        // dateFormat: 'mm/dd/yyyy',
    };
    date = new Date();
    dateFormat = require('dateformat');
    fdate: Date = new Date();
    
    getHourly: Observable<number>
    
    coName: string;
    coId: number;
    uId: number;
    title: string;
    id;
    itemId:number;
    hours:number;
    amount: number;
    
    canSave = true;

    inputLabel:string;
    hoursArrayLimit = 25;
    hoursArray:number[] = [];

    item: Item;

    counter: number = 0;

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
        console.log("this.today " + this.today);
        console.log("this.day " + this.day);
        this.myform = this._fb.group({
            // "id":this.id,
            "date": this.fcDate,
            "description": this.fcNotes,
            "amount":this.fcAmount,
            "hours":this.fcHours,
            "companyId": this.fcCompanyId
            
        });

        this._route.params.subscribe(params => {
            this.coId = +params['coId'];
            this.coName = params['coName'];
            this.title = " New Item for " + this.coName;
            this.fcCompanyId.setValue(this.coId);
        // if (this.itemId) {
        //     this._itemService.getItem(this.itemId)
        //         .subscribe( item => {this.item = item;
        //             // this.id.setValue(this.company.id);
        //             this.fcHours.setValue(this.item.hours);
        //             this.fcAmount.setValue(this.item.amount);
        //             this.fcDate.setValue(this.item.date);
        //             this.fcNotes.setValue(this.item.description);
        //             return this.item;
        //         },
        //         response => {
        //             if (response.status === 404){
        //                 this._router.navigate(['NotFound']);
        //         }
        //     });      
        // }
    });
       
    this.makeHoursArray(41);
    }

    onDateChanged(event: IMyDateModel){
    }

    onClickCanSave() {
        this.canSave = !this.canSave;
    }

    inputLabelUpdate(label) {
        this.inputLabel = label;
        console.log(this.inputLabel);
    }
    makeHoursArray(hoursArrayLimit):number[]{
        for (let i =0; i < hoursArrayLimit; i++){
        let x = 0.25 * i;
        this.hoursArray.push(x);
        }
        return this.hoursArray;
    }
    onSubmit() {
        console.log("onSubmit fired ");


        console.log("JSON.stringify(this.fcDate.value " + JSON.stringify(this.fcDate.value));
        /* 
        {
  "item": {
    "date": "2017-02-11",
    "description": "blah blah",
    "amount": 250,
    "hours": 15,
    "companyId": 1
  }
}
*/
        // let  id = this.itemId;
        // this.counter = this.counter++;
        // console.log("COUNTER " + this.counter)
        // var simpleDate = this.myform.value.date.formatted;
        // console.log("this.myform.value.date " + JSON.stringify(this.myform.value.date));
        // console.log("this.myform.value.date.formatted " + JSON.stringify(this.myform.value.date.formatted));
        // console.log("SIMPLEDATE " + simpleDate);
        console.log("this.myform.value.date.formatted " + this.myform.value.date.formatted);

        this.fcDate.setValue(this.myform.value.date.formatted);

        var payload = this.myform.value;
        console.log("PAYYYYLOAD " + JSON.stringify(payload) );
        var result;
        //   console.log("PPPPPAYLOAD " + JSON.stringify(payload)); 
            // if (id) {
            //     console.log("payload    " + payload);
            //      console.log("coooooId " + this.coId);
            //     // result = this._itemService.updateItem(payload, id);
            // }else{
            //     let ID = (id) ? id : "ID NOT HERE";
            //     console.log("ID + " + ID);
            //     console.log("payloaddddddddddddd" + JSON.stringify(payload));
        result = this._itemService.addItem(payload);
            // }   
        result.subscribe(x => {
                // Ideally, here we'd want:
                // this.form.markAsPristine();
                this._router.navigate(['companies']);
        });
    }
        
}
