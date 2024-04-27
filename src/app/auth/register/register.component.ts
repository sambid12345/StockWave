import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/shared/components/toast/toast-service.service';

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

    this.registerForm = this.fb.group({
      
      email:['sam@gmail.com',[Validators.required, Validators.email]],
      username:['',[Validators.required]],
      password:['',[Validators.required, this.passwordStrengthValidator.bind(this)]],
      rePassword:['',[Validators.required]],
      role: ['user']
     }, {validators: this.passwordMatchValidator});
  }

  onRegister(){
    console.log('register form value -- ',this.registerForm.value);
    this.authService.userSignup(this.registerForm.value).subscribe({
      next: (res:any)=>{
        // this.showToast = true;
        // this.toastMessage = res?.message;
        // this.toastType = 'success';

        this.toastService.setToastInfo({showToast: true, toastMessage: res?.message, toastType: 'success'});

        this.showRegisterLoader = false;
        this.router.navigate(['login']);
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

  passwordMatchValidator(registrationFrm: FormGroup){
    // console.log('registration form', registrationFrm);
    let password = registrationFrm.get('password');
    let confirmPassword = registrationFrm.get('rePassword');

    if(password?.value != confirmPassword?.value){
      confirmPassword?.setErrors({mismatched: true})
    }else{
      confirmPassword?.setErrors(null)
    }
  }

  navigateTo(path:string){
    this.router.navigate([path])
  }
  hideToast(){
    this.showToast = false;
  }

  passwordStrengthValidator (control: AbstractControl) {
    const value = control.value;

    // console.log('value', value);
    
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

    let score = 0;
    if (value.length >= minLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;

    this.strengthScore = score * 20; // Convert score to percentage

    return score >= 4 ? null : { invalidPassword: true };
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
