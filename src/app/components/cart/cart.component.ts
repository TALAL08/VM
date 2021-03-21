import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [
    './cart.component.css',
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
  ],
})
export class CartComponent implements OnInit {
  items: any[] = [];
  cart: { CartSubtotal: number; deliveryCharges: number; total: number } = {
    CartSubtotal: 0,
    deliveryCharges: 0,
    total: 0,
  };
  constructor(
    private sanitizer: DomSanitizer,
    private authService:AuthService
    ) {}

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('items') as string);
   if(this.items) {
    (this.items as []).forEach((item: any) => {
      this.cart.CartSubtotal +=
        (item.price as number) * (item.quantity as number);
    });
  }
    this.cart.deliveryCharges = 200;
    this.cart.total = this.cart.deliveryCharges + this.cart.CartSubtotal;

    $('.loader').fadeOut();
    $('.page-loader').delay(350).fadeOut('slow');
  }

  isAutherizeUser(){
   return this.authService.isAutherize();
  }

  getImage(itemImage: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      itemImage.image as string
    );
  }
  remove(item: any) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    const itemTotal = item.price * item.quantity;
    this.cart.CartSubtotal -= itemTotal;
    this.cart.total -= itemTotal;
    this.saveCart();
  }

  updateQuantity($event: any, item: any) {

    const quantity = $event.target.value;
    this.updateTotalCart(item, quantity);

    item.quantity = quantity;
    this.saveCart();
  }

  private updateTotalCart(item: any, quantity: any) {
    const itemTotal = item.price * item.quantity;
    this.cart.CartSubtotal -= itemTotal;
    this.cart.total -= itemTotal;


    const itemNewTotal = item.price * quantity;
    this.cart.CartSubtotal += itemNewTotal;
    this.cart.total += itemNewTotal;
  }

  saveCart() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}
