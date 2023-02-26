
import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cafe-details',
  templateUrl: './cafe-details.component.html',
  styleUrls: ['./cafe-details.component.scss']
})

export class CafeDetailsComponent implements OnInit {
  arr: any = []
  sanitizer: any
  // user_photo: SafeResourceUrl = '';
  constructor(private imageService: ImageService,
    private domSanitizer: DomSanitizer,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getCafeDetails()

  }

  getCafeDetails() {
    this.imageService.getUnapprovedCafeDetails().subscribe((success: any) => {
      // console.log(success[0]);
      console.log(this.arr);

      this.arr = success.map((s: any) => {
        // console.log(s['data']);
        let TYPED_ARRAY = new Uint8Array(s['data'].file.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '')
        // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        // const base64String = btoa(String.fromCharCode(...new Uint8Array()));
        let base64String = btoa(STRING_CHAR);
        const imageurl = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + base64String);
        // this.imageurl = "data:image/jpeg;base64," + base64String
        return { imageUrl: imageurl, id: s['data'].id, cafeName: s['data'].cafeName, description: s['data'].description, location: s['data'].location, price: s['data'].price }
      })



    })
  }

  cafeApproval(id: number) {
    let obj = {
      status: 'true'
    }
    this.imageService.cafeApprovalByAdmin(id, obj).subscribe((success) => {
      // if(success){
      this.toastr.success('Cafe approved successfully !!', 'Success', {
        timeOut: 2000,
      });
      this.getCafeDetails()
      // }
    })
  }

  cafeReject(id: number) {
    this.imageService.cafeRejectByAdmin(id).subscribe((success) => {
      if (success) {
        this.toastr.warning('Cafe rejected successfully !!', 'Rejected', {
          timeOut: 2000,
        });
        this.getCafeDetails()

      }
    })
  }

  ngOnInit(): void {
  }

}
