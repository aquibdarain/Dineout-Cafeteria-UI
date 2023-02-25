import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { constant } from 'src/assets/constant';
import { ActivatedRoute } from '@angular/router';
import { Obj } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { ShopService } from 'src/app/services/shop.service';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {

  time = constant.time
  No_of_person = constant.No_of_person
  imageUrl: any

  reservationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    noOfPerson: new FormControl(null, [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    bookingLocation: new FormControl('')

  })

  data: Obj = {}

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private shopService: ShopService,
    private imageService: ImageService,
    private domSanitizer: DomSanitizer,


  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {

      this.imageService.getApprovedCafeDetailsById(params.id).subscribe((data:any)=>{
        this.data = data
        console.log(this.data);
        let TYPED_ARRAY = new Uint8Array(data.file.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '')
        // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        // const base64String = btoa(String.fromCharCode(...new Uint8Array()));
        let base64String = btoa(STRING_CHAR);
        this.imageUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + base64String);
        // this.imageurl = "data:image/jpeg;base64," + base64String
        
      })

      // console.log(this.data['productName']);
      console.log(this.data);


    })
  }

  bookTable() {
    let obj = this.reservationForm.value
    //  console.log(obj);

    if (obj.name == '') {
      this.toastrService.error('Plz.. enter name', 'Error', {
        timeOut: 3000,
      });
      return
    }
    else if (obj.phone == null) {
      this.toastrService.error('Plz.. enter your number', 'Error', {
        timeOut: 3000,
      });
      return
    }
    else if (obj.email == '') {
      this.toastrService.error('Plz.. enter email', 'Error', {
        timeOut: 3000,
      });
      return
    }
    else if (obj.noOfPerson == null) {
      this.toastrService.error('Plz.. select noOfPerson', 'Error', {
        timeOut: 3000,
      });
      return
    }
    else if (obj.date == '') {
      this.toastrService.error('Plz.. select date', 'Error', {
        timeOut: 3000,
      });
      return
    }
    else if (obj.time == null) {
      this.toastrService.error('Plz.. select time', 'Error', {
        timeOut: 3000,
      });
      return
    }

    this.shopService.makeReservation(obj).subscribe((success) => {
      if (success) {
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
