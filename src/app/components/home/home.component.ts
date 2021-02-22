import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';

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
]
})
export class HomeComponent implements OnInit {

  categories:any[]=[];
  constructor(
    private categoryService:CategoryService,
    private sanitizer: DomSanitizer
  ) {
    this.categoryService.getAll().subscribe(res =>{
      this.categories = (res as any);
    });
  }

  ngOnInit(): void {
  }
  getImage(category: any) {
    const image = category.contentType+category.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }
}
