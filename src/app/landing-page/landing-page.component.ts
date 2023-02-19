import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { LoginModalComponent } from '../modal/login-modal/login-modal.component';
import { RegisterModalComponent } from '../modal/register-modal/register-modal.component';
import { AuthService } from '../services/auth service/auth.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  itemCount: any = 0;

  constructor(private router: Router,
    private shopService: ShopService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    public authService: AuthService) {
    // this.shopService.getItemCount().subscribe((success: any) => {
    //   let count = 0;
    //   for (let item of success) {
    //     count += item.quantity;
    //   }

    //   this.itemCount = count;
    //   console.log(this.itemCount);
    // }, (err) => {
    //   console.log("error", err);
    // })

    config.backdrop = 'static';
    config.keyboard = false;

    this.getSumOfQuantity()

  }

  getSumOfQuantity() {
    this.shopService.getProduct().subscribe((success: any) => {
      let count = 0;
      for (let item of success) {
        count += item.quantity;
      }
      this.itemCount = count;
    })
  }

  ngOnInit(): void {
    this.shopService.SharingData.subscribe((success) => {
      this.itemCount = success
    })


  }

  public isMenuCollapsed = true;

  Pizza() {
    this.router.navigate(['/landing-page/shop/pizza'], {
      queryParams: {
        item: 'pizza'
      }
    })
  }
  Salads() {
    this.router.navigate(['/landing-page/shop/salads'], {
      queryParams: {
        item: 'salads'
      }
    })
  }
  Soups() {
    this.router.navigate(['/landing-page/shop/soups'], {
      queryParams: {
        item: 'soups'
      }
    })
  }
  Desserts() {
    this.router.navigate(['/landing-page/shop/desserts'], {
      queryParams: {
        item: 'desserts'
      }
    })
  }

  openLoginContent() {
    // this.router.navigate(['/auth/login'])
    const modalRef = this.modalService.open(LoginModalComponent, { centered: true });
    modalRef.componentInstance.name = 'SignIn';
  }

  openRegisterContent() {
    const modalRef = this.modalService.open(RegisterModalComponent, { centered: true });
    modalRef.componentInstance.name = 'SignUp';
  }

  signOut() {
    this.authService.logOut()
    // localStorage.removeItem('userToken');
    this.router.navigate(['/landing-page/home'])

    this.shopService.SharingData.next(0);
  }
}

