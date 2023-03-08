import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {
  shopItem: any;
  subtotal: number = 0;
  tax = 0;
  shipping = 3
  total = 0
  id: number = -1;

  constructor(private shopService: ShopService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService

  ) {

    this.getUserId()

  }

  ngOnInit(): void {
  }

  getCartDetailsByUserId() {
    this.subtotal = 0;
    this.shopService.getCartDetailsByUserId(this.id).subscribe((success: any) => {
      this.shopItem = success;
      console.log("shopItem", success);
      success.forEach((x: any) => {
        this.subtotal += x.price
      });
      this.tax = ((this.subtotal * 5) / 100);
      this.total = this.subtotal + this.tax + this.shipping

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
      this.getCartDetailsByUserId()

    })
  }

  getCartItem() {
    this.subtotal = 0;
    this.shopService.getProduct().subscribe((success: any) => {
      this.shopItem = success;
      console.log("shopItem", this.shopItem);
      success.forEach((x: any) => {
        // console.log(x.price * x.quantity);
        this.subtotal += x.price
      });
      this.tax = ((this.subtotal * 5) / 100);
      this.total = this.subtotal + this.tax + this.shipping
    })
  }

  // getCartDetailsById(){
  //   this.subtotal = 0;
  //   this.shopService.getCartDetailsByUserId().subscribe((success: any) => {
  //     this.shopItem = success;
  //     console.log("shopItem",this.shopItem);
  //     success.forEach((x: any) => {
  //       // console.log(x.price * x.quantity);
  //       this.subtotal += x.price 
  //     });
  //     this.tax = ((this.subtotal * 5 ) / 100);
  //     this.total = this.subtotal + this.tax + this.shipping
  //   })
  // }

  deleteItem(id: number) {
    console.log(id);

    this.shopService.deleteProduct(id).subscribe((success) => {
      console.log(success);

      //get itemCount
      this.getCartDetailsByUserId();
      this.toastr.warning('Your item has been removed successfully !!', 'Delete', {
        timeOut: 2000,
      });

    }, (error) => {
      console.log("error", error);
    })

  }

  checkout() {
    let obj = {
      subtotal: this.subtotal,
      tax: this.tax,
      shipping: this.shipping,
      total: this.total
    }
    this.router.navigate(['./landing-page/checkout'], {
      queryParams: {
        params: JSON.stringify(obj)
      }
    })
  }
}

