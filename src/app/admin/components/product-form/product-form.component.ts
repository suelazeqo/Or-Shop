import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { take } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  categoriesId$;
  
  product: any = {
    title: '',
    price: '',
    category: '',
    imageUrl: ''
  } ;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
   
    ){ 

   
  }

  save(product) {
   if(this.id) this.productService.update(this.id, product);
   else
    this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (!confirm('Are you sure you want to delete this product?')) return;
      
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }  
  ngOnInit() {
   this.categoryService.getCategories().subscribe(cat=>{
    this.categories$ = cat
      this.categoryService.getAllCategoriesId().subscribe(id=>{
        
        for(let i =0;i<id.length;i++){
          this.categories$[i]['key']=id[i].key
        }
      })
    })

        this.id = this.route.snapshot.paramMap.get('id');
   
        if (this.id)
          this.productService.get(this.id).pipe(take(1)).subscribe(p => (this.product = p));
  }

}
