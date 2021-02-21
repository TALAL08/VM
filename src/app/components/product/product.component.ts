import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  categories: any[] = [];
  productId: string = '';
  categoryId: string = '';
  productImage: { image: string; contentType: string } = {
    image: '',
    contentType: '',
  };
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      isCategoryChange: [false],
      image: ['', Validators.required],
      contentType: ['', Validators.required],
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
          this.form.get('categoryId')?.setValue(productInDb.category.id);
          this.form.get('image')?.setValue(productInDb.image);
          this.form.get('contentType')?.setValue(productInDb.contentType);

          this.productImage.image = productInDb.image;
          this.productImage.contentType = productInDb.contentType;
          this.categoryId = productInDb.categoryId;
        });
      }
    });
  }

  convertImage(event: any) {
    const file = event.target.files[0];
    let form = this.form;
    let productImage = this.productImage;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const imageString = reader.result as string;
      const contentType = imageString.slice(0, imageString.indexOf(',') + 1);
      const image = imageString.slice(imageString.indexOf(',') + 1);

      form.get('image')?.setValue(image);
      form.get('contentType')?.setValue(contentType);
      productImage.image = image;
      productImage.contentType = contentType;
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    };
  }

  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }

  removeImage() {
    this.form.get('image')?.reset;
    this.form.get('contentType')?.reset;
    this.productImage.image = '';
    this.productImage.contentType = '';
  }

  submit() {
    if (this.form.valid) {
      const resource = this.form.value;
      if (this.productId == null) {
        this.createProduct(resource);
      } else {
        this.updateProduct(resource);
      }
    }
  }

  private createProduct(resource: any) {
    this.productService.create(resource).subscribe((res) => {
      console.log(res);
    });
  }

  private updateProduct(resource: any) {
    let categoryId = this.form.get('categoryId')?.value;
    if (categoryId != this.categoryId)
      this.form.get('isCategoryChange')?.setValue(true);

    this.productService
      .update(resource, null, [this.productId])
      .subscribe((res) => {
        console.log(res);
      });
  }
}
