import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/Data/data.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchword:string=''
  searchResults:any[]=[]
  constructor (private product:ProductsService,private dataService:DataService,private route:Router) { }

  ngOnInit() {
  }


  search(ev:any){
    console.log(this.searchword)
    //  this.product.search(this.searchword).then((res:any)=>{
    //    console.log(JSON.stringify(res))
    //    this.searchResults=res
    //  })
    this.product.search(ev.target.value).then((res:any)=>{
      console.log(JSON.stringify(res))
      this.searchResults=res
    })
  }

  ProductDetails(productId,productName)
  {
    console.log(productId)
    this.dataService.setData(productId, productName);
    this.route.navigateByUrl('/product/'+productId);  
  }

  addToCart(product){
    // this.cartService.addToCart(product);
   }
}
