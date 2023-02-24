import { Component, OnInit } from '@angular/core';


import { ImageService } from 'src/app/services/image.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'


@Component({
  selector: 'app-add-cafe',
  templateUrl: './add-cafe.component.html',
  styleUrls: ['./add-cafe.component.scss']
})
export class AddCafeComponent implements OnInit {
  file: any
  profile: any;
  imageData: any;

  constructor(private imageService: ImageService, private toastr: ToastrService, private router: Router) {

  }


  CafeForm = new FormGroup({
    cafeName: new FormControl(),
    description: new FormControl(''),
    price: new FormControl(),
    location: new FormControl(),
    image: new FormControl()
  })




  // onSelectFile(e: any) {
  //   // console.log(e);
  //   let reader = new FileReader()
  //   if (e.target.files[0]) {
  //     reader.onload = (event:any) => {
  //       this.url = event.target.result
  //     }
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // }
  image: any
  chosen: any
  addCafeForm() {
    let cf = new FormData()
    cf.append('cafeName',this.CafeForm.value.cafeName)
    cf.append('description',this.CafeForm.value.description)
    cf.append('price',this.CafeForm.value.price)
    cf.append('location',this.CafeForm.value.location)

    if(this.image){
      cf.append('file',this.image)    
    }else{
      this.toastr.error('Plz.. select image', 'Error', {
        timeOut: 3000,
      });
      return
    }

    this.imageService.createCafe(cf).subscribe((success) => {
      console.log(success);
      this.toastr.success('Cafe details added successfully, wait for admins approvement!!', 'Success', {
        timeOut: 2000,
      });
      this.router.navigate(['/landing-page/book-table'])
    }, (err) => {
      console.log("err", err);

    })
    this.imageData = null


  }


  onSelectFile(e: any) {  
    if (e.target.value) {
      this.image = e.target.files[0];
      // console.log(this.image);
      
      this.chosen = true
    }
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]
    

    if (this.image && allowedMimeTypes.includes(this.image.type)) {
      let reader = new FileReader()
      reader.onload = () => {
        this.imageData = reader.result
      }
      reader.readAsDataURL(this.image);
    }



  }


  ngOnInit(): void {
  }

}
