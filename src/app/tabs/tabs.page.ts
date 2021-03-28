import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { MenuPage } from '../pages/menu/menu.page';
import { HelperService } from '../services/helper/helper.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private logined=new BehaviorSubject(false);

  constructor(public modalController: ModalController,private user:UserService,
    private storage:Storage,private route:Router) {}

  async presentPopover() {
    const modal = await this.modalController.create({
      component:MenuPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  checkLogin(){
    this.user.getloginobservalble().subscribe((logined:any)=>{
      this.logined=logined
      if(this.logined){
        console.log(this.logined)
        this.route.navigateByUrl('/tabs/profile')
      }else{
        console.log(this.logined)
        this.route.navigateByUrl('/login')
      }
    })

    this.storage.get('alakifak_UserId').then((val:any)=>{
      if(val!=null){
        console.log(val)
        this.route.navigateByUrl('/tabs/profile')
      }else{
        console.log('not logined')
        this.route.navigateByUrl('/login')
      }
    })


  }
}
