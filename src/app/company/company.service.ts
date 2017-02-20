import { Company }        from './company';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class CompanyService {
    
    
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
    
    // getCompany(companyId){
	// 	return this._http.get(this.getCompanyUrl(companyId))
	// 		.map(res => res.json());
	// }
    getCompany(id:number){
        return this._http.get(this._url + '/companies')
                   .map(res => res.json())
                   .filter(company=>company.id == id)
    }
    addCompany(company){
		return this._http
                   .post(this._url, JSON.stringify(company))
			       .map(res => res.json())
                   .do(data => console.log(data + "this is date"))
                   .catch(this.handleError);
	}
    
    updateCompany(company){
		return this._http.put(this.getCompanyUrl(company.id), JSON.stringify(company))
			.map(res => res.json());
	}
    
    deleteCompany(companyId){
		return this._http.delete(this.getCompanyUrl(companyId))
			.map(res => res.json());
	}
    
    private getCompanyUrl(companyId){
		return this._url + "/" + companyId;
	}
    private handleError(error:Response){
        console.error(error);
        let message = `Error status code ${error.status} at ${error.url}`;
        return Observable.throw(message);
    }
}
/************************************************************ */
    // companies: Company[] = [
    //     { id: 0, name: "Exxon", color: "green", hourly: 250, address: "exxon street 123"},
    //     { id: 1, name: "Texaco", color: "red", hourly: 225 },
    //     { id: 2, name: "Sinclair", color: "brown", hourly: 200 },
    //     { id: 3, name: "Shell", color: "yellow", hourly: 200 },
    //     { id: 4, name: "Arco", color: "blue", hourly: 225 },
    //     { id: 5, name: "Valero", color: "purple", hourly: 230 }
    // ];

    // getCompanies(): Promise<Company[]> {
    //     return Promise.resolve(this.companies);
    // };

    // getCompanies() {
    //      return this.companies;
    // }
    
    // getCompany(id:number) {
    //     // return this.companies[id];
    // };
    // getCompanyById(companyId: number): Promise<Company>{
    //      let foundCompany = this.getCompanies().find(company =>(company.id === companyId));
    //    return Promise.resolve(foundCompany);

    // }


/************************************************************ */


    
