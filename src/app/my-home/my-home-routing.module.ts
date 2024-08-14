import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MyHomeComponent } from "./my-home.component";
import { ProfileComponent } from "./profile/profile.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { ItemComponent } from "./item/item.component";
import { LocationComponent } from "./location/location.component";


const routes: Routes = [
   {
        path: '', 
        component: MyHomeComponent,
        children:[
            {path: 'home', component: HomeComponent},
            {path: 'location', component: LocationComponent},
            {
                path: 'profile', component: ProfileComponent
            },
            {
                path: 'items', component: ItemComponent
            },
            {
                path: 'item/:itemId', 
                component: ItemDetailComponent
                
            }
        ]
    }
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MyHomeRoutingModule { }
  