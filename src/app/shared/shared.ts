import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../company/company';
import * as Moment from 'moment';

@Injectable()
export class Shared {

    constructor() { }

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
    setDate(beginDate?: Date): Date {
        let date: Date;

        if (!beginDate) {
            date = new Date();
        } else {
            // need to add one day because the date is served as midnight
            let mDate = Moment(beginDate).add(1, 'day');
            let year = mDate.year();
            let month = mDate.month();
            let day = mDate.date();
            date = new Date(year, month, day);
        }
        return date;
    }
}