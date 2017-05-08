import { Injectable }        from '@angular/core';
import { Http, 
         Response, 
         Headers, 
         RequestOptions}     from '@angular/http';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/concatMap';
import { Address }           from './address';
import { Company }           from '../company/company';
import { Item }              from '../item/item';
import { MyGlobals }         from '../shared/myglobals';
import { Shared }            from '../shared/shared';

@Injectable()
export class AddressService {

//  company:Company;
    // items: Item[];
    shared: Shared;
    myglobals: MyGlobals;
    
	// private _url = "http://localhost:3000";
	private _url ;
    // = "http://192.168.1.3:3000";


	constructor(private _http: Http){
        this.shared = new Shared();
        this.myglobals = new MyGlobals();
        // this._url = "http://192.168.1.3:3000";
        this._url = this.myglobals.url;
        // console.log ("this.myglobals.url " + this.myglobals.url);
	}

//   addAddress(payload){
//         let headers = new Headers({ 'Content-Type': 'application/json' });
//         let options = new RequestOptions({ headers: headers });
//         return this._http.post( this.getAddressUpdateUrl() , JSON.stringify( {company:payload}), options)
//                    .map(res => res.json())
//     }

    addAddress(payload){
        console.log("PAYLOAD " + JSON.stringify(payload));
        console.log("this.getAddressUpdateUrl()" + this.getAddressUrl());
       		return this._http.post(this.getAddressUrl(), payload)
                            .map((res:Response) => <Address>res.json())
                            .catch(this.shared.handleError);
        }
     updateAddress(payload, id){
	    console.log("address.service updateAdress payload " + JSON.stringify(payload))

		return this._http
		           .put(this.getUpdateAddressUrl(id), payload)
		           .map((res:Response) => <Address>res.json())
                   .do(data => console.log(`address.service updateAddress DATA ${data}`))
                   .catch(this.shared.handleError);
	} 

     getAddressUrl(){
        return this._url +"/address";
    }

     getUpdateAddressUrl(addressId){
		return this._url + "/address/" + addressId;
	}
}
