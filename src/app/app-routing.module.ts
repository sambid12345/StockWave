import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';

const routes: Routes = [
  {path: '', component:  LoginComponent},
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
      path: 'home', component: HomeComponent, canActivate:[AuthGuard]
    },
    {
      path: 'forgot-password', component: ForgotPasswordComponent
    },
    {
      path: 'password-reset/:userName/:token', component: PasswordResetComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
