import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {
  isOpen : boolean = true;

  @Output('onModalClose') onModalClose = new EventEmitter<any>();
  @Input('headerMessage') headerMessage = '';
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
    this.initilizeModalForm();
  }
  initilizeModalForm(){
    // formControlInfo: [{
    //   formControlName: 'email',
    //   isRequired: true,
    //   type: 'input'
    // }]
    if(this.hasAnyForm){
      this.formCtrlInfo.forEach((frmCtrl: any)=>{
        if(frmCtrl.isRequired){
          this.modalForm.addControl(frmCtrl.formControlName, new FormControl('', [Validators.required, Validators.email]));
        }else{
          this.modalForm.addControl(frmCtrl.formControlName, new FormControl('', [Validators.email]));
          
        }
        
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
    }else if(this.modalName === 'forgotPassword' && btnId === 'forgotPassContinue'){
      if(this.hasAnyForm && this.modalForm && this.modalForm.valid && this.modalForm.value){
        this.onModalClose.emit(this.modalForm.value);
      }else{
        this.onModalClose.emit();
      }
    }else if(this.modalName === 'changePassword' && btnId ==='changePassBtn'){
      if(this.hasAnyForm && this.modalForm && this.modalForm.valid && this.modalForm.value){
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
