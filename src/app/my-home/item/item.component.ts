import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../Service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{

  showLocationMenu = false;
  showLabels = false;
  showOptions = false;

  itemList : any;
  constructor(private homeService: HomeService, private router: Router){

  }

  ngOnInit(): void {
    this.getItemList();
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
  getItemList(){
    this.homeService.getItemList().subscribe({
      next: (items: any)=>{
        this.itemList = items; 
      },
      error:(error)=>{console.log(error)}
    })
  }

  navigateTo(baseRouter: any, id: any,event: Event) {
    if(event){
      event.stopPropagation();
    }
    const hrefLink = `${baseRouter}${id}`;
    console.log('link', hrefLink);
    if(hrefLink){
      this.router.navigate([hrefLink]);
    }
  }
 
}
