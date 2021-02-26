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
    '../../../assets/lib/owl.carousel/dist/assets/owl.carousel.min.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.theme.default.min.css',
  ],
})
export class ProductItemsComponent implements OnInit {
  productItems: any[] = [];
  product: any;
  isClick: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private productItemService: ProductItemService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pram) => {
      let productId = pram.get('productId') as string;
      this.productItemService.get(productId).subscribe((res) => {
        this.productItems = res as any;
        this.product = this.productItems[0].product;
      });
    });
  }
  getImage(itemImage: any) {
    const image = itemImage.contentType + itemImage.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }

  saveItem(item: any, event: any) {

    const buttonText = (event.target.text as string);
    if (buttonText == " Add to Cart ") {
      const cartInStorage = localStorage.getItem('cart');
      let cart = [{}];
      cart = [];
      if (cartInStorage) {
        cart = JSON.parse(cartInStorage) as {}[];
      }
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.contentType + item.image,
      });
      localStorage.setItem('cart', JSON.stringify(cart));

      event.target.text = 'Added To Cart';
    }

  }
}
