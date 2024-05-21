import { AfterViewChecked, Component, OnChanges, OnInit, enableProdMode } from '@angular/core';
import { isDevMode } from '@angular/core';
import { ToastService } from './shared/components/toast/toast-service.service';
import { ModalService } from './shared/components/modal/modal.service';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked{
  title = 'StockWave';
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';

  showModal: boolean = false;
  popupName: any;
  modalTitleMsg: string = '';
  modalTitleDescription = '';
  showModalBody: boolean = false;
  bodyContent: string = '';

  hasFormControls: boolean = false;
  formControlInfo: any
  modalFooterBtns: any;
  // taskToBeDoneOnClose: any;

  constructor(private toastService: ToastService,
    private modalService: ModalService,
    private router: Router,
    private authService: AuthService
  ){
    // console.log(isDevMode());
  }

  ngOnInit() {
    this.initilizeToastService();
    this.initilizeModalService();
  }

  ngAfterViewChecked(){
    let themeName = localStorage.getItem('theme');
    if(themeName){
      document.querySelector('html')?.setAttribute('data-theme', themeName);
    }else{
      document.querySelector('html')?.setAttribute('data-theme', 'default');
    }
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
      this.popupName = modalInfo.popupName;
      this.modalTitleMsg = modalInfo.titleMessage;
      this.modalTitleDescription = modalInfo.titleDescription;
      this.showModalBody = modalInfo.showBody;
      this.bodyContent = modalInfo.showBody? modalInfo.modalBodyContent: '';

      this.hasFormControls = modalInfo.isFormControl;
      this.formControlInfo = modalInfo.formControlInfo;

      this.modalFooterBtns = modalInfo.footerButtons;

      // this.taskToBeDoneOnClose = modalInfo.taskOnCloseModal;
    })
  }
  hideToast(){
    this.showToast = false;
  }
  onCloseModal(value: any){
      if(this.popupName === 'forgotPassword'){
        if(this.hasFormControls && value){
          this.authService.forgotPassword(value).subscribe({
            next: (response: any)=>{
              this.toastService.setToastInfo({showToast: true, toastMessage: response?.message|| 'success', toastType: 'success'});
            },
            error: (error)=>{
              this.toastService.setToastInfo({showToast: true, toastMessage: error?.error?.message || 'Error Occured', toastType: 'error'});
            }
          });
        }
        
      }else if(this.popupName === 'changePassword'){
        if(this.hasFormControls && value){
          this.authService.changePassword(value).subscribe({
            next: (response: any)=>{
              this.toastService.setToastInfo({showToast: true, toastMessage: response?.message|| 'success', toastType: 'success'});
              
                localStorage.removeItem("authToken");
                localStorage.removeItem('loggeinTimestamp');
                localStorage.removeItem('expiresIn');
                this.router.navigate(['login']);
             
            },
            error: (error)=>{
              this.toastService.setToastInfo({showToast: true, toastMessage: error?.error?.message || 'Error Occured', toastType: 'error'});
            }
          })
        }
        
      }else if(this.popupName === 'manualLogout'){
        if(value && value?.manualLogout){
          this.authService.userSignout();
        }
      }
    this.resetModalPopupProperties();
  }

  resetModalPopupProperties(){
    this.showModal = false;
    this.popupName = null;
    this.modalTitleMsg = '';
    this.modalTitleDescription = '';
    this.showModalBody = false;
    this.bodyContent = '';
    this.hasFormControls = false;
    this.formControlInfo = null
    this.modalFooterBtns = null;
  }

}
