import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../Service/home.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  locationTree: any;

  constructor(private homeService: HomeService) {}
  expanded = false;

  toggle(location: any) {
    this.expanded = !this.expanded;
  }

  ngOnInit(): void {
    this.getLocations();
  }
  getLocations() {
    this.homeService.getLocations().subscribe({
      next: (locationList: any) => {
        this.locationTree = locationList;
      },
      error: (error: any) => {},
    });
  }
  colapseAll() {}
}
