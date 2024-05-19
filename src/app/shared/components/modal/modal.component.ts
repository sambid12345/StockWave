import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import authValidator from '../../validators/auth.validator';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {
  isOpen : boolean = true;
  // eyeToggleArr: any;
  currentPassToggleBtn: any
  newPassToggleBtn: any 
  @Output('onModalClose') onModalClose = new EventEmitter<any>();
  @Input('headerMessage') headerMessage = '';
  @Input('headerDescription') headerDescription = '';
  @Input('showModalBody') showModalBody = false;
  @Input('modalName') modalName = ''; 
  @Input('showBodyContent') showBodyContent  = '';
  @Input('hasAnyForm') hasAnyForm = false;
  @Input('formCtrlInfo') formCtrlInfo : any
  @Input('footerButtons')footerButtons : any

  modalForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private router:Router){}
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initilizePasswordEyeToggler();
    this.initilizeModalForm();
  }

  initilizePasswordEyeToggler(){
    if(this.hasAnyForm && this.modalName === 'changePassword'){
      this.currentPassToggleBtn = 'password';
      this.newPassToggleBtn = 'password';
    }
  }
  // toggle(frmControlName: any){
  //   if(frmControlName === 'currentPassword' && this.currentPassToggleBtn in ['password', 'text']){
  //     this.currentPassToggleBtn =  this.currentPassToggleBtn === 'password'?'text':'password';
  //   }else if(frmControlName === 'newPassword' && this.currentPassToggleBtn in ['password', 'text']){
  //     this.newPassToggleBtn = this.newPassToggleBtn ==='password'?'text': 'text';
  //   }
  // }
  // getInputType(frmControlName: any, clickedStatus?: boolean){
  //   if(frmControlName === 'currentPassword'){
  //     return this.currentPassToggleBtn;
  //   }else if(frmControlName === 'newPassword'){
  //     return this.newPassToggleBtn;
  //   }
  // }
  initilizeModalForm(){
    // formControlInfo: [{
    //   formControlName: 'email',
    //   isRequired: true,
    //   type: 'input'
    // }]
    if(this.hasAnyForm){
      this.formCtrlInfo.forEach((frmCtrl: any)=>{

        if(this.modalName === 'changePassword' && frmCtrl.formControlName === 'newPassword'){
          // this.modalForm.addControl(frmCtrl.formControlName, new FormControl(frmCtrl.defaultValue,
          //   [Validators.required, authValidator.passwordStrengthValidator()]
          // ))
          this.modalForm.addControl('newPassword', new FormControl('', authValidator.passwordStrengthValidator()))
        }

        this.modalForm.addControl(frmCtrl.formControlName,new FormControl(frmCtrl.defaultValue, frmCtrl.validations))
        // if(frmCtrl.isRequired){
        //   this.modalForm.addControl(frmCtrl.formControlName, new FormControl('', [Validators.required, Validators.email]));
        // }else{
        //   this.modalForm.addControl(frmCtrl.formControlName, new FormControl('', [Validators.email]));
          
        // }
        
      })
      // this.modalForm = this.fb.group({
      //   email:['sam@gmail.com',[Validators.required,Validators.email]],
      //  });
    }
  }
  
  closeModal(btnId?: string){
  
    if(this.modalName === 'autoLogout'){
      localStorage.removeItem("authToken");
      localStorage.removeItem('loggeinTimestamp');
      localStorage.removeItem('expiresIn');
      this.router.navigate(['login']);
      this.onModalClose.emit();
    }else if(this.modalName === 'forgotPassword'){
      if(btnId === 'sendPassresetBtn' && this.hasAnyForm && this.modalForm && this.modalForm.valid && this.modalForm.value){
        this.onModalClose.emit(this.modalForm.value);
      }else{
        this.onModalClose.emit();
      }
    }else if(this.modalName === 'changePassword'){
      if( btnId ==='changePassBtn' && this.hasAnyForm && this.modalForm && this.modalForm.valid && this.modalForm.value){
        this.onModalClose.emit(this.modalForm.value);
      }else{
        this.onModalClose.emit();
      }
    }else if(this.modalName === 'manualLogout'){
      if(btnId === 'manualLogoutBtn'){
        this.onModalClose.emit({manualLogout: true});
      }else{
        this.onModalClose.emit();
      }
    }
  }
}
