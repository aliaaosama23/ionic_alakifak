import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { CartService } from 'src/app/services/cart/cart.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { DataService } from 'src/app/services/Data/data.service';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user/user.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-paymentoptions',
  templateUrl: './paymentoptions.page.html',
  styleUrls: ['./paymentoptions.page.scss'],
})
export class PaymentoptionsPage implements OnInit {

PaymentMethods:any[]=[]
notificationsNumber:number;
  constructor(private location:Location,private route:Router,private cart:CartService,
              private helper:HelperService,private user:UserService,private storage:Storage,
              private iab: InAppBrowser) { }

  ngOnInit() {

 
    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })

    this.helper.showSpinner()
    this.cart.getPaymentGateways()
    .then((res:any)=>{
      //console.log(JSON.stringify(res))
      this.PaymentMethods=res
      this.helper.hideSpinner()
    },(err:any)=>{
      this.helper.hideSpinner()
    })
  }

  Back(){
    this.location.back();
  }

  NotificationsPage(){
    this.route.navigateByUrl('/notifications');
  }

  PaymenyOption(methodId,title,methodName){
    //this.dataService.setData(methodId, methodName);
      this.helper.showSpinner()
      this.cart.getPaymentGatewayByID(methodId)
      .then((res:any)=>{
       //   console.log("payment data ..."+JSON.stringify(res))
         
      },(err:any)=>{
        
      })
    this.storage.set('paymentmethodID',methodId)
    this.storage.set('paymentmethodTitle',title)
    //this.route.navigateByUrl('/shippingoptions');
    this.route.navigateByUrl('/orderpreview');
  }

  Mada(){

  }
}
