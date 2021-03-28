import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private count=new BehaviorSubject(0);
  constructor(private http: HttpClient, public helper:HelperService,private storage:Storage) { }

  increaseProduct(){
    // get the current value of count and increase it by one
     const newVal=this.count.getValue() +1 
     // update the value of count to new value 
     this.count.next(newVal) ;
  }

  decreaseProduct(){
     // get the current value of count and decrease it by one
     const newVal=this.count.getValue() -1
     // update the value of count to new value 
     this.count.next(newVal) ;
  }
  
  getCountObservable(): Observable<number>{
    return this.count.asObservable();
  }

  setVal(count)
  {
    const newVal=count
    this.count.next(newVal) ;
  }
 
  getPaymentGateways() {
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.BaseUrl}payment_gateways?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`
        )
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getPaymentGatewayByID(id) {
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.BaseUrl}payment_gateways/${id}?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`
        )
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  
  getshipping_methods() {
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.BaseUrl}shipping_methods?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`
        )
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  Countries(){
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.BaseUrl}data/countries?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`
        )
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  CountryStates(country){
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.BaseUrl}data/countries/${country}?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`
        )
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  
applycoupon(code){
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.BaseUrl}coupons?code=${code}&consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`
        )
        .subscribe(data => {
          resolve(data);
        });
    });
}



}



// coupons(code) {
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/x-www-form-urlencoded'
//   });
//   const userData = `code=${code}`; 
//   return new Promise((resolve, reject) => {
//     this.http
//       .post(`${this.helper.Url}/wp-json/wc/v3/coupons`, userData, { headers })
//       .subscribe(
//         res => {
//           resolve(res);
//         },
//         err => {
//           resolve(err);
//         }
//       );
//   });
// }

 // not requeired
  // CountryDetails(code){
  //   return new Promise(resolve => {
  //     this.http
  //       .get(
  //         `${this.helper.Url}/wp-json/wc/v3/data/countries/${code}?consumer_key=${
  //           this.helper.ConsumerKey
  //         }&consumer_secret=${this.helper.ConsumerSecret}`
  //       )
  //       .subscribe(data => {
  //         resolve(data);
  //       });
  //   });
  // }

//  addtocart(id,quantity){
//    const data=
//      {id:id,quantity:quantity}
   
//   return new Promise(resolve => {
//     this.http
//       .post(
//         `${this.helper.Url}/wp-json/wc/store/cart/add-item?consumer_key=${
//           this.helper.ConsumerKey
//         }&consumer_secret=${this.helper.ConsumerSecret}`,data
//       )
//       .subscribe(data => {
//         resolve(data);
//       });
//   });
//  }
  // getcart(){
  //   return new Promise(resolve => {
  //     this.http
  //       .get(
  //         `${this.helper.Url}/wp-json/wc/store/cart?consumer_key=${
  //           this.helper.ConsumerKey
  //         }&consumer_secret=${this.helper.ConsumerSecret}`
  //       )
  //       .subscribe(data => {
  //         resolve(data);
  //       });
  //   });
  // }

 // wp-json/wc/store/cart"

//  applycoupon(code){
//    const data={code:code}
//   return new Promise(resolve => {
//     this.http
//       .post(
//         `${this.helper.Url}/wp-json/wc/store/cart/apply-coupon?consumer_key=${
//           this.helper.ConsumerKey
//         }&consumer_secret=${this.helper.ConsumerSecret}`,data
//       )
//       .subscribe(data => {
//         resolve(data);
//       });
//   });
//  }


  // Add_item_to_cart(ProductId,ProductQuantity){
  //   const obj={
  //     "product_id":ProductId,
  //     "quantity": ProductQuantity
  //   }
  //   let headers = new HttpHeaders()
  //   .set('X-Oc-Merchant-Id', '')
  //   .set('X-Oc-Session','')
  //   return this.http.post(this.helper.BaseUrl+'cart',obj, { headers: headers });
  
  // }

  // //checkout/?add-to-cart=%ID%

  // addToCart(product) {
  //   this.storage.get(`alakifak_product_${product.id}`).then(async data => {
  //     if (data) {
  //        this.helper.presentToastWithOptions('المنتج موجود من قبل ')
  //     } else {
  //       this.helper.presentToastWithOptions('تم اضافة المنتج للسلة ')
  //       this.storage
  //         .set(`alakifak_product_${product.id}`, JSON.stringify(product))
  //         .then(() => {
  //           this.increaseProduct();
  //         });
  //     }
  //   });
  // }