import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { constant } from 'src/assets/constant';
import { ActivatedRoute } from '@angular/router';
import { Obj } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {

  time = constant.time
  No_of_person = constant.No_of_person

  reservationForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl(null,[Validators.required]),
    noOfPerson: new FormControl(null,[Validators.required]),
    date: new FormControl('',[Validators.required]),
    time: new FormControl(null,[Validators.required]),
    bookingLocation: new FormControl('')

  })

  data: Obj = {}

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private toastrService: ToastrService, private shopService: ShopService) { 
    this.activatedRoute.queryParams.subscribe((success:any)=>{
      console.log(success);
      let data = JSON.parse(success.params)
      this.data = data
      // console.log(this.data['productName']);
      console.log(this.data);
      
      
    })
  }

  bookTable(){
    let obj = this.reservationForm.value
  //  console.log(obj);
   
    if(obj.name == ''){
      this.toastrService.error('Plz.. enter name', 'Error', {
        timeOut: 3000,
      });
      return
    }
    else if(obj.phone == null){
      this.toastrService.error('Plz.. enter your number', 'Error', {
        timeOut: 3000,
      });
      return
    }
    else if(obj.email == ''){
      this.toastrService.error('Plz.. enter email', 'Error', {
        timeOut: 3000,
      });
      return
    }
    else if(obj.noOfPerson == null){
      this.toastrService.error('Plz.. select noOfPerson', 'Error', {
        timeOut: 3000,
      });
      return
    }
    else if(obj.date == ''){
      this.toastrService.error('Plz.. select date', 'Error', {
        timeOut: 3000,
      });
      return
    }
    else if(obj.time == null){
      this.toastrService.error('Plz.. select time', 'Error', {
        timeOut: 3000,
      });
      return
    }

    this.shopService.makeReservation(obj).subscribe((success)=>{
      if(success){
        this.toastrService.success('Your booking has been done successfully!!', 'Success', {
          timeOut: 3000,
        });
        this.router.navigate(['/landing-page/booking-details'])
      }
    })

  }

  ngOnInit(): void {
  }

}
