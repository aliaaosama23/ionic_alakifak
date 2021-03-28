import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Storage } from '@ionic/storage';
import { HelperService } from 'src/app/services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';
import { AppRate } from '@ionic-native/app-rate/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  isLogined:boolean
  constructor(private route:Router, private modalController:ModalController,private helper:HelperService,
              private socialSharing: SocialSharing,private storage:Storage,private user:UserService,
              private appRate: AppRate) { }

  ngOnInit() {

  

    this.storage.get('alakifak_loginedIn').then((val:any)=>{
      if(val){
        console.log("true")
        this.isLogined=true
      }else{
        this.isLogined=false
      }
    })

    this.storage.get('alakifak_UserId').then((val:any)=>{
      if(val){
        console.log("true")
        this.isLogined=true
      }else{
        this.isLogined=false
      }
      console.log("alakifak_UserId  :"+val)
    })

    this.user.getloginobservalble().subscribe(logined=>{
      this.isLogined=logined
    })
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  goPage(page){
    this.modalController.dismiss({
      'dismissed': true
    });
    this.route.navigateByUrl(page);
  }

  AboutPage(page,id){
    this.modalController.dismiss({
      'dismissed': true
    });
    this.route.navigateByUrl(page+'/'+id);
  }


  ReviewApp(){
    this.appRate.promptForRating(true);
    this.appRate.preferences={
      displayAppName:'Alakifak app',
      storeAppURL:{
        ios: '687686868',
        android: 'market://details?id=<com.nokhba.alakifak>'
      },
      customLocale:{
        title:' Do you enjoy %@?',
        message:'If you enjoy %@?, would you mind talking a moment to rate it ',
        cancelButtonLabel:'No,thanks',
        laterButtonLabel:'remind me later',
        rateButtonLabel:'Rate it now'
      },
      callbacks:{
        onRateDialogShow:function(callback){
          console.log('rate shown')
        },
        onButtonClicked:function(buttonIndex){
          console.log('selected index ',buttonIndex)
        }
      }
    }
  }

  ShareApp(){
    this.socialSharing.share('alakifak app','','',"https://play.google.com/store/apps/details?id=com.nokhba.alakifak");
  }

  Profile(){
    this.storage.get('alakifak_UserId').then((val:any)=>{
      if(val!=null){
        // log out 
      }else{
        this.route.navigateByUrl('/login')
      }
    })
  }

  Logout(){
    this.storage.remove('alakifak_UserId')   
    this.storage.remove("alakifak_User_password")
    this.storage.remove("alakifak_user_token")
    this.storage.set("alakifak_loginedIn"	,false)
    this.route.navigateByUrl('/')
    this.user.logout()   
  }

}
