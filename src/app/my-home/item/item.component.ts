import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{

  showLocationMenu = false;
  showLabels = false;
  showOptions = false;
  constructor(){

  }

  ngOnInit(): void {
    
  }

  showContextMenu(menuOption: any){
    switch (menuOption) {
      case 'showLocationMenu':
        this.showLocationMenu = !this.showLocationMenu;
        if (this.showLocationMenu) {
          this.showLabels = false;
          this.showOptions = false;
        }
        break;
      case 'showLabels':
        this.showLabels = !this.showLabels;
        if (this.showLabels) {
          this.showLocationMenu = false;
          this.showOptions = false;
        }
        break;
      case 'showOptions':
        this.showOptions = !this.showOptions;
        if (this.showOptions) {
          this.showLocationMenu = false;
          this.showLabels = false;
        }
        break;
    }
  }
 
}
