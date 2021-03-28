import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { CartService } from 'src/app/services/cart/cart.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Storage } from '@ionic/storage';
import { title } from 'process';

@Component({
  selector: 'app-shippingoptions',
  templateUrl: './shippingoptions.page.html',
  styleUrls: ['./shippingoptions.page.scss'],
})
export class ShippingoptionsPage implements OnInit {

  shippingMethods:any[]=[]
  notificationsNumber:number
    constructor(private location:Location,private route:Router,private cart:CartService,
      private helper:HelperService,private storage:Storage) { }
  
    ngOnInit() {
  
        this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
          this.notificationsNumber=notificationsNumber
        })

        this.helper.showSpinner()
        this.cart.getshipping_methods()
        .then((res:any)=>{
         // console.log(JSON.stringify(res))
          this.shippingMethods=res
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

    ShippingOption(id,method_title){
      const  shipping_lines= [
        {
          method_id: id,
          method_title: method_title,
          //total: "10.00"
        }
      ]
      //this.storage.set('shippingmethodID',id)
      //this.storage.set('shippingmethodTitle',method_title)
      this.storage.set('shipping_lines',shipping_lines)
      this.route.navigateByUrl('/orderpreview')
    }
}
