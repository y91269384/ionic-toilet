import { Component, OnInit } from '@angular/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { NavController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public about :string;
  public language:string;

  constructor(
    private globalization: Globalization,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getLang();
    this.changeLanguage(); 
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
    this.about = this.translate.instant("home.about");
  }, 0);
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
  }

}
