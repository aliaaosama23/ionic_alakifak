import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email=''
  password=''
  public myForm: FormGroup;
  dir:boolean
  loginWithFingerprint:boolean
  emailValue:any
  passwordValue:any
  lang=''
  PhoneNumber:number;
  Password:string;
  RememberChecked:boolean=false;
  private logined=new BehaviorSubject(false);
  notificationsNumber:number
  constructor(public formBuilder: FormBuilder,private route:Router,private UserService:UserService,
              public storage: Storage,private location:Location,private helper:HelperService){
                this.myForm = formBuilder.group({
                 // F_Name:['',Validators.required],
                 // L_Name:['',Validators.required],
                  Email: ['',Validators.required],
                  username: ['',Validators.required],
                  // Phone: ['',Validators.required],
                  // Address1: ['',Validators.required],
                  // Password: ['',  Validators.required],
                  // ConfirmPassword:['',  Validators.required],
                }); 
                this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
                  this.notificationsNumber=notificationsNumber
                })
   }

  ngOnInit() {
  }

  SignUp(){
    console.log( JSON.stringify( this.myForm.value))
    this.UserService.createUser(
      this.myForm.value.username,
      this.myForm.value.Email,
      //this.myForm.value.Phone,
     // this.myForm.value.Address1,
     // this.myForm.value.Password
      ).then(
      (res:any)=>{
        
        this.storage.set('alakifak_User_password',this.myForm.value.Password)
        console.log(JSON.stringify(res))
        this.route.navigateByUrl('/login');
      },(err:any)=>{
        console.log(JSON.stringify(err))
      })
  }

  goPage(page){
   this.route.navigateByUrl('/'+page);
  }

  Back(){
    this.location.back()
  }

}
