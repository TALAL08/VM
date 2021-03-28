import { LocationStrategy } from '@angular/common';
import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentName } from 'src/app/common/enum/ComponentName';
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
  ],
})
export class CategoryProductsComponent implements OnInit {
  @Input() categoryProducts!: any[];
  @Input() category: any;
  @Output() change = new EventEmitter();
  @Output() goBack = new EventEmitter();

  constructor(
    private location: LocationStrategy,
    private sanitizer: DomSanitizer
  ) {

    history.pushState(null, 'null', window.location.href);
    this.location.onPopState(() => {
      this.goBack.emit({component:ComponentName.Product});
      history.pushState(null, 'null', window.location.href);
    });
  }

  ngOnInit(): void {
    $('.loader').fadeOut();
    $('.page-loader').delay(350).fadeOut('slow');
  }

  getImage(categoryImage: any) {
    const image = categoryImage.contentType + categoryImage.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }

  getProductItems(product: any, categoryId: string) {
    this.change.emit({ product: product, categoryId: categoryId });
  }
}
