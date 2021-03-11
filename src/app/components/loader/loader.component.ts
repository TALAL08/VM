import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css',
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
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
