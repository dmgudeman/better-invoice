import { Injectable, OnInit } from '@angular/core';
import { Http, 
         Headers, 
         RequestOptions, 
         Response }           from '@angular/http';
import { Router }             from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User }               from '../user';
import { MyGlobals }          from '../../shared/myglobals';
import { Shared }             from '../../shared/shared';

@Injectable()
export class UserService implements OnInit{
    	private _url;
    shared: Shared;
	myglobals:MyGlobals;
    users: User[];

    constructor(private _http: Http,
				private _router:Router) { 
                    this.shared = new Shared();
		            this.myglobals = new MyGlobals();
                    this._url = this.myglobals.url;
                }
    ngOnInit () {
         console.log(`Bye There ${this._url}`);
         
    }

    getAllUsers() {
        return this._http
                   .get(this._url + '/users')
                   .do(data => console.log(`Bye there`)
                   )
			    //    .map((res:Response) => {
                       
                //        this.users = <User[]>res.json().users;
                //        console.log(`USERS `);
                       
                //    })
                   .catch(this.shared.handleError);
    }
    // getById(id: number) {
    //     return this._http.get('/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }

    addUser(payload) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http
		           .post(this._url + '/register', payload, options)
				   .map(res => res.json())
                   .catch(this.shared.handleError);
    }

    login(payload) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http
		           .post(this._url + '/login', payload, options)
				   .map(res => res.json())
                   .do(data => console.log(`login in user.service`))
                   .catch(this.shared.handleError);
    }
    

    // update(user: User) {
    //     return this._http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    // }

    // delete(id: number) {
    //     return this._http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }

    // // private helper methods

    // private jwt() {
    //     // create authorization header with jwt token
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     if (currentUser && currentUser.token) {
    //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    //         return new RequestOptions({ headers: headers });
    //     }
    // }
}