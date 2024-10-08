import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ModalService } from '../../shared/components/modal/modal.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  @Output() eventName = new EventEmitter<any>();
  sidebarListItem : any ;

  dropdownToggler = false;
  
  ngOnInit(){
    this.initiateSidebarList();
  }
  constructor(private authService: AuthService, private modalService: ModalService,
    private elementRef: ElementRef,
    private router: Router
  ){

  }

  navigateTo(hrefLink: any) {
    this.eventName.emit();
    if(hrefLink){
      this.router.navigate([hrefLink]);
    }
  }

  initiateSidebarList(){
    this.sidebarListItem = [
      {
        name: 'Home',
        hrefLink : '/user/home',
        iconPath: 'M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z'
        
      },
      {
        name: 'Locations',
        hrefLink : '/user/location',
        iconPath:  'M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z'
      },
      {
        name: 'Search',
        hrefLink : '/user/items',
        iconPath:  'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'
        
      },
      {
        name: 'Profile',
        hrefLink : '/user/profile',
        iconPath:  'M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z'
        
      },
      {
        name: 'Tools',
        hrefLink : '/user/home',
        iconPath:  'M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z'
        
      },
      {
        name : 'Sign Out',
        iconPath: 'M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z'
      }
    ]
  }

  signOut(){
    this.eventName.emit();
    this.modalService.setModalInfo({
      showModal: true,
      popupName: 'manualLogout',
      modalWidth: 350,
      modalTitleMsg: 'Want to Log out?',
      modalTitleDescription: 'You will be returned to the login screen',
      showModalBody: true,
      bodyContent: '',
      hasFormControls: false,
      formControlInfo: null,
      footerButtons: [
        {
          buttonType: '',
          buttonName: 'Logout',
          buttonId: 'manualLogoutBtn'
        }
      ] 
    })
  }

  toggleDropdown(){
    this.dropdownToggler = !this.dropdownToggler;
  }

  showCreateAssetModal(createAssetFor: string){
    this.eventName.emit();
    this.toggleDropdown();

    if(createAssetFor === 'itemAsset'){
      this.modalService.setModalInfo({
        showModal: true,
        modalWidth: 400,
        popupName: 'createItem',
        modalTitleMsg: 'Create Item',
        modalTitleDescription: '',
        showModalBody: true,
        bodyContent: '',
        hasFormControls: true,
        formControlInfo: [
          {
            formControlName: 'parentLocation',
            validations: [Validators.required],
            defaultValue: null,
            placeHolder: 'Parent Location',
            isRequired: true,
            type: 'select',
            format: ''
          },
          {
            formControlName: 'parentLocationId',
            validations: [],
            defaultValue: null,
            placeHolder: '',
            isRequired: false,
            type: 'select',
            format: ''
          },
          {
            formControlName: 'itemName',
            validations: [Validators.required],
            defaultValue: '',
            placeHolder: 'Item Name',
            isRequired: true,
            type: 'input',
            format: 'text'
          },
          {
            formControlName: 'itemDescription',
            validations: [Validators.required],
            defaultValue: '',
            placeHolder: 'Item Description',
            isRequired: true,
            type: 'textArea',
            format: ''
          },
          {
            formControlName: 'labels',
            validations: [Validators.required],
            defaultValue: null,
            placeHolder: 'Labels',
            isRequired: true,
            type: 'select',
            format: ''
          }
        ],
        footerButtons: [
          {
            buttonType: 'submit',
            buttonName: 'Create',
            buttonId: 'createBtn'
          }
        ]
      });
    }
    if(createAssetFor === 'location'){
      this.modalService.setModalInfo({
        showModal: true,
        modalWidth: 400,
        popupName: 'createLocation',
        modalTitleMsg: 'Create Location',
        modalTitleDescription: '',
        showModalBody: true,
        bodyContent: '',
        hasFormControls: true,
        formControlInfo: [
          {
            formControlName: 'locationName',
            validations: [Validators.required],
            defaultValue: null,
            placeHolder: 'Location Name',
            isRequired: true,
            type: 'input',
            format: 'text'
          },
          {
            formControlName: 'locationDescription',
            validations: [Validators.required],
            defaultValue: null,
            placeHolder: 'Location Description',
            isRequired: true,
            type: 'textArea',
            format: ''
          },
          {
            formControlName: 'parentLocation',
            validations: [],
            defaultValue: null,
            placeHolder: 'Parent Location',
            isRequired: false,
            type: 'select',
            format: ''
          },
          {
            formControlName: 'parentLocationId',
            validations: [],
            defaultValue: null,
            placeHolder: '',
            isRequired: false,
            type: 'select',
            format: ''
          }
        ],
        footerButtons: [
          {
            buttonType: 'submit',
            buttonName: 'Create',
            buttonId: 'createBtn'
          }
        ]
      });
    }
    
  }
}
