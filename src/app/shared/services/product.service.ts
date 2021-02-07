import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient,
    private db: AngularFireDatabase) {}
  
  create(product) {
   return this.db.list('/products').push(product);
  }

  getAllEl() {
    return this.db.list('/products').valueChanges()
  }

  getAllId() {
    return this.db.list('/products').snapshotChanges()
  }

  get(productId){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }


}

