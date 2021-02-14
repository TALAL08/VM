import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  products: [] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((res) => {
      console.log(res);
      (this.products as any) = res;
    });
  }

  delete(product: any) {

    this.productService.delete(product.id).subscribe((res) => {
      console.log(res);
    });

    const index = this.products.indexOf(product as never);
    this.products.splice(index, 1);

    alert('Deleted');
  }
}
