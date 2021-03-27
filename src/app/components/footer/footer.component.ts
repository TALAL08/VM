import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './footer.component.css'
  ]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
