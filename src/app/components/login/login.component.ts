import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from 'src/app/common/validator/app-error';
import { BadRequest } from 'src/app/common/validator/bad-request';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css'
  ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  hasErrorsOnSubmit: boolean = false;
  emailError: string = "Email Is required";
  passwordError: string = "Password Is required";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  isValidControl(controlname: string) {

    return (this.form.get(controlname)?.touched && this.form.get(controlname)?.invalid);

  }

  login() {
    if (this.form.invalid)
    this.hasErrorsOnSubmit = true;


    else {

      alert(this.form.value)
      this.authService.login(this.form.value).subscribe(

        res => {
          this.router.navigate(['/']);
        },
        (error: AppError) => {
          if (error instanceof BadRequest)
            alert("Email Or Passoword Is Not Valid")

          else throw error;


        });
    }

  }

}
