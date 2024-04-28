import { Component, OnInit, enableProdMode } from '@angular/core';
import { isDevMode } from '@angular/core';
import { ToastService } from './shared/components/toast/toast-service.service';
import { ModalService } from './shared/components/modal/modal.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'StockWave';
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';

  showModal: boolean = false;
  modalTitleMsg: string = '';
  showModalBody: boolean = false;
  modalFooterBtns: any
  taskToBeDoneOnClose: any;

  constructor(private toastService: ToastService,
    private modalService: ModalService,
    private router: Router
  ){
    // console.log(isDevMode());
  }

  ngOnInit() {
    this.initilizeToastService();
    this.initilizeModalService();
  }
  initilizeToastService(){
    this.toastService.getToastInfo().subscribe((toastInfo: any)=>{
      this.showToast = toastInfo.showToast
      this.toastMessage = toastInfo.toastMessage;
      this.toastType = toastInfo.toastType;
    });
  }
  initilizeModalService(){
    this.modalService.getModalInfo().subscribe((modalInfo: any)=>{

      this.showModal = modalInfo.showModal;
      this.modalTitleMsg = modalInfo.titleMessage;
      this.showModalBody = modalInfo.showBody;
      this.modalFooterBtns = modalInfo.footerButtons;

      this.taskToBeDoneOnClose = modalInfo.taskOnCloseModal;
    })
  }
  hideToast(){
    this.showToast = false;
  }
  onCloseModal(){
    this.showModal = false;
    this.taskToBeDoneOnClose();
  }
}
