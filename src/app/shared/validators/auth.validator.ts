import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";


const passwordStrengthValidator = function(params?: any): ValidatorFn{

    return (control: AbstractControl)=>{
        console.log('control inside auth validator', control);
        const value = control.value;
        console.log('value', value);
    
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

        if(params)
          params.strengthScore = score * 20; // Convert score to percentage

        return score >= 4 ? null : { invalidPassword: true };
    }
}

const passwordMatchValidator = function(formGroup: FormGroup){
  // console.log('form grp---', formGroup);
    let password = formGroup.get('password');
    let confirmPassword = formGroup.get('rePassword');

    if(password?.value != confirmPassword?.value){
      return {passwordMatchErr: true}
    }
    return null;
  }

export default {passwordStrengthValidator, passwordMatchValidator}