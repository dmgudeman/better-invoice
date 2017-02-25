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
			console.log("JSON.stringify(payloadmmmmmmmmmm " + JSON.stringify({item:payload}));
		return this._http.post(this._url, {item:payload})
		  .do(data => console.log("DATAAAAAA "+ data))
			.map(res => res.json());
	}
   /*
addCompany(payload){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("{company:payload},   " + JSON.stringify({company:payload}));
        console.log("this.getCompanyUpdateUrl() " +this.getCompanyUpdateUrl());
        return this._http.post( this.getCompanyUpdateUrl() , JSON.stringify( {company:payload}), options)
                   .map(res => res.json())
    }


*/





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