import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient
    ) { }



  createCafe(data: any, id: any){
    let url = `http://localhost:2022/api/addCafe/${id}`
    return this.http.post<any>(url, data)
  }
  getUnapprovedCafeDetails(){
    let url = 'http://localhost:2022/api/getUnapprovedCafeDetails'
    return this.http.get(url)
  }
  getApprovedCafeDetails(){
    let url = 'http://localhost:2022/api/getApprovedCafeDetails'
    return this.http.get(url)
  }
  getApprovedCafeDetailsById(id:number){
    let url = `http://localhost:2022/api/getApprovedCafeDetailsById/${id}`
    return this.http.get(url)
  }

  cafeApprovalByAdmin(id: number, obj: any){
    let url = `http://localhost:2022/api/cafeApproval/${id}`
    return this.http.put(url,obj)
  }

  cafeRejectByAdmin(id: number){
    let url = `http://localhost:2022/api/deleteCafe/${id}`
    return this.http.delete(url);

  }
}
