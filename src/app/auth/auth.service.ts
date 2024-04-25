import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
 providedIn: 'root',
})
export class AuthService {
  
    
    constructor(
        private http: HttpClient
    ){

    }

    userLogin(userCred:any){
        let url = `${environment.baseUrl}users/login`;
        return this.http.post(url,userCred)
    }

    userSignup(userCred: any){
        let url = `${environment.baseUrl}users/signup`;
        return this.http.post(url,userCred)
    }
}
