import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './profile.component.css'
  ]
})
export class ProfileComponent implements OnInit {

  @Input() customer:any;
  form!: FormGroup;
  constructor(
    private customerService:CustomerService,
    private toastNotificationService:ToastNotificationService,
    fb:FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      mobileNo:['', Validators.required],
      address:['', Validators.required]
    });
  }

  ngOnInit(): void {

      this.form.get('name')?.setValue(this.customer.name);
      this.form.get('fatherName')?.setValue(this.customer.fatherName);
      this.form.get('emailAddress')?.setValue(this.customer.emailAddress);
      this.form.get('mobileNo')?.setValue(this.customer.mobileNo);
      this.form.get('address')?.setValue(this.customer.address);

    $('.loader').fadeOut();
    $('.page-loader').delay(350).fadeOut('slow');
  }

  submit(){

    const resource = this.form.value;
    if(this.form.valid){

      this.customerService.update(resource).subscribe(() =>{
        this.toastNotificationService.showSuccess("Profile Updated Successfully","Profile Updated");
      });
    }else
    this.toastNotificationService.showError("Some Feilds are Invalid","Update Error");
  }
}
