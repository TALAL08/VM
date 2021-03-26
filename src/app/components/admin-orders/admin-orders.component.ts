import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: [
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css',
    './admin-orders.component.css'
  ]
})
export class AdminOrdersComponent implements OnInit {

  orders:any[]=[];

  constructor(
    private router: Router,
   private orderService:OrderService
  ) { }

  ngOnInit(): void {

    this.orderService.getAll().subscribe(res => {
      this.orders = (res as any);

    });

  }

  orderItem(id:string){

    const order = this.orders.find(o => o.id == id);
    try {
      sessionStorage.setItem('order', JSON.stringify(order.orderItems));
    } catch (exception) {

    }

    this.router.navigate(['/adminOrderItem/'+id])

  }

}
