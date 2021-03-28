import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { HelperService } from 'src/app/services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public myForm: FormGroup;
  public LoginForm: FormGroup;
  Name:string='';
  Email:string='';

  billing_fName:string='';
  billing_lName:string='';
  billing_Address:string='';
  billing_city:string='';
  billing_country:string='';
  billing_region:string='';
  billing_postalcode:string='';
  billing_Email:string='';
  billing_phone:number;

  shipping_fName:string='';
  shipping_lName:string='';
  shipping_Address:string='';
  shipping_city:string='';
  shipping_country:string='';
  shipping_region:string='';
  shipping_postalcode:string='';
  
  Password:string='';
  cartNumber:number;
  notificationsNumber:number;
  RememberChecked:boolean=false;
  private logined=new BehaviorSubject(false);
  IsLogined:boolean
  UserId:any
  constructor(public formBuilder: FormBuilder,private route:Router,private user:UserService,
              public storage: Storage,private location:Location,private helper:HelperService,
              private cartservice:CartService,private UserService:UserService){
              
                this.user.getloginobservalble().subscribe((logined:any)=>{
                  this.IsLogined=logined
                  console.log(" logined  "+logined)
                })

                this.storage.get('alakifak_UserId').then((val:any)=>{
                  if(val!=null){
                    this.IsLogined=true
                  }else{
                    this.IsLogined=false
                  }
                  console.log("alakifak_UserId  :"+val)
                })
                    this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
                      this.cartNumber=cartItemsNumber
                    })
                
                    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
                      this.notificationsNumber=notificationsNumber
                    })
                    
                    this.myForm = formBuilder.group({
                      Name:['',Validators.required],
                      Email: ['',Validators.required],
                      Password: ['',  Validators.required],
                     
                      billing_fristname:['',  Validators.required],
                      billing_lastname:['',  Validators.required],
                      billing_Address: ['',Validators.required],
                      billing_city:['',  Validators.required],
                      billing_country:['',  Validators.required],
                      billing_region:['',  Validators.required],
                      billing_postcode:['',  Validators.required],
                      billing_phone:['',  Validators.required],
                      billing_Email:['',  Validators.required],

                      shipping_fristname:['',  Validators.required],
                      shipping_lastname:['',  Validators.required],
                      shipping_Address: ['',Validators.required],
                      shipping_city:['',  Validators.required],
                      shipping_country:['',  Validators.required],
                      shipping_region:['',  Validators.required],
                      shipping_postcode:['',  Validators.required],
                    }); 
                    this.LoginForm = formBuilder.group({
                      Name: ['',[Validators.required]],
                      Password: ['',  [Validators.required,Validators.minLength(6)]],
                    }); 
    
               
                this.UserService.getUserId().subscribe(userId=>{
                  console.log(userId)
                  this.user.profile(userId).then(
                    (res:any)=>{
                      //console.log(JSON.stringify(res))
                      this.Name=res?.username
                      this.Email=res?.email
                      
                      this.billing_fName=res?.billing.first_name
                      this.billing_lName=res?.billing.last_name
                      this.billing_Address=res?.billing.address_1
                      this.billing_city=res?.billing.city
                      this.billing_country=res?.billing.country
                      this.billing_region=res?.billing.state
                      this.billing_postalcode=res?.billing.postcode
                      this.billing_Email=res?.billing.email
                      this.billing_phone=res?.billing.phone

                      this.shipping_fName=res?.shipping.first_name
                      this.shipping_lName=res?.shipping.last_name
                      this.shipping_Address=res?.shipping.address_1
                      this.shipping_city=res?.shipping.city
                      this.shipping_country=res?.shipping.country
                      this.shipping_region=res?.shipping.state
                      this.shipping_postalcode=res?.shipping.postcode

                      this.storage.get('alakifak_User_password').then((val1:any)=>{
                        if(val1){
                           this.Password=val1
                        }
                      })
                      this.helper.hideSpinner()
                    },
                    (err:any)=>{
                      this.helper.hideSpinner()
                    })
                })
                this.ProfileData()
}

  ngOnInit() {
  }

  ProfileData(){
    this.storage.get('alakifak_UserId').then((val:any)=>{
      if(val){
        this.UserId=val
        this.storage.get('alakifak_User_password').then((val1:any)=>{
          if(val1){
              this.helper.showSpinner()
              this.user.profile(this.UserId).then(
                (res:any)=>{
                  console.log(JSON.stringify(res))
                      this.Name=res?.username
                      this.Email=res?.email
                      
                      this.billing_fName=res?.billing.first_name
                      this.billing_lName=res?.billing.last_name
                      this.billing_Address=res?.billing.address_1
                      this.billing_city=res?.billing.city
                      this.billing_country=res?.billing.country
                      this.billing_region=res?.billing.state
                      this.billing_postalcode=res?.billing.postcode
                      this.billing_Email=res?.billing.email
                      this.billing_phone=res?.billing.phone

                      this.shipping_fName=res?.shipping.first_name
                      this.shipping_lName=res?.shipping.last_name
                      this.shipping_Address=res?.shipping.address_1
                      this.shipping_city=res?.shipping.city
                      this.shipping_country=res?.shipping.country
                      this.shipping_region=res?.shipping.state
                      this.shipping_postalcode=res?.shipping.postcode
                  this.helper.hideSpinner()
                },
                (err:any)=>{
                  this.helper.hideSpinner()
                })
              }
          })
        }
     })
  }

  Back(){
    this.location.back()
  }

  UpdateAccount(){
    const UserData={
      //id:this.UserId,
      email:this.myForm.value.Email ,
      first_name: this.myForm.value.fristname,
      last_name:this.myForm.value.lastname,
      username: this.myForm.value.Name ,
      billing: {
        first_name: this.myForm.value.billing_fristname,
        last_name: this.myForm.value.billing_lastname,
        company: "",
        address_1: this.myForm.value.billing_Address,
        address_2: "",
        city: this.myForm.value.billing_city,
        state: this.myForm.value.billing_region,
        postcode: this.myForm.value.billing_postcode,
        country: this.myForm.value.billing_country,
        email:this.myForm.value.billing_Email,
        phone: this.myForm.value.billing_phone
      },
      shipping: {
        first_name: this.myForm.value.shipping_fristname,
        last_name: this.myForm.value.shipping_lastname,
        company: "",
        address_1: this.myForm.value.shipping_Address,
        address_2: "",
        city: this.myForm.value.shipping_city,
        state:this.myForm.value.shipping_region,
        postcode: this.myForm.value.shipping_postcode,
        country: this.myForm.value.shipping_country,
      }
}
    // call api to update account data
    this.helper.showSpinner()
    this.storage.get('alakifak_UserId').then((val:any)=>{
      if(val){
        this.user.updateUser(val,UserData)
        .then(
          (res:any)=>{
            console.log(JSON.stringify(res))
            this.helper.presentToastWithOptions('تم تعديل بياناتك');

          },(err:any)=>{

          }
        )}
      }) 
  }
  
   EditPassword(){
  //   this.route.navigateByUrl('/password-change');
   }


  RememberMe(){
    if(this.RememberChecked){
      this.storage.set('alakifak_nmae',this.myForm.value.Name);
      //this.storage.set('alakifak_password',this.myForm.value.Password);
    }
  }

  Login(){

    this.UserService.loginUser(this.LoginForm.value.Name,this.LoginForm.value.Password).then(
      (loginRes:any)=>{
        console.log( JSON.stringify( loginRes))
       this.UserService.GetUserIDByUserEmail(loginRes.user_email).then((res:any)=>{
        this.storage.set('alakifak_UserId',res[0]?.id)
        this.UserService.setUserId(res[0]?.id)
       })
        this.storage.set('alakifak_User_password',this.LoginForm.value.Password);
        this.storage.set('alakifak_user_token',loginRes.token);
        this.storage.set('alakifak_loginedIn',true);
        this.UserService.login();
        this.logined.next(true);
        this.ProfileData()
      },(err:any)=>{

      })

    console.log( JSON.stringify( this.myForm.value))
   
  }

  goPage(page){
   this.route.navigateByUrl('/'+page);
  }

}

