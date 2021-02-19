import { Component, OnInit, Sanitizer, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
    '../../../assets/css/demo_1/style.css'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ItemComponent implements OnInit {
  form!: FormGroup;
  itemId: string = '';
  colors!: any[];
  categories: any[] = [];
  products: any[] = [];
  homeSlider={items:1,dots:true,nav:true};
  imageCount:number=0;
  images:any[]=[];



  constructor(
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
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
      images: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.colors = Object.values(Color).filter(
      (value) => typeof value === 'string'
    );
    this.images = (this.form.get('images')?.value as [])
    console.log(this.images);
    this.route.paramMap.subscribe((pram) => {
      this.itemId = pram.get('id') as string;

      if (this.itemId != null) {
        this.itemService.get(this.itemId).subscribe((res) => {
          let itemInDb = res as any;
          this.form.get('name')?.setValue(itemInDb.name);
        });
      }
    });

    this.categoryService.getAll().subscribe((res) => {
      (this.categories as any) = res;
    });
  }

  onCategoryProducts(categoryId: string) {
    if (categoryId) {
      this.categoryProductService.get(categoryId).subscribe((res) => {
        (this.products as any) = res;
      });
    }
  }

  convertImage(event: any) {
    let form = this.form;
    let images = this.images;
    let fb = this.fb;
    let files = event.target.files;
    let sanitizer=this._sanitizer;
    for (const file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {

        const contentType = (reader.result as string).slice(0,(reader.result as string).indexOf(',')+1);
        const image = (reader.result as string).slice((reader.result as string).indexOf(',')+1);
        (form.get('images') as FormArray).push(
          fb.group({
            name: (file as any).name,
            image: image,
            contentType: contentType
          })
        );

        images.push(sanitizer.bypassSecurityTrustResourceUrl((reader.result as string)));
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      this.images = images;
      console.log(this.images);
      this.imageCount+=files.length;
    }
  }

  submit() {
    const colorsArray = this.form.get('colors')?.value as [];
    this.form.get('colors')?.setValue(colorsArray.join(','));
    if (this.form.valid) {
      if (this.itemId == null) this.CreateItem(this.form.value);
      else this.updateItem(this.itemId,this.form.value);
    }
  }

  private CreateItem(resource:any) {
    this.itemService
      .create(this.form.value)
      .subscribe((res) => {
        console.log(res);
      });
  }

  private updateItem(itemId:string,resource:any) {
    this.itemService
      .update(resource,null,[itemId])
      .subscribe((res) => {
        console.log(res);
      });
  }
}
