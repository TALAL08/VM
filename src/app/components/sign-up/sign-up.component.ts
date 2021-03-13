import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
declare var $:any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.css',
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
export class SignUpComponent implements OnInit {
  form!:FormGroup;
  constructor(
    private fb :FormBuilder,
    private customerService:CustomerService
  ) {
    this.form = fb.group({
      name:['',Validators.required],
      fatherName:['',Validators.required],
      emailAddress:['',Validators.required,Validators.email],
      mobileNo:['',Validators.required],
      address:['',Validators.required],
      user:fb.group({
        userName:['',Validators.required,Validators.email],
        password:['',Validators.required,Validators.minLength(11)],
        confirmPassword:['',Validators.required,Validators.minLength(11)]
      })
    });
  }

  ngOnInit(): void {
    $('.loader').fadeOut();
    $('.page-loader').delay(350).fadeOut('slow');
  }

  submit(){

    if(this.form.valid){
      this.customerService.create(this.form.value).subscribe(res=>{
        console.log(res);
      });
    }

  }
}
