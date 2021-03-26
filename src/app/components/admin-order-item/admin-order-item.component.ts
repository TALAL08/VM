import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-order-item',
  templateUrl: './admin-order-item.component.html',
  styleUrls: [
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css',
    './admin-order-item.component.css'
  ]
})
export class AdminOrderItemComponent implements OnInit {
  items: any[] = [];
  totalQuantity: number = 0;
  bill: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {

    const items = JSON.parse(sessionStorage.getItem('order') as string);
    console.log(items);
    if (items) this.items = items;
    else {
      this.route.paramMap.subscribe((pram) => {
        const orderId = pram.get('orderId') as string;
        this.orderService.get(orderId).subscribe((res) => {
          this.items = (res as any).orderItems;
        });
      });
    }
    while (items==null);

    this.items.forEach((item) => {
      this.totalQuantity += item.quantity;
      this.bill += item.totalAmount;
    });

    if (items == null) this.router.navigate(['/orders']);
  }
}
