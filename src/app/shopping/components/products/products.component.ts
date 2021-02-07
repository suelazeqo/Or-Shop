import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from '../../../admin/components/admin-products/admin-products.component';

import { ProductService } from 'shared/services/product.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  //products$;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  prSubscription: Subscription;
  cart:any;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
   private  productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {
  
      

productService
.getAllEl()
.subscribe((products:any) => {
      this.products = products;
      this.getProductId()
    })
      
      
  }

  routerParam(){
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category)?
      this.products.filter (p => p.category.toString().toLowerCase() === this.category) :
      this.products
    })
  }

  getProductId(){
    this.productService.getAllId()
.subscribe((id:any) => {
    for(let i=0;i<this.products.length;i++){
      this.products[i].key=id[i].key
    }
    })
      this.routerParam()
  }

  async ngOnInit (){
    this.subscription = (await this.shoppingCartService.getCart())
    .subscribe(cart => {
      this.cart =cart});
  }

  ngOnDestroy (){
    this.subscription.unsubscribe();    
  }
}      

      
