import { Injectable }        from '@angular/core';
import { Http, 
         Response, 
         Headers, 
         RequestOptions}     from '@angular/http';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/concatMap'
import { Company }           from '../company/company';
import { Item }              from '../item/item';
import { MyGlobals }         from '../shared/myglobals';
import { Shared }            from '../shared/shared';

@Injectable()
export class AddressService {

 company:Company;
    items: Item[];
    shared: Shared;
    myglobals: MyGlobals;
    
	// private _url = "http://localhost:3000";
	private _url ;
    // = "http://192.168.1.3:3000";


	constructor(private _http: Http){
        this.shared = new Shared();
        this.myglobals = new MyGlobals();
        // console.log ("this.myglobals.url " + this.myglobals.url);
        // this._url = "http://192.168.1.3:3000";
        this._url = this.myglobals.url;
	}

  addCompany(payload){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post( this.getAddressUpdateUrl() , JSON.stringify( {company:payload}), options)
                   .map(res => res.json())
    }

    // updateCompany(payload, id){
		// return this._http.put(this.getCompanyUrl(id), {company:payload})
    //                         .map((res:Response) => <Company>res.json())
    //                         .catch(this.shared.handleError);
    //     }

     getAddressUpdateUrl(){
        return this._url +"/address";
    }
}
