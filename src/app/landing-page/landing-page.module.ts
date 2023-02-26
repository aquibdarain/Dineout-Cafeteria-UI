import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BookTableComponent } from './book-table/book-table.component';
import { LandingPageComponent } from './landing-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { GalleryComponent } from './gallery/gallery.component';
import { ShopComponent } from './shop/shop.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from '../auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { PopularItemsComponent } from './popular-items/popular-items.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { AddCafeComponent } from './add-cafe/add-cafe.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CafeDetailsComponent } from './cafe-details/cafe-details.component';
import { appSanitizeHtmlDirective } from '../directive/sanitize-html.directive';
import { SafeHtmlPipePipe } from '../pipe/safe-html-pipe.pipe';
import { BookingDetailsComponent } from './booking-details/booking-details.component';



var routes: Routes = [
  {
    path: '', component: LandingPageComponent, children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'menu', component: MenuComponent
      },
      {
        path: 'shop', canActivate: [AuthGuard],
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'book-table', component: BookTableComponent, canActivate: [AuthGuard]
      },
      {
        path: 'view-table', component: ViewTableComponent, canActivate: [AuthGuard]
      },
      {
        path: 'booking-details', component: BookingDetailsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'add-cafe', component: AddCafeComponent,canActivate: [AuthGuard]
      },
      {
        path: 'cafe-details', component: CafeDetailsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'view-cart', component: ViewCartComponent, canActivate: [AuthGuard]
      },
      {
        path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]
      },
     
    ]
  },


]

@NgModule({
  declarations: [
    HomeComponent,
    BookTableComponent, 
    GalleryComponent, 
    ShopComponent, 
    ViewCartComponent, 
    PopularItemsComponent,
    CheckoutComponent,
    ViewTableComponent,
    AddCafeComponent,
    FileUploadComponent,
    CafeDetailsComponent,
    appSanitizeHtmlDirective,
    SafeHtmlPipePipe,
    BookingDetailsComponent
    
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    NgbModule, 
    ReactiveFormsModule, 
    FormsModule, 
    NgxSpinnerModule, 
    ToastrModule,
    
  ],
  providers: [
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class LandingPageModule { }
