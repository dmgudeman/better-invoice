import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {
	private _url = "http://localhost:3000/items";

	constructor(private _http: Http){
	}

	getItems(){
		return this._http.get(this._url)
			.map(res => res.json());
	}
    
    getItem(itemId){
		return this._http.get(this.getItemUrl(itemId))
			.map(res => res.json());
	}
    
    addItem(payload){
			return this._http.post(this._url, {item:payload})
				.map(res => res.json());
	}

    updateItem(item){
		return this._http.put(this.getItemUrl(item.id), JSON.stringify(item))
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