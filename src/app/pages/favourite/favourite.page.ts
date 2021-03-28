import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { HelperService } from 'src/app/services/helper/helper.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataService } from 'src/app/services/Data/data.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
  notificationsNumber:number
  WishlistItems:any[]=[]
  WishlistIsEmpty:boolean
  cartNumber:number
  constructor(private route:Router,private location:Location,private helper:HelperService,
              private storage:Storage,private cartservice:CartService,private dataService:DataService) { }

  ngOnInit() {
    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })

    this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })

    this.storage.get('alakifak_wishlist_items').then((WishlistItems:any)=>{
      console.log(JSON.stringify(WishlistItems))
      if(WishlistItems!=null){
        this.WishlistItems=WishlistItems
      }else{
        this.WishlistIsEmpty=true
      }
    })
  }

  Back(){
    this.location.back();
  }


  deleteProduct(i,ID){
    this.storage.get('alakifak_wishlist_items').then((WishList:any)=>{  
        this.WishlistItems=WishList;
        this.WishlistItems.splice(i,1);
        this.storage.set('alakifak_wishlist_items',this.WishlistItems)       
    })
    this.helper.presentToastWithOptions('تم إزالة المنتج من المفضلة')
    
  }


  ProductDetails(productId,productName)
  {
    console.log(productId)
    this.dataService.setData(productId, productName);
    this.route.navigateByUrl('/product/'+productId);  
  }
  doRefresh($event){ 
    this.storage.get('alakifak_wishlist_items').then((WishlistItems:any)=>{
      console.log(JSON.stringify(WishlistItems))
      if(WishlistItems!=null){
        this.WishlistItems=WishlistItems
      }else{
        this.WishlistIsEmpty=true
      }
    })
    $event.target.complete();
  }
}
