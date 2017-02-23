import { Company }        from './company';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/concatMap'

@Injectable()
export class CompanyService {
    company:Company;
    
	private _url = "http://localhost:3000";

	constructor(private _http: Http){
	}

	getCompanies():Observable<Company[]>{
		return this._http
                   .get(this._url + '/companies')
			       .map((res:Response) => <Company[]>res.json().companies)
                   .do(data => console.log(data + " "+ data.length))
                   .catch(this.handleError);
	}
    
    getCompany(id:number){
        return this._http.get(this._url + '/companies')
                   .map((res:Response) => <Company[]>res.json().companies)
       }  
    
    addCompany(payload){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._url +'/company', {company:payload}, options)
                   .map(res => res.json())
    }

    updateCompany(company){
		return this._http.put(this.getCompanyUrl(company.id), JSON.stringify(company))
			.map(res => res.json()).catch(this.handleError);}
    
    deleteCompany(companyId){
		return this._http.delete(this.getCompanyUrl(companyId))
			.map(res => res.json());
	}
    
    private getCompanyUrl(companyId){
		return this._url + "/" + companyId;
	}
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    private handleError(error:Response){
        console.error(error);
        let message = `Error status code ${error.status} at ${error.url}`;
        return Observable.throw(message);
    }
}