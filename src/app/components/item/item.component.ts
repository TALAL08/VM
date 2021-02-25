import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/common/enum/color.enum';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: [
    './item.component.css',
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ItemComponent implements OnInit {
  form!: FormGroup;
  itemId: string = '';
  colors!: any[];
  categories: any[] = [];
  products: any[] = [];
  imageCount: number = 0;
  itemImages: any[] = [];
  removedImageIds: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private categoryService: CategoryService,
    private categoryProductService: CategoryProductService,
    private itemService: ItemService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      productId: ['', Validators.required],
      numberInStock: ['', Validators.required],
      price: ['', Validators.required],
      colors: ['', Validators.required],
      description: ['', Validators.required],
      contentType:['', Validators.required],
      image:['', Validators.required],
      images: this.fb.array([]),
      removedImageIds: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.colors = Object.values(Color).filter(
      (value) => typeof value === 'string'
    );

    this.itemImages = this.form.get('images')?.value as [];

    this.route.paramMap.subscribe((pram) => {
      this.itemId = pram.get('id') as string;
      if (this.itemId != null) {
        this.itemService.get(this.itemId).subscribe((res) => {
          let itemInDb = res as any;
          console.log(itemInDb);
          this.form.get('name')?.setValue(itemInDb.name);
          this.form.get('categoryId')?.setValue(itemInDb.product.category.id);
          this.getCategoryProducts(itemInDb.product.category.id);
          this.form.get('productId')?.setValue(itemInDb.product.id);
          this.form.get('numberInStock')?.setValue(itemInDb.numberInStock);
          this.form.get('price')?.setValue(itemInDb.price);
          this.form
            .get('colors')
            ?.setValue((itemInDb.colors as string).split(','));
          this.form.get('description')?.setValue(itemInDb.description);

          (itemInDb.images as any[]).forEach((image) => {
            this.itemImages.push({
              id: image.id,
              name: image.name,
              image: image.image,
              contentType: image.contentType,
              isAdded:false
            });
            this.imageCount++
          });
        });
      }
    });

    this.categoryService.getAll().subscribe((res) => {
      (this.categories as any) = res;
    });
  }

  getCategoryProducts(target: any) {
    const categoryId = (target.value as string);
    if (categoryId) {
      this.categoryProductService.get(categoryId).subscribe((res) => {
        (this.products as any) = res;
      });
    }
  }

  convertImage(event: any) {

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let form = this.form;
    reader.onload = function () {

      const imageString = reader.result as string;
      const contentType = imageString.slice(0, imageString.indexOf(',') + 1);
      const image = imageString.slice(imageString.indexOf(',') + 1);
      form.get('contentType')?.setValue(contentType);
      form.get('image')?.setValue(image);

      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    };
  }

  convertImages(event: any) {
    let itemImages = this.itemImages;
    let files = event.target.files;
    let imageCount = this.imageCount;

    for (const file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const imageString = reader.result as string;
        const contentType = imageString.slice(0, imageString.indexOf(',') + 1);
        const image = imageString.slice(imageString.indexOf(',') + 1);
        const name = (file as any).name;

        itemImages.push({
          id: imageCount++,
          name: name,
          image: image,
          contentType: contentType,
          isAdded:true
        });
      };

      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }

    this.itemImages = itemImages;
    this.imageCount += files.length;
  }

  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }

  removeImage(image: any) {
    const index = this.itemImages.indexOf(image);
    this.itemImages.splice(index, 1);
    if (image.id)
      (this.form.get('removedImageIds')?.value as FormArray).push(image.id);
    this.imageCount--;
  }

  submit() {
    const colorsArray = this.form.get('colors')?.value as [];
    this.form.get('colors')?.setValue(colorsArray.join(','));

    this.itemImages.forEach((image) => {
      if (image.isAdded) {
        this.addItemImage(image);
      }
    });
    console.log(this.form.valid);
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.itemId == null) this.CreateItem(this.form.value);
      else this.updateItem(this.itemId, this.form.value);
    }
  }

  private addItemImage(image: any) {
    (this.form.get('images') as FormArray).push(
      this.fb.group({
        name: image.name,
        image: image.image,
        contentType: image.contentType,
      })
    );
  }

  private CreateItem(resource: any) {
    this.itemService.create(resource).subscribe((res) => {
      console.log(res);
      alert('Item Created Successfully');
    });
  }

  private updateItem(itemId: string, resource: any) {
    this.itemService.update(resource, null, [itemId]).subscribe((res) => {
      console.log(res);
      alert('Item Updated Successfully');
    });
  }
}
