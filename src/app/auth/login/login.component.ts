import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast-service.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';

@Component({
  selector: 'app-login',
  providers:[AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


  passwordType:string = 'password';
  loginForm!:FormGroup;
  showLoginLoader:boolean = false;

  showModal = false;
  modalTitleMsg = '';
  showModalBody = false;
  bodyContent = '';
  hasFormControls = false;
  formControlInfo: any;
  modalFooterBtns: any;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private toastService: ToastService,
    private modalService : ModalService
  ){}

  ngOnInit(): void {

    this.checkLoggedinStatus();

     this.loginForm = this.fb.group({
      email:['sambidchampati1998@gmail.com',[Validators.required,Validators.email]],
      password:['Sambid@12345',Validators.required]
     });
  }

  checkLoggedinStatus(){
    if(this.authService.isLoggedin()){
      this.router.navigate(['home'])
    }else{
      this.router.navigate(['login'])
    }
  }

  onLogin(){
    console.log(this.loginForm);
    this.showLoginLoader = true
    if(this.loginForm.valid){
      this.authService.userLogin(this.loginForm.value).subscribe({
        next: (res:any)=>{
          this.toastService.setToastInfo({showToast: true, toastMessage: 'Login Successful!', toastType: 'success'})
          this.showLoginLoader = false;
          let tokenExpirationTime = res.tokenExpiration;
          // let tokenExpirationTime = 5000; 
          console.log('response', res);
          localStorage.setItem("authToken" , res.token);
          localStorage.setItem("loggeinTimestamp", new Date().getTime().toString());
          localStorage.setItem('expiresIn', tokenExpirationTime.toString()); 
          this.router.navigate(['home']);
          setTimeout(()=>{
            this.autoLogout();
          }, tokenExpirationTime);
        },
        error: (err:any)=>{
          console.log('error -- -- -- - ',err)
          this.toastService.setToastInfo({showToast: true, toastMessage: err.error.message ? err.error.message : 'Something went wrong !!', 
          toastType: 'error'});
          this.showLoginLoader = false;
        }
      })
    }else{
      alert('Please fill the login details correctly')
    }
  }

  autoLogout(){
    console.log('inside autologout');
    
    this.modalService.setModalInfo({
      showModal: true,
      popupName: 'autoLogout',
      titleMessage: 'You are about to Logout !',
      titleDescription: 'Token expired, Please Login again!',
      showBody: false,
      footerButtons: [
        {
          buttonType: 'primary',
          buttonName: 'OK',
          buttonId: 'autoLogoutOk'
        }
      ] 
    })
  }

  navigateTo(path:string){
    this.router.navigate([path])
  }

  forgotPassword(){
    this.modalService.setModalInfo({
      showModal: true,
      popupName: 'forgotPassword',
      titleMessage: 'Forgot Your Password?',
      titleDescription: `We'll email you a link to reset your password`,
      showBody: true,
      modalBodyContent: null,
      isFormControl: true,
      formControlInfo: [{
        formControlName: 'email',
        validations: [Validators.required, Validators.email],
        defaultValue: '',
        placeHolder: 'Enter Email',
        isRequired: true,
        type: 'email'
      }],
      footerButtons: [
        {
          buttonType: 'submit',
          buttonName: 'Send password reset link',
          buttonId: 'sendPassresetBtn'
        },
        {
          buttonType: 'cancel',
          buttonName: 'Cancel',
          buttonId: 'cancelBtn'
        }
      ]
    });
  }
  onCloseModal(value: any){
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
  }

}
