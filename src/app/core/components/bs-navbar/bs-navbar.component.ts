import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import  firebase  from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})

export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
    ) { 
  
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser =>{
      this.appUser = appUser
    });

   this.cart$ = await this.shoppingCartService.getCart();

  }
    
  logout(){
    this.auth.logout();
  }

  onNavBtnClick(el:any){ 
    el.classList.toggle('collapse')
  }
}
