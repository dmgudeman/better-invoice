import { Injectable } from '@angular/core';
import { Http, Response }from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Shared {
        public handleError(error:Response){
        console.error(error);
        let message = `Error status code ${error.status} at ${error.url}`;
        return Observable.throw(message);
    }
}
