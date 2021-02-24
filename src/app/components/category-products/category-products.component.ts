import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CategoryProductService } from 'src/app/services/category-product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: [
    './category-products.component.css',
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
  ],
})
export class CategoryProductsComponent implements OnInit {
  categoryProducts: any[] = [];
  category: any;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private categoryProductService: CategoryProductService
  ) {
   }

   ngOnInit(): void {

    this.route.paramMap.subscribe((pram) => {

      let categoryId = pram.get('categoryId') as string;
      this.categoryProductService.get(categoryId).subscribe((res) => {
        this.categoryProducts =(res as any);

        this.category =this.categoryProducts[0].category
      });
    });


   }


   getImage(categoryImage: any) {


       const image = categoryImage.contentType + categoryImage.image;
       console.log(image);
       return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);

   }
}