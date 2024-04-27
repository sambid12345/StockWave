import { Component, OnInit, enableProdMode } from '@angular/core';
import { isDevMode } from '@angular/core';
import { ToastService } from './shared/components/toast/toast-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'StockWave';
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';

  constructor(private toastService: ToastService){
    // console.log(isDevMode());
  }

  ngOnInit() {
      this.toastService.getToastInfo().subscribe((toastInfo: any)=>{
        this.showToast = toastInfo.showToast
        this.toastMessage = toastInfo.toastMessage;
        this.toastType = toastInfo.toastType;
       
      })
  }
  hideToast(){
    this.showToast = false;
  }
}
