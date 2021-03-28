import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-checkout-complete',
  templateUrl: './checkout-complete.page.html',
  styleUrls: ['./checkout-complete.page.scss'],
})
export class CheckoutCompletePage implements OnInit {

  constructor(private modalController:ModalController,private route:Router) { }

  ngOnInit() {
    console.log("lll")
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    // this.modalController.dismiss({
    //   'dismissed': true
    // });
   this.route.navigateByUrl('/tabs/home');

  }

}
