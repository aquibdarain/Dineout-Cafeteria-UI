import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShopService } from 'src/app/services/shop.service';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth service/auth.service';

@Component({
  selector: 'app-salad',
  templateUrl: './salad.component.html',
  styleUrls: ['./salad.component.scss']
})
export class SaladComponent implements OnInit {
  id: number = -1

  salad = [
    {
      productName: "Vegetable Salad",
      price: 20,
      quantity: 1,
      img: "./assets/img/Vegetable-salad.jpg",
      productId: 1
    },
    {
      productName: "Greek Salad",
      price: 10,
      quantity: 1,
      img: "./assets/img/greek-salad.jpg",
      productId: 2

    },
    {
      productName: "Caeser Salad",
      price: 15,
      quantity: 1,
      img: "./assets/img/Caseser-salad.jpeg",
      productId: 3

    },
  ]

  constructor(private shopService: ShopService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    this.getUserId()
  }

  SaladForm = new FormGroup({
    productName: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    img: new FormControl(),
    productId: new FormControl(),

  })

  getCartDetailsByUserId() {
    this.shopService.getCartDetailsByUserId(this.id).subscribe((success: any) => {
      // console.log("shopItem", success);

      let count = 0;
      for (let item of success) {
        count += item.quantity;
      }
      this.shopService.SharingData.next((count))
    })
  }

  getUserId() {
    this.authService.getUserIdByToken().subscribe((success: any) => {
      this.id = success.id
      console.log(this.id);
    })
  }

  addSalad(s: any) {
    this.SaladForm.patchValue(s);
    let obj = this.SaladForm.value;
    obj.userId = this.id;
    obj.order = true
    console.log(obj);


    //find product
    this.shopService.findProduct(
      {
        productId: obj.productId,
        userId: obj.userId
      })
      .subscribe((success: any) => {
        if (success != null) {
          let prodId = success.productId
          let quantity = success.quantity
          let price = success.price
          console.log(quantity);

          let data = {
            quantity: quantity + 1,
            price: price + obj.price
          }

          this.shopService.updateProduct(data, prodId).subscribe((success) => {
            // console.log(success);

            this.getCartDetailsByUserId()

            if (success) {
              this.toastr.success('Product added successfully !!', 'Success', {
                timeOut: 2000,
              });
              this.router.navigate(['/landing-page/view-cart'])
            }
          })
        }

        else { // if(success == null)
          this.shopService.addToCart(obj).subscribe((success) => {
            // console.log(success);

            this.getCartDetailsByUserId()

            if (success) {
              this.toastr.success('Product added successfully !!', 'Success', {
                timeOut: 2000,
              });
              this.router.navigate(['/landing-page/view-cart'])
            }
          })
        }
      })
  }




}


