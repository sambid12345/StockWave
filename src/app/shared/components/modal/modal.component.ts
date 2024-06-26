import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import authValidator from '../../validators/auth.validator';
import { Modal } from './modal.model';
import { HomeService } from 'src/app/my-home/Service/home.service';

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
  @Input('modalInfo') modalInfo!: Modal;
  modalForm: FormGroup = this.fb.group({});

  locationList: any

  constructor(private fb: FormBuilder, private router:Router, private homeService: HomeService){}
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initilizePasswordEyeToggler();
    this.initilizeModalForm();
    this.getLocationList();
  }

  initilizePasswordEyeToggler(){
    if(this.modalInfo.hasFormControls && this.modalInfo.popupName === 'changePassword'){
      this.currentPassToggleBtn = 'password';
      this.newPassToggleBtn = 'password';
    }
  }
 
  initilizeModalForm(){
    if(this.modalInfo.hasFormControls && this.modalInfo.formControlInfo){
      this.modalInfo.formControlInfo.forEach((frmCtrl: any)=>{

        if(this.modalInfo.popupName === 'changePassword' && frmCtrl.formControlName === 'newPassword'){
          this.modalForm.addControl('newPassword', new FormControl('', authValidator.passwordStrengthValidator()))
        }

        this.modalForm.addControl(frmCtrl.formControlName,new FormControl(frmCtrl.defaultValue, frmCtrl.validations))
      })
    }
  }
  
  closeModal(btnId?: string){

    console.log('close clicked');
  
    if(this.modalInfo.popupName === 'autoLogout'){
      localStorage.removeItem("authToken");
      localStorage.removeItem('loggeinTimestamp');
      localStorage.removeItem('expiresIn');
      this.router.navigate(['auth','login']);
      this.onModalClose.emit();
    }else if(this.modalInfo.popupName === 'forgotPassword'){
      if(btnId === 'sendPassresetBtn' && this.modalInfo.hasFormControls && this.modalForm && this.modalForm.valid && this.modalForm.value){
        this.onModalClose.emit(this.modalForm.value);
      }else{
        this.onModalClose.emit();
      }
    }else if(this.modalInfo.popupName === 'changePassword'){
      if( btnId ==='changePassBtn' && this.modalInfo.hasFormControls && this.modalForm && this.modalForm.valid && this.modalForm.value){
        this.onModalClose.emit(this.modalForm.value);
      }else{
        this.onModalClose.emit();
      }
    }else if(this.modalInfo.popupName === 'manualLogout'){
      if(btnId === 'manualLogoutBtn'){
        this.onModalClose.emit({manualLogout: true});
      }else{
        this.onModalClose.emit();
      }
    }else if(this.modalInfo.popupName === 'createItem'){
      if( btnId ==='createBtn' && this.modalInfo.hasFormControls && this.modalForm && this.modalForm.valid && this.modalForm.value){
        this.onModalClose.emit(this.modalForm.value);
      }else{
        this.onModalClose.emit();
      }
    }else if(this.modalInfo.popupName === 'createLocation'){
      if( btnId ==='createBtn' && this.modalInfo.hasFormControls && this.modalForm && this.modalForm.valid && this.modalForm.value){
        this.onModalClose.emit(this.modalForm.value);
      }else{
        this.onModalClose.emit();
      }
    }
  }
  getLocationList(){
    if(this.modalInfo.popupName === 'createLocation'){
      this.homeService.getLocations().subscribe({
        next: (locationList: any)=>{
          this.locationList = locationList;
        },
        error: (error: any)=>{

        }
      })
    }
  }
}
