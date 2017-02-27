import { Injectable } from '@angular/core';
import { Http,  Response, Headers, RequestOptions }from '@angular/http';
import 'rxjs/add/operator/map';
import { Item } from './item';

@Injectable()
export class ItemService {
	private _url = "http://localhost:3000/items";

	constructor(private _http: Http){
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
			.map((res:Response) => { body = <Item>res.json().item;

				                     console.log("Im here");
			                            return body})
			// .subscribe(value => console.log("VALUE " + value))
			//.do(data => console.log("bodyyyy " + body));
			return yunkers;
	}
    
    addItem(payload){
			return this._http.post(this._url, {item:payload})
				.map(res => res.json());
	}

    updateItem(item){
		return this._http.put(this.getItemUrl(item.id), JSON.stringify(item))
		    .do(data => console.log("IS updateItem  " + data))
			.map(res => res.json());
	}
    
    deleteItem(itemId){
		return this._http.delete(this.getItemUrl(itemId))
			.map(res => res.json());
	}
    
    private getItemUrl(itemId){
		return this._url + "/" + itemId;
	}
}