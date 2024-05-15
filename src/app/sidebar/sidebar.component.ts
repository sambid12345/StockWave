import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../shared/components/modal/modal.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  ngOnInit(){

  }
  constructor(private authService: AuthService, private modalService: ModalService){

  }

  signOut(){
    this.modalService.setModalInfo({
      showModal: true,
      popupName: 'manualLogout',
      titleMessage: 'Log out',
      showBody: true,
      modalBodyContent: 'You will be returned to the login screen',
      isFormControl: false,
      footerButtons: [
        {
          buttonType: 'primary',
          buttonName: 'Cancel',
          buttonId: 'cancelLogoutBtn'
        },
        {
          buttonType: 'primary',
          buttonName: 'Logout',
          buttonId: 'manualLogoutBtn'
        }
      ] 
    })
  }
}
