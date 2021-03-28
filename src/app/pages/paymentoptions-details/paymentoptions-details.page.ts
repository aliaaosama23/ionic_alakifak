import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { CheckoutCompletePage } from '../checkout-complete/checkout-complete.page';

@Component({
  selector: 'app-paymentoptions-details',
  templateUrl: './paymentoptions-details.page.html',
  styleUrls: ['./paymentoptions-details.page.scss'],
})
export class PaymentoptionsDetailsPage implements OnInit {
  payment_option:string=''

  public myForm: FormGroup;
  constructor(public formBuilder: FormBuilder,private route:Router,public storage: Storage,
    private location:Location,private activatedRoute:ActivatedRoute,private modalController:ModalController){
      this.myForm = formBuilder.group({
        VisaNumber: ['',  Validators.required],
        Year: ['',  Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(4)])],
        Month: ['', Validators.compose([Validators.required,Validators.maxLength(2),Validators.minLength(2)])],
        CVV:['',  Validators.compose([Validators.required,Validators.maxLength(3),Validators.minLength(3)])]
      }); 
}
  ngOnInit() {
    this.payment_option = this.activatedRoute.snapshot.paramMap.get('option');

  }

  Back(){
    this.location.back();
  }

  NotificationsPage(){
    this.route.navigateByUrl('/notifications');
  }

  async  Pay(){
      const modal = await this.modalController.create({
        component:CheckoutCompletePage,
        cssClass: 'my-result-class'
      });
      return await modal.present();
    }

}
