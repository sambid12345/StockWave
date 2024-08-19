import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../Service/home.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  locationPathList = ['Home', 'Project', 'FlowBite']; 
  itemId: string | null = '';
  itemDetailsStructureObj: any
  constructor( private route: ActivatedRoute, private homeService: HomeService ){

  }
  itemDetails: any
  ngOnInit() {
    
    this.itemId = this.route.snapshot.paramMap.get('itemId'); // Access the itemId from params
    this.initiateItemDetailsData();

    this.getItemDetais();
  }

  initiateItemDetailsData(){
    this.itemDetailsStructureObj = [
      {
        headerName: 'Details' ,
        accordianHeaderId: 'accordion-open-heading-1',
        accordianBodyId : 'accordion-open-body-1',
        bodyDetails: [
          {
            key: 'Quantity',
            value: '1',
            formControlName: 'quantity'
          },
          {
            key: 'Serial Number',
            value: 'sn200',
            formControlName: 'serialNumber'
          },
          {
            key: 'Model Number',
            value: 'MOD999',
            formControlName: 'modelNumber'
          },
          {
            key: 'Manufacturer',
            value: 'Bajaj',
            formControlName: 'manufacturerName'
          },
          {
            key: 'Insured',
            value: 'YES',
            formControlName: 'isInsured'
          },
          {
            key: 'Notes',
            value: 'demo notes 999',
            formControlName: 'notes'
          },
          {
            key: 'Asset ID',
            value: '123-4567890666292',
            formControlName: 'assetID'
          }
        ]
      },
      {
        headerName: 'Attachments' ,
        accordianHeaderId: 'accordion-open-heading-2',
        accordianBodyId : 'accordion-open-body-2',
        bodyDetails: [
          {
            key: 'Attachment Detais',
            value: 'Attachment Detais',
            formControlName: 'attachmentDetais'
          }
        ]
      },
      {
        headerName: 'Purchase Details',
        accordianHeaderId: 'accordion-open-heading-3',
        accordianBodyId : 'accordion-open-body-3',
        bodyDetails: [
          {
            key: 'Purchased From',
            value: 'v-Mart',
            formControlName: 'purchasedFrom'
          },
          {
            key: 'Purchased Price',
            value: '200',
            formControlName: 'purchasedPrice'
          },
          {
            key: 'Purchase Date',
            value: '10/11/2023',
            formControlName: 'purchaseDate'
          }
        ] 
      },
      {
        headerName: 'Warranty Details' ,
        accordianHeaderId: 'accordion-open-heading-4',
        accordianBodyId : 'accordion-open-body-4',
        bodyDetails: [
          {
            key: 'Lifetime Warranty',
            value: 'NO',
            formControlName: 'lifetimeWarranty'
          },
          {
            key: 'Warranty Expires',
            value: '13/02/2034',
            formControlName: 'warrantyExpiryDate'
          },
          {
            key: 'Warranty Details',
            value: 'Warranty Details ',
            formControlName: 'warrantyDetails'
          }
        ]
      },
      {
        headerName: 'Sold Details' ,
        accordianHeaderId: 'accordion-open-heading-5',
        accordianBodyId : 'accordion-open-body-5',
        bodyDetails: [
          {
            key: 'Sold To',
            value: 'v-Mart',
            formControlName: 'soldTo'
          },
          {
            key: 'Sold Price',
            value: '200',
            formControlName: 'soldPrice'
          },
          {
            key: 'Sold At',
            value: '10/11/2023',
            formControlName: 'soldAt'
          }
        ]
      }
    ]
  }

  getItemDetais(){
    if(this.itemId){
      this.homeService.getItemById(this.itemId).subscribe({
        next: (response: any)=>{
          this.itemDetails = response;
          console.log('item details', this.itemDetails);
        },
        error: (error: any)=>{

        }
      })
    }
  }
 
}
