import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { CartService } from '../app/services/cart/cart.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  CartItems:any[]=[]
  itemNumber:number
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage:Storage,public cart:CartService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.storage.get('alakifak_cart_items').then((CartItemsList:any)=>{
        if(CartItemsList!=null){
          this.CartItems=CartItemsList;
          this. itemNumber=0;
          this.CartItems.forEach(elem=>{
            this.itemNumber=elem.quantity+this.itemNumber
          })
          this.cart.setVal(this.itemNumber)
          // this.CartItems.push(p);
          // this.storage.set('alakifak_cart_items',this.CartItems)
        }else{
          this.cart.setVal(0)
          // this.CartItems.push(p);
          // this.storage.set('alakifak_cart_items',this.CartItems)
        }
      })
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
