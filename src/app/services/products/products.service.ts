import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(  private http: HttpClient,public helper:HelperService) { }
 
  GetALLProducts(pageNumber:number) {
    return new Promise(resolve => {
      this.http
        .get(`${this.helper.BaseUrl}products?page=${pageNumber}&per_page=9&consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }

  GetALLProductsReport() {
    return new Promise(resolve => {
      this.http
        .get(`${this.helper.BaseUrl}reports/products/totals?&consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }

  GetProductByID(id:number){
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.BaseUrl}products/${id}?consumer_key=${this.helper.ConsumerKey}
          &consumer_secret=${this.helper.ConsumerSecret}`
        )
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }

  search(keyword:string){    
    return new Promise(resolve => {
      this.http
        .get(`${this.helper.BaseUrl}products?search=${keyword}&consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }

  GetALLCategories(){
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.BaseUrl}products/categories?consumer_key=${this.helper.ConsumerKey}
          &consumer_secret=${this.helper.ConsumerSecret}&hide_empty=true`
        )
        .subscribe(productData => {
          resolve(productData);
        });
    });
 
  }

  GetSliders(){
    return new Promise(resolve => {
      this.http
        .get(
          `https://alakaifak.com/slider/api/sliders?consumer_key=${this.helper.ConsumerKey}
          &consumer_secret=${this.helper.ConsumerSecret}`
        )
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }

  getAllCategories(){
    return new Promise(resolve => {
      this.http
        .get(`${this.helper.BaseUrl}products/categories&per_page=100&hide_empty=true&parent=0&consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }

  NewestProduct(){
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.Url}/wp-json/wc/v3/products?orderby=date&consumer_key=${this.helper.ConsumerKey}
          &consumer_secret=${this.helper.ConsumerSecret}`
        )
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }

  Pages(){
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.Url}/wp-json/wc/v2/pages?consumer_key=${this.helper.ConsumerKey}
          &consumer_secret=${this.helper.ConsumerSecret}`
        )
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }

  GetALLProductsByCategoryID(id,page:number,limit:number) {
    return new Promise(resolve => {
      this.http
        .get(`${this.helper.BaseUrl}products?category=${id}&per_page=${limit}&page=${page}&consumer_key=${this.helper.ConsumerKey}&consumer_secret=${this.helper.ConsumerSecret}`)
        .subscribe(res => {
          resolve(res);
        });
    });
  }

 GetProductReviews(id){
    console.log(id)
    return new Promise(resolve => {
      this.http
        .get(
          `${this.helper.Url}/wp-json/wc/v3/products/reviews?consumer_key=${this.helper.ConsumerKey}
          &consumer_secret=${this.helper.ConsumerSecret}&product_id=${id}`
        )
        .subscribe(productData => {
          resolve(productData);
        });
    });
  }

  ReviewProduct(product_id,review,reviewer,reviewer_email,rating){
    let obj={
      'product_id':product_id,
      'review':review,
      'reviewer':reviewer,
      'reviewer_email':reviewer_email,
      'rating':rating,
    }
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    return this.http.post(this.helper.BaseUrl+'products/reviews?consumer_key='+this.helper.ConsumerKey+'&consumer_secret='+this.helper.ConsumerSecret,obj,{headers:headers});
 
  }

}



 // return this.http.get(this.helper.Url +"/wp-json/wc/v3/products?consumer_key="
    // +this.helper.ConsumerKey+"&consumer_secret="+this.helper.ConsumerSecret)

    //  const headers = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });