import { AfterViewChecked, Component, OnChanges, OnInit, enableProdMode } from '@angular/core';
import { isDevMode } from '@angular/core';
import { ToastService } from './shared/components/toast/toast-service.service';
import { ModalService } from './shared/components/modal/modal.service';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Modal } from './shared/components/modal/modal.model';
import { HomeService } from './my-home/Service/home.service';
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
  modalInfo!: Modal
  constructor(private toastService: ToastService,
    private modalService: ModalService,
    private router: Router,
    private authService: AuthService, 
    private homeService: HomeService
  ){

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
    this.modalService.getModalInfo().subscribe((modalInfo: Modal)=>{
      this.modalInfo = modalInfo;
    })
  }
  hideToast(){
    this.showToast = false;
  }
  onCloseModal(value: any){
      if(this.modalInfo.popupName === 'forgotPassword'){
        if(this.modalInfo.hasFormControls && value){
          this.authService.forgotPassword(value).subscribe({
            next: (response: any)=>{
              this.toastService.setToastInfo({showToast: true, toastMessage: response?.message|| 'success', toastType: 'success'});
            },
            error: (error)=>{
              this.toastService.setToastInfo({showToast: true, toastMessage: error?.error?.message || 'Error Occured', toastType: 'error'});
            }
          });
        }
        
      }else if(this.modalInfo.popupName === 'changePassword'){
        if(this.modalInfo.hasFormControls && value){
          this.authService.changePassword(value).subscribe({
            next: (response: any)=>{
              this.toastService.setToastInfo({showToast: true, toastMessage: response?.message|| 'success', toastType: 'success'});
              
                localStorage.removeItem("authToken");
                localStorage.removeItem('loggeinTimestamp');
                localStorage.removeItem('expiresIn');
                this.router.navigate(['auth','login']);
             
            },
            error: (error)=>{
              this.toastService.setToastInfo({showToast: true, toastMessage: error?.error?.message || 'Error Occured', toastType: 'error'});
            }
          })
        }
        
      }else if(this.modalInfo.popupName === 'manualLogout'){
        if(value && value?.manualLogout){
          this.authService.userSignout();
        }
      }else if(this.modalInfo.popupName === 'createItem'){
        if(this.modalInfo.hasFormControls && value){
          console.log('Item value', value);
        }
      }else if(this.modalInfo.popupName === 'createLocation'){
        if(this.modalInfo.hasFormControls && value){
          console.log('Location object', value);
          this.homeService.createLocation({
            name: value?.locationName,
            description: value?.locationDescription,
            parentLocationId: value?.parentLocationId
          }).subscribe({
            next: (response: any)=>{
              this.toastService.setToastInfo({showToast: true, toastMessage: response?.message|| 'success', toastType: 'success'});
            },
            error: (error: any)=>{
              this.toastService.setToastInfo({showToast: true, toastMessage: error?.error?.message || 'Error Occured', toastType: 'error'});
            }
          });
        }
      }
      
    this.resetModalPopupProperties();
  }

  resetModalPopupProperties(){
     
    this.modalInfo.showModal = false;
    this.modalInfo.popupName = null;
    this.modalInfo.modalTitleMsg = '';
    this.modalInfo.modalTitleDescription = '';
    this.modalInfo.showModalBody = false;
    this.modalInfo.bodyContent = '';
    this.modalInfo.hasFormControls = false;
    this.modalInfo.formControlInfo = null
    this.modalInfo.footerButtons = null;

  }

}
