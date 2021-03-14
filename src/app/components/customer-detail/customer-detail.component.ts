import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './customer-detail.component.css'
  ],
})

export class CustomerDetailComponent implements OnInit {
  form!: FormGroup;
  customer!: any;
  items!: {}[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private fb:FormBuilder
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

    if (this.authService.isAutherize()) {
      this.customerService.get().subscribe((res) => {
        this.customer = res as any;
        const itemsInStorage = localStorage.getItem('items') as string;
        this.items = JSON.parse(itemsInStorage) as {}[];

        this.form.get('name')?.setValue(this.customer.name);
        this.form.get('fatherName')?.setValue(this.customer.fatherName);
        this.form.get('emailAddress')?.setValue(this.customer.emailAddress);
        this.form.get('mobileNo')?.setValue(this.customer.mobileNo);
        this.form.get('address')?.setValue(this.customer.address);

        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
      });
    }
  }

  submit(){

    const mobileNo = this.form.get('mobileNo')?.value;
    const address = this.form.get('address')?.value;

    if(mobileNo != this.customer.mobileNo || address != this.customer.address){

      this.customerService.update(this.form.value).subscribe(res =>{
        console.log(res);
      });

    }
    const resource = {OrderItems:this.items}
    this.orderService.create(resource).subscribe(res =>{

      console.log(res);
      alert("Your Order is placed successfully");
      localStorage.removeItem('items');
      this.router.navigate(['/home']);

    });
  }
}
