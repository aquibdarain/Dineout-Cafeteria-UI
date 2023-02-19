import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth service/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  login() {
    this.authService.userLogin(this.loginForm.value).subscribe((success: any) => {
      console.log(success);
      // let userData = JSON.stringify(success.token)
      // localStorage.setItem('userToken', success.token)

      // this.authService.userToken.next(userData)
      if (success) {
        this.router.navigate(['/landing-page/view-cart']);
        this.toastr.success('Sign In successful !!', 'Success', {
          timeOut: 3000,
        });
        
        return
      }
    },(error) =>{
      this.toastr.error('Plz.. enter valid details', 'Error', {
        timeOut: 3000,
      });
    })
  }


  // onLogin() {
  //   this.login.value;
  //   console.log(this.login.value);
  //   this.userService.login(this.login.value).subscribe(
  //     (success) => {
  //       if (success) {
  //         this.router.navigate(['/dashboard'])
  //         alert('login successful');
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }
}
