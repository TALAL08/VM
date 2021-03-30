import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.carousel.min.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.theme.default.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/colors/default.css',
    '../../../assets/lib/flexslider/flexslider.css',
    '../../../assets/css/style.css',
    './slider.component.css',
  ],
})
export class SliderComponent implements OnInit {
  @Input() sliderImages: any[] = [];
  constructor(    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  getImage(sliderImage: any) {
    const image = sliderImage.contentType + sliderImage.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }
}
