import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!:FormGroup;
  passwordType:string = 'password';
  showRegisterLoader:boolean = false;

  showToast:boolean = false;
  toastMessage:string = 'from login';
  toastType:string = 'success';

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService: AuthService
  ){}
  ngOnInit(): void {

    this.registerForm = this.fb.group({
      email:['sam@gmail.com',[Validators.required, Validators.email]],
      username:['',Validators.required],
      password:['',Validators.required],
      role: ['user']
     });
  }

  onRegister(){
    console.log('register form value -- ',this.registerForm.value);
    this.authService.userSignup(this.registerForm.value).subscribe({
      next: (res:any)=>{
        this.showToast = true;
        this.toastMessage = res?.message
        this.showRegisterLoader = false;
        this.toastType = 'success';
      },
      error: (err:any)=>{
        console.log('error -- -- -- - ',err)
        this.showToast = true;
        this.toastMessage = err?.error?.message ?? 'Something went wrong !!';
        this.showRegisterLoader = false;
        this.toastType = 'error';
      }
    })
  }

  navigateTo(path:string){
    this.router.navigate([path])
  }
  hideToast(){
    this.showToast = false;
  }
}
