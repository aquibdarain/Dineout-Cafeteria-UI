import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth service/auth.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {
  id: number = -1

  Dessert = [
    {
      productName: "Chocolate Dessert",
      price: 5,
      quantity: 1,
      img: "../../../../assets/img/chocalate-dessert.jpeg",
      productId: 7

    },
    {
      productName: " Strawberry Dessert",
      price: 7,
      quantity: 1,
      img: "../../../../assets/img/strawberry.jpg",
      productId: 8

    },
    {
      productName: "Tiramisu Cake Dessert",
      price: 8,
      quantity: 1,
      img: "../../../../assets/img/Tiramisu cake dessert.jpg",
      productId: 9

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

  getCartDetailsByUserId() {
    this.shopService.getCartDetailsByUserId(this.id).subscribe((success: any) => {
      console.log("shopItem", success);

      let count = 0;
      for (let item of success) {
        count += item.quantity;
      }
      this.shopService.SharingData.next((count))
    })
  }

  getUserId() {
    this.authService.getUserDetailsByToken().subscribe((success: any) => {
      this.id = success.id
      console.log(this.id);
    })
  }
  DessertForm = new FormGroup({
    productName: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    img: new FormControl(),
    productId: new FormControl(),
  })

  addDessert(s: any) {
    this.DessertForm.patchValue(s);
    let obj = this.DessertForm.value;
    obj.userId = this.id;
    obj.order = true

    console.log(obj);



    //find product
    this.shopService.findProduct(
      {
        productId: obj.productId,
        userId: obj.userId
      }
    ).subscribe((success: any) => {
      //find product

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

          this.getCartDetailsByUserId();

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
          console.log(success);

          this.getCartDetailsByUserId();

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