import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryProductService } from 'src/app/services/category-product.service';

@Component({
  selector: 'app-category-products-table',
  templateUrl: './category-products-table.component.html',
  styleUrls: ['./category-products-table.component.css']
})
export class CategoryProductsTableComponent implements OnInit {

  categoryProducts:[]=[];
  categoryId:string="";
  constructor(
    private route: ActivatedRoute,
    private categoryProductService:CategoryProductService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(pram => {
      this.categoryId = (pram.get('categoryId') as string);

      if(this.categoryId != null)
      {

        this.categoryProductService.getAll(null,[this.categoryId]).subscribe(res => {
          console.log(res);
          this.categoryProducts = (res as any);
        })
      }

    });
  }

}
