import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyHomeRoutingModule } from './my-home-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MyHomeComponent } from './my-home.component';
import { ItemComponent } from './item/item.component';
import { LocationComponent } from './location/location.component';
import { LocationItemComponent } from './location/location-item/location-item.component';




@NgModule({
  declarations: [
    MyHomeComponent,
    HomeComponent,
    SidebarComponent,
    ProfileComponent,
    ItemDetailComponent,
    ItemComponent,
    LocationComponent,
    LocationItemComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MyHomeRoutingModule,

    SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA]
})
export class MyHomeModule { }
