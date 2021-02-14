import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  form!: FormGroup;
  productId: string = '';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pram) => {
      this.productId = pram.get('id') as string;

      if (this.productId != null) {
        this.productService.get(this.productId).subscribe((res) => {
          let productInDb = res as any;
          this.form.get('name')?.setValue(productInDb.name);
        });
      }
    });
  }

  submit() {
    if (this.productId == null) {
      this.productService
        .create(null, null, [this.form.get('name')?.value])
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      this.productService
        .update(null, null, [this.productId, this.form.get('name')?.value])
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
