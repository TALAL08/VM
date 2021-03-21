import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    './order-item.component.css'
  ]
})
export class OrderItemComponent implements OnInit {

  items:any[]=[];
  totalQuantity:number=0;
  bill:number=0;

  constructor(private router: Router) { }

  ngOnInit(): void {

   const items = JSON.parse(localStorage.getItem('order') as string);
    this.items = items;

     this.items.forEach(item => {

      this.totalQuantity+=item.quantity;
      this.bill+=item.totalAmount;

    });

     if(items== null){
      this.router.navigate(['/orders'])
    }

    $('.loader').fadeOut();
    $('.page-loader').delay(950).fadeOut('slow');
  }

}
