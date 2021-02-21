import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [
    './nav-bar.component.css',
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/flexslider/flexslider.css',
    '../../../assets/css/style.css'
  ]
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
