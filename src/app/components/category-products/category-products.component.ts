  import { PlatformLocation } from '@angular/common';
import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CategoryProductService } from 'src/app/services/category-product.service';
declare var $: any;
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
  ]
})
export class CategoryProductsComponent implements OnInit {
  @Input() categoryProducts!: any[];
  @Input() category: any;
  @Output() change = new EventEmitter();

  constructor(
   private location: PlatformLocation,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private categoryProductService: CategoryProductService
  ) {}

  ngOnInit(): void {

    // this.route.paramMap.subscribe((pram) => {

    //   let categoryId = pram.get('categoryId') as string;
    //   this.categoryProductService.get(categoryId).subscribe((res) => {
    //     console.log(res);
    //     this.categoryProducts = res as any;
    //     if (this.categoryProducts.length > 0)
    //       this.category = this.categoryProducts[0].category;

    //       while (this.categoryProducts.length<0) {
    //       }
    //       $('.loader').fadeOut();
    //       $('.page-loader').delay(350).fadeOut('slow');
    //   });
    // });

          $('.loader').fadeOut();
          $('.page-loader').delay(350).fadeOut('slow');
  }

  getImage(categoryImage: any) {
    const image = categoryImage.contentType + categoryImage.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }

  getProductItems(product:any,categoryId:string){
    console.log({product:product,categoryId:categoryId});
    this.change.emit({product:product,categoryId:categoryId});
  }
}
