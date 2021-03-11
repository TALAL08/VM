import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
declare var $:any;
@Component({
  selector: 'app-item-images',
  templateUrl: './item-images.component.html',
  styleUrls: [
    './item-images.component.css',
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
  ]
})
export class ItemImagesComponent implements OnInit {

  images: any[] = [];
  item: any;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private itemService:ItemService
  ) {
   }

  ngOnInit(): void {

    this.route.paramMap.subscribe((pram) => {

      let itemId = pram.get('itemId') as string;
      this.itemService.get(itemId).subscribe((res) => {
        this.item =(res as any);
        this.images =this.item.images
      });

      $('.loader').fadeOut();
      $('.page-loader').delay(350).fadeOut('slow');
    });

  }
  getImage(itemImage: any) {

    const image = itemImage.contentType + itemImage.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);

  }
}
