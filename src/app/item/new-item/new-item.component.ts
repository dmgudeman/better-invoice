import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Tab } from '../../shared/tab';
import { Tabs } from '../../shared/tabs';


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
  hourly: number;
  companyName: string;
  coId: number;
  uId: number;
  title: string;
  canSave = true;
  id;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
      this.id =params['id'];
      
        this.title = "New Item";
      this.hourly = params['hourly'];
      this.companyName = params['companyName'];
      this.coId = params['coId'];
      this.uId = params['uId'];
      // this.title = params['title'];
      
    })
  }

    onDateChanged(event: IMyDateModel){
}
  updateDate() {
    this.fdate = this.dateFormat(this.fdate, "mm/dd/yyyy")
  }

  onClickCanSave() {
    this.canSave = !this.canSave;
  }
}
