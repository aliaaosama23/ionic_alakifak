import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HelperService } from 'src/app/services/helper/helper.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-paymentaddress',
  templateUrl: './paymentaddress.page.html',
  styleUrls: ['./paymentaddress.page.scss'],
})
export class PaymentaddressPage implements OnInit {
  notificationsNumber:number;
  public myForm: FormGroup;
  public myForm1: FormGroup;
  shippingnotasbilling:boolean=false
  billing_shipping:any={}
  addressesExist:boolean
  fName:any
  lName:any
  email:any
  phone:any
  address1:any
  city:any
  country:any
  region:any
  postalcode:any
  constructor(private location:Location,private helper:HelperService,private route:Router,
              public formBuilder: FormBuilder,private storage:Storage,private user:UserService) { 
                this.CheckAddresses();
                console.log(this.addressesExist)
                  this.myForm = formBuilder.group({
                    fristname: ['',[Validators.required]],
                    lastname: ['',  [Validators.required]],
                    email:['',  [Validators.required,Validators.email]],
                    phone:['',  [Validators.required]],
                    address1: ['',  [Validators.required]],
                    city: ['',  [Validators.required]],
                    country: ['',  [Validators.required]],
                    region: ['',  [Validators.required]],
                    postcode: ['',  [Validators.required]],
                  }); 
                  this.myForm1 = formBuilder.group({
                    fristname: ['',[Validators.required]],
                    lastname: ['',  [Validators.required]],
                    address1: ['',  [Validators.required]],
                    city: ['',  [Validators.required]],
                    country: ['',  [Validators.required]],
                    region: ['',  [Validators.required]],
                    postcode: ['',  [Validators.required]],
                  }); 
  }

  ngOnInit() {
    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })
  }

  CheckAddresses(){
    this.storage.get('alakifak_UserId').then((val:any)=>{
      if(val){  
          this.helper.showSpinner()
          this.user.profile(val).then(
            (res:any)=>{
              if(res.billing.city==""){
                this.addressesExist=false
                this.fName=res?.username.split(' ')[0]
                this.lName=res?.username.split(' ')[1]
                this.email=res?.email
                this.phone=res?.billing.phone
                this.address1=res?.billing.address_1
              }else{
                this.addressesExist=true
                //  this.fName=res?.first_name
                 // this.lName=res?.last_name
                  this.fName=res?.username.split(' ')[0]
                  this.lName=res?.username.split(' ')[1]
                  this.email=res?.email
                  this.phone=res?.billing.phone
                  this.address1=res?.billing.address_1
                  this.city=res?.billing.city
                  this.country=res?.billing.country
                  this.region=res?.billing.state
                  this.postalcode=res?.billing.postcode
                  this.addressesExist=true
              }
              this.helper.hideSpinner()
              console.log(this.addressesExist)
            },
            (err:any)=>{
              this.helper.hideSpinner()
            })
          }      
     })
  }

  Back(){
    this.location.back()
  }

  Contiue(){
    console.log( JSON.stringify(this.myForm.value) )

    // if(this.addressesExist){
    //   this.user.
    // }
    
    if(!this.shippingnotasbilling){
        this.billing_shipping={
          billing: {
            first_name:this.myForm.value.fristname,
            last_name: this.myForm.value.lastname,
            address_1: this.myForm.value.address,
            address_2: "",
            city: this.myForm.value.city,
            state:this.myForm.value.region,
            postcode: this.myForm.value.postcode,
            country: this.myForm.value.country,
            email: this.myForm.value.email,
            phone: this.myForm.value.phone
          },
          shipping: {
            first_name:this.myForm.value.fristname,
            last_name: this.myForm.value.lastname,
            address_1: this.myForm.value.address,
            address_2: "",
            city: this.myForm.value.city,
            state: this.myForm.value.region,
            postcode:this.myForm.value.postcode,
            country: this.myForm.value.country
          }
        }
    }else{
      this.billing_shipping={
        billing: {
          first_name:this.myForm.value.fristname,
          last_name: this.myForm.value.lastname,
          address_1: this.myForm.value.address,
          address_2: "",
          city: this.myForm.value.city,
          state:this.myForm.value.region,
          postcode: this.myForm.value.postcode,
          country: this.myForm.value.country,
          email: this.myForm.value.email,
          phone: this.myForm.value.phone
        },
        shipping: {
          first_name:this.myForm1.value.fristname,
          last_name: this.myForm1.value.lastname,
          address_1: this.myForm1.value.address,
          address_2: "",
          city: this.myForm1.value.city,
          state: this.myForm1.value.region,
          postcode:this.myForm1.value.postcode,
          country: this.myForm1.value.country
        }
      }
    
    }

    //this.route.navigateByUrl('/orderpreview')
    this.route.navigateByUrl('/paymentoptions')
    this.storage.set('alakifak_billing_shipping',this.billing_shipping)

  }

  checked(){
    console.log(this.shippingnotasbilling)
  }

}
