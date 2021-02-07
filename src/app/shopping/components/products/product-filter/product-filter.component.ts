import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoryService } from 'shared/services/category.service';


@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  subscription: Subscription;
  elSubscription: Subscription;
  
  @Input('category') category;
  constructor(categoryService: CategoryService) {
    this.subscription = categoryService.getCategories().subscribe((categories:any) =>  {
      this.categories$ = categories
     this.elSubscription = categoryService.getAllCategoriesId().subscribe((el:any)=> {
       for(let i = 0; i<this.categories$.length;i++)
         {
       this.categories$[i].key= el[i].key
         }
     })
   });
   }

  ngOnInit(): void {
  }

}
