import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../admin/components/admin-products/admin-products.component';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCartComponent } from '../../../shopping/components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }
  
  addToCart(){
    this.cartService.addToCart(this.product);
  }
}


