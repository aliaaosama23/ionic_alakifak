import { Component, OnInit } from '@angular/core';
import{Location} from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  cartNumber:number
  Notifications:any[]=[]
  constructor(private location:Location,private route:Router,private cartservice:CartService) { }

  ngOnInit() {
    this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })
  }

  Back(){
    this.location.back();
  }
  
}
