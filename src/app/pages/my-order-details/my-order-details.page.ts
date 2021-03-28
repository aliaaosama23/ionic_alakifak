import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss'],
})
export class MyOrderDetailsPage implements OnInit {
  OrdertId:any
  OrderDetails:any={}
  OrderProducts:any[]=[]
  constructor(private activatedRoute:ActivatedRoute,private location:Location, private user:UserService,private helper:HelperService) { }

  ngOnInit() {
    this.OrdertId = this.activatedRoute.snapshot.paramMap.get('id');
   
    this.helper.showSpinner()
    this.user.OrderByID(this.OrdertId).then((res:any)=>{
         this.OrderDetails=res
         this.OrderProducts=this.OrderDetails?.line_items
         console.log(JSON.stringify(res))
         this.helper.hideSpinner()
    },(err:any)=>{
      this.helper.hideSpinner()
    })
  }

  Back(){
this.location.back()
  }

}
