import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from 'src/app/common/validator/app-error';
import { BadRequest } from 'src/app/common/validator/bad-request';
import { AuthService } from 'src/app/services/auth.service';
declare var $:any;
@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './customer-login.component.css'
  ],
})
export class CustomerLoginComponent implements OnInit {
  form!: FormGroup;
  hasErrorsOnSubmit: boolean = false;
  emailError: string = 'Email Is required';
  passwordError: string = 'Password Is required';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    $('.loader').fadeOut();
    $('.page-loader').delay(350).fadeOut('slow');
  }

  isValidControl(controlname: string) {
    return (
      this.form.get(controlname)?.touched && this.form.get(controlname)?.invalid
    );
  }

  login() {
    if (this.form.invalid) this.hasErrorsOnSubmit = true;
    else {
      this.authService.login(this.form.value).subscribe(
        res => {
          const items = JSON.parse(localStorage.getItem('items') as string);
          if ((items as []).length > 0)
            this.router.navigate(['/customerDetail']);
          else this.router.navigate(['/home']);
        },
        (error: AppError) => {
          if (error instanceof BadRequest)
            alert('Email Or Passoword Is Not Valid');
          else throw error;
        }
      );
    }
  }
}
