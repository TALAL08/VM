import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
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
  applyClsses = false;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    setTimeout(() => {
      if ($('.hero-slider').length > 0) {
        $('.hero-slider').flexslider({
          animation: 'fade',
          animationSpeed: 1000,
          animationLoop: true,
          prevText: '',
          nextText: '',
          before: function (slider: any) {
            $('.titan-caption')
              .fadeOut()
              .animate(
                { top: '-80px' },
                { queue: false, easing: 'swing', duration: 700 }
              );
            slider.slides.eq(slider.currentSlide).delay(500);
            slider.slides.eq(slider.animatingTo).delay(500);
          },
          after: function (slider: any) {
            $('.titan-caption')
              .fadeIn()
              .animate(
                { top: '0' },
                { queue: false, easing: 'swing', duration: 700 }
              );
          },
          useCSS: true,
        });

        if ($('.testimonials-slider').length > 0) {
          $('.testimonials-slider').flexslider({
            animation: 'slide',
            smoothHeight: true,
          });
        }
        if ($('.post-images-slider').length > 0) {
          $('.post-images-slider').flexslider({
            animation: 'slide',
            smoothHeight: true,
          });
        }

        $('.loader').fadeOut();
        $('.page-loader').delay(550).fadeOut('slow');
      }
    }, 5000);
  }
}
