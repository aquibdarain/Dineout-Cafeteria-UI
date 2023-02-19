import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { elementAt, Observable } from 'rxjs';
import { AuthService } from './services/auth service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './modal/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) {
  }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {

      return true
    }
    else {
      this.router.navigate(['/landing-page/home'])
      const modalRef = this.modalService.open(LoginModalComponent, { centered: true });
      modalRef.componentInstance.name = 'SignIn';

      return false
    }
  }

}
