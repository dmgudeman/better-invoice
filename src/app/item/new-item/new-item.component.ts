import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { Tab } from '../../shared/tab';
import { Tabs } from '../../shared/tabs';
import { MaterialModule } from '@angular/material';
import { CompanyService } from '../../company/company.service';
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
  canSave = true;
  id;
  inputLabel:string;
  hoursArrayLimit = 25;
  hoursArray:number[] = [];

  myform : FormGroup;
  fcHours = new FormControl;
  fcAmount = new FormControl;
  fcDate = new FormControl;
  fcNotes = new FormControl;

  constructor(private _companyService: CompanyService,
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
      this.coId =params['id'];
      this.coName =params['coName'];
      this.title = "New Item for " + this.coName;
    })
    this.makeHoursArray(41);
  }
/*
this.myform = this._fb.group({
                // "id":this.id,
                "name":this.name,
                "color":this.color,
                "hourly": this.hourly,
                "paymentTerms": this.paymentTerms,
                "active": this.active,
            });
        this._route.params
                   .subscribe(params => { this.coId = params['id'];
                                          this.title = params['name']});
                                                  
        this.title = this.coId ? " Edit "+ this.title + " Details" : " New Business";
                                  
        if(this.coId){
            this._companyService.getCompany(this.coId)
                .subscribe(company => {this.company= company;
                    // this.id.setValue(this.company.id);
                    this.name.setValue(this.company.name);
                    this.color.setValue(this.company.color);
                    this.hourly.setValue(this.company.hourly);
                    this.paymentTerms.setValue(this.company.paymentTerms);
                    this.active.setValue(this.company.active);
                    return this.company;
                },
                response => {
                    if (response.status === 404){
                        this._router.navigate(['NotFound']);
                }
            });
        }*/
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
    console.log("Form has been submitted");
  }
}
