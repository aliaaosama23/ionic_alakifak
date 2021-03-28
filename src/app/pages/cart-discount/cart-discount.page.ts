import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { HelperService } from 'src/app/services/helper/helper.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-cart-discount',
  templateUrl: './cart-discount.page.html',
  styleUrls: ['./cart-discount.page.scss'],
})
export class CartDiscountPage implements OnInit {
  notificationsNumber:number;
  DiscountCode:any
  cartTotal:any
  cartTotalAfterDiscount:any
  noCouponAvailable:boolean=false
  minimum_amount_notice:boolean=false
  min_amount:number
  TotalChanged:boolean=false
  Country:any
  Region:any
  City:any
  PostalCode:any
  countryStates:any[]=[]
  shipping_title:any
  shipping_tax:any
  shipping_method_choose:boolean=false
  cartTotalAfterTax:any
  constructor(private route:Router,public storage: Storage,private user:UserService,
              private location:Location,private helper:HelperService,private cartService:CartService,
              private activatedRoute:ActivatedRoute){

                  this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
                    this.notificationsNumber=notificationsNumber
                  })

                  this.cartTotal = this.activatedRoute.snapshot.paramMap.get('total');    
}

  ngOnInit() {
  }

  Back(){
    this.location.back()
  }

  apply(){
    this.helper.showSpinner()
    this.cartService.applycoupon(this.DiscountCode).then(
      (res:any[])=>{
        console.log(JSON.stringify(res))
          if(res.length!=0){
            this.noCouponAvailable=false
            if(parseInt(res[0].minimum_amount)>this.cartTotal){
              this.minimum_amount_notice=true
              this.min_amount=res[0].minimum_amount
            }else{
              if(res[0].discount_type=="percent"){
                this.TotalChanged=true;
                this.cartTotalAfterDiscount=this.cartTotal-((this.cartTotal*res[0].amount)/100);
              }   
            }
          }else{
            this.noCouponAvailable=true
          }  
          this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.hideSpinner()
      })
  }

  GoCheckout(){
   // this.shipping()

   // setTimeout(()=>{
            // this.storage.get("alakifak_UserId").then((UserId:any)=>{
            //   if(UserId!=null){
              this.route.navigateByUrl('/paymentaddress'); 
              // }else{
              //   this.helper.presentToastWithOptions('من فضلك قم بالتسجيل أولا')
              //   setTimeout(()=>{
              //     this.route.navigateByUrl('/login'); 
              //   },3000)
              
              // }   
                if(this.TotalChanged)
                  {
                    this.storage.set('alakifak_cart_toatl',this.cartTotalAfterDiscount);
                  }
                else{
                  this.storage.set('alakifak_cart_toatl',this.cartTotal);
            
                }
          // })
 //   },3000)
  
 
  }

    selectCountry(){
      this.helper.showSpinner()
      this.cartService.CountryStates('SA')
      .then((res:any)=>{
        console.log(JSON.stringify(res))
        this.countryStates=res.states
        this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.hideSpinner()
      })
    }

    selectState(){
      this.shipping()
    }

    shipping(){
      this.user.shipping_zones().subscribe((res:any)=>{
          this.user.shipping_zones_methods(res[1].id).subscribe((shipping_methods:any)=>{
            if(shipping_methods){
              this.shipping_method_choose=true

              this.cartTotalAfterTax=parseInt(this.cartTotal)+parseInt( shipping_methods[0].settings.cost.value)
             // this.cartTotal=this.cartTotalAfterTax
              this.shipping_title=shipping_methods[0].title
              this.shipping_tax=shipping_methods[0].settings.cost.value

             // this.storage.set("method_title",shipping_methods[0].title)
            //  this.storage.set("method_id",shipping_methods[0].method_id)

              const shipping_lines={  
                  "method_title": shipping_methods[0].title,
                  "method_id": shipping_methods[0].method_id,    
              }
              this.storage.set("shipping_lines",shipping_lines)
              this.storage.set("alakifak_cart_toatl",this.cartTotalAfterTax);
            }
           
          })
      })
    }
}






















  //public myForm: FormGroup;
  // countries:any[]=[]
  // countryStates:any[]=[]

//import { FormGroup, FormBuilder, Validators } from '@angular/forms';

        // public formBuilder: FormBuilder

 // console.log(this.cartTotal)
     // this.myForm = formBuilder.group({
     //   Discountcode: [''],
        // Country: ['',  Validators.required],
        // Region: ['',  Validators.required],
        // City:['',  Validators.required],
        // PostalCode:['',  Validators.required]
     // }); 

      // this.helper.showSpinner()
      // this.cartService.Countries()
      // .then((res:any)=>{
      //    this.countries=res
      //    this.helper.hideSpinner()
      // },(err:any)=>{
      //   this.helper.hideSpinner()
      // })
// Checkout(){  
  //   this.route.navigateByUrl('/paymentoptions');
  // }

// selectCountry(){
  //   this.helper.showSpinner()
  //   this.cartService.CountryStates(this.countryCode)
  //   .then((res:any)=>{
  //     console.log(JSON.stringify(res))
  //      this.countryStates=res
  //      this.helper.hideSpinner()
  //   },(err:any)=>{
  //     this.helper.hideSpinner()
  //   })
  // }