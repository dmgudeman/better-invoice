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
  
  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'mm/dd/yyyy',
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
  
  canSave = true;

  inputLabel:string;
  hoursArrayLimit = 25;
  hoursArray:number[] = [];

  item: Item;

  myform : FormGroup;
  fcHours = new FormControl;
  fcAmount = new FormControl;
  fcDate = new FormControl;
  fcNotes = new FormControl;

  constructor(private _itemService: ItemService,
              private _router:Router,
              private _route:ActivatedRoute,
              private _fb:FormBuilder) { }

  ngOnInit() {
      this.myform = this._fb.group({
                // "id":this.id,
                "hours":this.fcHours,
                "amount":this.fcAmount,
                "date": this.fcDate,
                "notes": this.fcNotes,
            });
      this._route.params.subscribe(params => {
      this.itemId = params['id'];
      this.coName = params['coName'];
      this.title = this.itemId ? " New Item for " + this.coName : "Edit Item for " + this.coName;
      
      if(this.itemId){
            this._itemService.getItem(this.itemId)
                .subscribe( item => {this.item = item;
                    // this.id.setValue(this.company.id);
                    this.fcHours.setValue(this.item.hours);
                    this.fcAmount.setValue(this.item.amount);
                    this.fcDate.setValue(this.item.date);
                    this.fcNotes.setValue(this.item.description);
                    return this.item;
                },
                response => {
                    if (response.status === 404){
                        this._router.navigate(['NotFound']);
                }
            });      
        }
    })
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

    let  id = this.itemId;
    var payload = this.myform.value;
    var result;
        console.log("itemId " + this.itemId);
       
        if (id) {
            console.log("payload    " + payload);
             console.log("coooooId " + this.coId);
            // result = this._itemService.updateItem(payload, id);
        }else{
            let ID = (id) ? id : "ID NOT HERE";
            console.log("ID + " + ID);
            console.log("payloaddddddddddddd" + JSON.stringify(payload));
            result = this._itemService.addItem(payload);
        }   
		result.subscribe(x => {
            // Ideally, here we'd want:
            // this.form.markAsPristine();
            this._router.navigate(['companies']);
        });
	}
    
  
}
