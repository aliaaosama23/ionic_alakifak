import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email=''
  password=''
  public myForm: FormGroup;
  emailValue:any
  passwordValue:any
  lang=''
  PhoneNumber:number;
  Password:string;
  RememberChecked:boolean=false;
  notificationsNumber:number
  private logined=new BehaviorSubject(false);

  constructor(public formBuilder: FormBuilder,private route:Router,public storage: Storage,
              private location:Location,private UserService:UserService,private helper:HelperService){
                this.myForm = formBuilder.group({
                  Name: ['',[Validators.required]],
                  Password: ['',  [Validators.required,Validators.minLength(6)]],
                }); 

                this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
                  this.notificationsNumber=notificationsNumber
                })
   }

  ngOnInit() {
  }

  RememberMe(){
    if(this.RememberChecked){
      this.storage.set('alakifak_nmae',this.myForm.value.Name);
      //this.storage.set('alakifak_password',this.myForm.value.Password);
    }
  }

  Login(){

    this.UserService.loginUser(this.myForm.value.Name,this.myForm.value.Password).then(
      (loginRes:any)=>{
        console.log( JSON.stringify( loginRes))
       this.UserService.GetUserIDByUserEmail(loginRes.user_email).then((res:any)=>{
        this.storage.set('alakifak_UserId',res[0]?.id)
        this.UserService.setUserId(res[0]?.id)
       
       })
        this.storage.set('alakifak_User_password',this.myForm.value.Password);
        this.storage.set('alakifak_user_token',loginRes.token);
        this.storage.set('alakifak_loginedIn',true);
        this.UserService.login();
        this.logined.next(true);

        this.route.navigateByUrl('/tabs');
      },(err:any)=>{

      })

    console.log( JSON.stringify( this.myForm.value))
   
  }

  goPage(page){
   this.route.navigateByUrl('/'+page);
  }

  Back(){
    this.location.back()
  }
  
}
