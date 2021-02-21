import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: [
    './slider.component.css',
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.carousel.min.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.theme.default.min.css',
    '../../../assets/css/style.css'
  ]
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
