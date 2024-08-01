import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import authValidator from '../../validators/auth.validator';
import { Modal } from './modal.model';
import { HomeService } from 'src/app/my-home/Service/home.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnChanges {
  isOpen = true;
  showParentLocDropdown = false
  // eyeToggleArr: any;
  currentPassToggleBtn: any;
  newPassToggleBtn: any;
  @Output('onModalClose') onModalClose = new EventEmitter<any>();
  @Input('modalInfo') modalInfo!: Modal;
  modalForm: FormGroup = this.fb.group({});

  locationTree: any;
  locationPaths: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private homeService: HomeService
  ) {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.initilizePasswordEyeToggler();
    this.initilizeModalForm();
    this.getLocationList();
  }

  initilizePasswordEyeToggler() {
    if (
      this.modalInfo.hasFormControls &&
      this.modalInfo.popupName === 'changePassword'
    ) {
      this.currentPassToggleBtn = 'password';
      this.newPassToggleBtn = 'password';
    }
  }

  initilizeModalForm() {
    if (this.modalInfo.hasFormControls && this.modalInfo.formControlInfo) {
      this.modalInfo.formControlInfo.forEach((frmCtrl: any) => {
        if (
          this.modalInfo.popupName === 'changePassword' &&
          frmCtrl.formControlName === 'newPassword'
        ) {
          this.modalForm.addControl(
            'newPassword',
            new FormControl('', authValidator.passwordStrengthValidator())
          );
        }

        this.modalForm.addControl(
          frmCtrl.formControlName,
          new FormControl(frmCtrl.defaultValue, frmCtrl.validations)
        );
      });
    }
  }

  closeModal(btnId?: string) {
    console.log('close clicked');

    if (this.modalInfo.popupName === 'autoLogout') {
      this.router.navigate(['auth', 'login']);
      this.onModalClose.emit();
    } else if (this.modalInfo.popupName === 'forgotPassword') {
      if (
        btnId === 'sendPassresetBtn' &&
        this.modalInfo.hasFormControls &&
        this.modalForm &&
        this.modalForm.valid &&
        this.modalForm.value
      ) {
        this.onModalClose.emit(this.modalForm.value);
      } else {
        this.onModalClose.emit();
      }
    } else if (this.modalInfo.popupName === 'changePassword') {
      if (
        btnId === 'changePassBtn' &&
        this.modalInfo.hasFormControls &&
        this.modalForm &&
        this.modalForm.valid &&
        this.modalForm.value
      ) {
        this.onModalClose.emit(this.modalForm.value);
      } else {
        this.onModalClose.emit();
      }
    } else if (this.modalInfo.popupName === 'manualLogout') {
      if (btnId === 'manualLogoutBtn') {
        this.onModalClose.emit({ manualLogout: true });
      } else {
        this.onModalClose.emit();
      }
    } else if (this.modalInfo.popupName === 'createItem') {
      if (
        btnId === 'createBtn' &&
        this.modalInfo.hasFormControls &&
        this.modalForm &&
        this.modalForm.valid &&
        this.modalForm.value
      ) {
        this.onModalClose.emit(this.modalForm.value);
      } else {
        this.onModalClose.emit();
      }
    } else if (this.modalInfo.popupName === 'createLocation') {
      if (
        btnId === 'createBtn' &&
        this.modalInfo.hasFormControls &&
        this.modalForm &&
        this.modalForm.valid &&
        this.modalForm.value
      ) {
        this.onModalClose.emit(this.modalForm.value);
      } else {
        this.onModalClose.emit();
      }
    }
  }

  generatePaths(location: any, path: string) {
    let result: any = [];
    const currentPath = path ? `${path} -> ${location.name}` : location.name;
    result.push({
        locId: location._id,
        path: currentPath,
        exactLoc: location.name
    });
    

    for (let child of location.children) {
        result = result.concat(this.generatePaths(child, currentPath));
    }
    
    return result;
  }

  createLocationPaths(locations: any []) {
    let result : any = [];
    for (let location of locations) {
      result = result.concat(this.generatePaths(location, ''));
    }
    return result;
  }
  getLocationList() {
    if (this.modalInfo.popupName === 'createLocation') {
      this.homeService.getLocations().subscribe({
        next: (locationList: any) => {
          this.locationTree = locationList;

          console.log('location tree', JSON.stringify(this.locationTree));

          this.locationPaths = this.createLocationPaths(this.locationTree);
          console.log('location path',this.locationPaths);

        },
        error: (error: any) => {},
      });
    }
  }
  openParentLocDropdown(){
    
    if(this.modalInfo && this.modalInfo?.popupName === 'createLocation'){
      
      this.showParentLocDropdown = !this.showParentLocDropdown ;
    }
  }
  selectParentLoc(parentLocId: any, exactLoc: any, formCtrlName: any){
    if(this.modalInfo && this.modalInfo?.popupName === 'createLocation' && this.modalForm){
      this.modalForm.get(formCtrlName)?.patchValue(exactLoc);
      this.modalForm.get('parentLocationId')?.patchValue(parentLocId);
      console.log('form conrol name', formCtrlName);
      console.log('form group value', this.modalForm);
      this.showParentLocDropdown = false;
    }
  }
}
