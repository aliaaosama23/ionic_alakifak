import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/Data/data.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.page.html',
  styleUrls: ['./all-categories.page.scss'],
})
export class AllCategoriesPage implements OnInit {
  Categories:any=[]
  notificationsNumber:number
  constructor(private location:Location,private route:Router,private productService:ProductsService,
    private helper:HelperService,private dataService:DataService) { }

  ngOnInit() {
    this.helper.getNotificationsObservable().subscribe(notificationsNumber=>{
      this.notificationsNumber=notificationsNumber
    })
    this.helper.showSpinner();
    this.productService.GetALLCategories().then(
      (res:any)=>{
          this.Categories=res
          this.helper.hideSpinner();
        }
      ,(err:any)=>{
        console.log(JSON.stringify(err))
        this.helper.hideSpinner();
      }
    )
  }

  Back(){
   this.location.back();
  }

  CategoryProducts(id,name){
    this.dataService.setData(id,name);
    this.route.navigateByUrl('/category-products/'+id);
  }
}