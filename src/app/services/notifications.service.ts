import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastrService: ToastrService) { }

  showSuccess(message: string){
    this.toastrService.success(message)
  }
}
