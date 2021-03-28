import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CartService } from '../../services/cart/cart.service';
import { DataService } from '../../services/Data/data.service';
import { HelperService } from '../../services/helper/helper.service';
import { ProductsService } from '../../services/products/products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1,
    autoplay: {
      delay: 3000
      }
  };
  LatestProducts:any=[]
  AllProducts:any[]=[]
  Categories:any=[]
  CategoriesFristItems:any=[]
  cartNumber:number
  notificationsNumber:number
  CartItems:any[]=[]
  maximumLength:number
  page:number=1
  Sliders:any[]=[]
  constructor(public route:Router,private cartservice:CartService,private helper:HelperService,
              public loadingController: LoadingController,private dataService:DataService,
              private productsService:ProductsService,private storage:Storage) { }

  ngOnInit() {

    this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })

    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })

    this.helper.showSpinner();
    this.productsService.GetSliders().then(
      (res:any)=>{
          this.Sliders=res.data
          this.helper.hideSpinner();
         console.log(JSON.stringify(this.Sliders))
        }
      ,(err:any)=>{
       console.log(JSON.stringify(err))
        this.helper.hideSpinner();
      }
    )

    this.helper.showSpinner();
    this.productsService.GetALLCategories().then(
      (res:any)=>{
          this.Categories=res
          this.helper.hideSpinner();
         // console.log(this.Categories.slice(0,3))
          this.CategoriesFristItems=this.Categories.slice(0,3)
        }
      ,(err:any)=>{
       // console.log(JSON.stringify(err))
        this.helper.hideSpinner();
      }
    )


    this.GetALLProductsReport();
    // this.helper.showSpinner();
    // this.productsService.GetALLCategories().then(
    //   (res:any)=>{
    //   // console.log(JSON.stringify(res))
    //    this.LatestProducts=res
    //     this.helper.hideSpinner()
    //   },(err:any)=>{
    //     this.helper.hideSpinner()
    //   }
    // )

  }

  GetALLProductsReport(){
    this.helper.showSpinner();
    this.productsService.GetALLProductsReport().then(
      (res:any[])=>{
        this.maximumLength=res[2].total/10
        this.loadProducts();
        this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

 
    loadProducts(){
      this.helper.showSpinner();
     this.productsService.GetALLProducts(this.page).then(
        (res:any)=>{
          //console.log(JSON.stringify(res))
            this.AllProducts=this.AllProducts.concat(res) 
            this.helper.hideSpinner()
        },(err:any)=>{
          this.helper.showSpinner();
        })
    }

    
  loadData(event){
    setTimeout(() => {
      this.page++ 
      this.productsService.GetALLProducts(this.page) .then(
        (res:any)=>{
          this.AllProducts=this.AllProducts.concat(res)  
            event.target.complete();
        },(err:any)=>{
          event.target.complete();
        })
          if (this.page===this.maximumLength) {
            event.target.disabled = true;
        }
    }, 500);
}
  

  addToCart(product){
    const p={
      'id':product.id,
      'image':product?.images[0]?.src,
      'name':product.name,
      'price':product.price,
      'quantity':1
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

    // this.cartservice.addtocart(p.id,1).then((res:any)=>{
    //   console.log(JSON.stringify(res))
    // })
  }

  ProductDetails(productId,productName)
  {
    console.log(productId)
    this.dataService.setData(productId, productName);
    this.route.navigateByUrl('/product/'+productId);  
  }

  CategoryProducts(id,name){
    this.dataService.setData(id,name);
    this.route.navigateByUrl('/category-products/'+id);
  }

  doRefresh($event){ 
    this.productsService.GetSliders().then(
      (res:any)=>{
          this.Sliders=res.data
          $event.target.complete();
         console.log(JSON.stringify(this.Sliders))
        }
      ,(err:any)=>{
       console.log(JSON.stringify(err))
       $event.target.complete();
      }
    )
    this.productsService.GetALLCategories().then(
      (res:any)=>{
          this.Categories=res
          console.log(this.Categories.slice(0,3))
          this.CategoriesFristItems=this.Categories.slice(0,3)
          $event.target.complete();
        }
      ,(err:any)=>{
        console.log(JSON.stringify(err))
        $event.target.complete();
      }
    )
    this.productsService.GetALLProducts(this.page).then(
      (res:any)=>{
        this.LatestProducts=res
        $event.target.complete();
      },(err:any)=>{
        $event.target.complete();
      }
    )
    this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })
 }

}
