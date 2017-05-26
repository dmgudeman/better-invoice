import { Injectable }         from '@angular/core';
import { Http, 
         Headers, 
         RequestOptions, 
         Response }           from '@angular/http';
import { Observable }         from 'rxjs/Observable';
import { MyGlobals }          from '../../shared/myglobals';
import { Shared }             from '../../shared/shared';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    
    private shared;
    private _url;
    private myglobals:MyGlobals;

    constructor(private _http: Http,) { 
                this.myglobals = new MyGlobals();
                this._url = this.myglobals.url;
                this.shared = new Shared();
                }
login(username, password) {
    console.log(`Im here in Authentication service ${username} ${password}`);
    
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let payload = { username, password };
        console.log(`${this._url}/login  payload=${JSON.stringify(payload)}`);
        
        return this._http
		           .post(this._url + '/login', payload)
				   .map(res => res.json())
                   .catch(this.shared.handleError);

    }
    
    logout() {

        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this._http
		           .get(this._url + '/logout')
                   .catch(this.shared.handleError);

    }
    // login(username: string, password: string) {
    //       console.log(`${JSON.stringify({ username: username, password: password })}`);
    //     return this.http.post(this._url +'/login', JSON.stringify({ username: username, password: password }))
    //         .map((response: Response) => {
    //             console.log(`${JSON.stringify({ username: username, password: password })}`);
                
    //             // login successful if there's a jwt token in the response
    //             let user = response.json();
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //             }
    //         });
    // }

        
    
}