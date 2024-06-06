import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ModalService } from '../shared/components/modal/modal.service';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.scss']
})
export class MyHomeComponent implements OnInit, AfterViewInit{
  showMenu: boolean = false;
  isLargeScreen = false;

  constructor(private modalService: ModalService, private elementRef: ElementRef){

  }

  ngOnInit(){
    this.getWindowSize();
  }

  ngAfterViewInit(){
    this.addSidebarClass();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.getWindowSize();
    this.addSidebarClass();
  }

  getWindowSize(){
    this.isLargeScreen = window.innerWidth >= 768? true: false
  }

  addSidebarClass(){
    console.log('called from ngafterviewinit');
    let sideBar = document.querySelector('#sidebar');
    if(sideBar){
      if( !this.isLargeScreen && this.showMenu){
      
        sideBar?.classList.add('fixed');
        sideBar?.classList.add('bg-white');
        // sideBar?.classList.toggle('hidden');
      }else{
        sideBar?.classList.remove('fixed');
        sideBar?.classList.remove('bg-white');
      }
    }
  }
 
 
  toggleSidebar(event: Event) {  
    if (event) {
      event.stopPropagation();
    }
    console.log('clicked');
    this.showMenu = !this.showMenu;
    setTimeout(()=>{
      this.addSidebarClass();
    }, 0);
  }
 
  closeSideBar(event: Event) {
    if (event) {
      event.stopPropagation();
    }
   if(this.showMenu){
    this.showMenu = false;
   }
  }

  closeSidebar(event: Event){
    if(this.showMenu){
      this.showMenu = false;
    }
  }
}
