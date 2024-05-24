import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/shared/components/toast/toast-service.service';
import  AuthValidator  from 'src/app/shared/validators/auth.validator';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit{
  username: string = '';
  passwordType: string ='password';
  rePasswordType: string = 'password';
  token: string = '';
  passwordResetForm!:FormGroup

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private authService : AuthService,
    private toastService: ToastService,
    private router: Router
  ){

  }
  ngOnInit(): void {
    this.getUserInfo();
    this.initiatePasswordResetForm();
  }
  getUserInfo(){
    this.route.params.subscribe(params => {
      this.username = params['userName'];
      this.token = params['token'];
    });
  }

  initiatePasswordResetForm(){
    this.passwordResetForm = this.fb.group({
      password:['',Validators.required],
      rePassword: ['', Validators.required]
     },
     {validators:AuthValidator.passwordMatchValidator} as  AbstractControlOptions
    );
  }
  onSubmit(){
    if(this.username && this.token && this.passwordResetForm.valid){
      let resetPasswordInfo = {
        username: this.username,
        token: this.token,
        newPassword: this.passwordResetForm.get('password')?.value
      };

      this.authService.resetPassword(resetPasswordInfo).subscribe({
        next: (response: any)=>{
          this.toastService.setToastInfo({showToast: true, toastMessage: response?.message ||'Reset password successful', toastType: 'success'});
          this.router.navigate(['auth','login']);
        },
        error: (error: any)=>{
          // console.log('error', error);
          this.toastService.setToastInfo({showToast: true, toastMessage:error?.error?.message || 'Not successful', toastType: 'error'});
        }
      });
    }
    
  }
}
