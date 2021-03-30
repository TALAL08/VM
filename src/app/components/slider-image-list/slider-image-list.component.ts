import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SliderImageService } from 'src/app/services/slider-image.service';

@Component({
  selector: 'app-slider-image-list',
  templateUrl: './slider-image-list.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css',
    './slider-image-list.component.css'
  ]
})
export class SliderImageListComponent implements OnInit {
  sliderImages:any [] = [];
  constructor(private sliderImageService: SliderImageService,
    private sanitizer: DomSanitizer
    ) {}

  ngOnInit(): void {
    this.sliderImageService.getAll().subscribe((res) => {
      this.sliderImages =( res as any);
    });
  }

  delete(sliderImage: any) {

    this.sliderImageService.delete(sliderImage.id).subscribe((res) => {
      console.log(res);
    });

    const index = this.sliderImages.indexOf(sliderImage as never);
    this.sliderImages.splice(index, 1);

    alert('Deleted');
  }

  getImage(itemImage: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      itemImage.image as string
    );
  }
}
