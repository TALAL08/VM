import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './sign-up.component.css',
  ],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private authService: AuthService
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      address: ['', Validators.required],

      user: fb.group({
        userName: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      }),
    });
  }

  ngOnInit(): void {
    $('.loader').fadeOut();
    $('.page-loader').delay(350).fadeOut('slow');
  }

  submit() {
    console.log(this.form.valid);
    console.log(this.form.value);
    if (this.form.valid) {
      const userName = this.form.get('user')?.get('userName')?.value as string;
      const password = this.form.get('user')?.get('password')?.value as string;
      const confirmPassword = this.form.get('user')?.get('confirmPassword')
        ?.value as string;
      if (password !== confirmPassword)
        return alert('Password And ConfirmPassword are not same');

      const isExist = this.authService.IsUserNameExist(userName);
      if (isExist) {
        this.form.get('userName')?.reset;
        return alert('Try Another username.');
      }

      this.customerService.create(this.form.value).subscribe((response: any) => {

        let result = response;
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          const itemsInStorage = localStorage.getItem('items');
          let items = [];
          if (itemsInStorage) {
             items = JSON.parse(itemsInStorage) as {}[];
          }
          var routerLink = items.length > 0 ? '/customerDetail' : '/home';
          this.router.navigate([routerLink]);
        }
      }

      );
    }
  }
}
