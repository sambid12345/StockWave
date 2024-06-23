import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Modal } from './modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
  modalInfo: Subject<Modal> = new Subject();


  setModalInfo(modalInfo: Modal){
    this.modalInfo.next(modalInfo);
  }
  getModalInfo(){
    return this.modalInfo;
  }
}
