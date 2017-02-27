import { Injectable } from '@angular/core';
import { Http,  Response, Headers, RequestOptions }from '@angular/http';
import 'rxjs/add/operator/map';
import { Item } from './item';
import { Observable } from 'rxjs/Observable';
import { Shared } from '../shared/shared';

@Injectable()
export class ItemService {
	private _url = "http://localhost:3000/items";
    shared: Shared;
	constructor(private _http: Http){
		this.shared = new Shared();
	}

	getItems(){
		return this._http.get(this._url)
			.map(res => res.json());
	}
   /*
     get(url: string, options?: RequestOptionsArgs) : Observable<Response>
         Performs a request with get http method.
		 */
    
    getItem(itemId){
		console.log("this.getItemUrl(itemId)  " + this.getItemUrl(itemId))
		let body:Item;
		let   yunkers = this._http.get(this.getItemUrl(itemId))
							.map((res:Response) => {body = <Item>res.json().item; return body})
			            return yunkers;
	}
    
    addItem(payload){
			return this._http.post(this._url, {item:payload})
				.map(res => res.json());
	}

    updateItem(payload, id){
		console.log("id " + id)
        console.log("{item:payload},   " + {item:payload})
		return this._http.put(this.getItemUrl(id), {item:payload})
		    .map((res:Response) => <Item>res.json())
                            .catch(this.shared.handleError);
	}
	/*
	 updateCompany(payload, id){
        
        console.log("id " + id)
        console.log("{company:payload},   " + {company:payload})
        console.log("this.getCompanyUrl(id) " + this.getCompanyUrl(id));
		return this._http.put(this.getCompanyUrl(id), {company:payload})
                            .map((res:Response) => <Company>res.json())
                            .catch(this.handleError);
        }
    */
    deleteItem(itemId){
		return this._http.delete(this.getItemUrl(itemId))
			.map(res => res.json());
	}
    
    private getItemUrl(itemId){
		return this._url + "/" + itemId;
	}
	
}