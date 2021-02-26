import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [
    './cart.component.css',
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css'
  ]
})
export class CartComponent implements OnInit {

  cart:any[]=[];
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.cart =JSON.parse(localStorage.getItem('cart')as string);

  }
  getImage(itemImage: any) {
    const image = itemImage.contentType + itemImage.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }
}
