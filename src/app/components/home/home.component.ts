import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
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
    private notifyService : ToastNotificationService,
    private sanitizer: DomSanitizer
  ) {
    this.categoryService.getAll().subscribe(res =>{
      this.categories = (res as any);
    });
  }

  ngOnInit(): void {

    $('.loader').fadeOut();
    $('.page-loader').delay(350).fadeOut('slow');
  }
  getImage(category: any) {
    const image = category.contentType+category.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }

  showToasterSuccess(){
    this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
}

showToasterError(){
    this.notifyService.showError("Something is wrong", "ItSolutionStuff.com")
}

showToasterInfo(){
    this.notifyService.showInfo("This is info", "ItSolutionStuff.com")
}

showToasterWarning(){
    this.notifyService.showWarning("This is warning", "ItSolutionStuff.com")
}

}
