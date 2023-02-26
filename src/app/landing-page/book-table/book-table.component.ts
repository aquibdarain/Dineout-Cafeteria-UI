import { Component, OnInit } from '@angular/core';
import { constant } from 'src/assets/constant';
import { ShopService } from 'src/app/services/shop.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({

  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {
  tables: any = [
    {
      cafeName: "Moti Mahal Delux Restaurant",
      price: 900,
      description: "Sitabuldi, Central Nagpur",
      // quantity: 1,
      imageUrl: "../../../assets/img/p79163-1616568809605ae1e9ac4a6.jpg",
      productId: 1

    },
    {
      cafeName: "Kalpataru",
      price: 1600,
      description: "Sitabuldi, Central Nagpur",
      // quantity: 1,
      imageUrl: "../../../assets/img/p58940-15738954735dcfbd31359fd.jpg",
      productId: 2

    },
    {
      cafeName: "Jagat Restaurant",
      price: 600,
      description: "Sitabuldi, Central Nagpur",
      // quantity: 1,
      imageUrl: "../../../assets/img/p67190-15738850775dcf9495e974a.jpg",
      productId: 3

    },
    {
      cafeName: "TDS Restro Lounge",
      price: 1900,
      description: "Sitabuldi, Central Nagpur",
      // quantity: 1,
      imageUrl: "../../../assets/img/p62435-15656780745d5259fa8ddd9.jpg",
      productId: 4

    },
    {
      cafeName: "Hotel Brijinn",
      price: 2100,
      description: "Sitabuldi, Central Nagpur",
      // quantity: 1,
      imageUrl: "../../../assets/img/p59990-15625680955d22e59ff0c9e.jpg",
      productId: 5

    },
    {
      cafeName: "Dessertz & More",
      price: 600,
      description: "Sitabuldi, Central Nagpur",
      // quantity: 1,
      imageUrl: "../../../assets/img/p58938-15732780005dc6513036a41.jpg",
      productId: 6

    },
  ]

  viewTable = (id: number) => {
    this.router.navigate(['landing-page/view-table'], {
      queryParams: {
        id
      }
    })
  }


  constructor(
    // private shopService: ShopService
    private router: Router,
    private imageService: ImageService,
    private domSanitizer: DomSanitizer,

  ) {

    this.getCafeDetails()
  }

  getCafeDetails() {
    this.imageService.getApprovedCafeDetails().subscribe((success: any) => {
      // console.log(success[0]);

      let data = success.map((s: any) => {
        console.log(s['data']);
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

      this.tables.push(...data);
      console.log(this.tables);





    })
  }

  ngOnInit(): void {
  }
}

