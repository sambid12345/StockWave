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

    userSignout(){
        
    }

    userSignup(userCred: any){
        let url = `${environment.baseUrl}users/signup`;
        return this.http.post(url,userCred)
    }

    isLoggedin(){
        if(localStorage.getItem('authToken')){
            return true;
        }
        return false;
    }
    forgotPassword( email: any ){
        let url = `${environment.baseUrl}users/forgot-password`;
        return this.http.post(url, email);
    }
    resetPassword(passwordInfo: any){
        let url = `${environment.baseUrl}users/reset-password`;
        return this.http.put(url, passwordInfo);
    }

    changePassword(userInfo : any){
        let url = `${environment.baseUrl}users/change-password`;
        return this.http.put(url, userInfo);
    }
}
