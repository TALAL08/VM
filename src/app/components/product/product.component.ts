import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [
    './product.component.css',
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css',
  ],
})
export class ProductComponent implements OnInit {
  form!: FormGroup;
  categories: [] = [];
  productId: string = '';
  categoryId: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      isCategoryChange: [false],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res as any;
    });

    this.route.paramMap.subscribe((pram) => {
      this.productId = pram.get('id') as string;

      if (this.productId != null) {
        this.productService.get(this.productId).subscribe((res) => {
          let productInDb = res as any;
          this.form.get('name')?.setValue(productInDb.name);
          this.form.get('categoryId')?.setValue(productInDb.categoryId);
          this.categoryId = productInDb.categoryId;
        });
      }
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.productId == null) {
        this.productService.create(this.form.value).subscribe((res) => {
          console.log(res);
        });
      } else {
        let categoryId = this.form.get('categoryId')?.value;
        if (categoryId != this.categoryId)
          this.form.get('isCategoryChange')?.setValue(true);

        this.productService
          .update(this.form.value, null, [this.productId])
          .subscribe((res) => {
            console.log(res);
          });
      }
    }
  }
}
