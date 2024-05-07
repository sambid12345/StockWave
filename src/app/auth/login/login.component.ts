import { Component, OnInit } from '@angular/core';
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
          // let tokenExpirationTime = res.tokenExpiration;
          let tokenExpirationTime = 3600000; // 1Hr
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
    this.modalService.setModalInfo({
      showModal: true,
      taskOnCloseModal: ()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem('loggeinTimestamp');
        localStorage.removeItem('expiresIn');
        this.router.navigate(['login']);
      },
      titleMessage: 'You are about to Logout !',
      showBody: false,
      footerButtons: [
        {
          buttonType: 'primary',
          buttonName: 'OK'
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
      taskOnCloseModal: ()=>{
      },
      titleMessage: 'Forgot Password',
      showBody: true,
      modalBodyContent: 'Enter Your Email Address',
      isFormControl: true,
      formControlInfo: [{
        formControlName: 'email',
        isRequired: true,
        type: 'input'
      }],
      footerButtons: [
        {
          buttonType: 'primary',
          buttonName: 'Continue'
        }
      ] 
    })
  }

}
