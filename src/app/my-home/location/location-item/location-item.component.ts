import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent implements OnInit{

  @Input('location') location: any;
  expanded = false;

  ngOnInit(): void {
      console.log('location', this.location);
  }
  toggle(){
    this.expanded = !this.expanded;
  }
}
