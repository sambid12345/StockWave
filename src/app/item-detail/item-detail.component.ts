import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  itemId: string | null = '';

  constructor( private route: ActivatedRoute ){

  }
  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('itemId'); // Access the itemId from params
   
  }
 
}
