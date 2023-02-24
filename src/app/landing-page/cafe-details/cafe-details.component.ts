
import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-cafe-details',
  templateUrl: './cafe-details.component.html',
  styleUrls: ['./cafe-details.component.scss']
})

export class CafeDetailsComponent implements OnInit {
  arr: any = []
  sanitizer: any
  // user_photo: SafeResourceUrl = '';
  constructor(private imageService: ImageService, private domSanitizer: DomSanitizer) {
    this.imageService.getCafeDetails().subscribe((success: any) => {
      // this.arr = success
      // console.log(success[0]);
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
        return { imageUrl: imageurl, cafeName: s['data'].cafeName, description: s['data'].description, location: s['data'].location, price: s['data'].price }
      })

      // console.log(this.arr);

      // let reader = new FileReader()
      // this.imageData = reader.readAsText(())
      // let objectURL = URL.createObjectURL();  
      // console.log(this.arr[1].data.file);
      // const base64String = btoa(String.fromCharCode(...new Uint8Array(this.arr[2].data.file)));
      // this.imageData = "data:image/JPEG;base64,"+base64String
      // var b64encoded = btoa(String.fromCharCode.apply(null, this.arr[1].data.file.data));
      // var datajpg = "data:image/jpg;base64," + b64encoded;
      // this.imageData = datajpg
      // console.log(datajpg);
      // this.imageData = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageData);
      // console.log(this.imageData);

    })
  }

  ngOnInit(): void {
  }

}
