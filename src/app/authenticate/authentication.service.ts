import { Injectable } from '@angular/core';
import { 
    Http, 
    Headers, 
    Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    actionUrlAuthenticate:string;
    isAuthenticated: boolean;
   
    constructor(private http: Http) {
        this.isAuthenticated = false;
        this.actionUrlAuthenticate =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/authenticate?user=';
    }
 
    // The Express API that checks the login credentials 
    public login = (username, password): Observable<any> => {
        let params2 = username + '&password=' + password;
        return this.http.get(this.actionUrlAuthenticate + params2)
            .map(response => response.json())
            .catch(this.handleAPIError);
    }
    
    private handleAPIError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
    setisAuthenticated(newisAuthenticated: boolean) {
        this.isAuthenticated = newisAuthenticated;
    }
    
    getisAuthenticated() {
        return this.isAuthenticated;
    }
    

}
