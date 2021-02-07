import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit,OnDestroy,AfterViewInit {
@ViewChild(MatPaginator) paginator:MatPaginator
@ViewChild(MatSort) sort:MatSort


  public displayedColumns = ['title', 'price',"edit"]; //this are the columns
  public dataSource = new MatTableDataSource<Product>();


  products: Product[];
  filteredProducts: any[];
  elSubscription: Subscription;
  subscription: Subscription;
  items: Product[]=[];
  itemCount: number;
  constructor( private productService: ProductService) {
  
   }
  
  ngOnInit() {

    this.subscription =  this.productService.getAllEl().subscribe((products:any) => {
      console.log(products)
      
       this.filteredProducts = products

    this.elSubscription = this.productService.getAllId().subscribe((el:any)=>{
        for(let i = 0; i<this.filteredProducts.length;i++){
         this.filteredProducts[i].key= el[i].key
       }
     })
     this.dataSource.data=this.filteredProducts
    });
  }

onKeyUpFilter(value:string){
    this.dataSource.filter = value.trim().toLocaleUpperCase()
}
  
ngAfterViewInit(){
  this.dataSource.sort = this.sort
  this.dataSource.paginator=this.paginator
}

   ngOnDestroy() {
     this.subscription.unsubscribe();
   }
}

export interface Product {
  key:string,
  category:string,
  title:string,
  price:number,
  imageUrl:string
}

