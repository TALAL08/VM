import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './order.component.css'
  ]
})
export class OrderComponent implements OnInit {

  orders:any[]=[];

  constructor(
    private router: Router,
   private orderService:OrderService
  ) { }

  ngOnInit(): void {

    this.orderService.getAll("GetCustomerOrders").subscribe(res => {
      this.orders = (res as any);

        $('.loader').fadeOut();
        $('.page-loader').delay(950).fadeOut('slow');
    });

  }

  orderItem(id:string){

    const order = this.orders.find(o => o.id == id);
    try {
      sessionStorage.setItem('order', JSON.stringify(order.orderItems));
    } catch (exception) {

    }

    this.router.navigate(['/orderItem/'+id])

  }

}
