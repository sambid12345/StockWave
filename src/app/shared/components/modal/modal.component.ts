import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  isOpen : boolean = true;

  @Output('onModalClose') onModalClose = new EventEmitter<any>();
  @Input('headerMessage') headerMessage : string = '';
  @Input('showModalBody') showModalBody : boolean = false;
  @Input('footerButtons')footerButtons!: [{
    buttonType: string;
    buttonName: string;
  }];

  constructor(){}
  ngOnInit(): void {
      
  }
  closeModal(){
    this.onModalClose.emit();
  }
}
