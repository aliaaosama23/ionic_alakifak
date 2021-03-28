import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ProductsService } from 'src/app/services/products/products.service';
import { Storage } from '@ionic/storage';
import { strict } from 'assert';
import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productname:string='';
  productId:any;
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1,
    autoplay: {
      delay: 3000
      }
  };
  type:string='';
  productQuantity:number=1;
  productDetails:any={}
  productReviews:any[]=[]
  CartItems:any[]=[]
  WishlistItems:any[]=[]
  notificationsNumber:number
  productSlider:any[]=[]
  notFavourited:boolean=true
  cartNumber:number

  constructor(private activatedRoute:ActivatedRoute,private location:Location,private cartservice:CartService,
              private route:Router,private helper:HelperService,private cartService:CartService,
              private socialSharing: SocialSharing,private productService:ProductsService,
              private storage:Storage,public loadingController: LoadingController) { 
                  this.type='product';
    }

   ngOnInit() {
    
    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })

    this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })

    if (this.activatedRoute.snapshot.data['data']) {
      this.productname = this.activatedRoute.snapshot.data['data'];
    }

    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    
    console.log(this.productId)
     // this.helper.showSpinner()
    //  const loading = await this.loadingController.create({
    //   spinner:'lines',
    //   duration: 5000
    // });
    // await loading.present();
      this.productService.GetProductByID(this.productId).then(
        (res:any)=>{
          //console.log(JSON.stringify(res))
          this.productDetails=res
          
          this.productSlider= this.productDetails.images
        
          if(this.productSlider!=[]){

            this.productSlider.forEach((img:any)=>{
              img.src1=''
            })
            // this.productSlider.forEach((img:any)=>{
            //   //img.src=encodeURI(img.src)
            //   img.src= img.src.split('-')[0]+"-"+ img.src.split('-')[1]+"-"+img.name+'.jpg'
            // })
           // console.log(JSON.stringify(this.productSlider))
          }

          this.productService.GetProductReviews(this.productId).then(
            (res:any)=>{
              this.productReviews=res
              this.productReviews.forEach(element => {
                element.date_created =moment(element.date_created).format('L');
              });
            //  this.helper.hideSpinner()
            },(err:any)=>{
             // this.helper.hideSpinner()
            })

        },(err:any)=>{
          this.helper.hideSpinner()
        })
 
  }

  Back(){
   this.location.back();
  }

  AddProductToWhishlist(){
    this.notFavourited=false
    const p={
      'id':this.productDetails?.id,
      'image':this.productDetails?.images[0]?.src,
      'name':this.productDetails?.name,
      'price':this.productDetails?.price
    }

    this.storage.get('alakifak_wishlist_items').then((WishlistItems:any)=>{
      if(WishlistItems!=null){
        this.WishlistItems=WishlistItems;
        this.WishlistItems.push(p);
        this.storage.set('alakifak_wishlist_items',this.WishlistItems)
      }else{
        this.WishlistItems.push(p);
        this.storage.set('alakifak_wishlist_items',this.WishlistItems)
      }
    })
    this.helper.presentToastWithOptions('تم إضافة المنتج للمفضلة')

  }

  AddProductToCart(){
    const p={
      'id':this.productDetails?.id,
      'image':this.productDetails?.images[0]?.src,
      'name':this.productDetails?.name,
      'price':this.productDetails?.price,
      'quantity':this.productQuantity
    }
    this.cartservice.increaseProduct();
    this.storage.get('alakifak_cart_items').then((CartItemsList:any)=>{
      if(CartItemsList!=null){
        this.CartItems=CartItemsList;
        this.CartItems.push(p);
        this.storage.set('alakifak_cart_items',this.CartItems)
      }else{
        this.CartItems.push(p);
        this.storage.set('alakifak_cart_items',this.CartItems)
      }
    })
    this.helper.presentToastWithOptions('تم إضافة المنتج للسلة')

  }

  increaseQuantity(){
    this.productQuantity++
    this.cartService.increaseProduct();
  }

  decreaseQuantity(){
    if(this.productQuantity>1){
      this.productQuantity--
    }  
    this.cartService.decreaseProduct();
  }


  ShareProduct(){
      this.socialSharing.share(this.productname,'','',this.productDetails?.permalink);
  }
  

}
