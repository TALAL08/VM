import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: [
    './category.component.css',
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css',
  ],
})
export class CategoryComponent implements OnInit {
  form!: FormGroup;
  categoryId: string = '';
  categoryImage: { image: string; contentType: string } = {
    image: '',
    contentType: '',
  };
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      contentType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pram) => {
      this.categoryId = pram.get('id') as string;

      if (this.categoryId != null) {
        this.categoryService.get(this.categoryId).subscribe((res) => {
          let categoryInDb = res as any;
          console.log(categoryInDb);
          this.form.get('name')?.setValue(categoryInDb.name);
          this.form.get('image')?.setValue(categoryInDb.image);
          this.form.get('contentType')?.setValue(categoryInDb.contentType);

          this.categoryImage.image= categoryInDb.image;
          this.categoryImage.contentType= categoryInDb.contentType;
        });
      }
    });
  }

  convertImage(event: any) {
    const file = event.target.files[0];
    console.log(file);
    let form = this.form;
    let categoryImage = this.categoryImage;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const imageString = reader.result as string;
      const contentType = imageString.slice(0, imageString.indexOf(',') + 1);
      const image = imageString.slice(imageString.indexOf(',') + 1);

      form.get('image')?.setValue(image);
      form.get('contentType')?.setValue(contentType);
      categoryImage.image = image;
      categoryImage.contentType = contentType;
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
    this.categoryImage.image = '';
    this.categoryImage.contentType = '';
  }

  submit() {
    if (this.form.valid) {
      const resource = this.form.value;

      if (this.categoryId == null) {
        this.createCategory(resource);
      } else {
        this.updateCategory(resource);
      }
    }
  }

  private updateCategory(resource: any) {
    this.categoryService
      .update(resource, null, [this.categoryId])
      .subscribe((res) => {
        console.log(res);
      });
  }

  private createCategory(resource: any) {
    this.categoryService.create(resource).subscribe((res) => {
      console.log(res);
    });
  }
}
