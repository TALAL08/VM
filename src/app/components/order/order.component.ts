import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { ComponentName } from 'src/app/common/enum/ComponentName';
declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.carousel.min.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.theme.default.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/colors/default.css',
    '../../../assets/lib/flexslider/flexslider.css',
    '../../../assets/css/style.css',
    './order.component.css',
  ],
})
export class OrderComponent implements OnInit {
  @Output() goBack = new EventEmitter();

  @Input() orders: any[] = [];
  items: any[] = [];
  showOrderItem: boolean = false;
  constructor(private location: LocationStrategy) {
    history.pushState(null, 'null', window.location.href);
    this.location.onPopState(() => {
      this.goBack.emit({ component: ComponentName.Order });
      history.pushState(null, 'null', window.location.href);
    });
  }

  ngOnInit(): void {
    console.log(this.orders);
    setTimeout(() => {
      $('.loader').fadeOut();
      $('.page-loader').delay(350).fadeOut('slow');
    }, 1000);
  }

  orderItem(id: string) {
    const order = this.orders.find((o) => o.id == id);
    this.items = order.orderItems;
    this.showOrderItem = true;
  }

  onBack() {
    this.showOrderItem = false;
  }
}
