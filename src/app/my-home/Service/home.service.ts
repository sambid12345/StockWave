import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getItemList(){
    let url = `${environment.baseUrl}home/items`;
    return this.http.get(url)
  }

  getItemById(itemId: any){
    let url = `${environment.baseUrl}home/items/${itemId}`;
    return this.http.get(url)
  }

  createLocation(locationData: any){
    let url = `${environment.baseUrl}home/locations`;
    return this.http.post(url, locationData);
  }
  createItem(itemData: any){
    let url = `${environment.baseUrl}home/items`;
    return this.http.post(url, itemData);
  }
  getLocations(){
    let url = `${environment.baseUrl}home/locations`;
    return this.http.get(url);
  }
}
