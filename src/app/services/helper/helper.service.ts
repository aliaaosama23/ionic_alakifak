import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {  Observable } from 'rxjs';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  BaseUrl:string='';
  CartUrl:string='';
  UserUrl:string=''
  loading: any;
  ConsumerKey	: string=''
  ConsumerSecret	: string=''
  Url:string=''
  private logined=new BehaviorSubject(false);
  private notifications=new BehaviorSubject(0);

//url1:string='https://alakaifak.com/wp-json/wc/v3';
  authUrl1:string='https://alakaifak.com/wp-json/jwt-auth/v1/token';
  tokenverifyUrl1:string='https://alakaifak.com/wp-json/jwt-auth/v1/token/validate';
  
  constructor(private toastController:ToastController,private loadingController:LoadingController,
    private spinnerDialog: SpinnerDialog) { 
    this.Url='https://alakaifak.com';
    this.BaseUrl='https://alakaifak.com/wp-json/wc/v3/';

   this.CartUrl= 'https://alakaifak.com/wp-json/cocart/v1/';
   this.UserUrl='https://alakaifak.com/wp/v2/';



    this.ConsumerKey='ck_7519abbd0be83fab4e29534ed729201de509c7ac';
    this.ConsumerSecret='cs_eb216257f58f57bc3f5cfff52214ab7a1b6a1afd';
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
       spinner:"lines",
       backdropDismiss: true
     });
     await this.loading.present();
   }
 
   async dissmisLoading() {
     await this.loading.dismiss();
     console.log('Loading dismissed!');
   }
 
   showSpinner(){
     this.spinnerDialog.show();
   }
 
   hideSpinner(){
     this.spinnerDialog.hide();
   }
 
   async presentToastWithOptions(message) {
     const toast = await this.toastController.create({
       message: message,
       position: 'bottom',
       duration: 3000,
       color:"primary"
     });
     toast.present();
   }
 
   //------------------- notifications -----------------------------//

   increaseNotifications(){
    // get the current value of count and increase it by one
     const newVal=this.notifications.getValue() +1 
     // update the value of count to new value 
     this.notifications.next(newVal) ;
  }

  decreaseNotifications(){
     // get the current value of count and decrease it by one
     const newVal=this.notifications.getValue() -1
     // update the value of count to new value 
     this.notifications.next(newVal) ;
  }
  
  getNotificationsObservable(): Observable<number>{
    return this.notifications.asObservable();
  }
}
