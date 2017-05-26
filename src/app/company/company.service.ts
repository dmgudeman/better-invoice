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
import { Company }           from './company';
import { Item }              from '../item/item';
import { MyGlobals }         from '../shared/myglobals';
import { Shared }            from '../shared/shared';
@Injectable()
export class CompanyService {
    
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

	getCompanies():Observable<Company[]>{
		return this._http
                   .get(this._url + '/companies')
			       .map((res:Response) => <Company[]>res.json().companies)
                   .catch(this.shared.handleError);
	}
    
    getCompany(id:number) {
        let body;
        return this._http.get(this.getCompanyUrl(id) )
                   .map ((res:Response) => {body = res.json().company;
                                             return body;})
                   
       } 
    getItemsByCompany(id:number){
        let body;
        return this._http.get(this.getCompanyUrl(id))
                         .map((res:Response) => {body = <Company>res.json().company.Items;
        // console.log("CO_SERVICE: getItemsByCompany " + JSON.stringify(body))
                                                return body;})
    }    
    getItemsByCompany2(id:number){
        let body;
        return this._http.get(this.getCompanyUrl(id))
                         .map((res:Response) => {body = <Company>res.json().company.Items;
        // console.log("CO_SERVICE: getItemsByCompany " + JSON.stringify(body))
                                                return body;})
    }    
    
   
    
    addCompany(payload){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post( this.getCompanyUpdateUrl() , JSON.stringify( {company:payload}), options)
                   .map(res => res.json())
    }

    updateCompany(payload, id){
		return this._http.put(this.getCompanyUrl(id), {company:payload})
                            .map((res:Response) => <Company>res.json())
                            .catch(this.shared.handleError);
        }
    
    deleteCompany(companyId){
		return this._http.delete(this.getCompanyUrl(companyId))
			.map(res => res.json());
	}
    
    getCompanyUrl(companyId){
		return this._url + "/companies/" + companyId;
	}
    getCompanyUpdateUrl(){
        return this._url +"/companies";
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    logout() {
        console.log(`in logout company.service ${this._url +'/logout'}`);
        
        return this._http.get(this._url + '/logout')
                   .map(res => res.json().user);
    }

}