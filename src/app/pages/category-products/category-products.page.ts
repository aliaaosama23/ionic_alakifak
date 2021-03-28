import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { DataService } from '../../services/Data/data.service';
import { HelperService } from '../../services/helper/helper.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.page.html',
  styleUrls: ['./category-products.page.scss'],
})
export class CategoryProductsPage implements OnInit {
  CategoryProducts:any[]=[]
  CategoryID:any
  CategoryName:string=''
  NoProducts:boolean=false;
  notificationsNumber:number
  page:number=1
  constructor(private productService:ProductsService,private activatedRoute:ActivatedRoute,
              private helper:HelperService,private location:Location,private route:Router,
              private cartService:CartService,private dataService:DataService) { }

  ngOnInit() {
    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })
    if (this.activatedRoute.snapshot.data['data']) {
      this.CategoryName = this.activatedRoute.snapshot.data['data'];
      console.log(this.CategoryName)
    }
    this.CategoryID= this.activatedRoute.snapshot.paramMap.get('id');
    this.loadProducts(event);
  }

  loadProducts(event?){
    this.helper.showSpinner()
    this.productService.GetALLProductsByCategoryID(this.CategoryID,this.page,10)
      .then((res:any[])=>{
        if(res.length==0){
          this.NoProducts=true
        }else{
          this.CategoryProducts=res
          this.NoProducts=false
        }
        this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.hideSpinner()
      }) 
  }

  loadData(event){
    setTimeout(() => {
      this.page++ 
      this.productService.GetALLProductsByCategoryID(this.CategoryID,this.page,10).then(
        (res:any)=>{
            this.CategoryProducts= this.CategoryProducts.concat(res) 
            event.target.complete();
        },(err:any)=>{
          event.target.complete();
        })
        //   if (this.page===this.maximumLength) {
        //     event.target.disabled = true;
        // }
    }, 500);
  }

  Back(){
     this.location.back()
  }

  NotificationsPage(){
    this.route.navigateByUrl('/notifications');
  }

  addToCart(product){
   // this.cartService.addToCart(product);
  }

  ProductDetails(productId,productName)
  {
    console.log(productId)
    this.dataService.setData(productId, productName);
    this.route.navigateByUrl('/product/'+productId);  
  }

}
