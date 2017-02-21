import { Company }        from './company';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

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
    addCompany(payload){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        // let body = JSON.stringify(payload);
        let body = payload;
        console.log (this._url +'/company');
        console.log(body);
        let url = this._url + "/company";
        console.log(url);
		// return this._http
        //            .post(url, body, options)
        //         //    .do(data => console.log("I'm here " + this._url +'/company'))
		// 	       .map(res => <Company[]>res.json().companies)
        //            .do(data => console.log(data + "this is date"))
        //            .catch(this.handleError);

    	return this._http.post(url, payload, options)
			.map(res => res.json());
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
    
    doPOST(payload){
    //  let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    
    console.log("POST");
    let url =  this._url + "/company";
    console.log(url);
    // this._http.post(url, payload ).subscribe(res => console.log(res.json()));
    this._http.post(url, payload ).toPromise().then(res => res.json())
}
// doPost(payload){
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     let options = new RequestOptions({ headers: headers });

//     var url = this._url + "/company";
//     console.log(url);
//     return this._http.post(url , payload)
// 			.map(this.extractData)
//             .catch(this.handleError);
// }
private extractData(res: Response) {
  let body = res.json();
  return body.data || { };
}
private handleError(error:Response){
        console.error(error);
        let message = `Error status code ${error.status} at ${error.url}`;
        return Observable.throw(message);
}
// private handleError (error: Response | any) {
//   // In a real world app, we might use a remote logging infrastructure
//   let errMsg: string;
//   if (error instanceof Response) {
//     const body = error.json() || '';
//     const err = body.error || JSON.stringify(body);
//     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//   } else {
//     errMsg = error.message ? error.message : error.toString();
//   }
//   console.error(errMsg);
//   return Promise.reject(errMsg);
// }

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


    
