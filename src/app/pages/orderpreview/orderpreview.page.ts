import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HelperService } from 'src/app/services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-orderpreview',
  templateUrl: './orderpreview.page.html',
  styleUrls: ['./orderpreview.page.scss'],
})
export class OrderpreviewPage implements OnInit {
  OrderData:any={
    payment_method:'',
    payment_method_title:'',
    billing:{},
    shipping:{},
    shipping_lines:[],
    line_items:[]
  }
  notificationsNumber:number
  orderDone:boolean=false
  constructor(private storage:Storage,private route:Router,private userService:UserService,
    private location:Location,private helper:HelperService,private iab: InAppBrowser) { }

  ngOnInit() {
    
    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })


    this.storage.get("alakifak_cart_toatl").then((total:any)=>{
      this.OrderData.total=total
    })
    this.storage.get("paymentmethodID").then((paymentmethodID:any)=>
    {
      if(paymentmethodID)
      {
        console.log(paymentmethodID)
        this.OrderData.payment_method=paymentmethodID
            this.storage.get("paymentmethodTitle").then((paymentmethodTitle:any)=>
            {
              if(paymentmethodTitle){   
                this.OrderData.payment_method_title=paymentmethodTitle      
                this.storage.get("alakifak_billing_shipping").then((alakifak_billing_shipping:any)=>
                {
                  if(alakifak_billing_shipping)
                  {
                    this.OrderData.billing=alakifak_billing_shipping.billing
                    this.OrderData.shipping=alakifak_billing_shipping.shipping
                    // this.storage.get("shipping_lines").then((shipping_lines:any)=>
                    // {
                    //   if(shipping_lines)
                    //   {    
                      //  this.OrderData.shipping_lines=shipping_lines
                        this.storage.get("alakifak_cart_items").then((alakifak_cart_items:any)=>{
                          if(alakifak_cart_items){
                            this.OrderData.line_items=alakifak_cart_items
                          }
                        })              
                  //     }    
                  //  })    
                  }    
                })    
              }    
            })  
      }    
    })
  }

  OrderCreation(){
  this.helper.showSpinner()
      this.storage.get("paymentmethodID").then((paymentmethodID:any)=>
      {
        if(paymentmethodID)
        {
          console.log(paymentmethodID)
          this.OrderData.payment_method=paymentmethodID
              this.storage.get("paymentmethodTitle").then((paymentmethodTitle:any)=>
              {
                if(paymentmethodTitle){   
                  this.OrderData.payment_method_title=paymentmethodTitle      
                  this.storage.get("alakifak_billing_shipping").then((alakifak_billing_shipping:any)=>
                  {
                    if(alakifak_billing_shipping)
                    {
                      this.OrderData.billing=alakifak_billing_shipping.billing
                      this.OrderData.shipping=alakifak_billing_shipping.shipping
                      // this.storage.get("shipping_lines").then((shipping_lines:any)=>
                      // {
                      //   if(shipping_lines)
                      //   {    
                        //  this.OrderData.shipping_lines=shipping_lines
                          this.storage.get("alakifak_cart_items").then((alakifak_cart_items:any)=>{
                            if(alakifak_cart_items){
                              this.OrderData.line_items=alakifak_cart_items
                            }
                          })              
                    //     }    
                    //  })    
                    }    
                  })    
                }    
              })  
        }    
      })
      this.storage.get("alakifak_UserId").then((val:any)=>{
 
        if(val!=null){
          setTimeout(()=>{
            this.userService.CreateOrder(this.OrderData,val).then(
              (res:any)=>{
                console.log(JSON.stringify(res))
              //   let g2p_token='FA571D0E8A1D18BEA534B184813FE771.prod01-vm-tx06'
              //   const browser = this.iab.create('https://alakaifak.com/checkout/order-pay/'+res.id+'/?key='+res.order_key+'&g2p_token='+g2p_token,'_blank','location=yes');
              //    browser.on('loadstop').subscribe((event:any) => {
              //     console.log("pay result :"+JSON.stringify(event))
                  
              //  });

              this.userService.urlpost(res.total,res.id,res.billing.email,res.billing.first_name,res.billing.last_name).subscribe(
                (data:any) => {   
                  // https://alakaifak.com/alakaifak/new_api/payment.php?type=165AD3CDAA28D14A0DAEE0637778A919.uat01-vm-tx02#loaded  
                console.log("ndc : ",data.ndc);     
                   this.OpenUrl('https://alakaifak.com/alakaifak/new_api/payment.php?type='+data.id+'#loaded');            
                },error=>{
             
            
                } );
                this.orderDone=true
              },(err:any)=>{
      
              })
          },4000)
        }else{
          setTimeout(()=>{
            this.userService.CreateOrder(this.OrderData,0).then(
              (res:any)=>{
                console.log(JSON.stringify(res))
                this.orderDone=true
              },(err:any)=>{
      
              })
          },4000)
        }
      })
    
     this.helper.hideSpinner()
  }

  OpenUrl(data)
    {
    const browser = this.iab.create(data,"_self","location=yes,toolbar=yes");
    browser.show();

    }

  Back(){
    this.location.back()
  }

  Home(){
    this.route.navigateByUrl('/')
  }
}
