import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  showMenu: boolean = true;
  themeArray: any = [];
  constructor(){

  }
  ngOnInit(): void {
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
        }
      ]
  }
  changeTheme(themeName: string){
    document.querySelector('html')?.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
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
