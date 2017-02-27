import { Company }        from './company';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Item } from '../item/item';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/concatMap'
import { Shared } from '../shared/shared'
;
@Injectable()
export class CompanyService {
    
    company:Company;
    items: Item[];
    shared: Shared;
    
	private _url = "http://localhost:3000";

	constructor(private _http: Http){
        this.shared = new Shared();
	}

	getCompanies():Observable<Company[]>{
		return this._http
                   .get(this._url + '/companies')
			       .map((res:Response) => <Company[]>res.json().companies)
                   .catch(this.shared.handleError);
	}
    
    getCompany(id:number){
        console.log("CS getCompany() fired");
        let body;
        return this._http.get(this.getCompanyUrl(id) )
                   .do(data => console.log("this.getCompanyUrl(id)" + this.getCompanyUrl(id)))
                   .map((res:Response) => { body = <Company>res.json().company;
                                            return body;})
                   .do(data => console.log("body" + JSON.stringify(body)));
       } 
    getItemsByCompany(id:number){
        let body;
        return this._http.get(this.getCompanyUrl(id))
                         .map((res:Response) => {body = <Company>res.json().company.Items;
                                                return body;})
    }    
   
    
    addCompany(payload){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("{company:payload},   " + JSON.stringify({company:payload}));
        console.log("this.getCompanyUpdateUrl() " +this.getCompanyUpdateUrl());
        return this._http.post( this.getCompanyUpdateUrl() , JSON.stringify( {company:payload}), options)
                   .map(res => res.json())
    }

    updateCompany(payload, id){
        
        console.log("id " + id)
        console.log("{company:payload},   " + {company:payload})
        console.log("this.getCompanyUrl(id) " + this.getCompanyUrl(id));
		return this._http.put(this.getCompanyUrl(id), {company:payload})
                            .map((res:Response) => <Company>res.json())
                            .catch(this.shared.handleError);
        }
    
    deleteCompany(companyId){
		return this._http.delete(this.getCompanyUrl(companyId))
			.map(res => res.json());
	}
    
    private getCompanyUrl(companyId){
		return this._url + "/companies/" + companyId;
	}
    private getCompanyUpdateUrl(){
        return this._url +"/companies";
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    
}