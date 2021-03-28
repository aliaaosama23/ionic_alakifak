import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(), 
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SpinnerDialog,
    SocialSharing,
    AppRate,
    InAppBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
