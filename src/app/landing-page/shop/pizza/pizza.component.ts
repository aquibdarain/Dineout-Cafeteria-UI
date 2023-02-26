import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth service/auth.service';


@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  id: number = -1

  pizza = [
    {
      productName: "Pizza Barbeque",
      price: 5,
      quantity: 1,
      img: "../../../../assets/img/pizza-1.jpeg",
      productId: 4
    },
    {
      productName: "Pizza Margherita",
      price: 7,
      quantity: 1,
      img: "../../../../assets/img/pizza-2.webp",
      productId: 5
    },
    {
      productName: "Peppy Paneer",
      price: 8,
      quantity: 1,
      img: "../../../../assets/img/pizza-3.jpg",
      productId: 6

    },
  ]

  constructor(
    private shopService: ShopService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserId()
  }

  pizzaForm = new FormGroup({
    productName: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    img: new FormControl(),
    productId: new FormControl(),
    userId: new FormControl(),
  })

  getUserId(){
    this.authService.getUserDetailsByToken().subscribe((success: any)=>{
      this.id = success.id
      console.log(this.id);
    })
  }

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
  

  addPizza(s: any) {
    this.pizzaForm.patchValue(s);
    let obj = this.pizzaForm.value;
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
      console.log("success",success);
      
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


