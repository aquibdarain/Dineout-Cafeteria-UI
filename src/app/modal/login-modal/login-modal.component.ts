import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth service/auth.service';
import { Router } from '@angular/router';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { ShopService } from 'src/app/services/shop.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  SignInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  get email() {
    return this.SignInForm.get('email')
  }

  get password() {
    return this.SignInForm.get('password')
  }

  @Input() name: any;

  constructor(public activeModal: NgbActiveModal,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private shopService: ShopService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
   this.SignInForm.patchValue({
      email: "admin@gmail.com",
      password: "admin@123"
    })
  }

  signIn() {
    this.authService.userLogin(this.SignInForm.value).subscribe((success: any) => {
      console.log(success);
      // let userData = JSON.stringify(success.token)
      if (success.token) {
        localStorage.setItem('userToken', success.token)
        this.activeModal.dismiss()

        // this.authService.userToken.next(userData)
        
        this.shopService.getProduct().subscribe((success: any) => {
          let count = 0;
          for (let item of success) {
            count += item.quantity;
          }
          this.shopService.SharingData.next((count))
        })

        this.toastr.success('Sign In successful !!', 'Success', {
          timeOut: 3000,
        });
        this.authService.getUserDetailsByToken().subscribe((data:any)=>{
          // console.log(data);
          
          this.authService.role.next((data.role.toLowerCase()))
        })
          this.router.navigate(['/landing-page/home'])

        
        return
      }

      this.toastr.error('Plz.. enter valid details', 'Error', {
        timeOut: 3000,
      });
      this.activeModal.dismiss()
    }, (err) => {
      if (err) {
        this.toastr.error('Plz.. enter valid details', 'Error', {
          timeOut: 3000,
        });
        this.activeModal.dismiss()

      }
    })
  }

  // activeModal.close('Close click')

  openRegisterContent() {
    const modalRef = this.modalService.open(RegisterModalComponent, { centered: true });
    this.activeModal.dismiss('Cross click')
    modalRef.componentInstance.name = 'SignUp';
  }

}
