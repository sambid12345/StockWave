import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showMenu: boolean = true;
  constructor() {}

  ngOnInit() {}

  toggleSidebar(event: Event) {
    if (event) {
      event.stopPropagation();
    }
    console.log('clicked');
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
