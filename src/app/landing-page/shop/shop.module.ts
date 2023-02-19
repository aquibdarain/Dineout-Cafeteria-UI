import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaComponent } from './pizza/pizza.component';
import { SaladComponent } from './salad/salad.component';
import { SoupsComponent } from './soups/soups.component';
import { DessertsComponent } from './desserts/desserts.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


var routes: Routes = [
  {
    path: '', component: ShopComponent, children: [
      {
        path: 'pizza', 
        component: PizzaComponent
      },
      {
        path: 'salads', 
        component: SaladComponent
      },
      {
        path: 'soups',
        component: SoupsComponent
      },
      {
        path: 'desserts',
        component: DessertsComponent
      }
    ]
  }

]


@NgModule({
  declarations: [
    PizzaComponent, SaladComponent, SoupsComponent, DessertsComponent, 
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule
  ]
})
export class ShopModule { }
