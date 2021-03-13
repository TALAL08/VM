import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
  form!: FormGroup;
  customer!: any;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private fb:FormBuilder
  ) {

    this.form = fb.group({
      mobileNo:['', Validators.required],
      address:['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAutherize()) {
      this.customerService.get().subscribe((res) => {
        this.customer = res as any;

        this.form.get('mobileNo')?.setValue(this.customer.mobileNo);
        this.form.get('address')?.setValue(this.customer.address);
      });
    }
  }
}
