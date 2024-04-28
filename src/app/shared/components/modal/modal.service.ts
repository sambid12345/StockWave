import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
  modalInfo: Subject<any> = new Subject();


  setModalInfo(modalInfo: any){
    this.modalInfo.next(modalInfo);
  }
  getModalInfo(){
    return this.modalInfo;
  }
}
