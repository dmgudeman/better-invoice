import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../company/company';

@Injectable()
export class Shared {
    
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
}
