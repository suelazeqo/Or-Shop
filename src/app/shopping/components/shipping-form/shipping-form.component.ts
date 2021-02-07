import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { OrderService } from 'shared/services/order.service';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: any = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  } ;  
  userSubscription: Subscription;
  userId: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderSevice: OrderService){}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  ngOnDestroy(){
   
    this.userSubscription.unsubscribe();
  }

  async placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderSevice.storeOrder(order);
    this.router.navigate(['/order-success', result.key ]);
  }
 
}
