import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EncryptionService } from './encryption.service';

@Injectable({
 providedIn: 'root',
})
export class AuthService {
  
    private secret_key = 'secret_key';
    private secret_iv = 'smslt';
  

    constructor(
        private http: HttpClient,
        private router: Router,
        private encryptionService: EncryptionService
    ){

    }

     storeUserInfo(user: any){
        const encryptedInfo = this.encryptionService.encryptInfo(user, this.secret_key, this.secret_iv);
        if(encryptedInfo){
            // Yet to be implemented
            // localStorage.setItem('userInfo', encryptedInfo);
        }
    }

    getUserInfo(){
        // Yet to be implemented
    //    let userInf = localStorage.getItem('userInfo');
    //    if(userInf)
    //         return this.encryptionService.decryptInfo(userInf, this.secret_key, this.secret_iv);
    //     else
    //         return null;
       
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
