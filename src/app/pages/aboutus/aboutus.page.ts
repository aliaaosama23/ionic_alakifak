import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {
  InfoId:any;
  notificationsNumber:number
  constructor(private activatedRoute:ActivatedRoute,private route:Router,
              private location:Location,private helper:HelperService) { }

  ngOnInit() {
    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })
    this.InfoId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  Back(){
    this.location.back();
  }
}
