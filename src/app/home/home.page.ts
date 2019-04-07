import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items:Array<any> = [];
  data:Observable<any>;
  i:number = 15;

  constructor(
    private http:HttpClient,
    public geolocation:Geolocation){
    this.locate();
  }

  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.data = this.http.get('https://plbpc013.ouhk.edu.hk/toilet/json-toilet-v2.php?lat='+resp.coords.latitude+'&lng='+resp.coords.longitude+'&display_row=15&lang=zh');
      this.data.subscribe(result => {
        console.log[result];
        this.items = result;
      })
    }).catch((error) =>{
      console.log('Error Getting Location', error);
    });
  }

  loadData(event) {
    this.i = this.i + 15;
    setTimeout(() => {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.data = this.http.get('https://plbpc013.ouhk.edu.hk/toilet/json-toilet-v2.php?lat='+resp.coords.latitude+'&lng='+resp.coords.longitude+'&display_row=15&row_index='+this.i+'&lang=zh');
      this.data.subscribe(result => {
      this.items = this.items.concat(result);
      })
    });
    event.target.complete();
  },500)
}

viewItem(i){
  //console.log(this.items[i].address)
  this.geolocation.getCurrentPosition().then((resp) => {
     window.open("https://www.google.com/maps/dir/?api=1&origin="+resp.coords.latitude+","+resp.coords.longitude+"&destination="+this.items[i].name+","+this.items[i].address,'_system', 'location=yes');
   })
 }

  doRefresh(event) {
    console.log('Begin async operation');
    this.locate();
      event.target.complete();
    }
  }
