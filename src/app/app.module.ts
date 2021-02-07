import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { environment } from 'environments/environment';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from 'shared/shared.module';

import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';



@NgModule({
  declarations: [
    AppComponent,
   
    
  ],imports:[
    CommonModule,
    HttpClientModule,
    
    AdminModule,
    SharedModule,
    ShoppingModule,
    CoreModule,
    BrowserModule,   
    CustomFormsModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),

    BrowserAnimationsModule,

    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [
    
    AdminAuthGuard,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
