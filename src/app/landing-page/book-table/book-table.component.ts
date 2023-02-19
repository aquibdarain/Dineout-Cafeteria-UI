import { Component, OnInit } from '@angular/core';
import { constant } from 'src/assets/constant';
import { FormControl, FormGroup } from '@angular/forms';
import { ShopService } from 'src/app/services/shop.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({

  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {
  tables = [
    {
      productName: "Moti Mahal Delux Restaurant",
      price: 900,
      description: "Sitabuldi, Central Nagpur", 
      // quantity: 1,
      img: "../../../assets/img/p79163-1616568809605ae1e9ac4a6.jpg",
      productId: 1

    },
    {
      productName: "Kalpataru",
      price: 1600,
      description: "Sitabuldi, Central Nagpur", 
      // quantity: 1,
      img: "../../../assets/img/p58940-15738954735dcfbd31359fd.jpg",
      productId: 2

    },
    {
      productName: "Jagat Restaurant",
      price: 600,
      description: "Sitabuldi, Central Nagpur", 
      // quantity: 1,
      img: "../../../assets/img/p67190-15738850775dcf9495e974a.jpg",
      productId: 3

    },
    {
      productName: "TDS Restro Lounge",
      price: 1900,
      description: "Sitabuldi, Central Nagpur", 
      // quantity: 1,
      img: "../../../assets/img/p62435-15656780745d5259fa8ddd9.jpg",
      productId: 4

    },
    {
      productName: "Hotel Brijinn",
      price: 2100,
      description: "Sitabuldi, Central Nagpur", 
      // quantity: 1,
      img: "../../../assets/img/p59990-15625680955d22e59ff0c9e.jpg",
      productId: 5

    },
    {
      productName: "Dessertz & More",
      price: 600,
      description: "Sitabuldi, Central Nagpur", 
      // quantity: 1,
      img: "../../../assets/img/p58938-15732780005dc6513036a41.jpg",
      productId: 6

    },
  ]
  time = constant.time
  // No_of_person = constant.No_of_person

  reservationForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required]),
    noOfPerson: new FormControl(null,[Validators.required]),
    date: new FormControl('',[Validators.required]),
    time: new FormControl(null,[Validators.required]),
  })

  // get name(){
  //   return this.reservationForm.get('name')
  // }
  // get email(){
  //   return this.reservationForm.get('email')
  // }
  // get phone(){
  //   return this.reservationForm.get('phone')
  // }
  // get noOfPerson(){
  //   return this.reservationForm.get('noOfPerson')
  // }
  // get date(){
  //   return this.reservationForm.get('date')
  // }
  // get Time(){
  //   return this.reservationForm.get('time')
  // }

  // reservation(){
  //   let obj: object = this.reservationForm.value;
  //   this.shopService.makeReservation(obj).subscribe((success)=>{
  //     console.log(success);   
  //   },(error)=>{
  //     console.log(error);
  //   })
  // }

  viewTable = (data: any) =>{
    console.log(data);
    this.router.navigate(['landing-page/view-table'],{
      queryParams:{
        params: JSON.stringify(data)
      }
    })
  }
  

  constructor(
    // private shopService: ShopService
    private router: Router
  ) { }

  ngOnInit(): void {
  }



}
