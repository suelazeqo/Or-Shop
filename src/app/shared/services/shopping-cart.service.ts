import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '../../admin/components/admin-products/admin-products.component';
import { take } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
    .pipe(map((x:any) =>  new ShoppingCart(x.items)
    ));
  }

  async addToCart(product: Product){
    this.updateItemQuantity(product, 1);    
  }

  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+ cartId + '/items').remove();
  }

  private create(){
   return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;    
  }

  private async updateItemQuantity (product: Product, change: number){
    
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key)
    
    item$.valueChanges().pipe(take(1)).subscribe((item:any) => {
      let quantity = (item!==null? item.quantity : 0)+ change;
      if (quantity === 0) item$.remove();
      else 
     item$.update({ 
       //product: product, 
       key:product.key,
       title: product.title,
       imageUrl: product.imageUrl,
       price: product.price,
       quantity:quantity });
      
    });
  }
}
