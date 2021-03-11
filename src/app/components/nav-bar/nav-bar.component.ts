import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './nav-bar.component.css',
  ]
})
export class NavBarComponent implements OnInit {
  @Input() count:number =0;
  constructor() { }

  ngOnInit(): void {

    const count = (localStorage.getItem("itemsCount") as string);
    if(parseInt(count)){
      this.count = parseInt(count);
    }
  }

}
