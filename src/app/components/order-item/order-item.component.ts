import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
declare var $: any;
@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './order-item.component.css',
  ],
})
export class OrderItemComponent implements OnInit {
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
        this.orderService.get(orderId, 'GetCustomerOrder').subscribe((res) => {
          this.items = (res as any).orderItems;
        });
      });
    }
    while (items==null) {
      console.log(items);
    }
    this.items.forEach((item) => {
      this.totalQuantity += item.quantity;
      this.bill += item.totalAmount;
    });

    if (items == null) this.router.navigate(['/orders']);
      $('.loader').fadeOut();
      $('.page-loader').delay(950).fadeOut('slow');
  }
}
