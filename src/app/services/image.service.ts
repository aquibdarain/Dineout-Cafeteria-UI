import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient
    ) { }



  createCafe(data: any){
    let url = 'http://localhost:2022/api/addCafe'
    return this.http.post<any>(url, data)
  }
  getCafeDetails(){
    let url = 'http://localhost:2022/api/getCafeDetails'
    return this.http.get(url)
  }
}
