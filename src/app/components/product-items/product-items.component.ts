import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductItemService } from '../../services/product-item.service';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: [
    './product-items.component.css',
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
export class ProductItemsComponent implements OnInit {

  productItems: any[] = [];
  product: any;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private productItemService:ProductItemService
  ) {
   }

  ngOnInit(): void {

    this.route.paramMap.subscribe((pram) => {

      let categoryId = pram.get('productId') as string;
      this.productItemService.get(categoryId).subscribe((res) => {
        this.productItems =(res as any);

        this.product =this.productItems[0].category
      });
    });

  }
  getImage(itemImage: any) {
    const image = itemImage.contentType + itemImage.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
}
}
