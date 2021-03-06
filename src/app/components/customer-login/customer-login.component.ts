import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from 'src/app/common/validator/app-error';
import { AuthService } from 'src/app/services/auth.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
declare var $: any;
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
    './customer-login.component.css',
  ],
})
export class CustomerLoginComponent implements OnInit {
  form!: FormGroup;
  hasErrorsOnSubmit: boolean = false;
  emailError: string = 'Email Is required';
  passwordError: string = 'Password Is required';

  @Output() showHome = new EventEmitter();
  @Output() showCart = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastNotificationService: ToastNotificationService
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
        (res) => {
          let result = res as any;
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('name', result.name);
            localStorage.setItem('fatherName', result.fatherName);

            if (this.authService.isInRole('Admin'))
              return this.router.navigate(['/dashBoard']);

            const items = JSON.parse(localStorage.getItem('items') as string);
            if (items) {
              if ((items as []).length > 0) this.showCart.emit();
              else this.showHome.emit();
            } else this.showHome.emit();
          }
          return this.toastNotificationService.showSuccess(
            'logged In Successfully',
            'Login'
          );
        },
        (error: AppError) => {
          this.toastNotificationService.showError(
            'Email Or Passoword Is Not Valid',
            'Login Fail'
          );
        }
      );
    }
  }
}
