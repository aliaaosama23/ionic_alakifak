import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {
  public myForm: FormGroup;
  notificationsNumber:number
  constructor(public formBuilder: FormBuilder,private route:Router,public storage: Storage,
    private location:Location,private helper:HelperService){
      this.myForm = formBuilder.group({
        Name: ['',Validators.required],
        PhoneNumber: ['',Validators.required],
        Message: ['',  Validators.required],
      }); 
}

  ngOnInit() {
    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })
  }

  Back(){
    this.location.back();
   }
 
  
   
   ContactUS(){
     // call api to send my message
   }
}
