import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SliderImageService } from 'src/app/services/slider-image.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-slider-image-form',
  templateUrl: './slider-image-form.component.html',
  styleUrls: [
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css',
    './slider-image-form.component.css'
  ]
})
export class SliderImageFormComponent implements OnInit {
  form!: FormGroup;
  sliderImage: {contentType:string,image:string}={contentType:"",image:""};
  sliderImageId:string='';
  constructor(
    private route: ActivatedRoute,
    private sliderImageService: SliderImageService,
    private toastNotificationService:ToastNotificationService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      text1: '',
      text2: '',
      text3: '',
      contentType:['', Validators.required],
      image:['', Validators.required],
      isSelected:   false
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((pram) => {
      this.sliderImageId = pram.get('id') as string;
      if(this.sliderImageId !=null){

        this.sliderImageService.get(this.sliderImageId).subscribe((res) => {
          let sliderImageInDb = res as any;

          this.form.get('text1')?.setValue(sliderImageInDb.text1);
          this.form.get('text2')?.setValue(sliderImageInDb.text2);
          this.form.get('text3')?.setValue(sliderImageInDb.text3);
          this.form.get('contentType')?.setValue(sliderImageInDb.contentType);
          this.form.get('image')?.setValue(sliderImageInDb.image);
          this.sliderImage ={
            contentType:sliderImageInDb.contentType,
            image:sliderImageInDb.image
          };
        })

      }
    });

  }
  convertImage(event: any) {
    let toastNotificationService = this.toastNotificationService;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let form = this.form;
    reader.onload = function (theFile:any) {
      var selectedImage = new Image();
      selectedImage.src = theFile.target.result;
      selectedImage.onload = function () {
        // access image size here
        const width = (this as any).width;
        const height = (this as any).height;

        if (width != 1620 || height != 800) {
          toastNotificationService.showError(
            'Image Height must be 800 and Width must be 1620. Selected Image Height is ' +
              height +
              ' and Width is ' +
              width,
            'Invalid Image Resolution'
          );
        }
      };
      const imageString = reader.result as string;
      const contentType = imageString.slice(0, imageString.indexOf(',') + 1);
      const image = imageString.slice(imageString.indexOf(',') + 1);
      form.get('contentType')?.setValue(contentType);
      form.get('image')?.setValue(image);

      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    };
  }

  getImage() {
    return this.sanitizer.bypassSecurityTrustResourceUrl((this.form.get('contentType')?.value +this.form.get('image')?.value) as string);
  }

  removeImage() {

    this.sliderImage ={contentType:"",image:""};
    this.form.get('contentType')?.reset();
    this.form.get('image')?.reset();
  }

  submit() {
    console.log(this.form.valid);
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.sliderImageId == null) this.CreateSliderImage(this.form.value);
      else this.updateSliderImage(this.sliderImageId, this.form.value);
    }
  }

  private CreateSliderImage(resource: any) {
    this.sliderImageService.create(resource).subscribe((res) => {
      console.log(res);

      this.toastNotificationService.showSuccess("Slider Image Added Successfully","Success");
    });
  }

  private updateSliderImage(itemId: string, resource: any) {
    this.sliderImageService.update(resource, null, [itemId]).subscribe((res) => {
      console.log(res);
      this.toastNotificationService.showSuccess("Slider Image Updated Successfully","Success");
    });
  }
}
