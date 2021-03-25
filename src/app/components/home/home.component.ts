import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
],
animations:[
  trigger('loader',[
    transition('void => *',[
      style({backgroundColor:'black', opacity:0}),
      animate(2000)
    ])
  ])
]
})
export class HomeComponent implements OnInit {

  categories:any[]=[];
  images:any[]=[1];
  constructor(
    private categoryService:CategoryService,
    private sanitizer: DomSanitizer
  ) {
    this.categoryService.getAll().subscribe(res =>{
      this.categories = (res as any);
      while (this.categories.length<0) {
      }
      $('.loader').fadeOut();
      $('.page-loader').delay(550).fadeOut('slow');
    });
  }

  ngOnInit(): void {
  }
  getImage(category: any) {
    const image = category.contentType+category.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }
}
