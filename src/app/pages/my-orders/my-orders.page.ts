import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user/user.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { CartService } from 'src/app/services/cart/cart.service';
import * as moment from 'moment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  Myorders:any[]=[]
  notificationsNumber:number;
  cartNumber:number
  constructor(private route:Router,private location:Location,private UserService:UserService,
              private helper:HelperService,private storage:Storage,
              private cartservice:CartService) { }

  ngOnInit() {
    this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })

    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })

   this.UserOrders()
    
  }

  UserOrders(){
    this.storage.get('alakifak_UserId')
    .then((val:any)=>{
        if(val){
          this.helper.showSpinner()
          this.UserService.getPastOrders(val).then(
            (res:any)=>{
              this.Myorders=res
              this.Myorders.forEach(element => {
                element.date_created= moment(element.date_created).format('L')
              });   
               console.log(JSON.stringify(res))
               this.helper.hideSpinner()
            },
            (err:any)=>{
              this.helper.hideSpinner()
            })
        }
    })
  }
  Back(){
    this.location.back();
  }

  OrderDetails(order_id){
    this.route.navigateByUrl('my-order-details/'+order_id);
  }

  deleteProduct(order_id){
    this.UserService.DeleteOrder(order_id)
    .then((res:any)=>{
        this.helper.presentToastWithOptions('تم حذف الطلب')
        this.UserOrders()
    },(err:any)=>{

    })
  }

}
