import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  showToast:boolean = false;
  toastMessage:string = 'from login';
  toastType:string = 'success';

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ){}

  ngOnInit(): void {

    this.checkLoggedinStatus();

     this.loginForm = this.fb.group({
      email:['sambid@gmail.com',[Validators.required,Validators.email]],
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
          this.showToast = true;
          this.toastMessage = 'Login Successful!'
          this.showLoginLoader = false;
          this.toastType = 'success';
          console.log('response', res);
          localStorage.setItem("authToken" , res.token);
          this.router.navigate(['home']);
        },
        error: (err:any)=>{
          console.log('error -- -- -- - ',err)
          this.showToast = true;
          this.toastMessage = err.error.message ? err.error.message : 'Something went wrong !!';
          this.showLoginLoader = false;
          this.toastType = 'error';
        }
      })
    }else{
      alert('Please fill the login details correctly')
    }
  }

  hideToast(){
    this.showToast = false;
  }

  navigateTo(path:string){
    this.router.navigate([path])
  }

}
