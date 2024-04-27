import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastInfo: Subject<any> = new Subject();

  constructor() { }

  setToastInfo(toastInfo: any){
    this.toastInfo.next(toastInfo);
  }
  getToastInfo(){
    return this.toastInfo;
  }
}
