import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationsService } from 'src/app/services/notifications.service';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { format } from 'path';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  closeResult = '';
  shipping = 0;
  subtotal = 0;
  tax = 0;
  total = 0;
  shopData: any;

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private notificationsService: NotificationsService,
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      let obj = data.params
      obj = JSON.parse(obj)
      // console.log("params", obj);
      this.shipping = obj.shipping
      this.subtotal = obj.subtotal
      this.tax = obj.tax
      this.total = obj.total
    })

    this.getCartItem()

  }

  Menu: string = ''

  ngOnInit(): void {

  }



  place_order() {
    this.placeOrder = true;
    this.UPI = false;
  }

  upi() {
    this.placeOrder = false;
    this.UPI = true;
  }


  placeOrder: boolean = true;
  UPI: boolean = false

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getCartItem() {
    this.shopService.getProduct().subscribe((success: any) => {
      console.log(success);

      this.shopData = success;
      for (let s of this.shopData) {
        this.Menu = s.productName + ' x' + s.quantity
      }
      console.log(this.Menu);

    })

  }



  PayForOrder = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    address: new FormControl('', Validators.required),
    menu: new FormControl(this.Menu),
  })

  get name() {
    return this.PayForOrder.get('name')
  }

  get address() {
    return this.PayForOrder.get('address')
  }


  paymentAndBilling() {
    this.PayForOrder.patchValue({
      menu: this.Menu
    })

    this.spinner.show();
    console.log(this.PayForOrder.value);

    this.shopService.addOrder(this.PayForOrder.value).subscribe((success) => {
      console.log(success);
      if (success) {
        this.shopService.destroyCart().subscribe((success) => {
          this.shopService.getProduct().subscribe((success: any) => {
            let count = 0;
            for (let item of success) {
              count += item.quantity;
            }
            this.shopService.SharingData.next((count))
          })
          this.modalService.dismissAll();
          this.router.navigate(['/landing-page/order']);

          this.spinner.hide();
        })


      }



    })

    // alert("success")

  }


}
