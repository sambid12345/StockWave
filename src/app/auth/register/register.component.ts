import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/shared/components/toast/toast-service.service';
import  AuthValidator  from 'src/app/shared/validators/auth.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!:FormGroup;
  passwordType:string = 'password';
  confirmPassType: string = 'password';
  showRegisterLoader:boolean = false;

  showToast:boolean = false;
  toastMessage:string = 'from login';
  toastType:string = 'success';

  strengthScore: number = 0;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService: AuthService,
    private toastService: ToastService
  ){}
  ngOnInit(): void {
    this.initiateRegisterForm();
  }
  initiateRegisterForm(){
    this.registerForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      username:['',[Validators.required]],
      password:['',[Validators.required, AuthValidator.passwordStrengthValidator(this)]],
      rePassword:['',[Validators.required]],
      role: ['user']
     }, 
     {validators:AuthValidator.passwordMatchValidator} as  AbstractControlOptions
    );
  }

  onRegister(){
    // console.log('register form value -- ',this.registerForm.value);
    this.authService.userSignup(this.registerForm.value).subscribe({
      next: (res:any)=>{
        this.toastService.setToastInfo({showToast: true, toastMessage: res?.message || 'Registered Successfully!', toastType: 'success'});
        this.showRegisterLoader = false;
        this.router.navigate(['auth','login']);
      },
      error: (err:any)=>{
        // console.log('error -- -- -- - ',err);
        this.toastService.setToastInfo({showToast: true, toastMessage: err?.error?.message || 'Something went wrong !', toastType: 'error'});
        this.showRegisterLoader = false; 
      }
    })
  }

  navigateTo(path:string){
    this.router.navigate([path])
  }
  hideToast(){
    this.showToast = false;
  }
  getStrengthBarStyle(){
    let backgroundColor = '';
    if (this.strengthScore < 30) {
      backgroundColor = '#e53e3e'; // Red
    } else if (this.strengthScore >= 30 && this.strengthScore <= 89) {
      backgroundColor = '#e8e81f'; // Yellow
    } else {
      backgroundColor = '#48bb78'; // Green
    }
    return { 'background-color': backgroundColor };
  }
}
