import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { ThrowStmt } from '@angular/compiler';
import { Globalization } from '@ionic-native/globalization/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public language:string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _translate: TranslateService,
    private globalization: Globalization
  ) {
    this.platform
    .ready()
    .then(()=>
    {
      this.getLang();
    })
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#3880ff');
      this.splashScreen.hide();
    });
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
    this._translate.setDefaultLang('en');
    this.language=String(res['value']);
    if (this._translate.getBrowserLang() !== undefined)
    {
    this._translate.use(this.language);}
    else{
      this._translate.use('en');
    }
  }
}
