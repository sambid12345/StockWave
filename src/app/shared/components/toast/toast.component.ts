import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit{

  @Input('type') type:string = 'info';
  @Input('message') message:string = 'Sample Message';
  @Output('onClose') onClose = new EventEmitter<any>();

  ngOnInit(): void {
      setTimeout(()=>{this.closeToast()},4000)
  }

  closeToast(){
    this.onClose.emit();
  }
}
