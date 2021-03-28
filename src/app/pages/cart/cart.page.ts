import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart/cart.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { DataService } from 'src/app/services/Data/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  productQuantity:number=1
  CartItems:any[]=[]
  CartIsEmpty:boolean=true
  cartNumber:number
  notificationsNumber:number
  cartTotal:number=0
  constructor(private route:Router,private location:Location,private cartService:CartService,
              private storage:Storage,private cartservice:CartService,
              private helper:HelperService,private dataService:DataService) { }

  ngOnInit() {


    this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
      console.log(cartItemsNumber)
      if(cartItemsNumber==0){
        console.log('0')
        this.CartIsEmpty=true
      }else{
        console.log('not 0')
        this.CartIsEmpty=false
      }
    })

    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })
    
    // this.storage.get('alakifak_cart_items').then((CartItemsList:any)=>{
    //   console.log(CartItemsList)
    //   if(CartItemsList!=null || CartItemsList!=[]){
    //     this.CartItems=CartItemsList
    //     this.CartIsEmpty=false
    //     console.log('not 0')
    //   }else if(CartItemsList==null){
    //     this.CartIsEmpty=true
    //     console.log('0')
    //   }
    // })

    this.storage.get('alakifak_cart_items').then((CartItemsList:any)=>{
      console.log(JSON.stringify(CartItemsList))
      if(CartItemsList!=null){
        this.CartItems=CartItemsList
      }else{
        this.CartIsEmpty=true
      }
    })

  }

  Back(){
    this.location.back();
  }

  deleteProduct(i,ID){
    this.storage.get('alakifak_cart_items').then((CartItemsList:any)=>{  
        this.CartItems=CartItemsList;
        this.CartItems.splice(i,1);
        this.storage.set('alakifak_cart_items',this.CartItems)       
    })
    this.helper.presentToastWithOptions('تم إزالة المنتج من السلة')
    
    this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
      console.log(cartItemsNumber)
      this.cartNumber=this.CartItems.length
    })
    this.cartservice.decreaseProduct();
    
    //this.cartService.setVal(this.cartNumber)

  }

  increaseQuantity(product,productQuantity){
    productQuantity++
  
    this.storage.get('alakifak_cart_items').then((CartItemsList:any)=>{  
      this.CartItems=CartItemsList;
      this.CartItems.forEach(elem=>{
        if(elem.id==product){
          elem.quantity++
        }
      })
      this.storage.set('alakifak_cart_items',this.CartItems)       
    })
    this.cartService.increaseProduct();

  }

  decreaseQuantity(product,productQuantity){
    if(productQuantity>1){
      productQuantity--
    }  
    this.storage.get('alakifak_cart_items').then((CartItemsList:any)=>{  
      this.CartItems=CartItemsList;
      this.CartItems.forEach(elem=>{
        if(elem.id==product){
          if(elem.quantity>1){
            elem.quantity--
          }
         
        }
      })
      this.storage.set('alakifak_cart_items',this.CartItems)       
    })
    this.cartService.decreaseProduct();
  }

  CartContinue(){
    this.storage.get("alakifak_UserId").then((UserId:any)=>{
      if(UserId!=null){
        this.storage.get('alakifak_cart_items').then((CartItemsList:any)=>{  
          this.CartItems=CartItemsList;
          this.CartItems.forEach((elem:any)=>{
            this.cartTotal+=elem.price*elem.quantity
            console.log(this.cartTotal)
          })   
          console.log(this.cartTotal)
          this.route.navigateByUrl('/cart-discount/'+this.cartTotal);
    
        this.storage.set('alakifak_cart_toatl',this.cartTotal)
        })
      }else{
        this.helper.presentToastWithOptions('من فضلك قم بالتسجيل أولا')
        setTimeout(()=>{
          this.route.navigateByUrl('/login'); 
        },3000)
       
      }  

    })
   
    
  }
 
  ProductDetails(productId,productName)
  {
    console.log(productId)
    this.dataService.setData(productId, productName);
    this.route.navigateByUrl('/product/'+productId);  
  }
  doRefresh($event){ 
    this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })

    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })
    this.storage.get('alakifak_cart_items').then((CartItemsList:any)=>{
      console.log(JSON.stringify(CartItemsList))
      if(CartItemsList!=null){
        this.CartItems=CartItemsList
      }else{
        this.CartIsEmpty=true
      }
    })
    $event.target.complete();
  }
}
