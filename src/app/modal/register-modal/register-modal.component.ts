import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth service/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  SignUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('User'),
  })

  get firstName() {
    return this.SignUpForm.get('firstName')
  }
  get lastName() {
    return this.SignUpForm.get('lastName')
  }
  get phone() {
    return this.SignUpForm.get('phone')
  }
  get email() {
    return this.SignUpForm.get('email')
  }
  get password() {
    return this.SignUpForm.get('password')
  }

  @Input() name: any;

  constructor(public activeModal: NgbActiveModal,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.SignUpForm.patchValue({
      email: "abc@gmail.com",
      firstName: "abc",
      lastName: "abc",
      password: "abc",
      phone: 7689877899
    })
  }



  signUp() {
    let obj = this.SignUpForm.value
    this.authService.userRegister(obj).subscribe((success: any) => {
      // console.log(success);
      if (success.token) {
        localStorage.setItem('userToken', success.token)

        this.toastr.success('Sign In successful !!', 'Success', {
          timeOut: 3000,
        });
        this.activeModal.dismiss('Cross click');

        this.authService.getUserDetailsByToken().subscribe((data: any) => {
          this.authService.role.next((data.role.toLowerCase()))
        })
      }
    }, (err) => {
      // console.log(err.error.msg);
      this.toastr.error(err.error.msg + '!!', 'Error', {
        timeOut: 3000,
      });
      this.activeModal.dismiss('Cross click');
    })


  }

}
