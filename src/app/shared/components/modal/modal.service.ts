import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Modal } from './modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
  modalInfo: Subject<Modal> = new Subject();
  closePopupNotifier: Subject<any> = new Subject();

  setModalInfo(modalInfo: Modal){
    this.modalInfo.next(modalInfo);
  }
  getModalInfo(){
    return this.modalInfo;
  }

  getClosePopupRequest(){
    return this.closePopupNotifier;
  }
  setClosePopupRequest(){
    this.closePopupNotifier.next(1);
  }

}
