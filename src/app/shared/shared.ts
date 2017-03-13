import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../company/company';
import * as Moment from 'moment';

@Injectable()
export class Shared {
     currentDate:Date;
    constructor() {
       this.currentDate = Moment().toDate();
    }

    public handleError(error: Response) {
        console.error(error);
        let message = `Error status code ${error.status} at ${error.url}`;
        return Observable.throw(message);
    }

    public setClassColor(company?:Company, colorr?:string) {
       let  color:string;
       if (company){ color = company.color} else {color = colorr};

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
    setDate(beginDate?:Date):void {

    console.log ("BEGIN SETDATE " + beginDate);
       // let date =this.m(beginDate);
       let now = Moment().format('LLLL');
        console.log( "BEGIN SETDATE  now = " + now);
        // date ? newDate = new Date(date) : newDate = new Date();
    //     if (!beginDate) {date = new Date();} else { date= new Date(beginDate);}

    //     let year = date.getFullYear();
    //     // let month = beginDate.getMonth()+1;
    //     // let day = beginDate.getDate();
    // // console.log("SETDATE 3 beginDate " + beginDate);
    // console.log("SETDATE 4 date " + date);
    //     return date;
    //     }
    
}
}