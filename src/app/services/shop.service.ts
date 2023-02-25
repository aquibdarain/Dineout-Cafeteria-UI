import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs'; 
import { AuthService } from './auth service/auth.service';



@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
  SharingData = new Subject();  

  constructor(private http:HttpClient) { 

  }

  makeReservation(obj: any){
    let url = 'http://localhost:2022/api/reservation'
    return this.http.post(url,obj);
  }
  getBookingDetails(){
    let url = 'http://localhost:2022/api/getBookingDetails'
    return this.http.get(url);
  }

  addToCart(obj: any){
    let url = 'http://localhost:2022/api/addToCart'
    return this.http.post(url,obj)
  }

  getProduct(){
    let url = 'http://localhost:2022/api/getCartDetails'
    return this.http.get(url)
  }

  deleteProduct(id: number){
    let url = `http://localhost:2022/api/deleteItem/${id}`
    return this.http.delete(url)
  }

  findProduct(obj: any){
    let url = `http://localhost:2022/api/findProduct`
    return this.http.post(url, obj)
  }

  updateProduct(obj: any, productId: number){
    let url = `http://localhost:2022/api/updateProduct/${productId}`
    return this.http.put(url, obj)
  } 

  addOrder(data: any){
    let url = `http://localhost:2022/api/order`
    return this.http.post(url, data)

  }
  destroyCart(){
    let url = `http://localhost:2022/api/destroyCart`
    return this.http.delete(url)
  }
  getOrder(){
    let url = `http://localhost:2022/api/getOrderDetails`
    return this.http.get(url)
  }

  getCartDetailsByUserId(id: number){
    let url = `http://localhost:2022/api/getCartDetailsByUserId/${id}`
    return this.http.get(url)
  }

  getOrderDetailsByUserId(id: number){
    let url = `http://localhost:2022/api/getOrderDetailsByUserId/${id}`
    return this.http.get(url)
  }
  
}
