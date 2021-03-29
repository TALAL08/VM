import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() items: any[] = [];
  @Output() goBack = new EventEmitter();
  totalQuantity: number = 0;
  bill: number = 0;

  constructor(
    private location: LocationStrategy
  ) {
    history.pushState(null, 'null', window.location.href);
    this.location.onPopState(() => {
      this.goBack.emit();
      history.pushState(null, 'null', window.location.href);
    });
  }

  ngOnInit(): void {

    this.items.forEach((item) => {
      this.totalQuantity += item.quantity;
      this.bill += item.totalAmount;
    });

      $('.loader').fadeOut();
      $('.page-loader').delay(950).fadeOut('slow');
  }
}
