import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private logined=new BehaviorSubject(false);
  private UserId=new BehaviorSubject('');
  private urltype: string = "https://alakaifak.com/alakaifak/new_api/";
 
  constructor( private http: HttpClient,public helper:HelperService,private storage:Storage) { }


//---------------------------------- is logined -----------------------------------------------------------//

  getLogin():boolean{
    return this.logined.getValue()
  }

  getloginobservalble():Observable<boolean>{
    return this.logined.asObservable();
  }

  login(){
    this.logined.next(true)
  }

  logout(){
    this.logined.next(false)
  }

//---------------------------------- user id   ------------------------------------------------------------//

  setUserId(va){
    this.UserId.next(va)
  }

  getUserId():Observable<string>{
    return this.UserId.asObservable();
  }
//------------------------------------- user apis -----------------------------------------------------------//

  createUser( username,email) {
   const header = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
   });
   const data={ 
    email: email,
    username: username
   }
   return new Promise(resolve => {
      this.http
        .post(
          `${this.helper.BaseUrl}customers?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`,data)
        .subscribe(customerData => {
          resolve(customerData);
          console.log(JSON.stringify(customerData))
        },(err:any)=>{
          console.log(JSON.stringify(err))
          if(err.error.code=="registration-error-username-exists"){
            this.helper.presentToastWithOptions(err.error.message)
          }   
        });
    });
  }

  loginUser(username,password) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const userData = `username=${username}&password=${password}`; 
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.helper.authUrl1}`, userData, { headers })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            resolve(err);
            if(err.error.data.status=="403"){
              this.helper.presentToastWithOptions(err.error.message)
            } 
          }
        );
    });
  }

  GetUserIDByUserEmail(email){  
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.BaseUrl}customers?email=${email}&consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
        .subscribe(res => {
          resolve(res);
        });
    });
  }

  profile(id){
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.BaseUrl}customers/${id}?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }


  updateUser(userID, userdata) {
    return new Promise(resolve => {
      this.http
        .put(
          `${this.helper.BaseUrl}customers/${userID}?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`,userdata)
        .subscribe(response => {
          resolve(response);
        });
    });
  }

  getPastOrders(customerId) {
    return new Promise(resolve => {
      this.http
        .get(`${this.helper.BaseUrl}orders?customer=${customerId}&consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
        .subscribe(res => {
          resolve(res);
        });
    });
  }

  CreateOrder(orderdata:any,customer_id){

    console.log(JSON.stringify(orderdata))
    let _line_items=[];
    
   let line_items=[
      {
        id:0,
        quantity:0,
        image:'',
        name:'',
        price:''
      }
    ]
   line_items= orderdata.line_items

    console.log(JSON.stringify(line_items))

      for(let i=0;i<line_items.length;i++){
       
          _line_items.push({product_id: line_items[i].id,quantity:line_items[i].quantity})
          
        
      }
      console.log('items after  '+ JSON.stringify(  _line_items))
    
      const data = {
        payment_method: orderdata.payment_method_title,//"hyperpay",
        payment_method_title:orderdata.payment_method, //"الدفع بالفيزا / ماستر كارد / مدي",
        set_paid: false,
        billing: orderdata.billing,
        shipping: {
          "method_title": "تكلفة الشحن",
          "method_id": "flat_rate",
        },
        line_items: _line_items,
        shipping_lines: orderdata.shipping_lines       
      };
    console.log(JSON.stringify(data))
 
  return new Promise((resolve, reject) => {
    this.http
      .post(`${this.helper.BaseUrl}orders?customer_id=${customer_id	}&consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`,data)
      .subscribe(
        (res:any[]) => {
          resolve(res);
          if(res.length!=0){
            this.storage.remove("alakifak_billing_shipping")
            this.storage.remove("alakifak_cart_items")
            this.storage.remove("alakifak_cart_toatl")
            //this.storage.remove("paymentmethodID")
            //this.storage.remove("paymentmethodTitle")
            this.storage.remove("shipping_lines")
          }
        },
        err => {
          resolve(err);
          if(err.error.data.status=="403"){
            this.helper.presentToastWithOptions(err.error.message)
          } 
        }
      );
  });
}


shipping_zones(){
  return this.http.get(`${this.helper.BaseUrl}shipping/zones?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
}

shipping_zones_locations(zone){
  return this.http.get(`${this.helper.BaseUrl}shipping/zones/${zone}/locations?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
}

shipping_zones_methods(zone){
  return this.http.get(`${this.helper.BaseUrl}shipping/zones/${zone}/methods?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
}

urlpost(amount,orderid,email,fname,lname) {  
 // http://alakaifak.com/alakaifak/new_api/urlpost.php?amount=35.00&orderid=12660&email=engaliaaosama@gmail.com
  return this.http.get(this.urltype +"urlpost.php?amount="+amount+"&orderid="+orderid+"&email="+email)
  // .do( (res:Response) => console.log("res"))
  // .map((res:Response) => res.json())
}

OrderByID(id){
  return new Promise(resolve => {
    this.http
      .get(`${this.helper.BaseUrl}orders/${id}?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
      .subscribe(res => {
        resolve(res);
      });
  });
}

DeleteOrder(id){
  return new Promise(resolve => {
    this.http
      .delete(`${this.helper.BaseUrl}orders/${id}?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
      .subscribe(res => {
        resolve(res);
      });
  });
}

}













// updateUserData(userID, fName,Lname,email,address1,city,postcode,country,phone) {
//   const data={ 
   
//     first_name: fName,
//     last_name: Lname,
//     username: fName+''+Lname,
//     billing: {
//       first_name: fName,
//       last_name: Lname,
//       company: "",
//       address_1: address1,
//       address_2: "",
//       city: city,
//       state: "",
//       postcode: postcode,
//       country: country,
//       email:email,
//       phone: phone
//     },
//     shipping: {
//       first_name: fName,
//       last_name: Lname,
//       company: "",
//       address_1: address1,
//       address_2: "",
//       city: city,
//       state: "",
//       postcode: postcode,
//       country: country
//     }
//    }

//   return new Promise(resolve => {
//     this.http
//       .put(
//         `${this.helper.BaseUrl}customers/${userID}?consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`,data)
//       .subscribe(response => {
//         resolve(response);
//       });
//   });
// }




  // UpdateUserProfile(id,username,first_name,last_name,nickname,password){
  //   let obj={
  //     'Id':id,
  //     'username':username,
  //     'first_name':first_name,
  //     'last_name':last_name,
  //     'nickname':nickname,
  //     'password':password
  //   }

  //   return this.http.post(this.helper.UserUrl+'users/'+id+'?consumer_key='+this.helper.ConsumerKey+'&consumer_secret='+this.helper.ConsumerSecret,obj);

  // }