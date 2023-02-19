import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  banner = ['pizza', 'salads', 'soups', 'desserts']

  item = "";

  public isMenuCollapsed = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.item = params.item
    })
  }

  Pizza(){
    this.router.navigate(['/landing-page/shop/pizza'],{
      queryParams: {
        item: 'pizza'
      }
    })
  }
  Salads(){
    this.router.navigate(['/landing-page/shop/salads'],{
      queryParams: {
        item: 'salads'
      }
    })
  }
  Soups(){
    this.router.navigate(['/landing-page/shop/soups'],{
      queryParams: {
        item: 'soups'
      }
    })
  }
  Desserts(){
    this.router.navigate(['/landing-page/shop/desserts'],{
      queryParams: {
        item: 'desserts'
      }
    })
  }

}
