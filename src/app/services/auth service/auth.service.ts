import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Subject } from 'rxjs'; 
import { timeStamp } from 'console';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken = new Subject();
  role = new Subject();

  constructor(private http: HttpClient) { 
    
  }


  userRegister(obj: any){
    let url = `http://localhost:2022/api/register`
    return this.http.post(url, obj);
  }

  userLogin(obj: any) {
    let url = `http://localhost:2022/api/login?email=${obj.email}&password=${obj.password}`
    return this.http.get(url);
  }

  loggedIn(){
    return !!localStorage.getItem('userToken')
  }
  
  logOut(){
    localStorage.removeItem('userToken')
  }

  getToken(){
    return localStorage.getItem('userToken')
  }

  getUserDetailsByToken(){
    let url = `http://localhost:2022/api/sendUserDetails`
    return this.http.get(url)
  }

}
