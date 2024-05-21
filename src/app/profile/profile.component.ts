import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/components/modal/modal.service';
import { Validators } from '@angular/forms';
import AuthValidator from '../shared/validators/auth.validator';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  showMenu: boolean = true;
  themeArray: any = [];
  userInfo : any
  constructor(private modalService: ModalService,
    private authService: AuthService
  ){

  }
  ngOnInit(): void {
    this.getUserInfo();
    
    this.themeArray = [
      {
        name: 'default',
        titleColor: '#020302',
        bgColor: '#90a389',
        colorPalette: ['#cfcfcf', '#2c2e27', '#e6e6e6', '#ecf4e7'] 
      },
      {
        name: 'night',
        titleColor: '#90a389',
        bgColor: '#142244',
        colorPalette: ['#0c1322', '#142244', '#0e6d97', '#1e293b'] 
      },
      {
        name: 'retro',
        titleColor: '#090700',
        bgColor: '#73632e',
        colorPalette: ['#d2c59d', '#e5a19e', '#d26560', '#090700'] 
      }
    ]
  }
  getUserInfo(){
    this.userInfo = this.authService.getUserInfo();
    console.log('user Info', this.userInfo);
  } 
  changeTheme(themeName: string){
    document.querySelector('html')?.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
  }

  changePassword(){
    this.modalService.setModalInfo({
      showModal: true,
      popupName: 'changePassword',
      titleMessage: 'Change Password',
      titleDescription: '',
      showBody: true,
      modalBodyContent: 'Enter Your Credentials',
      isFormControl: true,
      formControlInfo: [{
        formControlName: 'usermail',
        validations: [Validators.required, Validators.email],
        defaultValue: '',
        placeHolder: 'Enter email address',
        isRequired: true,
        type: 'email'
      },
      {
        formControlName: 'currentPassword',
        validations: [Validators.required],
        placeHolder: 'Enter Current Password',
        isRequired: true,
        type: 'password'
      },
      {
        formControlName: 'newPassword',
        // AuthValidator.passwordStrengthValidator()
        // validations: [Validators.required, ],
        placeHolder: 'Enter New Password',
        isRequired: true,
        type: 'password'
      }],
     
      footerButtons: [
        {
          buttonType: 'submit',
          buttonName: 'Change Password',
          buttonId: 'changePassBtn'
        },
        {
          buttonType: 'cancel',
          buttonName: 'Cancel',
          buttonId: 'cancelBtn'
        }
      ]
    });
  }

  toggleSidebar(event: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showMenu = !this.showMenu;
    let sideBar = document.querySelector('#sidebar');
    sideBar?.classList.toggle('hidden');
  }
  closeSideBar() {
    let btn = document.querySelector('#hamBurgerBtn');
    if (!btn) {
      this.showMenu = !this.showMenu;
      let sideBar = document.querySelector('#sidebar');
      sideBar?.classList.toggle('hidden');
    }
  }
}
