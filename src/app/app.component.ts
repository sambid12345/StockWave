import { Component, enableProdMode } from '@angular/core';
import { isDevMode } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StockWave';
  constructor(){
    console.log(isDevMode());
  }
}
