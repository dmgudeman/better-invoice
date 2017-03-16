import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../company/company';
import * as Moment from 'moment';

@Injectable()
export class Shared {
      moment = require('moment');
       private m = this.moment();

    constructor() {
     }

    public handleError(error: Response) {
        console.error(error);
        let message = `Error status code ${error.status} at ${error.url}`;
        return Observable.throw(message);
    }

    public setClassColor(company?: Company, colorr?: string) {
        let color: string;
        if (company) { color = company.color } else { color = colorr };

        let red: boolean = (color === 'red');
        let green = (color === 'green');
        let blue = (color === 'blue');
        let brown = (color === 'brown');
        let yellow = (color === 'yellow');
        let purple = (color === 'purple');

        let classes = {
            red: red,
            green: green,
            blue: blue,
            brown: brown,
            yellow: yellow,
            purple: purple
        };
        return classes
    }

    // takes a date or uses today's date and returns standard javascript date
    // --- it uses moment to add one day --- due help because the dates 
    // coming out of the database are midnight based
    setDate(beginDate?: Date): Date {
        let date: Date;

        beginDate ? date = new Date(beginDate) : date = new Date();
            // need to add one day because the date is served as midnight
            let mDate = Moment(beginDate).add(1, 'day');
            let year = mDate.year();
            let month = mDate.month();
            let day = mDate.date();
            date = new Date(year, month, day);
        
        return date;
    }

    // takes a javascript date and returns a date object
    setDate2(beginDate?) {
        let date;
        beginDate ? date = new Date(beginDate) : date = new Date();
        // need to add one month because the date is a javascript date and 0 based
            let mDate = Moment(beginDate).add(1, 'month');
            let year = mDate.year();
            let month = mDate.month();
            let day = mDate.date();
        
        return {date: {year: year, month: month, day: day}};
    }

    // setDate3(beginDate?: Date): Date {
    //     let date: Date;
    //      beginDate ? date = new Date(beginDate) : date = new Date();
    //         // need to add one day because the date is served as midnight
    //         let mDate = Moment(beginDate).add(1, 'day');
    //         let year = mDate.year();
    //         let month = mDate.month();
    //         let day = mDate.date();
    //         // date = new Date(year, month, day);
    //     return date;
    // }

    // takes a date and returns a simple formatted string
    
    prepareDate(beginDate){
        
        this.m= this.moment(beginDate);
        let year = this.m.year;
        let month = this.m.month;
        let day = this.m.day;
        let date = this.m.format('YYYY-MM-DD');
        return date;
    }

    // takes a date and returns a simple formatted string
    // adding one day
    prepareDatePlus(beginDate){
        
        this.m= this.moment(beginDate).add(1, 'day');
        let year = this.m.year;
        let month = this.m.month;
        let day = this.m.day;
        let date = this.m.format('YYYY-MM-DD');
        return date;
    }
}