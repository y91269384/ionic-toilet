import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavController, Platform, IonInfiniteScroll } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items:Array<any> = [];
  data:Observable<any>;
  i:number = 15;
  public language:string;
  public title :string;
  public dist :string;
  public meter :string;
  public about :string;


  constructor(
    private http:HttpClient,
    public geolocation:Geolocation,
    private globalization: Globalization,
    private translateService: TranslateService,
    private platform: Platform,
    public navCtrl: NavController,
    private translate: TranslateService
    ){
    this.getLang();
    this.changeLanguage();
    this.locate();
    this.reload();
  }

  public ionViewDidLoad() : void
  {
    this.getLang();
    this._initialiseTranslation();;
  }

  public changeLanguage() : void
  {
    this._translateLanguage();
  }

  private _translateLanguage() : void
  {
    this.translate.use(this.language);
    this._initialiseTranslation();
  }

  private _initialiseTranslation() : void
  {
     setTimeout(() =>
     {
    this.title = this.translate.instant("home.title");
    this.dist = this.translate.instant("home.Dist");
    this.meter = this.translate.instant("home.meter");
    this.about = this.translate.instant("home.about");
  }, 250);
  }
  
  getLang(){
    this.globalization.getLocaleName()
    .then(res => this.saveLang(res))
    .catch(e => this.errorHandle(e));
  }

  errorHandle(e){
    this.language=JSON.stringify(e);
  }

  saveLang(res){
    this.language=String(res['value']);
    this.changeLanguage();
    this.locate();
  }

  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.data = this.http.get('https://plbpc013.ouhk.edu.hk/toilet/json-toilet-v2.php?lat='+resp.coords.latitude+'&lng='+resp.coords.longitude+'&display_row=15&lang='+this.language);
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
      this.data = this.http.get('https://plbpc013.ouhk.edu.hk/toilet/json-toilet-v2.php?lat='+resp.coords.latitude+'&lng='+resp.coords.longitude+'&display_row=15&row_index='+this.i+'&lang='+this.language);
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

reload(){
  this.locate();
}

  doRefresh(event) {
    console.log('Begin async operation');
    this.getLang();
    this.changeLanguage();
    this.locate();
      event.target.complete();
    }

}