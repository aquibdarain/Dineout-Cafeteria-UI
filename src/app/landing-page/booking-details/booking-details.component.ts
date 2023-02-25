import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  arr: any = []
  constructor(private shopService: ShopService) { 

  }

  ngOnInit(): void {
    this.shopService.getBookingDetails().subscribe((success)=>{
      this.arr = success
      console.log(this.arr);
      
    })
  }

}
