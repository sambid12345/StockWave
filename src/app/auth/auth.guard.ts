import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, createUrlTreeFromSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('loggedin status', this.authService.isLoggedin());
    let isExpired = this.getExpiredStatus();
    if(this.authService.isLoggedin() && !isExpired){
      return true;
    }else{
      return this.router.navigate(['auth','login'])
    }
    
  }
  getExpiredStatus(){
    let currentTime = new Date().getTime();
    let loggedInTime = Number( localStorage.getItem('loggeinTimestamp'));
    let expiredIn = Number( localStorage.getItem('expiresIn'));
    if(loggedInTime && expiredIn){
      return (currentTime - loggedInTime ) > expiredIn ? true: false;
    }else{
      return true;
    }
  }
}