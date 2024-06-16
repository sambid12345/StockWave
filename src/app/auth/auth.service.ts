import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EncryptionService } from './encryption.service';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private encryptionService: EncryptionService
    ){

    }
    
    getUserInfo(){
        let url = `${environment.baseUrl}users/userInfo`;
        return this.http.get(url);
    }
  
    userLogin(userCred:any){
        let url = `${environment.baseUrl}users/login`;
        return this.http.post(url,userCred)
    }

    userSignout(){
        localStorage.removeItem("authToken");
        localStorage.removeItem('loggeinTimestamp');
        localStorage.removeItem('expiresIn');
        this.router.navigate(['auth','login']);
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

    getAuthToken(){
        return localStorage.getItem("authToken");
    }
}
